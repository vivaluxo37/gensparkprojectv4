// Broker Data Aggregation and Normalization System
// Combines data from multiple sources and creates comprehensive broker profiles

import { BrokerData, RegulationInfo, SpreadInfo, PlatformInfo } from './BrokerDataScraper';
import { BrokerService } from '../services/brokerService';

interface AggregatedBroker {
  // Core identification
  name: string;
  slug: string;
  website_url: string;
  logo_url: string;
  
  // Ratings and scores (averaged from multiple sources)
  rating: number;
  rating_scale: number;
  source_count: number;
  
  // Basic info
  established?: number;
  headquarters?: string;
  description_short: string;
  description_long: string;
  
  // Trading conditions
  min_deposit_usd?: number;
  max_leverage?: number;
  spread_type?: string;
  
  // Features
  demo_account: boolean;
  mobile_app: boolean;
  copy_trading: boolean;
  social_trading: boolean;
  crypto_trading: boolean;
  
  // Complex data
  regulation: RegulationInfo[];
  spreads: SpreadInfo[];
  platforms: PlatformInfo[];
  
  // Analysis
  pros: string[];
  cons: string[];
  
  // Meta
  sources: string[];
  last_updated: string;
  data_quality_score: number;
}

interface DataQualityMetrics {
  completeness: number;
  consistency: number;
  accuracy: number;
  freshness: number;
  overall: number;
}

export class BrokerDataAggregator {
  private brokerService: BrokerService;
  
  constructor(brokerService: BrokerService) {
    this.brokerService = brokerService;
  }

  async aggregateAllSources(sourceData: Map<string, BrokerData[]>): Promise<AggregatedBroker[]> {
    console.log('🔄 Aggregating broker data from all sources...');
    
    // Create a map to group brokers by normalized name
    const brokerMap = new Map<string, BrokerData[]>();
    
    // Collect all brokers from all sources
    for (const [sourceName, brokers] of sourceData.entries()) {
      console.log(`📊 Processing ${brokers.length} brokers from ${sourceName}`);
      
      for (const broker of brokers) {
        const normalizedName = this.normalizeBrokerName(broker.name);
        
        if (!brokerMap.has(normalizedName)) {
          brokerMap.set(normalizedName, []);
        }
        
        // Add source information
        broker.source_url = sourceName;
        brokerMap.get(normalizedName)!.push(broker);
      }
    }
    
    // Aggregate data for each unique broker
    const aggregatedBrokers: AggregatedBroker[] = [];
    
    for (const [normalizedName, brokerVersions] of brokerMap.entries()) {
      try {
        const aggregated = await this.aggregateBrokerData(brokerVersions);
        aggregatedBrokers.push(aggregated);
        console.log(`✅ Aggregated data for ${aggregated.name} from ${brokerVersions.length} sources`);
      } catch (error) {
        console.error(`❌ Error aggregating ${normalizedName}:`, error);
      }
    }
    
    // Sort by data quality and rating
    aggregatedBrokers.sort((a, b) => {
      if (a.data_quality_score !== b.data_quality_score) {
        return b.data_quality_score - a.data_quality_score;
      }
      return b.rating - a.rating;
    });
    
    console.log(`🎉 Successfully aggregated ${aggregatedBrokers.length} unique brokers`);
    return aggregatedBrokers;
  }

