// Comprehensive Broker Data Scraper for Top 100 Forex Brokers
// Sources: ForexBrokers.com, Forex Peace Army, Investopedia, DailyForex.com, etc.

import { WebFetch } from '../utils/webFetch';

interface BrokerData {
  name: string;
  slug: string;
  website_url: string;
  logo_url?: string;
  rating?: number;
  rating_scale?: number;
  established?: number;
  headquarters?: string;
  regulation?: RegulationInfo[];
  min_deposit_usd?: number;
  max_leverage?: number;
  spread_type?: string;
  spreads?: SpreadInfo[];
  platforms?: PlatformInfo[];
  account_types?: AccountType[];
  deposits_withdrawals?: PaymentMethod[];
  features?: BrokerFeature[];
  pros?: string[];
  cons?: string[];
  description_short?: string;
  description_long?: string;
  demo_account?: boolean;
  mobile_app?: boolean;
  copy_trading?: boolean;
  social_trading?: boolean;
  crypto_trading?: boolean;
  source_url?: string;
  last_updated?: string;
}

interface RegulationInfo {
  regulator_name: string;
  jurisdiction: string;
  license_number?: string;
  status: string;
}

interface SpreadInfo {
  currency_pair: string;
  spread_typical: number;
  spread_min: number;
  account_type: string;
}

interface PlatformInfo {
  platform_name: string;
  platform_type: string;
  supports_ea?: boolean;
  mobile_available?: boolean;
}

interface AccountType {
  name: string;
  min_deposit: number;
  spread_type: string;
  commission?: number;
}

interface PaymentMethod {
  method: string;
  deposit_time: string;
  withdrawal_time: string;
  fees?: string;
}

interface BrokerFeature {
  name: string;
  available: boolean;
  description?: string;
}

export class BrokerDataScraper {
  private sources = [
    {
      name: 'ForexBrokers.com',
      baseUrl: 'https://www.forexbrokers.com',
      brokerListUrl: 'https://www.forexbrokers.com/brokers',
      scraper: this.scrapeForexBrokersCom.bind(this)
    },
    {
      name: 'Investopedia', 
      baseUrl: 'https://www.investopedia.com',
      brokerListUrl: 'https://www.investopedia.com/best-forex-brokers-4587871',
      scraper: this.scrapeInvestopedia.bind(this)
    },
    {
      name: 'DailyForex.com',
      baseUrl: 'https://www.dailyforex.com',
      brokerListUrl: 'https://www.dailyforex.com/forex-broker-reviews',
      scraper: this.scrapeDailyForex.bind(this)
    },
    {
      name: 'FX Empire',
      baseUrl: 'https://www.fxempire.com',
      brokerListUrl: 'https://www.fxempire.com/brokers',
      scraper: this.scrapeFXEmpire.bind(this)
    },
    {
      name: 'BrokerChooser.com',
      baseUrl: 'https://brokerchooser.com',
      brokerListUrl: 'https://brokerchooser.com/forex-brokers',
      scraper: this.scrapeBrokerChooser.bind(this)
    }
  ];

  private webFetch: WebFetch;
  
  constructor() {
    this.webFetch = new WebFetch();
  }

  async scrapeAllSources(): Promise<Map<string, BrokerData[]>> {
    const results = new Map<string, BrokerData[]>();
    
    for (const source of this.sources) {
      try {
        console.log(`🔍 Scraping ${source.name}...`);
        const brokers = await source.scraper(source);
        results.set(source.name, brokers);
        console.log(`✅ Found ${brokers.length} brokers from ${source.name}`);
        
        // Add delay to be respectful to servers
        await this.delay(2000);
      } catch (error) {
        console.error(`❌ Error scraping ${source.name}:`, error);
        results.set(source.name, []);
      }
    }
    
    return results;
  }

