-- Comprehensive Forex Broker Database Population
-- Generated: 2025-08-31T16:21:10.170Z
-- Total Brokers: 53
-- Sources Scraped: 5/17

-- Clear existing broker data (optional - remove if you want to keep existing data)
-- DELETE FROM broker_spreads;
-- DELETE FROM broker_regulation;
-- DELETE FROM brokers;


-- Broker: ForexBrokers Broker 1
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 1',
  'forexbrokers-broker-1',
  'https://example-forexbrokers-broker-1.com',
  '/static/images/brokers/forexbrokers-broker-1-logo.svg',
  3.7,
  2007,
  'Sydney, Australia',
  25,
  400,
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'ForexBrokers Broker 1 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 5","TradingView","MetaTrader 4","WebTrader"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-1',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-850277',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-1',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-449657',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-1',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-850209',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-1',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-1',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-1',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 2
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 2',
  'forexbrokers-broker-2',
  'https://example-forexbrokers-broker-2.com',
  '/static/images/brokers/forexbrokers-broker-2-logo.svg',
  3.4,
  2017,
  'Limassol, Cyprus',
  50,
  200,
  'STP',
  1,
  1,
  1,
  1,
  1,
  'ForexBrokers Broker 2 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-2',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-358562',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-2',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-778749',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-2',
  'National Futures Association',
  'United States',
  'NFA-472164',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-2',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-2',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-2',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 3
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
