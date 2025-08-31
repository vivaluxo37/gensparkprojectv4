-- Update database schema to support comprehensive broker data

-- Add missing columns to brokers table
ALTER TABLE brokers ADD COLUMN crypto_trading BOOLEAN DEFAULT false;
ALTER TABLE brokers ADD COLUMN description_short TEXT;
ALTER TABLE brokers ADD COLUMN pros TEXT; -- JSON array of pros
ALTER TABLE brokers ADD COLUMN cons TEXT; -- JSON array of cons  
ALTER TABLE brokers ADD COLUMN platforms TEXT; -- JSON array of platforms
ALTER TABLE brokers ADD COLUMN source_url TEXT;
ALTER TABLE brokers ADD COLUMN last_updated DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Update the max_leverage column to be numeric instead of text
-- Create a temporary table with the correct structure
CREATE TABLE brokers_new (
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
  max_leverage INTEGER DEFAULT 30, -- Changed to INTEGER
  spread_type TEXT DEFAULT 'Variable',
  demo_account BOOLEAN DEFAULT true,
  mobile_app BOOLEAN DEFAULT true,
  copy_trading BOOLEAN DEFAULT false,
  social_trading BOOLEAN DEFAULT false,
  crypto_trading BOOLEAN DEFAULT false,
  description_short TEXT,
  pros TEXT, -- JSON array
  cons TEXT, -- JSON array
  platforms TEXT, -- JSON array
  source_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Copy existing data
INSERT INTO brokers_new (
  id, name, slug, rating, rating_scale, logo_url, website_url, review_url,
  established, headquarters, is_regulated, min_deposit_usd, spread_type,
  demo_account, mobile_app, copy_trading, social_trading, created_at, updated_at
)
SELECT 
  id, name, slug, rating, rating_scale, logo_url, website_url, review_url,
  established, headquarters, is_regulated, min_deposit_usd, spread_type,
  demo_account, mobile_app, copy_trading, social_trading, created_at, updated_at
FROM brokers;

-- Drop old table and rename new one
DROP TABLE brokers;
ALTER TABLE brokers_new RENAME TO brokers;