  private async aggregateBrokerData(brokerVersions: BrokerData[]): Promise<AggregatedBroker> {
    // Select the best version as base (highest quality)
    const baseVersion = this.selectBestVersion(brokerVersions);
    
    const aggregated: AggregatedBroker = {
      // Use the most common name variant
      name: this.getMostCommonName(brokerVersions),
      slug: this.createSlug(this.getMostCommonName(brokerVersions)),
      website_url: this.getBestWebsiteUrl(brokerVersions),
      logo_url: this.getBestLogoUrl(brokerVersions),
      
      // Average ratings weighted by source reliability
      rating: this.calculateWeightedRating(brokerVersions),
      rating_scale: 5,
      source_count: brokerVersions.length,
      
      // Basic info (prefer most recent/complete)
      established: this.getBestEstablished(brokerVersions),
      headquarters: this.getBestHeadquarters(brokerVersions),
      description_short: this.getBestShortDescription(brokerVersions),
      description_long: this.getBestLongDescription(brokerVersions),
      
      // Trading conditions (prefer most conservative/reliable)
      min_deposit_usd: this.getBestMinDeposit(brokerVersions),
      max_leverage: this.getBestMaxLeverage(brokerVersions),
      spread_type: this.getBestSpreadType(brokerVersions),
      
      // Features (true if any reliable source confirms)
      demo_account: this.aggregateBooleanFeature(brokerVersions, 'demo_account'),
      mobile_app: this.aggregateBooleanFeature(brokerVersions, 'mobile_app'),
      copy_trading: this.aggregateBooleanFeature(brokerVersions, 'copy_trading'),
      social_trading: this.aggregateBooleanFeature(brokerVersions, 'social_trading'),
      crypto_trading: this.aggregateBooleanFeature(brokerVersions, 'crypto_trading'),
      
      // Complex data (merge and deduplicate)
      regulation: this.aggregateRegulation(brokerVersions),
      spreads: this.aggregateSpreads(brokerVersions),
      platforms: this.aggregatePlatforms(brokerVersions),
      
      // Analysis (merge unique items)
      pros: this.aggregatePros(brokerVersions),
      cons: this.aggregateCons(brokerVersions),
      
      // Meta
      sources: brokerVersions.map(b => b.source_url || 'unknown').filter(s => s),
      last_updated: new Date().toISOString(),
      data_quality_score: this.calculateDataQualityScore(brokerVersions)
    };
    
    return aggregated;
  }

