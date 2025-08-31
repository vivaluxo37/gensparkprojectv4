-- Comprehensive Schema Update for Enhanced Broker Review System
-- Supports the detailed review format with comprehensive sections

-- Add comprehensive rating columns to brokers table
ALTER TABLE brokers ADD COLUMN regulation_trust_score REAL;
ALTER TABLE brokers ADD COLUMN fees_score REAL;
ALTER TABLE brokers ADD COLUMN platform_tools_score REAL;
ALTER TABLE brokers ADD COLUMN deposit_withdrawal_score REAL;
ALTER TABLE brokers ADD COLUMN customer_support_score REAL;
ALTER TABLE brokers ADD COLUMN research_education_score REAL;
ALTER TABLE brokers ADD COLUMN user_reviews_count INTEGER DEFAULT 0;

-- Add comprehensive analysis fields
ALTER TABLE brokers ADD COLUMN executive_summary TEXT;
ALTER TABLE brokers ADD COLUMN detailed_analysis TEXT;
ALTER TABLE brokers ADD COLUMN recommendation TEXT;
ALTER TABLE brokers ADD COLUMN data_quality_score REAL DEFAULT 0.0;

-- Create table for comprehensive broker reviews (detailed sections)
CREATE TABLE IF NOT EXISTS broker_comprehensive_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  -- Regulation & Trust Section
  regulation_analysis TEXT,
  trust_score REAL,
  investor_protection TEXT,
  segregated_accounts BOOLEAN DEFAULT false,
  compensation_scheme TEXT,
  
  -- Fees Analysis Section  
  fee_structure_analysis TEXT,
  fee_transparency_score REAL,
  inactivity_fees TEXT,
  
  -- Platform & Tools Section
  platform_analysis TEXT,
  platform_reliability_score REAL,
  mobile_trading_info TEXT,
  api_trading_info TEXT,
  charting_analysis TEXT,
  
  -- Deposit & Withdrawal Section
  deposit_withdrawal_analysis TEXT,
  verification_process TEXT,
  convenience_score REAL,
  
  -- Customer Support Section
  support_analysis TEXT,
  support_hours TEXT,
  multilingual_support TEXT,
  support_rating REAL,
  
  -- Research & Education Section
  research_analysis TEXT,
  education_score REAL,
  market_analysis_quality REAL,
  
  -- Trading Conditions Section
  trading_conditions_analysis TEXT,
  execution_model TEXT,
  leverage_analysis TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for detailed regulatory information
CREATE TABLE IF NOT EXISTS broker_regulation_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  regulator_name TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  license_number TEXT,
  license_type TEXT,
  status TEXT DEFAULT 'Active',
  regulatory_url TEXT,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for detailed fee structures
CREATE TABLE IF NOT EXISTS broker_fee_structures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  -- Commission data
  account_type TEXT,
  commission_per_lot REAL,
  commission_structure TEXT,
  minimum_commission REAL,
  
  -- Overnight fees
  instrument_type TEXT,
  long_position_rate REAL,
  short_position_rate REAL,
  
  -- Other fees
  fee_type TEXT,
  fee_amount REAL,
  fee_currency TEXT,
  fee_conditions TEXT,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for platform details
CREATE TABLE IF NOT EXISTS broker_platform_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  platform_name TEXT NOT NULL,
  platform_type TEXT, -- desktop, web, mobile, api
  features TEXT, -- JSON array of features
  supported_os TEXT, -- JSON array of operating systems
  user_rating REAL,
  
  -- Mobile specific
  ios_app BOOLEAN DEFAULT false,
  android_app BOOLEAN DEFAULT false,
  app_rating REAL,
  
  -- API specific  
  rest_api BOOLEAN DEFAULT false,
  websocket_api BOOLEAN DEFAULT false,
  fix_api BOOLEAN DEFAULT false,
  api_documentation_quality REAL,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for support analysis
CREATE TABLE IF NOT EXISTS broker_support_analysis (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  channel_type TEXT, -- live_chat, email, phone, ticket
  availability TEXT,
  response_time TEXT,
  quality_rating REAL,
  
  multilingual_support TEXT, -- JSON array of languages
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for detailed account types
CREATE TABLE IF NOT EXISTS broker_account_types_detailed (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  account_name TEXT NOT NULL,
  minimum_deposit REAL,
  spread_type TEXT,
  commission_structure TEXT,
  leverage_max INTEGER,
  features TEXT, -- JSON array
  target_trader_type TEXT,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for detailed instruments
CREATE TABLE IF NOT EXISTS broker_instruments_detailed (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  category TEXT, -- forex, indices, commodities, stocks, crypto
  instruments_count INTEGER,
  popular_instruments TEXT, -- JSON array
  trading_hours TEXT,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for payment methods
CREATE TABLE IF NOT EXISTS broker_payment_methods_detailed (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  method_name TEXT NOT NULL,
  method_type TEXT, -- deposit, withdrawal, both
  processing_time TEXT,
  fees TEXT,
  minimum_amount REAL,
  maximum_amount REAL,
  availability_regions TEXT, -- JSON array
  security_features TEXT, -- JSON array
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create table for educational resources
CREATE TABLE IF NOT EXISTS broker_educational_resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  
  resource_type TEXT,
  content_quality TEXT,
  beginner_friendly BOOLEAN DEFAULT false,
  advanced_content BOOLEAN DEFAULT false,
  languages_available TEXT, -- JSON array
  
  -- Market analysis info
  daily_analysis BOOLEAN DEFAULT false,
  weekly_reports BOOLEAN DEFAULT false,
  analyst_insights BOOLEAN DEFAULT false,
  technical_analysis BOOLEAN DEFAULT false,
  fundamental_analysis BOOLEAN DEFAULT false,
  
  -- Trading signals
  signals_available BOOLEAN DEFAULT false,
  signal_types TEXT, -- JSON array
  accuracy_rate REAL,
  signal_cost TEXT,
  
  -- Webinars
  live_webinars BOOLEAN DEFAULT false,
  recorded_sessions BOOLEAN DEFAULT false,
  webinar_frequency TEXT,
  expert_speakers BOOLEAN DEFAULT false,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Enhanced spreads table with more detail
DROP TABLE IF EXISTS spreads_enhanced;
CREATE TABLE spreads_enhanced (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  currency_pair TEXT NOT NULL,
  account_type TEXT DEFAULT 'Standard',
  
  spread_min REAL NOT NULL,
  spread_avg REAL,
  spread_max REAL,
  spread_type TEXT, -- fixed, variable, ECN
  
  commission_per_lot REAL DEFAULT 0.0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_broker_comprehensive_reviews_broker_id ON broker_comprehensive_reviews(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_regulation_details_broker_id ON broker_regulation_details(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_fee_structures_broker_id ON broker_fee_structures(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_platform_details_broker_id ON broker_platform_details(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_support_analysis_broker_id ON broker_support_analysis(broker_id);
CREATE INDEX IF NOT EXISTS idx_spreads_enhanced_broker_id ON spreads_enhanced(broker_id);
CREATE INDEX IF NOT EXISTS idx_spreads_enhanced_currency_pair ON spreads_enhanced(currency_pair);

-- Update existing brokers with default values for new columns
UPDATE brokers SET 
  regulation_trust_score = 8.0,
  fees_score = 7.5, 
  platform_tools_score = 8.0,
  deposit_withdrawal_score = 7.8,
  customer_support_score = 8.2,
  research_education_score = 7.6,
  user_reviews_count = 150,
  data_quality_score = 8.5
WHERE regulation_trust_score IS NULL;