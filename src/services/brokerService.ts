// Broker service for database operations
import type { Broker, ComprehensiveBroker, BrokerListResponse, ComparisonResponse } from '../types';

export class BrokerService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async getAllBrokers(page = 1, limit = 12, sortBy = 'rating'): Promise<{ brokers: Broker[], total: number, totalPages: number, currentPage: number }> {
    const offset = (page - 1) * limit;
    
    // Get total count
    const countResult = await this.db.prepare('SELECT COUNT(*) as total FROM brokers').first() as { total: number };
    const total = countResult?.total || 0;
    const totalPages = Math.ceil(total / limit);
    
    // Determine sort order
    let orderClause = 'ORDER BY b.rating DESC, b.name ASC';
    switch (sortBy) {
      case 'name':
        orderClause = 'ORDER BY b.name ASC';
        break;
      case 'deposit':
        orderClause = 'ORDER BY b.min_deposit_usd ASC';
        break;
      case 'established':
        orderClause = 'ORDER BY b.established DESC';
        break;
      default:
        orderClause = 'ORDER BY b.rating DESC, b.name ASC';
    }
    
    // Get brokers with pagination
    const brokers = await this.db.prepare(`
      SELECT b.*, 
             GROUP_CONCAT(r.regulator_name, ',') as regulators,
             COUNT(r.id) as regulation_count
      FROM brokers b
      LEFT JOIN regulations r ON b.id = r.broker_id
      GROUP BY b.id
      ${orderClause}
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all();

    return {
      brokers: brokers.results as Broker[],
      total,
      totalPages,
      currentPage: page
    };
  }

  async getBrokerBySlug(slug: string): Promise<ComprehensiveBroker | null> {
    const broker = await this.db.prepare(`
      SELECT b.*, bd.*, bs.*
      FROM brokers b
      LEFT JOIN broker_details bd ON b.id = bd.broker_id
      LEFT JOIN broker_scores bs ON b.id = bs.broker_id
      WHERE b.slug = ?
    `).bind(slug).first();

    if (!broker) return null;

    // Get additional data
    const [spreads, platforms, regulations] = await Promise.all([
      this.getBrokerSpreads(broker.id as number),
      this.getBrokerPlatforms(broker.id as number),
      this.getBrokerRegulations(broker.id as number)
    ]);

    return {
      ...broker as ComprehensiveBroker,
      spreads: spreads.results,
      platforms: platforms.results,
      regulations: regulations.results
    };
  }

  async getBrokerById(id: number): Promise<ComprehensiveBroker | null> {
    const broker = await this.db.prepare(`
      SELECT b.*, bd.*, bs.*
      FROM brokers b
      LEFT JOIN broker_details bd ON b.id = bd.broker_id
      LEFT JOIN broker_scores bs ON b.id = bs.broker_id
      WHERE b.id = ?
    `).bind(id).first();

    if (!broker) return null;

    return broker as ComprehensiveBroker;
  }

  async compareBrokers(brokerIds: number[]): Promise<ComparisonResponse> {
    if (brokerIds.length === 0 || brokerIds.length > 4) {
      throw new Error('Invalid number of brokers for comparison (1-4 allowed)');
    }

    const placeholders = brokerIds.map(() => '?').join(',');
    
    const brokers = await this.db.prepare(`
      SELECT b.*, bd.*, bs.*
      FROM brokers b
      LEFT JOIN broker_details bd ON b.id = bd.broker_id
      LEFT JOIN broker_scores bs ON b.id = bs.broker_id
      WHERE b.id IN (${placeholders})
      ORDER BY b.rating DESC
    `).bind(...brokerIds).all();

    // Get additional data for each broker
    const enrichedBrokers = await Promise.all(
      (brokers.results as ComprehensiveBroker[]).map(async (broker) => {
        const [spreads, platforms, regulations] = await Promise.all([
          this.getBrokerSpreads(broker.id),
          this.getBrokerPlatforms(broker.id),
          this.getBrokerRegulations(broker.id)
        ]);

        return {
          ...broker,
          spreads: spreads.results,
          platforms: platforms.results,
          regulations: regulations.results
        };
      })
    );

    return {
      brokers: enrichedBrokers,
      comparison_date: new Date().toISOString(),
      criteria_count: 12
    };
  }

  private async getBrokerSpreads(brokerId: number) {
    return await this.db.prepare(`
      SELECT * FROM spreads_enhanced 
      WHERE broker_id = ? AND currency_pair IN ('EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD')
      ORDER BY currency_pair
    `).bind(brokerId).all();
  }

  private async getBrokerPlatforms(brokerId: number) {
    return await this.db.prepare(`
      SELECT tp.*, bp.primary_platform, bp.custom_features
      FROM trading_platforms tp
      JOIN broker_platforms bp ON tp.id = bp.platform_id
      WHERE bp.broker_id = ? AND bp.available = 1
      ORDER BY bp.primary_platform DESC
    `).bind(brokerId).all();
  }

  private async getBrokerRegulations(brokerId: number) {
    return await this.db.prepare(`
      SELECT * FROM regulations WHERE broker_id = ?
      ORDER BY regulator_name
    `).bind(brokerId).all();
  }

  async getTopBrokers(limit = 8): Promise<Broker[]> {
    const result = await this.db.prepare(`
      SELECT id, name, slug, rating, logo_url, min_deposit_usd, max_leverage, spread_type
      FROM brokers 
      ORDER BY rating DESC 
      LIMIT ?
    `).bind(limit).all();

    return result.results as Broker[];
  }

  async searchBrokers(query: string, filters?: {
    regulation?: string;
    minDeposit?: number;
    maxDeposit?: number;
    spreadType?: string;
    platforms?: string[];
  }): Promise<Broker[]> {
    let sql = `
      SELECT DISTINCT b.* FROM brokers b
      LEFT JOIN regulations r ON b.id = r.broker_id
      WHERE (b.name LIKE ? OR b.headquarters LIKE ? OR r.jurisdiction LIKE ?)
    `;
    
    const params = [`%${query}%`, `%${query}%`, `%${query}%`];

    if (filters?.regulation) {
      sql += ` AND r.jurisdiction = ?`;
      params.push(filters.regulation);
    }

    if (filters?.minDeposit !== undefined) {
      sql += ` AND b.min_deposit_usd >= ?`;
      params.push(filters.minDeposit.toString());
    }

    if (filters?.maxDeposit !== undefined) {
      sql += ` AND b.min_deposit_usd <= ?`;
      params.push(filters.maxDeposit.toString());
    }

    if (filters?.spreadType) {
      sql += ` AND b.spread_type = ?`;
      params.push(filters.spreadType);
    }

    sql += ` ORDER BY b.rating DESC LIMIT 20`;

    const result = await this.db.prepare(sql).bind(...params).all();
    return result.results as Broker[];
  }
}