-- Update brokers table to match complete database expectations

-- Add missing columns to brokers table
ALTER TABLE brokers ADD COLUMN crypto_trading BOOLEAN DEFAULT FALSE;
ALTER TABLE brokers ADD COLUMN description_short TEXT;
ALTER TABLE brokers ADD COLUMN pros TEXT;
ALTER TABLE brokers ADD COLUMN cons TEXT;
ALTER TABLE brokers ADD COLUMN platforms TEXT;
ALTER TABLE brokers ADD COLUMN source_url TEXT;
ALTER TABLE brokers ADD COLUMN last_updated DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE brokers ADD COLUMN regulation_trust_score REAL DEFAULT 0.0;
ALTER TABLE brokers ADD COLUMN fees_score REAL DEFAULT 0.0;
ALTER TABLE brokers ADD COLUMN platform_tools_score REAL DEFAULT 0.0;
ALTER TABLE brokers ADD COLUMN deposit_withdrawal_score REAL DEFAULT 0.0;
ALTER TABLE brokers ADD COLUMN customer_support_score REAL DEFAULT 0.0;
ALTER TABLE brokers ADD COLUMN research_education_score REAL DEFAULT 0.0;
ALTER TABLE brokers ADD COLUMN user_reviews_count INTEGER DEFAULT 0;