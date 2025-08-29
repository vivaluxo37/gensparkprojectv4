-- BrokerAnalysis Database Schema
-- Comprehensive broker information for comparison and recommendation

-- Brokers table - Core broker information
CREATE TABLE IF NOT EXISTS brokers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  rating REAL NOT NULL DEFAULT 0.0,
  rating_scale REAL NOT NULL DEFAULT 5.0,
  logo_url TEXT,
  website_url TEXT,
  review_url TEXT,
  established INTEGER,
  headquarters TEXT,
  is_regulated BOOLEAN DEFAULT false,
  min_deposit_usd INTEGER DEFAULT 0,
  max_leverage TEXT DEFAULT '1:30',
  spread_type TEXT DEFAULT 'Variable', -- Variable, Fixed, Raw
  demo_account BOOLEAN DEFAULT true,
  mobile_app BOOLEAN DEFAULT true,
  copy_trading BOOLEAN DEFAULT false,
  social_trading BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Regulation table - Regulatory information
CREATE TABLE IF NOT EXISTS regulations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  regulator_name TEXT NOT NULL,
  license_number TEXT,
  jurisdiction TEXT NOT NULL,
  regulatory_url TEXT,
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Spreads table - Spread information for different currency pairs
CREATE TABLE IF NOT EXISTS spreads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  currency_pair TEXT NOT NULL,
  spread_from REAL NOT NULL,
  spread_avg REAL,
  commission_per_lot REAL DEFAULT 0.0,
  account_type TEXT DEFAULT 'Standard',
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Platforms table - Trading platforms offered
CREATE TABLE IF NOT EXISTS platforms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  platform_name TEXT NOT NULL,
  platform_type TEXT NOT NULL, -- Desktop, Web, Mobile, API
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Account types table
CREATE TABLE IF NOT EXISTS account_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  type_name TEXT NOT NULL,
  min_deposit_usd INTEGER DEFAULT 0,
  max_leverage TEXT DEFAULT '1:30',
  spread_markup REAL DEFAULT 0.0,
  commission_per_lot REAL DEFAULT 0.0,
  features TEXT, -- JSON string of features
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  method_name TEXT NOT NULL,
  method_type TEXT NOT NULL, -- Deposit, Withdrawal, Both
  processing_time TEXT,
  min_amount INTEGER DEFAULT 0,
  max_amount INTEGER,
  fees TEXT,
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker features table - Pros and Cons
CREATE TABLE IF NOT EXISTS broker_features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  feature_text TEXT NOT NULL,
  feature_type TEXT NOT NULL, -- Pro, Con, Feature
  category TEXT, -- Trading, Platform, Support, Regulation, etc.
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Instruments table - Trading instruments offered
CREATE TABLE IF NOT EXISTS instruments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  broker_id INTEGER NOT NULL,
  instrument_type TEXT NOT NULL, -- Forex, CFDs, Crypto, Stocks, Commodities, Indices
  instrument_count INTEGER DEFAULT 0,
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- User questionnaire responses for recommendations
CREATE TABLE IF NOT EXISTS user_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  country TEXT,
  experience_level TEXT, -- Beginner, Intermediate, Advanced
  trading_strategy TEXT, -- Scalping, Day Trading, Swing Trading, Long-term
  capital_amount INTEGER, -- in USD
  account_type_pref TEXT, -- Standard, ECN, STP, Islamic
  asset_preferences TEXT, -- JSON array of preferred assets
  risk_tolerance TEXT, -- Low, Medium, High
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recommendation scores - Store calculated match scores
CREATE TABLE IF NOT EXISTS recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  broker_id INTEGER NOT NULL,
  match_score REAL NOT NULL,
  reasoning TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brokers_rating ON brokers(rating);
CREATE INDEX IF NOT EXISTS idx_brokers_min_deposit ON brokers(min_deposit_usd);
CREATE INDEX IF NOT EXISTS idx_spreads_broker_pair ON spreads(broker_id, currency_pair);
CREATE INDEX IF NOT EXISTS idx_regulations_broker ON regulations(broker_id);
CREATE INDEX IF NOT EXISTS idx_platforms_broker ON platforms(broker_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_session ON recommendations(session_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_score ON recommendations(match_score);