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
  'ForexBrokers Broker 3',
  'forexbrokers-broker-3',
  'https://example-forexbrokers-broker-3.com',
  '/static/images/brokers/forexbrokers-broker-3-logo.svg',
  4,
  2009,
  'New York, USA',
  25,
  100,
  'STP',
  1,
  1,
  1,
  1,
  1,
  'ForexBrokers Broker 3 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 5","MetaTrader 4","TradingView","Proprietary Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-3',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-878003',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-3',
  'National Futures Association',
  'United States',
  'NFA-601193',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-3',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-544039',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-3',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-3',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-3',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 4
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 4',
  'forexbrokers-broker-4',
  'https://example-forexbrokers-broker-4.com',
  '/static/images/brokers/forexbrokers-broker-4-logo.svg',
  5,
  2019,
  'Limassol, Cyprus',
  10,
  400,
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'ForexBrokers Broker 4 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","Proprietary Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-4',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-772594',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-4',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-725539',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-4',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-4',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-4',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 5
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 5',
  'forexbrokers-broker-5',
  'https://example-forexbrokers-broker-5.com',
  '/static/images/brokers/forexbrokers-broker-5-logo.svg',
  3.9,
  2006,
  'London, UK',
  50,
  1000,
  'Fixed',
  1,
  0,
  1,
  0,
  1,
  'ForexBrokers Broker 5 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 5","TradingView"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-5',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-652590',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-5',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-484893',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-5',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-5',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-5',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 6
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 6',
  'forexbrokers-broker-6',
  'https://example-forexbrokers-broker-6.com',
  '/static/images/brokers/forexbrokers-broker-6-logo.svg',
  4.4,
  2023,
  'Sydney, Australia',
  1,
  200,
  'STP',
  1,
  1,
  1,
  0,
  1,
  'ForexBrokers Broker 6 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","MetaTrader 4","cTrader"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-6',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-611707',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-6',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-412389',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-6',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-6',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-6',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 7
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 7',
  'forexbrokers-broker-7',
  'https://example-forexbrokers-broker-7.com',
  '/static/images/brokers/forexbrokers-broker-7-logo.svg',
  4.1,
  2021,
  'Sydney, Australia',
  1,
  400,
  'STP',
  1,
  1,
  0,
  0,
  0,
  'ForexBrokers Broker 7 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","WebTrader","MetaTrader 4","cTrader"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-7',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-564942',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-7',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-135295',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-7',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-7',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-7',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 8
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 8',
  'forexbrokers-broker-8',
  'https://example-forexbrokers-broker-8.com',
  '/static/images/brokers/forexbrokers-broker-8-logo.svg',
  4.4,
  2000,
  'New York, USA',
  500,
  200,
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'ForexBrokers Broker 8 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","MetaTrader 4"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-8',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-321734',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-8',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-763470',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-8',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-8',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-8',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 9
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 9',
  'forexbrokers-broker-9',
  'https://example-forexbrokers-broker-9.com',
  '/static/images/brokers/forexbrokers-broker-9-logo.svg',
  4.5,
  2014,
  'Limassol, Cyprus',
  50,
  400,
  'STP',
  1,
  1,
  0,
  1,
  1,
  'ForexBrokers Broker 9 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","cTrader","MetaTrader 5"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-9',
  'National Futures Association',
  'United States',
  'NFA-805827',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-9',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-9',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-9',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 10
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 10',
  'forexbrokers-broker-10',
  'https://example-forexbrokers-broker-10.com',
  '/static/images/brokers/forexbrokers-broker-10-logo.svg',
  3.2,
  2012,
  'Sydney, Australia',
  100,
  500,
  'ECN',
  1,
  1,
  0,
  0,
  0,
  'ForexBrokers Broker 10 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","Proprietary Platform","WebTrader"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-10',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-877034',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-10',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-10',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-10',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 11
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 11',
  'forexbrokers-broker-11',
  'https://example-forexbrokers-broker-11.com',
  '/static/images/brokers/forexbrokers-broker-11-logo.svg',
  4.4,
  2012,
  'London, UK',
  500,
  100,
  'ECN',
  1,
  1,
  0,
  1,
  0,
  'ForexBrokers Broker 11 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","MetaTrader 5"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-11',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-680693',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-11',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-684714',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-11',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-659768',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-11',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-11',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-11',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 12
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 12',
  'forexbrokers-broker-12',
  'https://example-forexbrokers-broker-12.com',
  '/static/images/brokers/forexbrokers-broker-12-logo.svg',
  4,
  2016,
  'London, UK',
  1000,
  400,
  'Fixed',
  1,
  0,
  1,
  1,
  1,
  'ForexBrokers Broker 12 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","WebTrader","TradingView"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-12',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-919092',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-12',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-12',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-12',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: ForexBrokers Broker 13
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'ForexBrokers Broker 13',
  'forexbrokers-broker-13',
  'https://example-forexbrokers-broker-13.com',
  '/static/images/brokers/forexbrokers-broker-13-logo.svg',
  3.2,
  2018,
  'New York, USA',
  10,
  100,
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'ForexBrokers Broker 13 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","TradingView","MetaTrader 4"]',
  'https://www.forexbrokers.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-13',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-694562',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forexbrokers-broker-13',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-160520',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-13',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-13',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forexbrokers-broker-13',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 1
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 1',
  'forex-peace-army-broker-1',
  'https://example-forex-peace-army-broker-1.com',
  '/static/images/brokers/forex-peace-army-broker-1-logo.svg',
  4.3,
  2021,
  'Sydney, Australia',
  250,
  400,
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'Forex Peace Army Broker 1 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","Proprietary Platform"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-1',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-708386',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-1',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-532681',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-1',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-1',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-1',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 2
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 2',
  'forex-peace-army-broker-2',
  'https://example-forex-peace-army-broker-2.com',
  '/static/images/brokers/forex-peace-army-broker-2-logo.svg',
  4.1,
  2001,
  'London, UK',
  500,
  50,
  'STP',
  1,
  1,
  1,
  1,
  0,
  'Forex Peace Army Broker 2 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","TradingView"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-2',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-686941',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-2',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-740667',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-2',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-414783',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-2',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-2',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-2',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 3
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 3',
  'forex-peace-army-broker-3',
  'https://example-forex-peace-army-broker-3.com',
  '/static/images/brokers/forex-peace-army-broker-3-logo.svg',
  4.6,
  2007,
  'New York, USA',
  1,
  50,
  'Variable',
  0,
  1,
  0,
  0,
  1,
  'Forex Peace Army Broker 3 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","cTrader","TradingView"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-3',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-652394',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-3',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-902529',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-3',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-779147',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-3',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-3',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-3',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 4
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 4',
  'forex-peace-army-broker-4',
  'https://example-forex-peace-army-broker-4.com',
  '/static/images/brokers/forex-peace-army-broker-4-logo.svg',
  4,
  2003,
  'New York, USA',
  100,
  30,
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'Forex Peace Army Broker 4 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","WebTrader","Proprietary Platform"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-4',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-482579',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-4',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-353278',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-4',
  'National Futures Association',
  'United States',
  'NFA-544294',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-4',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-4',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-4',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 5
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 5',
  'forex-peace-army-broker-5',
  'https://example-forex-peace-army-broker-5.com',
  '/static/images/brokers/forex-peace-army-broker-5-logo.svg',
  4.3,
  2009,
  'Limassol, Cyprus',
  25,
  1000,
  'ECN',
  1,
  0,
  0,
  1,
  1,
  'Forex Peace Army Broker 5 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","MetaTrader 4","WebTrader"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-5',
  'National Futures Association',
  'United States',
  'NFA-150334',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-5',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-582288',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-5',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-5',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-5',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 6
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 6',
  'forex-peace-army-broker-6',
  'https://example-forex-peace-army-broker-6.com',
  '/static/images/brokers/forex-peace-army-broker-6-logo.svg',
  3.9,
  2010,
  'Limassol, Cyprus',
  50,
  50,
  'STP',
  1,
  1,
  1,
  0,
  1,
  'Forex Peace Army Broker 6 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","TradingView","cTrader"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-6',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-307675',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-6',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-6',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-6',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 7
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 7',
  'forex-peace-army-broker-7',
  'https://example-forex-peace-army-broker-7.com',
  '/static/images/brokers/forex-peace-army-broker-7-logo.svg',
  4.3,
  2014,
  'London, UK',
  50,
  500,
  'STP',
  1,
  1,
  0,
  1,
  1,
  'Forex Peace Army Broker 7 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","Proprietary Platform"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-7',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-858520',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-7',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-379594',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-7',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-7',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-7',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 8
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 8',
  'forex-peace-army-broker-8',
  'https://example-forex-peace-army-broker-8.com',
  '/static/images/brokers/forex-peace-army-broker-8-logo.svg',
  4.1,
  2007,
  'London, UK',
  50,
  50,
  'STP',
  1,
  1,
  0,
  0,
  0,
  'Forex Peace Army Broker 8 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","MetaTrader 4"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-8',
  'National Futures Association',
  'United States',
  'NFA-804756',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-8',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-8',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-8',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 9
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 9',
  'forex-peace-army-broker-9',
  'https://example-forex-peace-army-broker-9.com',
  '/static/images/brokers/forex-peace-army-broker-9-logo.svg',
  3.4,
  2011,
  'Limassol, Cyprus',
  100,
  50,
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'Forex Peace Army Broker 9 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","TradingView"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-9',
  'National Futures Association',
  'United States',
  'NFA-433877',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-9',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-831272',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-9',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-9',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-9',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 10
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 10',
  'forex-peace-army-broker-10',
  'https://example-forex-peace-army-broker-10.com',
  '/static/images/brokers/forex-peace-army-broker-10-logo.svg',
  4.5,
  2022,
  'London, UK',
  1000,
  200,
  'Fixed',
  1,
  1,
  1,
  1,
  0,
  'Forex Peace Army Broker 10 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","WebTrader"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-10',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-894371',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-10',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-132984',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-10',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-10',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-10',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 11
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 11',
  'forex-peace-army-broker-11',
  'https://example-forex-peace-army-broker-11.com',
  '/static/images/brokers/forex-peace-army-broker-11-logo.svg',
  5,
  2010,
  'London, UK',
  10,
  50,
  'STP',
  0,
  1,
  1,
  1,
  1,
  'Forex Peace Army Broker 11 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","TradingView"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-11',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-585105',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-11',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-526848',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-11',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-792273',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-11',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-11',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-11',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Forex Peace Army Broker 12
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Forex Peace Army Broker 12',
  'forex-peace-army-broker-12',
  'https://example-forex-peace-army-broker-12.com',
  '/static/images/brokers/forex-peace-army-broker-12-logo.svg',
  4.9,
  2012,
  'Limassol, Cyprus',
  10,
  200,
  'STP',
  1,
  1,
  1,
  0,
  1,
  'Forex Peace Army Broker 12 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","WebTrader","TradingView"]',
  'https://www.forexpeacearmy.com/forex-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-12',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-545787',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'forex-peace-army-broker-12',
  'National Futures Association',
  'United States',
  'NFA-915609',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-12',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-12',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'forex-peace-army-broker-12',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 1
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 1',
  'investopedia-broker-1',
  'https://example-investopedia-broker-1.com',
  '/static/images/brokers/investopedia-broker-1-logo.svg',
  4.2,
  2012,
  'London, UK',
  1,
  1000,
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'Investopedia Broker 1 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","Proprietary Platform"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-1',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-128653',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-1',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-1',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-1',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 2
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 2',
  'investopedia-broker-2',
  'https://example-investopedia-broker-2.com',
  '/static/images/brokers/investopedia-broker-2-logo.svg',
  3.6,
  2019,
  'London, UK',
  50,
  100,
  'ECN',
  1,
  1,
  1,
  0,
  0,
  'Investopedia Broker 2 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","Proprietary Platform","MetaTrader 5","TradingView"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-2',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-501569',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-2',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-2',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-2',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 3
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 3',
  'investopedia-broker-3',
  'https://example-investopedia-broker-3.com',
  '/static/images/brokers/investopedia-broker-3-logo.svg',
  3.4,
  2019,
  'Sydney, Australia',
  10,
  50,
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'Investopedia Broker 3 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","cTrader"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-3',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-250354',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-3',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-3',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-3',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 4
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 4',
  'investopedia-broker-4',
  'https://example-investopedia-broker-4.com',
  '/static/images/brokers/investopedia-broker-4-logo.svg',
  3.3,
  2010,
  'Sydney, Australia',
  50,
  400,
  'STP',
  1,
  1,
  1,
  0,
  0,
  'Investopedia Broker 4 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 5","Proprietary Platform","TradingView","MetaTrader 4"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-4',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-854106',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-4',
  'National Futures Association',
  'United States',
  'NFA-659854',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-4',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-4',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-4',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 5
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 5',
  'investopedia-broker-5',
  'https://example-investopedia-broker-5.com',
  '/static/images/brokers/investopedia-broker-5-logo.svg',
  3.2,
  2005,
  'New York, USA',
  25,
  30,
  'ECN',
  1,
  1,
  1,
  0,
  0,
  'Investopedia Broker 5 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","TradingView","WebTrader","MetaTrader 5"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-5',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-681021',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-5',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-983267',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-5',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-5',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-5',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 6
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 6',
  'investopedia-broker-6',
  'https://example-investopedia-broker-6.com',
  '/static/images/brokers/investopedia-broker-6-logo.svg',
  4.1,
  2014,
  'Sydney, Australia',
  1,
  200,
  'STP',
  0,
  1,
  0,
  0,
  1,
  'Investopedia Broker 6 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","cTrader","MetaTrader 5"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-6',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-573312',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-6',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-799203',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-6',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-6',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-6',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: Investopedia Broker 7
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'Investopedia Broker 7',
  'investopedia-broker-7',
  'https://example-investopedia-broker-7.com',
  '/static/images/brokers/investopedia-broker-7-logo.svg',
  4.5,
  2000,
  'Limassol, Cyprus',
  1,
  500,
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'Investopedia Broker 7 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","Proprietary Platform"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'investopedia-broker-7',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-985600',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-7',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-7',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'investopedia-broker-7',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 1
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 1',
  'dailyforex-broker-1',
  'https://example-dailyforex-broker-1.com',
  '/static/images/brokers/dailyforex-broker-1-logo.svg',
  4,
  2018,
  'Limassol, Cyprus',
  1000,
  1000,
  'ECN',
  0,
  0,
  1,
  1,
  1,
  'DailyForex Broker 1 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","WebTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-1',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-994275',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-1',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-358750',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-1',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-1',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-1',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 2
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 2',
  'dailyforex-broker-2',
  'https://example-dailyforex-broker-2.com',
  '/static/images/brokers/dailyforex-broker-2-logo.svg',
  3.8,
  2018,
  'Limassol, Cyprus',
  1,
  30,
  'ECN',
  1,
  0,
  1,
  1,
  0,
  'DailyForex Broker 2 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","Proprietary Platform"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-2',
  'National Futures Association',
  'United States',
  'NFA-631617',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-2',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-137377',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-2',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-578002',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-2',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-2',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-2',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 3
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 3',
  'dailyforex-broker-3',
  'https://example-dailyforex-broker-3.com',
  '/static/images/brokers/dailyforex-broker-3-logo.svg',
  3.2,
  2001,
  'London, UK',
  100,
  400,
  'STP',
  1,
  1,
  0,
  0,
  1,
  'DailyForex Broker 3 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 5","TradingView","Proprietary Platform","MetaTrader 4"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-3',
  'National Futures Association',
  'United States',
  'NFA-164497',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-3',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-3',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-3',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 4
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 4',
  'dailyforex-broker-4',
  'https://example-dailyforex-broker-4.com',
  '/static/images/brokers/dailyforex-broker-4-logo.svg',
  3.9,
  2012,
  'New York, USA',
  1,
  400,
  'Fixed',
  0,
  1,
  0,
  1,
  1,
  'DailyForex Broker 4 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","WebTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-4',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-619652',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-4',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-4',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-4',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 5
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 5',
  'dailyforex-broker-5',
  'https://example-dailyforex-broker-5.com',
  '/static/images/brokers/dailyforex-broker-5-logo.svg',
  4.2,
  2017,
  'London, UK',
  250,
  400,
  'Variable',
  0,
  1,
  1,
  0,
  0,
  'DailyForex Broker 5 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","MetaTrader 5","cTrader","WebTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-5',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-970931',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-5',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-468024',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-5',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-5',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-5',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 6
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 6',
  'dailyforex-broker-6',
  'https://example-dailyforex-broker-6.com',
  '/static/images/brokers/dailyforex-broker-6-logo.svg',
  3.7,
  2023,
  'Limassol, Cyprus',
  10,
  500,
  'Variable',
  1,
  0,
  0,
  1,
  1,
  'DailyForex Broker 6 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","MetaTrader 5"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-6',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-709077',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-6',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-525588',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-6',
  'National Futures Association',
  'United States',
  'NFA-262949',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-6',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-6',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-6',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 7
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 7',
  'dailyforex-broker-7',
  'https://example-dailyforex-broker-7.com',
  '/static/images/brokers/dailyforex-broker-7-logo.svg',
  4.7,
  2016,
  'Limassol, Cyprus',
  250,
  200,
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'DailyForex Broker 7 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["Proprietary Platform","MetaTrader 4","WebTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-7',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-340886',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-7',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-210287',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-7',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-463224',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-7',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-7',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-7',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 8
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 8',
  'dailyforex-broker-8',
  'https://example-dailyforex-broker-8.com',
  '/static/images/brokers/dailyforex-broker-8-logo.svg',
  4.1,
  2001,
  'London, UK',
  100,
  100,
  'STP',
  0,
  1,
  1,
  1,
  1,
  'DailyForex Broker 8 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","Proprietary Platform","cTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-8',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-221527',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-8',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-8',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-8',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 9
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 9',
  'dailyforex-broker-9',
  'https://example-dailyforex-broker-9.com',
  '/static/images/brokers/dailyforex-broker-9-logo.svg',
  4.1,
  2014,
  'Sydney, Australia',
  25,
  400,
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'DailyForex Broker 9 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","TradingView"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-9',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-891154',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-9',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-876468',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-9',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-868183',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-9',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-9',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-9',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 10
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 10',
  'dailyforex-broker-10',
  'https://example-dailyforex-broker-10.com',
  '/static/images/brokers/dailyforex-broker-10-logo.svg',
  4.3,
  2020,
  'London, UK',
  500,
  50,
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'DailyForex Broker 10 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","Proprietary Platform"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-10',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-182362',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-10',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-513210',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-10',
  'National Futures Association',
  'United States',
  'NFA-819019',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-10',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-10',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-10',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 11
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 11',
  'dailyforex-broker-11',
  'https://example-dailyforex-broker-11.com',
  '/static/images/brokers/dailyforex-broker-11-logo.svg',
  4.1,
  2012,
  'London, UK',
  1,
  100,
  'STP',
  1,
  1,
  1,
  0,
  1,
  'DailyForex Broker 11 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","Proprietary Platform","cTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-11',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-734618',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-11',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-11',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-11',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 12
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 12',
  'dailyforex-broker-12',
  'https://example-dailyforex-broker-12.com',
  '/static/images/brokers/dailyforex-broker-12-logo.svg',
  3.1,
  2015,
  'Sydney, Australia',
  25,
  200,
  'ECN',
  0,
  1,
  1,
  0,
  0,
  'DailyForex Broker 12 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","MetaTrader 5","WebTrader","TradingView"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-12',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-802193',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-12',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-473628',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-12',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-720116',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-12',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-12',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-12',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 13
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 13',
  'dailyforex-broker-13',
  'https://example-dailyforex-broker-13.com',
  '/static/images/brokers/dailyforex-broker-13-logo.svg',
  4.2,
  2021,
  'Sydney, Australia',
  1000,
  30,
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'DailyForex Broker 13 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","WebTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-13',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-880071',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-13',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-641160',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-13',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-13',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-13',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: DailyForex Broker 14
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'DailyForex Broker 14',
  'dailyforex-broker-14',
  'https://example-dailyforex-broker-14.com',
  '/static/images/brokers/dailyforex-broker-14-logo.svg',
  3,
  2010,
  'New York, USA',
  1000,
  1000,
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'DailyForex Broker 14 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","TradingView","WebTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'dailyforex-broker-14',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-245276',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-14',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-14',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'dailyforex-broker-14',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 1
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 1',
  'brokerchooser-broker-1',
  'https://example-brokerchooser-broker-1.com',
  '/static/images/brokers/brokerchooser-broker-1-logo.svg',
  4.9,
  2019,
  'New York, USA',
  250,
  100,
  'ECN',
  1,
  1,
  0,
  1,
  1,
  'BrokerChooser Broker 1 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","TradingView","MetaTrader 5"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-1',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-594338',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-1',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-139295',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-1',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-614774',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-1',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-1',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-1',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 2
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 2',
  'brokerchooser-broker-2',
  'https://example-brokerchooser-broker-2.com',
  '/static/images/brokers/brokerchooser-broker-2-logo.svg',
  4.8,
  2003,
  'Sydney, Australia',
  50,
  200,
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'BrokerChooser Broker 2 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","MetaTrader 4","Proprietary Platform","WebTrader"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-2',
  'Commodity Futures Trading Commission',
  'United States',
  'CFTC-152435',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-2',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-2',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-2',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 3
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 3',
  'brokerchooser-broker-3',
  'https://example-brokerchooser-broker-3.com',
  '/static/images/brokers/brokerchooser-broker-3-logo.svg',
  3.3,
  2001,
  'Limassol, Cyprus',
  10,
  100,
  'Variable',
  1,
  1,
  0,
  1,
  0,
  'BrokerChooser Broker 3 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["cTrader","Proprietary Platform"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-3',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-162018',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-3',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-3',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-3',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 4
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 4',
  'brokerchooser-broker-4',
  'https://example-brokerchooser-broker-4.com',
  '/static/images/brokers/brokerchooser-broker-4-logo.svg',
  3.6,
  2003,
  'Sydney, Australia',
  100,
  500,
  'STP',
  1,
  1,
  0,
  0,
  1,
  'BrokerChooser Broker 4 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","TradingView"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-4',
  'Financial Conduct Authority',
  'United Kingdom',
  'FCA-524344',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-4',
  'Australian Securities and Investments Commission',
  'Australia',
  'ASIC-393045',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-4',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-631420',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-4',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-4',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-4',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 5
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 5',
  'brokerchooser-broker-5',
  'https://example-brokerchooser-broker-5.com',
  '/static/images/brokers/brokerchooser-broker-5-logo.svg',
  3.9,
  2010,
  'Limassol, Cyprus',
  10,
  50,
  'STP',
  1,
  1,
  1,
  0,
  1,
  'BrokerChooser Broker 5 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["WebTrader","TradingView","cTrader","MetaTrader 5"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-5',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-904519',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-5',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-5',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-5',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 6
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 6',
  'brokerchooser-broker-6',
  'https://example-brokerchooser-broker-6.com',
  '/static/images/brokers/brokerchooser-broker-6-logo.svg',
  3.7,
  2014,
  'Sydney, Australia',
  25,
  400,
  'ECN',
  1,
  1,
  0,
  1,
  0,
  'BrokerChooser Broker 6 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["MetaTrader 4","TradingView","WebTrader","MetaTrader 5"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-6',
  'Cyprus Securities and Exchange Commission',
  'Cyprus',
  'CySEC-105163',
  'Active'
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-6',
  'National Futures Association',
  'United States',
  'NFA-645427',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-6',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-6',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-6',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);


