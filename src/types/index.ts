// Type definitions for the broker analysis platform

export interface Broker {
  id: number;
  name: string;
  slug: string;
  rating: number;
  rating_scale: number;
  logo_url: string;
  website_url: string;
  review_url?: string;
  established: number;
  headquarters: string;
  is_regulated: boolean;
  min_deposit_usd: number;
  max_leverage: string;
  spread_type: string;
  demo_account: boolean;
  mobile_app: boolean;
  copy_trading: boolean;
  social_trading: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BrokerDetails {
  id: number;
  broker_id: number;
  founded_year: number;
  employee_count: number;
  trading_volume_monthly: string;
  client_count: number;
  description_long: string;
  description_short: string;
  methodology_score: number;
  overall_rating: number;
  pros_text: string;
  cons_text: string;
  company_type: string;
  ownership_type: string;
}

export interface BrokerScores {
  id: number;
  broker_id: number;
  regulation_score: number;
  spreads_score: number;
  platforms_score: number;
  education_score: number;
  support_score: number;
  mobile_score: number;
  research_score: number;
  execution_score: number;
  fees_score: number;
  trust_score: number;
  overall_score: number;
  last_updated: string;
}

export interface Spread {
  id: number;
  broker_id: number;
  account_type: string;
  currency_pair: string;
  spread_from: number;
  spread_avg: number;
  spread_max: number;
  commission_per_lot: number;
  commission_percentage: number;
  swap_long: number;
  swap_short: number;
  market_hours: string;
  last_updated: string;
}

export interface TradingPlatform {
  id: number;
  name: string;
  platform_type: string;
  developer: string;
  mobile_available: boolean;
  api_available: boolean;
  algo_trading: boolean;
  social_trading: boolean;
  copy_trading: boolean;
  description: string;
  logo_url: string;
  created_at: string;
}

export interface Regulation {
  id: number;
  broker_id: number;
  regulator_name: string;
  license_number: string;
  jurisdiction: string;
  regulatory_url: string;
}

export interface ComprehensiveBroker extends Broker {
  details?: BrokerDetails;
  scores?: BrokerScores;
  spreads?: Spread[];
  platforms?: TradingPlatform[];
  regulations?: Regulation[];
}

// Cloudflare bindings
export interface Bindings {
  DB: D1Database;
  GOOGLE_CLIENT_ID?: string;
  ENVIRONMENT?: string;
}

// API Response types
export interface BrokerListResponse {
  brokers: Broker[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ComparisonResponse {
  brokers: ComprehensiveBroker[];
  comparison_date: string;
  criteria_count: number;
}

// User and Authentication types
export interface User {
  id: number;
  email: string;
  name: string;
  password_hash?: string;
  google_id?: string;
  profile_picture?: string;
  session_id?: string;
  created_at: string;
  last_login?: string;
}

export interface BrokerMatch {
  id: number;
  user_id: number;
  broker_id: number;
  match_score: number;
  user_preferences: string; // JSON string
  created_at: string;
  broker?: Broker; // Populated when joined
}

// API Request/Response types
export interface RecommendationRequest {
  country?: string;
  experience?: string;
  strategy?: string;
  capital?: string;
  accountType?: string;
  riskTolerance?: string;
  socialTrading?: string;
}

export interface RecommendationResponse {
  success: boolean;
  recommendations: BrokerRecommendation[];
  total: number;
  criteria: RecommendationRequest;
}

export interface BrokerRecommendation {
  broker: Broker & {
    regulators?: string;
    pros?: string[];
    cons?: string[];
  };
  matchScore: number;
  reasoning: string[];
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  details?: string[];
}

export interface CostCalculationRequest {
  brokerIds: number[];
  strategy: 'scalping' | 'day-trading' | 'swing-trading' | 'position-trading';
  volume: number;
  leverage?: number;
  instrument?: string;
}

export interface CostCalculationResult {
  broker: {
    id: number;
    name: string;
    slug: string;
  };
  costs: {
    spreadCostPerTrade: string;
    commissionPerTrade: string;
    totalCostPerTrade: string;
    monthlyCost: string;
    annualCost: string;
  };
  details: {
    spreadPips: number;
    commission: number;
    tradesPerMonth: number;
    volume: number;
    instrument: string;
  };
}

export interface CostCalculationResponse {
  success: boolean;
  results: CostCalculationResult[];
  strategy: string;
  calculations: {
    lotSize: number;
    pipValue: number;
    instrument: string;
  };
  error?: string;
}

export interface SearchResponse {
  success: boolean;
  results: Broker[];
  query: string;
  error?: string;
}

export interface StatsResponse {
  success: boolean;
  stats: {
    totalBrokers: number;
    totalRegulations: number;
    averageRating: number;
    minDeposit: number;
    maxDeposit: number;
    lastUpdated: string;
  };
  error?: string;
}

export interface ChatbotRequest {
  message: string;
  context?: any;
}

export interface ChatbotResponse {
  success: boolean;
  response: string;
  suggestions: string[];
  timestamp: string;
  error?: string;
}