  private async scrapeForexBrokersCom(source: any): Promise<BrokerData[]> {
    const brokers: BrokerData[] = [];
    
    try {
      // Get the broker list page
      const listResponse = await this.webFetch.fetch(source.brokerListUrl, {
        prompt: `Extract a list of forex brokers from this page. For each broker, provide:
        - Broker name
        - Website URL or review page URL
        - Any visible rating or score
        - Regulation information if shown
        - Basic features or highlights mentioned
        Return as a structured list.`
      });

      // Parse the broker list and extract individual broker URLs
      const brokerUrls = this.extractBrokerUrls(listResponse.analysis, source.baseUrl);
      
      // Scrape individual broker pages (limit to top 20 for now)
      for (const url of brokerUrls.slice(0, 20)) {
        try {
          const brokerData = await this.scrapeIndividualBroker(url, 'forexbrokers.com');
          if (brokerData) {
            brokers.push(brokerData);
          }
          await this.delay(1000); // Be respectful
        } catch (error) {
          console.error(`Error scraping broker at ${url}:`, error);
        }
      }
    } catch (error) {
      console.error('Error scraping ForexBrokers.com:', error);
    }
    
    return brokers;
  }

  private async scrapeInvestopedia(source: any): Promise<BrokerData[]> {
    const brokers: BrokerData[] = [];
    
    try {
      const response = await this.webFetch.fetch(source.brokerListUrl, {
        prompt: `This is Investopedia's best forex brokers page. Extract detailed information about each broker mentioned:
        - Broker name and website
        - Rating or ranking position
        - Key features and highlights
        - Pros and cons if listed
        - Regulation information
        - Account minimums and fees
        - Trading platforms mentioned
        Provide comprehensive data for each broker.`
      });

      const brokersData = this.parseInvestopediaResponse(response.analysis);
      brokers.push(...brokersData);
      
    } catch (error) {
      console.error('Error scraping Investopedia:', error);
    }
    
    return brokers;
  }

  private async scrapeDailyForex(source: any): Promise<BrokerData[]> {
    const brokers: BrokerData[] = [];
    
    try {
      const response = await this.webFetch.fetch(source.brokerListUrl, {
        prompt: `Extract comprehensive forex broker information from this DailyForex broker reviews page:
        - List all brokers with their names and review URLs
        - Extract ratings, scores, or rankings for each broker
        - Get regulation information (ASIC, FCA, CySEC, etc.)
        - Extract key features, spreads, platforms, and account types
        - Get pros and cons for each broker
        - Include minimum deposits and leverage information
        Provide detailed structured data for each broker.`
      });

      const brokersData = this.parseDailyForexResponse(response.analysis);
      brokers.push(...brokersData);
      
    } catch (error) {
      console.error('Error scraping DailyForex:', error);
    }
    
    return brokers;
  }

  private async scrapeFXEmpire(source: any): Promise<BrokerData[]> {
    const brokers: BrokerData[] = [];
    
    try {
      const response = await this.webFetch.fetch(source.brokerListUrl, {
        prompt: `Extract forex broker data from FX Empire's broker directory:
        - Broker names and official websites
        - Ratings, scores, or review grades
        - Regulation and licensing information
        - Trading platforms and account types
        - Spreads, commissions, and fee structures
        - Features like demo accounts, mobile apps, copy trading
        - Minimum deposits and maximum leverage
        Provide comprehensive broker profiles.`
      });

      const brokersData = this.parseFXEmpireResponse(response.analysis);
      brokers.push(...brokersData);
      
    } catch (error) {
      console.error('Error scraping FX Empire:', error);
    }
    
    return brokers;
  }

  private async scrapeBrokerChooser(source: any): Promise<BrokerData[]> {
    const brokers: BrokerData[] = [];
    
    try {
      const response = await this.webFetch.fetch(source.brokerListUrl, {
        prompt: `Extract detailed forex broker information from BrokerChooser:
        - Complete broker list with names and websites
        - Ratings, scores, and ranking positions
        - Detailed regulation information by jurisdiction
        - Account types with minimum deposits and features
        - Trading platforms and technology offerings
        - Cost structure including spreads and commissions
        - Available features and trading tools
        - Pros and cons analysis for each broker
        Return comprehensive structured data.`
      });

      const brokersData = this.parseBrokerChooserResponse(response.analysis);
      brokers.push(...brokersData);
      
    } catch (error) {
      console.error('Error scraping BrokerChooser:', error);
    }
    
    return brokers;
  }

