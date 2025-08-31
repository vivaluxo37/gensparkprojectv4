-- Update database schema to support comprehensive broker data (simple approach)

-- Add missing columns to brokers table with NULL defaults
ALTER TABLE brokers ADD COLUMN crypto_trading BOOLEAN;
ALTER TABLE brokers ADD COLUMN description_short TEXT;
ALTER TABLE brokers ADD COLUMN pros TEXT;
ALTER TABLE brokers ADD COLUMN cons TEXT;  
ALTER TABLE brokers ADD COLUMN platforms TEXT;
ALTER TABLE brokers ADD COLUMN source_url TEXT;
ALTER TABLE brokers ADD COLUMN last_updated TEXT;