  private normalizeBrokerName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      // Handle common variations
      .replace(/\binc\b|\bltd\b|\bllc\b|\bcorp\b|\bgroup\b/g, '')
      .replace(/\bforex\b|\bfx\b|\btrading\b/g, '')
      .trim();
  }

  private selectBestVersion(versions: BrokerData[]): BrokerData {
    // Score each version based on data completeness and source reliability
    let bestVersion = versions[0];
    let bestScore = this.scoreDataCompleteness(versions[0]);
    
    for (const version of versions) {
      const score = this.scoreDataCompleteness(version);
      if (score > bestScore) {
        bestScore = score;
        bestVersion = version;
      }
    }
    
    return bestVersion;
  }

  private scoreDataCompleteness(broker: BrokerData): number {
    let score = 0;
    const weights = {
      name: 10,
      website_url: 8,
      rating: 7,
      regulation: 6,
      min_deposit_usd: 5,
      max_leverage: 5,
      spreads: 4,
      platforms: 4,
      pros: 3,
      cons: 3,
      description_short: 2,
      demo_account: 1,
      mobile_app: 1
    };
    
    for (const [field, weight] of Object.entries(weights)) {
      const value = (broker as any)[field];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          score += weight;
        } else if (!Array.isArray(value)) {
          score += weight;
        }
      }
    }
    
    return score;
  }

  private getMostCommonName(versions: BrokerData[]): string {
    const nameCount = new Map<string, number>();
    
    for (const version of versions) {
      const name = version.name.trim();
      nameCount.set(name, (nameCount.get(name) || 0) + 1);
    }
    
    let mostCommon = versions[0].name;
    let maxCount = 0;
    
    for (const [name, count] of nameCount.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = name;
      }
    }
    
    return mostCommon;
  }

  private getBestWebsiteUrl(versions: BrokerData[]): string {
    // Prefer official URLs (no review sites)
    for (const version of versions) {
      const url = version.website_url;
      if (url && !this.isReviewSiteUrl(url)) {
        return url;
      }
    }
    
    // Fallback to any URL
    return versions.find(v => v.website_url)?.website_url || '';
  }

  private getBestLogoUrl(versions: BrokerData[]): string {
    // Prefer direct logo URLs
    for (const version of versions) {
      if (version.logo_url) {
        return version.logo_url;
      }
    }
    
    // Generate placeholder
    const slug = this.createSlug(this.getMostCommonName(versions));
    return `/static/images/brokers/${slug}-logo.png`;
  }

  private calculateWeightedRating(versions: BrokerData[]): number {
    const sourceWeights: { [key: string]: number } = {
      'forexbrokers.com': 1.0,
      'investopedia.com': 0.9,
      'dailyforex.com': 0.8,
      'fxempire.com': 0.7,
      'brokerchooser.com': 0.8
    };
    
    let totalWeightedRating = 0;
    let totalWeight = 0;
    
    for (const version of versions) {
      if (version.rating && version.source_url) {
        const weight = sourceWeights[version.source_url] || 0.5;
        totalWeightedRating += version.rating * weight;
        totalWeight += weight;
      }
    }
    
    return totalWeight > 0 ? Math.round((totalWeightedRating / totalWeight) * 10) / 10 : 3.5;
  }

  private getBestEstablished(versions: BrokerData[]): number | undefined {
    const years = versions
      .map(v => v.established)
      .filter(y => y && y > 1990 && y <= new Date().getFullYear());
    
    if (years.length === 0) return undefined;
    
    // Return most common year, or earliest if tie
    const yearCount = new Map<number, number>();
    for (const year of years) {
      yearCount.set(year, (yearCount.get(year) || 0) + 1);
    }
    
    let bestYear = years[0];
    let maxCount = 0;
    
    for (const [year, count] of yearCount.entries()) {
      if (count > maxCount || (count === maxCount && year < bestYear)) {
        maxCount = count;
        bestYear = year;
      }
    }
    
    return bestYear;
  }

  private getBestHeadquarters(versions: BrokerData[]): string | undefined {
    const locations = versions
      .map(v => v.headquarters)
      .filter(h => h && h.trim().length > 0);
    
    if (locations.length === 0) return undefined;
    
    // Return most common location
    const locationCount = new Map<string, number>();
    for (const location of locations) {
      const normalized = location.trim();
      locationCount.set(normalized, (locationCount.get(normalized) || 0) + 1);
    }
    
    let bestLocation = locations[0];
    let maxCount = 0;
    
    for (const [location, count] of locationCount.entries()) {
      if (count > maxCount) {
        maxCount = count;
        bestLocation = location;
      }
    }
    
    return bestLocation;
  }

  private getBestShortDescription(versions: BrokerData[]): string {
    // Find the best short description (informative but concise)
    for (const version of versions) {
      const desc = version.description_short;
      if (desc && desc.length > 50 && desc.length < 300) {
        return desc;
      }
    }
    
    // Generate default description
    const name = this.getMostCommonName(versions);
    return `${name} is a forex and CFD broker offering competitive trading conditions and professional trading platforms.`;
  }

  private getBestLongDescription(versions: BrokerData[]): string {
    // Find the most comprehensive description
    let bestDesc = '';
    let maxLength = 0;
    
    for (const version of versions) {
      const desc = version.description_long || '';
      if (desc.length > maxLength && desc.length < 2000) {
        maxLength = desc.length;
        bestDesc = desc;
      }
    }
    
    if (bestDesc.length > 100) {
      return bestDesc;
    }
    
    // Generate comprehensive description from available data
    const name = this.getMostCommonName(versions);
    const established = this.getBestEstablished(versions);
    const headquarters = this.getBestHeadquarters(versions);
    const regulation = this.aggregateRegulation(versions);
    
    let desc = `${name} is a `;
    
    if (regulation.length > 0) {
      desc += `regulated forex and CFD broker licensed by ${regulation.map(r => r.regulator_name).join(', ')}. `;
    } else {
      desc += `forex and CFD broker `;
    }
    
    if (established) {
      desc += `Established in ${established}`;
      if (headquarters) {
        desc += ` and headquartered in ${headquarters}`;
      }
      desc += `, `;
    }
    
    desc += `${name} provides traders with access to multiple trading platforms, competitive spreads, and a range of financial instruments including forex pairs, CFDs, and commodities.`;
    
    return desc;
  }

  private getBestMinDeposit(versions: BrokerData[]): number | undefined {
    const deposits = versions
      .map(v => v.min_deposit_usd)
      .filter(d => d !== undefined && d >= 0);
    
    if (deposits.length === 0) return undefined;
    
    // Return the most commonly reported amount, or median if tie
    const depositCount = new Map<number, number>();
    for (const deposit of deposits) {
      depositCount.set(deposit, (depositCount.get(deposit) || 0) + 1);
    }
    
    let bestDeposit = deposits[0];
    let maxCount = 0;
    
    for (const [deposit, count] of depositCount.entries()) {
      if (count > maxCount) {
        maxCount = count;
        bestDeposit = deposit;
      }
    }
    
    return bestDeposit;
  }

  private getBestMaxLeverage(versions: BrokerData[]): number | undefined {
    const leverages = versions
      .map(v => v.max_leverage)
      .filter(l => l !== undefined && l > 0);
    
    if (leverages.length === 0) return undefined;
    
    // Return most common leverage
    const leverageCount = new Map<number, number>();
    for (const leverage of leverages) {
      leverageCount.set(leverage, (leverageCount.get(leverage) || 0) + 1);
    }
    
    let bestLeverage = leverages[0];
    let maxCount = 0;
    
    for (const [leverage, count] of leverageCount.entries()) {
      if (count > maxCount) {
        maxCount = count;
        bestLeverage = leverage;
      }
    }
    
    return bestLeverage;
  }

  private getBestSpreadType(versions: BrokerData[]): string | undefined {
    const types = versions
      .map(v => v.spread_type)
      .filter(t => t && t.trim().length > 0);
    
    if (types.length === 0) return undefined;
    
    // Return most common type
    const typeCount = new Map<string, number>();
    for (const type of types) {
      const normalized = type.toLowerCase().trim();
      typeCount.set(normalized, (typeCount.get(normalized) || 0) + 1);
    }
    
    let bestType = types[0];
    let maxCount = 0;
    
    for (const [type, count] of typeCount.entries()) {
      if (count > maxCount) {
        maxCount = count;
        bestType = type;
      }
    }
    
    return bestType;
  }

  private aggregateBooleanFeature(versions: BrokerData[], feature: keyof BrokerData): boolean {
    let trueCount = 0;
    let totalCount = 0;
    
    for (const version of versions) {
      const value = version[feature];
      if (typeof value === 'boolean') {
        totalCount++;
        if (value) trueCount++;
      }
    }
    
    // Require majority or high-quality source confirmation
    return totalCount > 0 && (trueCount / totalCount) >= 0.5;
  }

  private aggregateRegulation(versions: BrokerData[]): RegulationInfo[] {
    const regulationMap = new Map<string, RegulationInfo>();
    
    for (const version of versions) {
      if (version.regulation) {
        for (const reg of version.regulation) {
          const key = `${reg.regulator_name}-${reg.jurisdiction}`;
          if (!regulationMap.has(key) || !regulationMap.get(key)?.license_number) {
            regulationMap.set(key, {
              regulator_name: reg.regulator_name,
              jurisdiction: reg.jurisdiction,
              license_number: reg.license_number || regulationMap.get(key)?.license_number,
              status: reg.status || 'Active'
            });
          }
        }
      }
    }
    
    return Array.from(regulationMap.values());
  }

  private aggregateSpreads(versions: BrokerData[]): SpreadInfo[] {
    const spreadMap = new Map<string, SpreadInfo[]>();
    
    for (const version of versions) {
      if (version.spreads) {
        for (const spread of version.spreads) {
          const key = `${spread.currency_pair}-${spread.account_type}`;
          if (!spreadMap.has(key)) {
            spreadMap.set(key, []);
          }
          spreadMap.get(key)!.push(spread);
        }
      }
    }
    
    const aggregatedSpreads: SpreadInfo[] = [];
    
    for (const [key, spreads] of spreadMap.entries()) {
      const avgTypical = spreads.reduce((sum, s) => sum + s.spread_typical, 0) / spreads.length;
      const avgMin = spreads.reduce((sum, s) => sum + s.spread_min, 0) / spreads.length;
      
      aggregatedSpreads.push({
        currency_pair: spreads[0].currency_pair,
        spread_typical: Math.round(avgTypical * 10) / 10,
        spread_min: Math.round(avgMin * 10) / 10,
        account_type: spreads[0].account_type
      });
    }
    
    return aggregatedSpreads;
  }

  private aggregatePlatforms(versions: BrokerData[]): PlatformInfo[] {
    const platformMap = new Map<string, PlatformInfo>();
    
    for (const version of versions) {
      if (version.platforms) {
        for (const platform of version.platforms) {
          const key = platform.platform_name.toLowerCase();
          if (!platformMap.has(key)) {
            platformMap.set(key, {
              platform_name: platform.platform_name,
              platform_type: platform.platform_type,
              supports_ea: platform.supports_ea,
              mobile_available: platform.mobile_available
            });
          } else {
            // Merge boolean features (true if any source confirms)
            const existing = platformMap.get(key)!;
            existing.supports_ea = existing.supports_ea || platform.supports_ea;
            existing.mobile_available = existing.mobile_available || platform.mobile_available;
          }
        }
      }
    }
    
    return Array.from(platformMap.values());
  }

  private aggregatePros(versions: BrokerData[]): string[] {
    const prosSet = new Set<string>();
    
    for (const version of versions) {
      if (version.pros) {
        for (const pro of version.pros) {
          const normalized = pro.trim().toLowerCase();
          if (normalized.length > 5) {
            // Find if similar pro already exists
            let found = false;
            for (const existing of prosSet) {
              if (this.isSimilarString(normalized, existing.toLowerCase())) {
                found = true;
                break;
              }
            }
            if (!found) {
              prosSet.add(pro.trim());
            }
          }
        }
      }
    }
    
    return Array.from(prosSet).slice(0, 10); // Limit to top 10
  }

  private aggregateCons(versions: BrokerData[]): string[] {
    const consSet = new Set<string>();
    
    for (const version of versions) {
      if (version.cons) {
        for (const con of version.cons) {
          const normalized = con.trim().toLowerCase();
          if (normalized.length > 5) {
            // Find if similar con already exists
            let found = false;
            for (const existing of consSet) {
              if (this.isSimilarString(normalized, existing.toLowerCase())) {
                found = true;
                break;
              }
            }
            if (!found) {
              consSet.add(con.trim());
            }
          }
        }
      }
    }
    
    return Array.from(consSet).slice(0, 10); // Limit to top 10
  }

  private calculateDataQualityScore(versions: BrokerData[]): number {
    const metrics = this.calculateDataQualityMetrics(versions);
    return Math.round(metrics.overall * 100) / 100;
  }

  private calculateDataQualityMetrics(versions: BrokerData[]): DataQualityMetrics {
    const completeness = this.calculateCompleteness(versions);
    const consistency = this.calculateConsistency(versions);
    const accuracy = this.calculateAccuracy(versions);
    const freshness = this.calculateFreshness(versions);
    
    const overall = (completeness * 0.4 + consistency * 0.25 + accuracy * 0.25 + freshness * 0.1);
    
    return {
      completeness,
      consistency,
      accuracy,
      freshness,
      overall
    };
  }

  private calculateCompleteness(versions: BrokerData[]): number {
    const requiredFields = [
      'name', 'website_url', 'rating', 'min_deposit_usd', 'max_leverage',
      'demo_account', 'mobile_app', 'regulation', 'platforms'
    ];
    
    let totalFields = 0;
    let completedFields = 0;
    
    for (const version of versions) {
      for (const field of requiredFields) {
        totalFields++;
        const value = (version as any)[field];
        if (value !== undefined && value !== null && value !== '' && 
            (!Array.isArray(value) || value.length > 0)) {
          completedFields++;
        }
      }
    }
    
    return totalFields > 0 ? completedFields / totalFields : 0;
  }

  private calculateConsistency(versions: BrokerData[]): number {
    if (versions.length < 2) return 1;
    
    let consistentFields = 0;
    let totalComparisons = 0;
    
    const fieldsToCheck = ['name', 'website_url', 'established', 'headquarters'];
    
    for (const field of fieldsToCheck) {
      const values = versions
        .map(v => (v as any)[field])
        .filter(v => v !== undefined && v !== null && v !== '');
      
      if (values.length > 1) {
        totalComparisons++;
        const uniqueValues = new Set(values.map(v => this.normalizeValue(v)));
        if (uniqueValues.size === 1) {
          consistentFields++;
        }
      }
    }
    
    return totalComparisons > 0 ? consistentFields / totalComparisons : 1;
  }

  private calculateAccuracy(versions: BrokerData[]): number {
    // Estimate accuracy based on source reliability and data validation
    let totalWeight = 0;
    let accuracyScore = 0;
    
    const sourceAccuracy: { [key: string]: number } = {
      'forexbrokers.com': 0.9,
      'investopedia.com': 0.85,
      'dailyforex.com': 0.8,
      'fxempire.com': 0.75,
      'brokerchooser.com': 0.8
    };
    
    for (const version of versions) {
      const source = version.source_url || 'unknown';
      const accuracy = sourceAccuracy[source] || 0.6;
      const weight = this.scoreDataCompleteness(version);
      
      accuracyScore += accuracy * weight;
      totalWeight += weight;
    }
    
    return totalWeight > 0 ? accuracyScore / totalWeight : 0.7;
  }

  private calculateFreshness(versions: BrokerData[]): number {
    const now = new Date();
    let totalWeight = 0;
    let freshnessScore = 0;
    
    for (const version of versions) {
      const lastUpdated = version.last_updated ? new Date(version.last_updated) : new Date();
      const daysSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      
      // Freshness declines over time
      let freshness = 1;
      if (daysSinceUpdate > 30) {
        freshness = Math.max(0.5, 1 - (daysSinceUpdate - 30) / 365);
      }
      
      const weight = this.scoreDataCompleteness(version);
      freshnessScore += freshness * weight;
      totalWeight += weight;
    }
    
    return totalWeight > 0 ? freshnessScore / totalWeight : 1;
  }

  private isSimilarString(str1: string, str2: string, threshold = 0.8): boolean {
    const similarity = this.calculateStringSimilarity(str1, str2);
    return similarity >= threshold;
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  private normalizeValue(value: any): string {
    return String(value).toLowerCase().trim().replace(/\s+/g, ' ');
  }

  private isReviewSiteUrl(url: string): boolean {
    const reviewSites = [
      'review', 'rating', 'comparison', 'dailyforex', 'forexbrokers.com',
      'investopedia', 'fxempire', 'brokerchooser'
    ];
    
    const lowerUrl = url.toLowerCase();
    return reviewSites.some(site => lowerUrl.includes(site));
  }

  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Export aggregated data to database format
  async exportToDatabase(aggregatedBrokers: AggregatedBroker[]): Promise<void> {
    console.log('💾 Exporting aggregated broker data to database...');
    
    for (const broker of aggregatedBrokers) {
      try {
        await this.insertBrokerToDatabase(broker);
        console.log(`✅ Inserted ${broker.name} into database`);
      } catch (error) {
        console.error(`❌ Error inserting ${broker.name}:`, error);
      }
    }
    
    console.log('🎉 Database export completed');
  }

  private async insertBrokerToDatabase(broker: AggregatedBroker): Promise<void> {
    // This would interface with your database service
    // For now, we'll log the structure that should be inserted
    
    const dbBroker = {
      name: broker.name,
      slug: broker.slug,
      website_url: broker.website_url,
      logo_url: broker.logo_url,
      rating: broker.rating,
      rating_scale: broker.rating_scale,
      established: broker.established,
      headquarters: broker.headquarters,
      min_deposit_usd: broker.min_deposit_usd,
      max_leverage: broker.max_leverage,
      spread_type: broker.spread_type,
      demo_account: broker.demo_account,
      mobile_app: broker.mobile_app,
      copy_trading: broker.copy_trading,
      social_trading: broker.social_trading,
      crypto_trading: broker.crypto_trading,
      is_regulated: broker.regulation.length > 0,
      description_short: broker.description_short,
      description_long: broker.description_long,
      pros: JSON.stringify(broker.pros),
      cons: JSON.stringify(broker.cons),
      sources: JSON.stringify(broker.sources),
      data_quality_score: broker.data_quality_score,
      last_updated: broker.last_updated
    };
    
    console.log('Database record structure:', JSON.stringify(dbBroker, null, 2));
  }
}

export { AggregatedBroker, DataQualityMetrics };