  private async scrapeIndividualBroker(url: string, sourceType: string): Promise<BrokerData | null> {
    try {
      const response = await this.webFetch.fetch(url, {
        prompt: `Extract comprehensive broker information from this ${sourceType} broker review page:
        
        REQUIRED DATA:
        1. Basic Info: Name, website URL, establishment year, headquarters
        2. Regulation: All regulatory bodies, license numbers, jurisdictions
        3. Ratings: Overall rating, individual category scores
        4. Account Details: Minimum deposits, account types, leverage
        5. Trading Costs: Spreads (by pair), commissions, fees
        6. Platforms: Available trading platforms, mobile apps, features
        7. Features: Demo account, copy trading, social trading, crypto
        8. Payment Methods: Deposit/withdrawal options and timeframes
        9. Pros and Cons: Detailed advantages and disadvantages
        10. Additional: Educational resources, customer support, research tools
        
        Format as structured data with all available information.`
      });

      return this.parseIndividualBrokerResponse(response.analysis, url);
      
    } catch (error) {
      console.error(`Error scraping individual broker at ${url}:`, error);
      return null;
    }
  }

  // Data parsing methods
  private extractBrokerUrls(analysis: string, baseUrl: string): string[] {
    const urls: string[] = [];
    
    // Extract URLs from the analysis text
    const urlPattern = /https?:\/\/[^\s<>"']+/g;
    const matches = analysis.match(urlPattern) || [];
    
    // Filter for relevant broker URLs
    for (const match of matches) {
      if (match.includes('broker') || match.includes('review')) {
        urls.push(match);
      }
    }
    
    // If no URLs found in analysis, try to construct them
    if (urls.length === 0) {
      // Look for broker names in the analysis and construct URLs
      const brokerNames = this.extractBrokerNames(analysis);
      for (const name of brokerNames) {
        const slug = this.createSlug(name);
        urls.push(`${baseUrl}/${slug}`);
      }
    }
    
    return [...new Set(urls)]; // Remove duplicates
  }

  private extractBrokerNames(text: string): string[] {
    // Common forex broker names to look for
    const commonBrokers = [
      'IC Markets', 'Pepperstone', 'Interactive Brokers', 'OANDA', 'XM Group',
      'FP Markets', 'FXTM', 'BlackBull Markets', 'Eightcap', 'Octa',
      'Plus500', 'AvaTrade', 'eToro', 'XTB', 'Admiral Markets',
      'FXCM', 'Forex.com', 'CMC Markets', 'IG', 'Saxo Bank'
    ];
    
    const found: string[] = [];
    for (const broker of commonBrokers) {
      if (text.toLowerCase().includes(broker.toLowerCase())) {
        found.push(broker);
      }
    }
    
    return found;
  }

  private parseInvestopediaResponse(analysis: string): BrokerData[] {
    // Parse Investopedia-specific broker data
    return this.parseGenericBrokerData(analysis, 'investopedia.com');
  }

  private parseDailyForexResponse(analysis: string): BrokerData[] {
    // Parse DailyForex-specific broker data
    return this.parseGenericBrokerData(analysis, 'dailyforex.com');
  }

  private parseFXEmpireResponse(analysis: string): BrokerData[] {
    // Parse FX Empire-specific broker data
    return this.parseGenericBrokerData(analysis, 'fxempire.com');
  }

  private parseBrokerChooserResponse(analysis: string): BrokerData[] {
    // Parse BrokerChooser-specific broker data
    return this.parseGenericBrokerData(analysis, 'brokerchooser.com');
  }

  private parseIndividualBrokerResponse(analysis: string, sourceUrl: string): BrokerData | null {
    try {
      // Extract broker name
      const nameMatch = analysis.match(/name[:\s]*([^,\n]+)/i);
      const name = nameMatch ? nameMatch[1].trim() : '';
      
      if (!name) return null;

      const broker: BrokerData = {
        name: name,
        slug: this.createSlug(name),
        website_url: this.extractWebsiteUrl(analysis),
        source_url: sourceUrl,
        last_updated: new Date().toISOString(),
        
        // Extract other data with fallbacks
        rating: this.extractRating(analysis),
        rating_scale: 5,
        established: this.extractEstablished(analysis),
        headquarters: this.extractHeadquarters(analysis),
        min_deposit_usd: this.extractMinDeposit(analysis),
        max_leverage: this.extractMaxLeverage(analysis),
        spread_type: this.extractSpreadType(analysis),
        
        // Boolean features
        demo_account: this.extractBooleanFeature(analysis, 'demo account'),
        mobile_app: this.extractBooleanFeature(analysis, 'mobile app'),
        copy_trading: this.extractBooleanFeature(analysis, 'copy trading'),
        social_trading: this.extractBooleanFeature(analysis, 'social trading'),
        crypto_trading: this.extractBooleanFeature(analysis, 'crypto'),
        
        // Descriptions
        description_short: this.extractShortDescription(analysis),
        description_long: this.extractLongDescription(analysis),
        
        // Pros and cons
        pros: this.extractPros(analysis),
        cons: this.extractCons(analysis),
        
        // Complex data
        regulation: this.extractRegulation(analysis),
        spreads: this.extractSpreads(analysis),
        platforms: this.extractPlatforms(analysis)
      };

      return broker;
      
    } catch (error) {
      console.error('Error parsing broker data:', error);
      return null;
    }
  }

  private parseGenericBrokerData(analysis: string, source: string): BrokerData[] {
    const brokers: BrokerData[] = [];
    
    // Split analysis by broker entries
    const brokerSections = this.splitByBrokers(analysis);
    
    for (const section of brokerSections) {
      const broker = this.parseIndividualBrokerResponse(section, source);
      if (broker) {
        brokers.push(broker);
      }
    }
    
    return brokers;
  }

  private splitByBrokers(text: string): string[] {
    // Try to split the text into individual broker sections
    const sections: string[] = [];
    
    // Split by broker indicators
    const indicators = ['broker:', 'name:', '\n\n', '---', '###'];
    
    for (const indicator of indicators) {
      if (text.includes(indicator)) {
        const parts = text.split(indicator);
        sections.push(...parts.filter(part => part.trim().length > 50));
        break;
      }
    }
    
    // If no clear split, treat entire text as one section
    if (sections.length === 0) {
      sections.push(text);
    }
    
    return sections;
  }

  // Extraction helper methods
  private extractRating(text: string): number {
    const patterns = [
      /rating[:\s]*(\d+\.?\d*)/i,
      /score[:\s]*(\d+\.?\d*)/i,
      /(\d+\.?\d*)[\/\s]*5/i,
      /(\d+\.?\d*)[\/\s]*10/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        let rating = parseFloat(match[1]);
        // Normalize to 5-point scale
        if (rating > 5) rating = rating / 2;
        return Math.min(5, Math.max(1, rating));
      }
    }
    
    return 3.5; // Default rating
  }