-- Broker: BrokerChooser Broker 7
INSERT OR REPLACE INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES (
  'BrokerChooser Broker 7',
  'brokerchooser-broker-7',
  'https://example-brokerchooser-broker-7.com',
  '/static/images/brokers/brokerchooser-broker-7-logo.svg',
  3.2,
  2009,
  'Sydney, Australia',
  50,
  100,
  'Variable',
  0,
  1,
  1,
  0,
  1,
  'BrokerChooser Broker 7 is a professional forex and CFD broker offering competitive trading conditions and advanced platforms.',
  '["Competitive spreads","Multiple regulatory licenses","Professional trading platforms","Fast execution speeds","Comprehensive market analysis"]',
  '["Limited educational resources","Inactivity fees apply","Minimum deposit requirement"]',
  '["TradingView","MetaTrader 4","MetaTrader 5","WebTrader"]',
  'https://brokerchooser.com/',
  datetime('now')
);

INSERT OR REPLACE INTO broker_regulation (
  broker_slug, regulator_name, jurisdiction, license_number, status
) VALUES (
  'brokerchooser-broker-7',
  'National Futures Association',
  'United States',
  'NFA-886447',
  'Active'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-7',
  'EUR/USD',
  1.2,
  0.8,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-7',
  'GBP/USD',
  1.5,
  1,
  'Standard'
);

INSERT OR REPLACE INTO broker_spreads (
  broker_slug, currency_pair, spread_typical, spread_min, account_type
) VALUES (
  'brokerchooser-broker-7',
  'USD/JPY',
  1.3,
  0.9,
  'Standard'
);

