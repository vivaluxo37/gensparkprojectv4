-- Recreate brokers table with complete schema

-- Create new brokers table with all required columns
CREATE TABLE IF NOT EXISTS brokers_new (
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
  spread_type TEXT DEFAULT 'Variable',
  demo_account BOOLEAN DEFAULT true,
  mobile_app BOOLEAN DEFAULT true,
  copy_trading BOOLEAN DEFAULT false,
  social_trading BOOLEAN DEFAULT false,
  crypto_trading BOOLEAN DEFAULT FALSE,
  description_short TEXT,
  pros TEXT,
  cons TEXT,
  platforms TEXT,
  source_url TEXT,
  last_updated DATETIME,
  regulation_trust_score REAL DEFAULT 0.0,
  fees_score REAL DEFAULT 0.0,
  platform_tools_score REAL DEFAULT 0.0,
  deposit_withdrawal_score REAL DEFAULT 0.0,
  customer_support_score REAL DEFAULT 0.0,
  research_education_score REAL DEFAULT 0.0,
  user_reviews_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Copy existing data if any
INSERT INTO brokers_new (
  id, name, slug, rating, rating_scale, logo_url, website_url, review_url,
  established, headquarters, is_regulated, min_deposit_usd, max_leverage,
  spread_type, demo_account, mobile_app, copy_trading, social_trading,
  created_at, updated_at
) SELECT 
  id, name, slug, rating, rating_scale, logo_url, website_url, review_url,
  established, headquarters, is_regulated, min_deposit_usd, max_leverage,
  spread_type, demo_account, mobile_app, copy_trading, social_trading,
  created_at, updated_at
FROM brokers;

-- Drop old table
DROP TABLE brokers;

-- Rename new table
ALTER TABLE brokers_new RENAME TO brokers;