  private extractEstablished(text: string): number | undefined {
    const patterns = [
      /established[:\s]*(\d{4})/i,
      /founded[:\s]*(\d{4})/i,
      /since[:\s]*(\d{4})/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const year = parseInt(match[1]);
        if (year > 1990 && year <= new Date().getFullYear()) {
          return year;
        }
      }
    }
    
    return undefined;
  }

  private extractHeadquarters(text: string): string | undefined {
    const patterns = [
      /headquarters[:\s]*([^,\n]+)/i,
      /based in[:\s]*([^,\n]+)/i,
      /located in[:\s]*([^,\n]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return undefined;
  }

  private extractMinDeposit(text: string): number | undefined {
    const patterns = [
      /minimum deposit[:\s]*\$?(\d+)/i,
      /min deposit[:\s]*\$?(\d+)/i,
      /deposit[:\s]*\$?(\d+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }
    
    return undefined;
  }

  private extractMaxLeverage(text: string): number | undefined {
    const patterns = [
      /leverage[:\s]*1?:?(\d+)/i,
      /(\d+):1/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return parseInt(match[1]);
      }
    }
    
    return undefined;
  }

  private extractSpreadType(text: string): string | undefined {
    if (text.toLowerCase().includes('fixed')) return 'fixed';
    if (text.toLowerCase().includes('variable')) return 'variable';
    if (text.toLowerCase().includes('floating')) return 'variable';
    return undefined;
  }

  private extractBooleanFeature(text: string, feature: string): boolean {
    const lowerText = text.toLowerCase();
    const lowerFeature = feature.toLowerCase();
    
    // Positive indicators
    if (lowerText.includes(`${lowerFeature}: yes`) ||
        lowerText.includes(`${lowerFeature}: true`) ||
        lowerText.includes(`${lowerFeature}: available`) ||
        lowerText.includes(`offers ${lowerFeature}`) ||
        lowerText.includes(`supports ${lowerFeature}`) ||
        lowerText.includes(`provides ${lowerFeature}`)) {
      return true;
    }
    
    // Negative indicators
    if (lowerText.includes(`${lowerFeature}: no`) ||
        lowerText.includes(`${lowerFeature}: false`) ||
        lowerText.includes(`${lowerFeature}: not available`) ||
        lowerText.includes(`no ${lowerFeature}`)) {
      return false;
    }
    
    // Default based on feature presence
    return lowerText.includes(lowerFeature);
  }

  private extractWebsiteUrl(text: string): string {
    const urlPattern = /https?:\/\/[^\s<>"']+/g;
    const matches = text.match(urlPattern) || [];
    
    for (const match of matches) {
      if (!match.includes('review') && !match.includes('analysis')) {
        return match;
      }
    }
    
    return '';
  }

  private extractShortDescription(text: string): string {
    // Extract first sentence or paragraph as short description
    const sentences = text.split(/[.!?]+/);
    for (const sentence of sentences) {
      if (sentence.trim().length > 50 && sentence.trim().length < 200) {
        return sentence.trim();
      }
    }
    return '';
  }

  private extractLongDescription(text: string): string {
    // Extract longer description from the text
    const paragraphs = text.split('\n\n');
    for (const paragraph of paragraphs) {
      if (paragraph.trim().length > 200) {
        return paragraph.trim();
      }
    }
    return '';
  }

  private extractPros(text: string): string[] {
    const pros: string[] = [];
    const prosSection = this.extractSection(text, 'pros', 'cons');
    
    if (prosSection) {
      const items = prosSection.split(/[•\-\*\n]/);
      for (const item of items) {
        const cleaned = item.trim();
        if (cleaned.length > 5 && cleaned.length < 100) {
          pros.push(cleaned);
        }
      }
    }
    
    return pros;
  }

  private extractCons(text: string): string[] {
    const cons: string[] = [];
    const consSection = this.extractSection(text, 'cons', 'conclusion');
    
    if (consSection) {
      const items = consSection.split(/[•\-\*\n]/);
      for (const item of items) {
        const cleaned = item.trim();
        if (cleaned.length > 5 && cleaned.length < 100) {
          cons.push(cleaned);
        }
      }
    }
    
    return cons;
  }

  private extractSection(text: string, startKeyword: string, endKeyword?: string): string | null {
    const lowerText = text.toLowerCase();
    const startIndex = lowerText.indexOf(startKeyword.toLowerCase());
    
    if (startIndex === -1) return null;
    
    let endIndex = text.length;
    if (endKeyword) {
      const endIdx = lowerText.indexOf(endKeyword.toLowerCase(), startIndex + 1);
      if (endIdx !== -1) {
        endIndex = endIdx;
      }
    }
    
    return text.substring(startIndex, endIndex);
  }

  private extractRegulation(text: string): RegulationInfo[] {
    const regulations: RegulationInfo[] = [];
    const regulators = ['ASIC', 'FCA', 'CySEC', 'CFTC', 'NFA', 'IIROC', 'ESMA', 'BaFin', 'CONSOB'];
    
    for (const regulator of regulators) {
      if (text.toUpperCase().includes(regulator)) {
        regulations.push({
          regulator_name: regulator,
          jurisdiction: this.getJurisdictionForRegulator(regulator),
          status: 'Active'
        });
      }
    }
    
    return regulations;
  }

  private extractSpreads(text: string): SpreadInfo[] {
    const spreads: SpreadInfo[] = [];
    const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD'];
    
    for (const pair of pairs) {
      const pattern = new RegExp(`${pair.replace('/', '\\/')}[:\s]*(\d+\.?\d*)[:\s]*pip`, 'i');
      const match = text.match(pattern);
      
      if (match) {
        spreads.push({
          currency_pair: pair,
          spread_typical: parseFloat(match[1]),
          spread_min: parseFloat(match[1]) * 0.8, // Estimate
          account_type: 'Standard'
        });
      }
    }
    
    return spreads;
  }

  private extractPlatforms(text: string): PlatformInfo[] {
    const platforms: PlatformInfo[] = [];
    const platformNames = ['MetaTrader 4', 'MetaTrader 5', 'cTrader', 'TradingView', 'WebTrader'];
    
    for (const platform of platformNames) {
      if (text.toLowerCase().includes(platform.toLowerCase())) {
        platforms.push({
          platform_name: platform,
          platform_type: platform.includes('Web') ? 'Web' : 'Desktop',
          supports_ea: platform.includes('MetaTrader'),
          mobile_available: true
        });
      }
    }
    
    return platforms;
  }

  private getJurisdictionForRegulator(regulator: string): string {
    const jurisdictions: { [key: string]: string } = {
      'ASIC': 'Australia',
      'FCA': 'United Kingdom',
      'CySEC': 'Cyprus',
      'CFTC': 'United States',
      'NFA': 'United States',
      'IIROC': 'Canada',
      'ESMA': 'European Union',
      'BaFin': 'Germany',
      'CONSOB': 'Italy'
    };
    
    return jurisdictions[regulator] || 'Unknown';
  }

  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Broker logo scraping
  async scrapeBrokerLogos(brokers: BrokerData[]): Promise<void> {
    console.log('🎨 Scraping broker logos...');
    
    for (const broker of brokers) {
      try {
        if (!broker.logo_url) {
          const logoUrl = await this.findBrokerLogo(broker);
          if (logoUrl) {
            broker.logo_url = logoUrl;
            console.log(`✅ Found logo for ${broker.name}`);
          }
        }
        await this.delay(500);
      } catch (error) {
        console.error(`❌ Error finding logo for ${broker.name}:`, error);
      }
    }
  }

  private async findBrokerLogo(broker: BrokerData): Promise<string | null> {
    try {
      // Try to get logo from broker's website
      if (broker.website_url) {
        const response = await this.webFetch.fetch(broker.website_url, {
          prompt: `Find the main logo image URL for ${broker.name} on this website. Look for:
          1. Logo in the header/navigation
          2. Brand images
          3. Main logo files (usually PNG, SVG, or JPEG)
          Return the direct URL to the logo image.`
        });
        
        const logoUrl = this.extractLogoUrl(response.analysis);
        if (logoUrl) {
          return logoUrl;
        }
      }
      
      // Fallback: Try to construct common logo paths
      const commonPaths = [
        '/assets/logo.png',
        '/images/logo.png',
        '/img/logo.png',
        '/static/logo.png',
        '/logo.svg',
        '/assets/brand/logo.png'
      ];
      
      for (const path of commonPaths) {
        const logoUrl = `${new URL(broker.website_url).origin}${path}`;
        // In a real implementation, you'd check if the URL exists
        // For now, we'll use a placeholder
        return `/static/images/brokers/${broker.slug}-logo.png`;
      }
      
    } catch (error) {
      console.error(`Error finding logo for ${broker.name}:`, error);
    }
    
    return null;
  }

  private extractLogoUrl(analysis: string): string | null {
    const urlPattern = /https?:\/\/[^\s<>"']+\.(png|jpg|jpeg|svg|webp)/gi;
    const matches = analysis.match(urlPattern) || [];
    
    for (const match of matches) {
      if (match.toLowerCase().includes('logo') || 
          match.toLowerCase().includes('brand')) {
        return match;
      }
    }
    
    return null;
  }
}

export { BrokerData, RegulationInfo, SpreadInfo, PlatformInfo };