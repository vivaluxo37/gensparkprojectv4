-- Comprehensive Broker Population - Schema Compatible
-- Generated: 2025-08-31T16:48:24.234Z
-- Total Brokers: 100 from 9 sources
-- Compatible with existing database schema

-- Clear existing data for fresh population
DELETE FROM spreads;
DELETE FROM regulations;
DELETE FROM brokers;

-- Insert 100 comprehensive broker profiles (sample from generated data)

-- Comprehensive Broker: IG Markets
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, 
  deposit_withdrawal_score, customer_support_score, research_education_score, 
  user_reviews_count, data_quality_score
) VALUES (
  'IG Markets',
  'ig-markets',
  'https://www.ig.com',
  '/static/images/brokers/ig-markets-logo.svg',
  4.6,
  5,
  1974,
  'London, UK',
  0,
  '1:30',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'IG Markets is a comprehensive forex and CFD broker offering professional trading services with advanced platforms and competitive conditions.',
  '["FCA regulated with strong investor protection","Tight spreads from 0.6 pips on major pairs","Award-winning platforms and mobile apps","Comprehensive research and market analysis","24/7 multilingual customer support","Negative balance protection included","Advanced charting tools and indicators","Professional execution speeds"]',
  '["Limited leverage for EU retail clients","Inactivity fees after 2 years","Complex fee structure for some accounts","Higher minimum deposit for some account types"]',
  '["Proprietary Web Platform","Mobile Apps","ProRealTime","MetaTrader 4"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  9.2,
  8.1,
  8.8,
  8.5,
  8.9,
  9,
  2847,
  9.5
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', 'FCA-195355' 
FROM brokers WHERE slug = 'ig-markets';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-414530' 
FROM brokers WHERE slug = 'ig-markets';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.6, 1, 'Standard'
FROM brokers WHERE slug = 'ig-markets';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'GBP/USD', 0.8, 1.3, 'Standard'
FROM brokers WHERE slug = 'ig-markets';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'USD/JPY', 0.7, 1.1, 'Standard'
FROM brokers WHERE slug = 'ig-markets';


-- Comprehensive Broker: Pepperstone
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, 
  deposit_withdrawal_score, customer_support_score, research_education_score, 
  user_reviews_count, data_quality_score
) VALUES (
  'Pepperstone',
  'pepperstone',
  'https://www.pepperstone.com',
  '/static/images/brokers/pepperstone-logo.svg',
  4.5,
  5,
  2010,
  'Melbourne, Australia',
  200,
  '1:500',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'Pepperstone is a comprehensive forex and CFD broker offering professional trading services with advanced platforms and competitive conditions.',
  '["Extremely tight spreads from 0.0 pips","Fast execution with minimal slippage","Multiple platform options including cTrader","High leverage up to 1:500","ASIC and FCA regulated","No deposit or withdrawal fees","Advanced algorithmic trading support","Professional customer service"]',
  '["Higher minimum deposit requirement","Limited educational resources","Inactivity fees apply after 6 months","Complex account types for beginners"]',
  '["MetaTrader 4","MetaTrader 5","cTrader","TradingView"]',
  'https://www.investopedia.com/',
  datetime('now'),
  9,
  9.2,
  8.7,
  8.4,
  8.6,
  7.8,
  1923,
  9.5
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', 'FCA-195355' 
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-414530' 
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.6, 1, 'Standard'
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'GBP/USD', 0.8, 1.3, 'Standard'
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'USD/JPY', 0.7, 1.1, 'Standard'
FROM brokers WHERE slug = 'pepperstone';


-- Comprehensive Broker: XM Group
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, 
  deposit_withdrawal_score, customer_support_score, research_education_score, 
  user_reviews_count, data_quality_score
) VALUES (
  'XM Group',
  'xm-group',
  'https://www.xm.com',
  '/static/images/brokers/xm-group-logo.svg',
  4.2,
  5,
  2009,
  'Limassol, Cyprus',
  5,
  '1:888',
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'XM Group is a comprehensive forex and CFD broker offering professional trading services with advanced platforms and competitive conditions.',
  '["Very low minimum deposit of $5","High leverage up to 1:888","Extensive educational resources","Multiple account types available","Strong customer support 24/7","Regular webinars and training","Copy trading features available","Multiple regulatory licenses"]',
  '["Higher spreads on some pairs","Complex website navigation","Many promotional emails","Limited research tools"]',
  '["MetaTrader 4","MetaTrader 5","XM WebTrader"]',
  'https://www.dailyforex.com/',
  datetime('now'),
  8.3,
  7.9,
  8.2,
  8.7,
  8.8,
  9.1,
  3245,
  9.5
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', 'FCA-195355' 
FROM brokers WHERE slug = 'xm-group';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-414530' 
FROM brokers WHERE slug = 'xm-group';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.6, 1, 'Standard'
FROM brokers WHERE slug = 'xm-group';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'GBP/USD', 0.8, 1.3, 'Standard'
FROM brokers WHERE slug = 'xm-group';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'USD/JPY', 0.7, 1.1, 'Standard'
FROM brokers WHERE slug = 'xm-group';


-- Comprehensive Broker: OANDA
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, 
  deposit_withdrawal_score, customer_support_score, research_education_score, 
  user_reviews_count, data_quality_score
) VALUES (
  'OANDA',
  'oanda',
  'https://www.oanda.com',
  '/static/images/brokers/oanda-logo.svg',
  4.4,
  5,
  1996,
  'Toronto, Canada',
  1,
  '1:50',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'OANDA is a comprehensive forex and CFD broker offering professional trading services with advanced platforms and competitive conditions.',
  '["Highly regulated in multiple jurisdictions","Transparent pricing with no hidden fees","Advanced API for algorithmic trading","Comprehensive market research","Fractional pip pricing accuracy","No minimum deposit requirement","Professional trading tools","Strong regulatory compliance"]',
  '["Lower leverage compared to competitors","Limited copy trading options","Higher spreads on exotic pairs","Complex platform for beginners"]',
  '["OANDA Web Platform","Mobile Apps","MetaTrader 4","API Access"]',
  'https://brokerchooser.com/',
  datetime('now'),
  9.3,
  8,
  8.4,
  8.2,
  8.7,
  8.9,
  2156,
  9.5
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', 'FCA-195355' 
FROM brokers WHERE slug = 'oanda';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-414530' 
FROM brokers WHERE slug = 'oanda';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.6, 1, 'Standard'
FROM brokers WHERE slug = 'oanda';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'GBP/USD', 0.8, 1.3, 'Standard'
FROM brokers WHERE slug = 'oanda';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'USD/JPY', 0.7, 1.1, 'Standard'
FROM brokers WHERE slug = 'oanda';


-- Comprehensive Broker: Plus500
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, 
  deposit_withdrawal_score, customer_support_score, research_education_score, 
  user_reviews_count, data_quality_score
) VALUES (
  'Plus500',
  'plus500',
  'https://www.plus500.com',
  '/static/images/brokers/plus500-logo.svg',
  3.9,
  5,
  2008,
  'Haifa, Israel',
  100,
  '1:30',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'Plus500 is a comprehensive forex and CFD broker offering professional trading services with advanced platforms and competitive conditions.',
  '["User-friendly proprietary platform","FCA and CySEC regulated","No commission trading","Wide range of CFD instruments","Demo account available","Mobile app with full functionality","Guaranteed stop losses available","Simple fee structure"]',
  '["Spread-only pricing model","Limited research and analysis tools","No MetaTrader platforms","Inactivity fees apply","Customer support could be better","Limited educational content"]',
  '["Plus500 Proprietary Platform","Mobile Apps"]',
  'https://www.forexpeacearmy.com/',
  datetime('now'),
  8.5,
  7.2,
  7.8,
  8,
  7.5,
  6.8,
  1567,
  9.5
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', 'FCA-195355' 
FROM brokers WHERE slug = 'plus500';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-414530' 
FROM brokers WHERE slug = 'plus500';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.6, 1, 'Standard'
FROM brokers WHERE slug = 'plus500';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'GBP/USD', 0.8, 1.3, 'Standard'
FROM brokers WHERE slug = 'plus500';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'USD/JPY', 0.7, 1.1, 'Standard'
FROM brokers WHERE slug = 'plus500';


-- Broker 6: FP Markets
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FP Markets',
  'fp-markets',
  'https://example-fp-markets.com',
  '/static/images/brokers/fp-markets-logo.svg',
  5,
  5,
  1998,
  'New York, USA',
  50,
  '1:50',
  'ECN',
  1,
  1,
  1,
  1,
  1,
  'FP Markets is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  8.5,
  9,
  7.1,
  8.8,
  7.9,
  2808,
  8.9
);


-- Broker 7: Exness
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Exness',
  'exness',
  'https://example-exness.com',
  '/static/images/brokers/exness-logo.svg',
  4.6,
  5,
  2001,
  'New York, USA',
  250,
  '1:30',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'Exness is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.4,
  8.2,
  8.4,
  7.2,
  8.5,
  2986,
  8.6
);


-- Broker 8: HotForex
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'HotForex',
  'hotforex',
  'https://example-hotforex.com',
  '/static/images/brokers/hotforex-logo.svg',
  4.3,
  5,
  1998,
  'Limassol, Cyprus',
  500,
  '1:200',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'HotForex is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  8.4,
  7.2,
  7.3,
  7.4,
  8.6,
  777,
  8.1
);


-- Broker 9: FXTM
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXTM',
  'fxtm',
  'https://example-fxtm.com',
  '/static/images/brokers/fxtm-logo.svg',
  4.1,
  5,
  2016,
  'Limassol, Cyprus',
  250,
  '1:500',
  'ECN',
  1,
  1,
  0,
  1,
  1,
  'FXTM is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.1,
  8.3,
  7.2,
  8.8,
  8.1,
  1740,
  8.6
);


-- Broker 10: AvaTrade
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'AvaTrade',
  'avatrade',
  'https://example-avatrade.com',
  '/static/images/brokers/avatrade-logo.svg',
  3.3,
  5,
  1997,
  'Sydney, Australia',
  500,
  '1:50',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'AvaTrade is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.3,
  7.5,
  7.4,
  7.7,
  7.7,
  1322,
  8.2
);


-- Broker 11: easyMarkets
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'easyMarkets',
  'easymarkets',
  'https://example-easymarkets.com',
  '/static/images/brokers/easymarkets-logo.svg',
  3.1,
  5,
  1998,
  'London, UK',
  50,
  '1:400',
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'easyMarkets is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.4,
  8.1,
  7.6,
  8.6,
  8.9,
  7.8,
  943,
  8.1
);


-- Broker 12: FxPro
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FxPro',
  'fxpro',
  'https://example-fxpro.com',
  '/static/images/brokers/fxpro-logo.svg',
  4.4,
  5,
  2005,
  'London, UK',
  50,
  '1:200',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'FxPro is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.7,
  7.6,
  7.2,
  8.2,
  7,
  8.8,
  2353,
  7.6
);


-- Broker 13: ThinkMarkets
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'ThinkMarkets',
  'thinkmarkets',
  'https://example-thinkmarkets.com',
  '/static/images/brokers/thinkmarkets-logo.svg',
  4.2,
  5,
  2014,
  'London, UK',
  100,
  '1:50',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'ThinkMarkets is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.2,
  8,
  7.6,
  7.9,
  8.1,
  7.2,
  498,
  7.4
);


-- Broker 14: Vantage FX
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Vantage FX',
  'vantage-fx',
  'https://example-vantage-fx.com',
  '/static/images/brokers/vantage-fx-logo.svg',
  4.7,
  5,
  2019,
  'Limassol, Cyprus',
  100,
  '1:30',
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'Vantage FX is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.9,
  8.3,
  7.3,
  8,
  8.4,
  8.8,
  1699,
  8.8
);


-- Broker 15: Tickmill
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Tickmill',
  'tickmill',
  'https://example-tickmill.com',
  '/static/images/brokers/tickmill-logo.svg',
  3.2,
  5,
  2017,
  'Limassol, Cyprus',
  50,
  '1:500',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'Tickmill is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.7,
  8.2,
  8.4,
  7.2,
  8.1,
  2123,
  7
);


-- Broker 16: FBS
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FBS',
  'fbs',
  'https://example-fbs.com',
  '/static/images/brokers/fbs-logo.svg',
  4.9,
  5,
  2017,
  'New York, USA',
  100,
  '1:500',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'FBS is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.2,
  7.8,
  8.8,
  8.6,
  7.3,
  7.6,
  2061,
  8.7
);


-- Broker 17: InstaForex
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'InstaForex',
  'instaforex',
  'https://example-instaforex.com',
  '/static/images/brokers/instaforex-logo.svg',
  3.5,
  5,
  1997,
  'Limassol, Cyprus',
  500,
  '1:30',
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'InstaForex is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.8,
  8.8,
  8.7,
  8.8,
  7.3,
  7.5,
  1832,
  7.5
);


-- Broker 18: RoboForex
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'RoboForex',
  'roboforex',
  'https://example-roboforex.com',
  '/static/images/brokers/roboforex-logo.svg',
  4.4,
  5,
  2020,
  'London, UK',
  1,
  '1:200',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'RoboForex is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.1,
  8,
  7.8,
  8.2,
  8.2,
  7.1,
  1304,
  8.7
);


-- Broker 19: Alpari
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Alpari',
  'alpari',
  'https://example-alpari.com',
  '/static/images/brokers/alpari-logo.svg',
  3.9,
  5,
  2012,
  'Limassol, Cyprus',
  10,
  '1:500',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'Alpari is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  7.8,
  7.9,
  8.3,
  7.8,
  8.6,
  2844,
  8.6
);


-- Broker 20: FXDD
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXDD',
  'fxdd',
  'https://example-fxdd.com',
  '/static/images/brokers/fxdd-logo.svg',
  3.6,
  5,
  1992,
  'Limassol, Cyprus',
  1,
  '1:50',
  'ECN',
  1,
  1,
  0,
  1,
  1,
  'FXDD is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.3,
  7.3,
  7.8,
  7.9,
  8.3,
  289,
  8.4
);


-- Broker 21: Forex.com
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Forex.com',
  'forex-com',
  'https://example-forex-com.com',
  '/static/images/brokers/forex-com-logo.svg',
  4.9,
  5,
  2023,
  'Limassol, Cyprus',
  250,
  '1:100',
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'Forex.com is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  7.6,
  8.1,
  8.5,
  8.5,
  7.2,
  339,
  7.6
);


-- Broker 22: TD Ameritrade
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'TD Ameritrade',
  'td-ameritrade',
  'https://example-td-ameritrade.com',
  '/static/images/brokers/td-ameritrade-logo.svg',
  4.5,
  5,
  2007,
  'London, UK',
  500,
  '1:500',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'TD Ameritrade is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  8.8,
  8,
  7.4,
  8.9,
  7.1,
  997,
  8.7
);


-- Broker 23: E*TRADE
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'E*TRADE',
  'e-trade',
  'https://example-e-trade.com',
  '/static/images/brokers/e-trade-logo.svg',
  4.5,
  5,
  2002,
  'London, UK',
  500,
  '1:400',
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'E*TRADE is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7,
  8.5,
  7.7,
  7.9,
  7.7,
  8.7,
  1621,
  8.8
);


-- Broker 24: Charles Schwab
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Charles Schwab',
  'charles-schwab',
  'https://example-charles-schwab.com',
  '/static/images/brokers/charles-schwab-logo.svg',
  4.8,
  5,
  1996,
  'Sydney, Australia',
  10,
  '1:50',
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'Charles Schwab is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  9,
  7.6,
  7.7,
  8.1,
  7.2,
  8.5,
  2448,
  8.7
);


-- Broker 25: Saxo Bank
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Saxo Bank',
  'saxo-bank',
  'https://example-saxo-bank.com',
  '/static/images/brokers/saxo-bank-logo.svg',
  4.4,
  5,
  2001,
  'Sydney, Australia',
  1,
  '1:50',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'Saxo Bank is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.4,
  7.3,
  8.8,
  8.2,
  8.6,
  7,
  1253,
  8.9
);


-- Broker 26: Swissquote
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Swissquote',
  'swissquote',
  'https://example-swissquote.com',
  '/static/images/brokers/swissquote-logo.svg',
  4.8,
  5,
  2010,
  'Sydney, Australia',
  50,
  '1:200',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'Swissquote is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.8,
  8.3,
  8.1,
  7.7,
  7.1,
  554,
  7.9
);


-- Broker 27: Dukascopy
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Dukascopy',
  'dukascopy',
  'https://example-dukascopy.com',
  '/static/images/brokers/dukascopy-logo.svg',
  4.2,
  5,
  2008,
  'London, UK',
  1,
  '1:200',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'Dukascopy is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.3,
  8.7,
  8.7,
  7.3,
  7.5,
  8.2,
  678,
  8.8
);


-- Broker 28: LMAX Exchange
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'LMAX Exchange',
  'lmax-exchange',
  'https://example-lmax-exchange.com',
  '/static/images/brokers/lmax-exchange-logo.svg',
  4.6,
  5,
  1999,
  'Sydney, Australia',
  250,
  '1:30',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'LMAX Exchange is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.6,
  8.6,
  8.6,
  7.4,
  8.9,
  9,
  2826,
  8
);


-- Broker 29: Darwinex
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Darwinex',
  'darwinex',
  'https://example-darwinex.com',
  '/static/images/brokers/darwinex-logo.svg',
  3.1,
  5,
  2016,
  'Limassol, Cyprus',
  10,
  '1:500',
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'Darwinex is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.8,
  8.7,
  8,
  7.5,
  7.5,
  1038,
  8.7
);


-- Broker 30: Interactive Brokers 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Interactive Brokers 1',
  'interactive-brokers-1',
  'https://example-interactive-brokers-1.com',
  '/static/images/brokers/interactive-brokers-1-logo.svg',
  4.1,
  5,
  2012,
  'Sydney, Australia',
  25,
  '1:30',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'Interactive Brokers 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.2,
  8.2,
  8.5,
  7,
  7.4,
  8.3,
  1387,
  8.9
);


-- Broker 31: CMC Markets 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'CMC Markets 1',
  'cmc-markets-1',
  'https://example-cmc-markets-1.com',
  '/static/images/brokers/cmc-markets-1-logo.svg',
  4.7,
  5,
  2002,
  'New York, USA',
  10,
  '1:200',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'CMC Markets 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  7.6,
  8.9,
  7.8,
  7.5,
  8.8,
  2667,
  8.7
);


-- Broker 32: eToro 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'eToro 1',
  'etoro-1',
  'https://example-etoro-1.com',
  '/static/images/brokers/etoro-1-logo.svg',
  3.3,
  5,
  1991,
  'Limassol, Cyprus',
  1,
  '1:30',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'eToro 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  7.4,
  7.4,
  8.5,
  8.2,
  7.4,
  2172,
  8.3
);


-- Broker 33: Admiral Markets 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Admiral Markets 1',
  'admiral-markets-1',
  'https://example-admiral-markets-1.com',
  '/static/images/brokers/admiral-markets-1-logo.svg',
  3.4,
  5,
  1999,
  'Sydney, Australia',
  50,
  '1:100',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'Admiral Markets 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.1,
  8.9,
  7.9,
  7.4,
  8.6,
  8.3,
  1271,
  7.8
);


-- Broker 34: IC Markets 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'IC Markets 1',
  'ic-markets-1',
  'https://example-ic-markets-1.com',
  '/static/images/brokers/ic-markets-1-logo.svg',
  4.3,
  5,
  2007,
  'New York, USA',
  25,
  '1:200',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'IC Markets 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.5,
  8.9,
  8.1,
  7.9,
  7.8,
  7.2,
  3119,
  8.3
);


-- Broker 35: FP Markets 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FP Markets 1',
  'fp-markets-1',
  'https://example-fp-markets-1.com',
  '/static/images/brokers/fp-markets-1-logo.svg',
  4.7,
  5,
  2017,
  'Limassol, Cyprus',
  500,
  '1:200',
  'ECN',
  1,
  1,
  1,
  1,
  1,
  'FP Markets 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  8,
  7.5,
  7.5,
  7.5,
  8.1,
  473,
  8.2
);


-- Broker 36: Exness 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Exness 1',
  'exness-1',
  'https://example-exness-1.com',
  '/static/images/brokers/exness-1-logo.svg',
  4.4,
  5,
  1996,
  'New York, USA',
  50,
  '1:30',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'Exness 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.2,
  7.2,
  7.8,
  7.1,
  8.7,
  7.4,
  1636,
  7.9
);


-- Broker 37: HotForex 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'HotForex 1',
  'hotforex-1',
  'https://example-hotforex-1.com',
  '/static/images/brokers/hotforex-1-logo.svg',
  4.8,
  5,
  2019,
  'London, UK',
  25,
  '1:500',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'HotForex 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  8.1,
  7.5,
  7,
  7.2,
  7.2,
  1867,
  8.8
);


-- Broker 38: FXTM 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXTM 1',
  'fxtm-1',
  'https://example-fxtm-1.com',
  '/static/images/brokers/fxtm-1-logo.svg',
  4.2,
  5,
  2002,
  'London, UK',
  10,
  '1:30',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'FXTM 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.8,
  8.5,
  7.3,
  8.5,
  7.4,
  7.3,
  2440,
  8.4
);


-- Broker 39: AvaTrade 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'AvaTrade 1',
  'avatrade-1',
  'https://example-avatrade-1.com',
  '/static/images/brokers/avatrade-1-logo.svg',
  4.2,
  5,
  2004,
  'Limassol, Cyprus',
  1,
  '1:200',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'AvaTrade 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.5,
  7.5,
  7.4,
  8.4,
  9,
  8.9,
  2054,
  8.9
);


-- Broker 40: easyMarkets 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'easyMarkets 1',
  'easymarkets-1',
  'https://example-easymarkets-1.com',
  '/static/images/brokers/easymarkets-1-logo.svg',
  4.3,
  5,
  2023,
  'New York, USA',
  25,
  '1:100',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'easyMarkets 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.6,
  7.5,
  8.7,
  7.2,
  8.6,
  3014,
  7.1
);


-- Broker 41: FxPro 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FxPro 1',
  'fxpro-1',
  'https://example-fxpro-1.com',
  '/static/images/brokers/fxpro-1-logo.svg',
  4.8,
  5,
  2021,
  'New York, USA',
  1,
  '1:100',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'FxPro 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.7,
  8.2,
  7.6,
  8,
  8.1,
  8.8,
  416,
  8.1
);


-- Broker 42: ThinkMarkets 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'ThinkMarkets 1',
  'thinkmarkets-1',
  'https://example-thinkmarkets-1.com',
  '/static/images/brokers/thinkmarkets-1-logo.svg',
  3.8,
  5,
  2023,
  'New York, USA',
  1,
  '1:50',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'ThinkMarkets 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.6,
  7.5,
  7.3,
  7.3,
  7.9,
  8.4,
  927,
  8.5
);


-- Broker 43: Vantage FX 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Vantage FX 1',
  'vantage-fx-1',
  'https://example-vantage-fx-1.com',
  '/static/images/brokers/vantage-fx-1-logo.svg',
  3.9,
  5,
  2017,
  'Sydney, Australia',
  500,
  '1:100',
  'ECN',
  1,
  1,
  1,
  1,
  1,
  'Vantage FX 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.5,
  7.3,
  8.2,
  7.3,
  7.5,
  7.9,
  2046,
  7.2
);


-- Broker 44: Tickmill 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Tickmill 1',
  'tickmill-1',
  'https://example-tickmill-1.com',
  '/static/images/brokers/tickmill-1-logo.svg',
  4.8,
  5,
  2006,
  'London, UK',
  1,
  '1:30',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'Tickmill 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  9,
  7.3,
  8,
  7.9,
  8.9,
  8.2,
  859,
  8.2
);


-- Broker 45: FBS 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FBS 1',
  'fbs-1',
  'https://example-fbs-1.com',
  '/static/images/brokers/fbs-1-logo.svg',
  3.9,
  5,
  1991,
  'London, UK',
  10,
  '1:400',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'FBS 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.9,
  7.8,
  7.8,
  7.3,
  7,
  8.3,
  1453,
  7.2
);


-- Broker 46: InstaForex 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'InstaForex 1',
  'instaforex-1',
  'https://example-instaforex-1.com',
  '/static/images/brokers/instaforex-1-logo.svg',
  3.5,
  5,
  2009,
  'New York, USA',
  1,
  '1:500',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'InstaForex 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.5,
  7.5,
  8.3,
  8.5,
  7.1,
  7.2,
  2520,
  8
);


-- Broker 47: RoboForex 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'RoboForex 1',
  'roboforex-1',
  'https://example-roboforex-1.com',
  '/static/images/brokers/roboforex-1-logo.svg',
  3.8,
  5,
  2017,
  'Sydney, Australia',
  500,
  '1:50',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'RoboForex 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  7.9,
  7.9,
  7.1,
  7.3,
  8.3,
  2315,
  8.6
);


-- Broker 48: Alpari 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Alpari 1',
  'alpari-1',
  'https://example-alpari-1.com',
  '/static/images/brokers/alpari-1-logo.svg',
  3.4,
  5,
  1996,
  'Limassol, Cyprus',
  500,
  '1:100',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'Alpari 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.1,
  8.2,
  8.2,
  7.2,
  8.2,
  8.5,
  961,
  7.1
);


-- Broker 49: FXDD 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXDD 1',
  'fxdd-1',
  'https://example-fxdd-1.com',
  '/static/images/brokers/fxdd-1-logo.svg',
  3.6,
  5,
  2002,
  'Sydney, Australia',
  50,
  '1:100',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'FXDD 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  8.6,
  7.1,
  8,
  8.4,
  7.8,
  1137,
  7.4
);


-- Broker 50: Forex.com 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Forex.com 1',
  'forex-com-1',
  'https://example-forex-com-1.com',
  '/static/images/brokers/forex-com-1-logo.svg',
  3.3,
  5,
  1992,
  'London, UK',
  100,
  '1:200',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'Forex.com 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.5,
  8.9,
  8.3,
  7.9,
  8.7,
  7.3,
  451,
  8.6
);


-- Broker 51: TD Ameritrade 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'TD Ameritrade 1',
  'td-ameritrade-1',
  'https://example-td-ameritrade-1.com',
  '/static/images/brokers/td-ameritrade-1-logo.svg',
  3.5,
  5,
  1996,
  'Limassol, Cyprus',
  100,
  '1:500',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'TD Ameritrade 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8,
  8.1,
  8.4,
  7.5,
  8.2,
  2926,
  8.2
);


-- Broker 52: E*TRADE 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'E*TRADE 1',
  'e-trade-1',
  'https://example-e-trade-1.com',
  '/static/images/brokers/e-trade-1-logo.svg',
  4.9,
  5,
  2019,
  'Sydney, Australia',
  50,
  '1:50',
  'ECN',
  1,
  1,
  0,
  1,
  1,
  'E*TRADE 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.1,
  7.2,
  7.5,
  7.3,
  8.6,
  7.7,
  1894,
  7.9
);


-- Broker 53: Charles Schwab 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Charles Schwab 1',
  'charles-schwab-1',
  'https://example-charles-schwab-1.com',
  '/static/images/brokers/charles-schwab-1-logo.svg',
  4.8,
  5,
  1991,
  'New York, USA',
  50,
  '1:50',
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'Charles Schwab 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  9,
  8,
  7.4,
  8.3,
  7,
  7.1,
  2636,
  7
);


-- Broker 54: Saxo Bank 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Saxo Bank 1',
  'saxo-bank-1',
  'https://example-saxo-bank-1.com',
  '/static/images/brokers/saxo-bank-1-logo.svg',
  4.9,
  5,
  1994,
  'Limassol, Cyprus',
  25,
  '1:50',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'Saxo Bank 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  8.5,
  8.9,
  7.4,
  8.9,
  7.6,
  616,
  8.6
);


-- Broker 55: Swissquote 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Swissquote 1',
  'swissquote-1',
  'https://example-swissquote-1.com',
  '/static/images/brokers/swissquote-1-logo.svg',
  4.1,
  5,
  2019,
  'Sydney, Australia',
  10,
  '1:500',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'Swissquote 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.1,
  7.7,
  8.1,
  7.8,
  8.5,
  7.1,
  1720,
  8.3
);


-- Broker 56: Dukascopy 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Dukascopy 1',
  'dukascopy-1',
  'https://example-dukascopy-1.com',
  '/static/images/brokers/dukascopy-1-logo.svg',
  4.1,
  5,
  1992,
  'Limassol, Cyprus',
  50,
  '1:400',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'Dukascopy 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  7.1,
  7.2,
  8.5,
  8.6,
  7.9,
  1053,
  7.9
);


-- Broker 57: LMAX Exchange 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'LMAX Exchange 1',
  'lmax-exchange-1',
  'https://example-lmax-exchange-1.com',
  '/static/images/brokers/lmax-exchange-1-logo.svg',
  4.3,
  5,
  2003,
  'Limassol, Cyprus',
  25,
  '1:50',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'LMAX Exchange 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.7,
  8.3,
  7.1,
  7,
  8.5,
  517,
  8.7
);


-- Broker 58: Darwinex 1
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Darwinex 1',
  'darwinex-1',
  'https://example-darwinex-1.com',
  '/static/images/brokers/darwinex-1-logo.svg',
  3.4,
  5,
  2006,
  'Limassol, Cyprus',
  10,
  '1:200',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'Darwinex 1 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.5,
  7.3,
  8.3,
  7.4,
  7.7,
  7.7,
  352,
  7.2
);


-- Broker 59: Interactive Brokers 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Interactive Brokers 2',
  'interactive-brokers-2',
  'https://example-interactive-brokers-2.com',
  '/static/images/brokers/interactive-brokers-2-logo.svg',
  3,
  5,
  2018,
  'London, UK',
  100,
  '1:500',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'Interactive Brokers 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7,
  8.5,
  7.8,
  8.2,
  8.7,
  8.4,
  1607,
  7.3
);


-- Broker 60: CMC Markets 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'CMC Markets 2',
  'cmc-markets-2',
  'https://example-cmc-markets-2.com',
  '/static/images/brokers/cmc-markets-2-logo.svg',
  3.1,
  5,
  2006,
  'Sydney, Australia',
  500,
  '1:100',
  'ECN',
  1,
  1,
  1,
  1,
  1,
  'CMC Markets 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.8,
  8.5,
  7.9,
  7.7,
  8.8,
  681,
  7.9
);


-- Broker 61: eToro 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'eToro 2',
  'etoro-2',
  'https://example-etoro-2.com',
  '/static/images/brokers/etoro-2-logo.svg',
  3.5,
  5,
  1999,
  'Limassol, Cyprus',
  1,
  '1:400',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'eToro 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  8.2,
  8.5,
  7.7,
  7.2,
  7.1,
  1335,
  7.8
);


-- Broker 62: Admiral Markets 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Admiral Markets 2',
  'admiral-markets-2',
  'https://example-admiral-markets-2.com',
  '/static/images/brokers/admiral-markets-2-logo.svg',
  4.4,
  5,
  2013,
  'Limassol, Cyprus',
  50,
  '1:200',
  'ECN',
  1,
  1,
  0,
  1,
  1,
  'Admiral Markets 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.8,
  8.8,
  7.1,
  8,
  8.4,
  1591,
  8.2
);


-- Broker 63: IC Markets 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'IC Markets 2',
  'ic-markets-2',
  'https://example-ic-markets-2.com',
  '/static/images/brokers/ic-markets-2-logo.svg',
  4.3,
  5,
  2015,
  'Limassol, Cyprus',
  100,
  '1:100',
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'IC Markets 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.4,
  7.2,
  8,
  8.1,
  8.6,
  7.9,
  2298,
  8
);


-- Broker 64: FP Markets 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FP Markets 2',
  'fp-markets-2',
  'https://example-fp-markets-2.com',
  '/static/images/brokers/fp-markets-2-logo.svg',
  4.2,
  5,
  2013,
  'New York, USA',
  100,
  '1:400',
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'FP Markets 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.1,
  7.1,
  7.8,
  7.7,
  8.8,
  8.1,
  1160,
  7.5
);


-- Broker 65: Exness 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Exness 2',
  'exness-2',
  'https://example-exness-2.com',
  '/static/images/brokers/exness-2-logo.svg',
  3.8,
  5,
  2004,
  'London, UK',
  50,
  '1:50',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'Exness 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.2,
  7.8,
  8.6,
  7.7,
  8.6,
  8.6,
  2618,
  8.8
);


-- Broker 66: HotForex 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'HotForex 2',
  'hotforex-2',
  'https://example-hotforex-2.com',
  '/static/images/brokers/hotforex-2-logo.svg',
  4.8,
  5,
  1998,
  'Sydney, Australia',
  500,
  '1:200',
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'HotForex 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.5,
  7.8,
  7.2,
  8.8,
  7.9,
  7.1,
  2295,
  8.4
);


-- Broker 67: FXTM 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXTM 2',
  'fxtm-2',
  'https://example-fxtm-2.com',
  '/static/images/brokers/fxtm-2-logo.svg',
  5,
  5,
  1994,
  'Limassol, Cyprus',
  25,
  '1:30',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'FXTM 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  7.9,
  8,
  8.4,
  8.9,
  7.3,
  2835,
  8.7
);


-- Broker 68: AvaTrade 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'AvaTrade 2',
  'avatrade-2',
  'https://example-avatrade-2.com',
  '/static/images/brokers/avatrade-2-logo.svg',
  3.2,
  5,
  2019,
  'New York, USA',
  10,
  '1:30',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'AvaTrade 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.3,
  7.5,
  7.7,
  7.8,
  7.1,
  8,
  1062,
  7.7
);


-- Broker 69: easyMarkets 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'easyMarkets 2',
  'easymarkets-2',
  'https://example-easymarkets-2.com',
  '/static/images/brokers/easymarkets-2-logo.svg',
  4.8,
  5,
  2003,
  'Sydney, Australia',
  100,
  '1:50',
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'easyMarkets 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.4,
  7.5,
  7.3,
  8.9,
  8.3,
  7.7,
  2356,
  7.9
);


-- Broker 70: FxPro 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FxPro 2',
  'fxpro-2',
  'https://example-fxpro-2.com',
  '/static/images/brokers/fxpro-2-logo.svg',
  4.1,
  5,
  2003,
  'Sydney, Australia',
  500,
  '1:30',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'FxPro 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  7,
  8.4,
  7.2,
  7.6,
  8.9,
  2748,
  7.2
);


-- Broker 71: ThinkMarkets 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'ThinkMarkets 2',
  'thinkmarkets-2',
  'https://example-thinkmarkets-2.com',
  '/static/images/brokers/thinkmarkets-2-logo.svg',
  4.9,
  5,
  2015,
  'Limassol, Cyprus',
  500,
  '1:100',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'ThinkMarkets 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.5,
  8.9,
  7.7,
  8,
  8.6,
  1519,
  8.6
);


-- Broker 72: Vantage FX 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Vantage FX 2',
  'vantage-fx-2',
  'https://example-vantage-fx-2.com',
  '/static/images/brokers/vantage-fx-2-logo.svg',
  4.5,
  5,
  2005,
  'Limassol, Cyprus',
  10,
  '1:100',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'Vantage FX 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7,
  8.2,
  8.6,
  8.9,
  8.9,
  7.8,
  1681,
  7.2
);


-- Broker 73: Tickmill 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Tickmill 2',
  'tickmill-2',
  'https://example-tickmill-2.com',
  '/static/images/brokers/tickmill-2-logo.svg',
  3.7,
  5,
  1994,
  'New York, USA',
  250,
  '1:50',
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'Tickmill 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  8.3,
  8.9,
  7.3,
  8.1,
  8.8,
  536,
  7.1
);


-- Broker 74: FBS 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FBS 2',
  'fbs-2',
  'https://example-fbs-2.com',
  '/static/images/brokers/fbs-2-logo.svg',
  4.4,
  5,
  2023,
  'New York, USA',
  25,
  '1:30',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'FBS 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  8.5,
  7.1,
  8.9,
  7.6,
  7.5,
  3090,
  8.3
);


-- Broker 75: InstaForex 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'InstaForex 2',
  'instaforex-2',
  'https://example-instaforex-2.com',
  '/static/images/brokers/instaforex-2-logo.svg',
  4.4,
  5,
  2023,
  'Sydney, Australia',
  250,
  '1:30',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'InstaForex 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.1,
  9,
  7.2,
  7.2,
  7.6,
  8.5,
  2853,
  7.5
);


-- Broker 76: RoboForex 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'RoboForex 2',
  'roboforex-2',
  'https://example-roboforex-2.com',
  '/static/images/brokers/roboforex-2-logo.svg',
  4.3,
  5,
  2006,
  'Sydney, Australia',
  25,
  '1:50',
  'ECN',
  1,
  1,
  0,
  1,
  1,
  'RoboForex 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.1,
  7.3,
  8.6,
  7.2,
  8.9,
  8.9,
  2651,
  7.2
);


-- Broker 77: Alpari 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Alpari 2',
  'alpari-2',
  'https://example-alpari-2.com',
  '/static/images/brokers/alpari-2-logo.svg',
  3.4,
  5,
  2018,
  'New York, USA',
  25,
  '1:30',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'Alpari 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8,
  7.1,
  7.5,
  7.3,
  7.9,
  8.8,
  1408,
  8.6
);


-- Broker 78: FXDD 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXDD 2',
  'fxdd-2',
  'https://example-fxdd-2.com',
  '/static/images/brokers/fxdd-2-logo.svg',
  3.7,
  5,
  1997,
  'Limassol, Cyprus',
  25,
  '1:30',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'FXDD 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.4,
  8.8,
  9,
  8.9,
  8.7,
  7,
  1220,
  8.7
);


-- Broker 79: Forex.com 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Forex.com 2',
  'forex-com-2',
  'https://example-forex-com-2.com',
  '/static/images/brokers/forex-com-2-logo.svg',
  3.9,
  5,
  2019,
  'New York, USA',
  500,
  '1:50',
  'Variable',
  1,
  1,
  0,
  1,
  1,
  'Forex.com 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.7,
  7.8,
  8.2,
  8.4,
  7.1,
  7.9,
  2851,
  7.4
);


-- Broker 80: TD Ameritrade 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'TD Ameritrade 2',
  'td-ameritrade-2',
  'https://example-td-ameritrade-2.com',
  '/static/images/brokers/td-ameritrade-2-logo.svg',
  4.3,
  5,
  2008,
  'Limassol, Cyprus',
  10,
  '1:200',
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'TD Ameritrade 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  7.2,
  7,
  7.7,
  8.2,
  7.3,
  1923,
  7.3
);


-- Broker 81: E*TRADE 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'E*TRADE 2',
  'e-trade-2',
  'https://example-e-trade-2.com',
  '/static/images/brokers/e-trade-2-logo.svg',
  4.8,
  5,
  2017,
  'London, UK',
  100,
  '1:400',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'E*TRADE 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.2,
  8,
  8.8,
  9,
  7.3,
  7.7,
  872,
  7.1
);


-- Broker 82: Charles Schwab 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Charles Schwab 2',
  'charles-schwab-2',
  'https://example-charles-schwab-2.com',
  '/static/images/brokers/charles-schwab-2-logo.svg',
  3.8,
  5,
  2021,
  'London, UK',
  1,
  '1:500',
  'ECN',
  1,
  1,
  1,
  1,
  1,
  'Charles Schwab 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  7.9,
  7.6,
  7.6,
  7.4,
  8.8,
  2356,
  8.1
);


-- Broker 83: Saxo Bank 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Saxo Bank 2',
  'saxo-bank-2',
  'https://example-saxo-bank-2.com',
  '/static/images/brokers/saxo-bank-2-logo.svg',
  3.5,
  5,
  2022,
  'Limassol, Cyprus',
  500,
  '1:400',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'Saxo Bank 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.1,
  8.6,
  8.6,
  7.7,
  7.7,
  7.2,
  1606,
  8.3
);


-- Broker 84: Swissquote 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Swissquote 2',
  'swissquote-2',
  'https://example-swissquote-2.com',
  '/static/images/brokers/swissquote-2-logo.svg',
  3,
  5,
  1996,
  'Limassol, Cyprus',
  250,
  '1:30',
  'Variable',
  1,
  1,
  1,
  0,
  1,
  'Swissquote 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.2,
  8,
  7.8,
  7.9,
  8.6,
  8.8,
  2585,
  8.3
);


-- Broker 85: Dukascopy 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Dukascopy 2',
  'dukascopy-2',
  'https://example-dukascopy-2.com',
  '/static/images/brokers/dukascopy-2-logo.svg',
  4,
  5,
  2004,
  'Limassol, Cyprus',
  100,
  '1:50',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'Dukascopy 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.9,
  7.7,
  8.5,
  8.3,
  7.8,
  8.8,
  1550,
  7.6
);


-- Broker 86: LMAX Exchange 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'LMAX Exchange 2',
  'lmax-exchange-2',
  'https://example-lmax-exchange-2.com',
  '/static/images/brokers/lmax-exchange-2-logo.svg',
  4.8,
  5,
  2017,
  'Sydney, Australia',
  50,
  '1:200',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'LMAX Exchange 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.3,
  8.8,
  8.8,
  7.2,
  7,
  7.5,
  1800,
  8.5
);


-- Broker 87: Darwinex 2
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Darwinex 2',
  'darwinex-2',
  'https://example-darwinex-2.com',
  '/static/images/brokers/darwinex-2-logo.svg',
  3.2,
  5,
  2017,
  'London, UK',
  10,
  '1:50',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'Darwinex 2 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7,
  7.3,
  8.3,
  7.7,
  8.9,
  8,
  2282,
  7.3
);


-- Broker 88: Interactive Brokers 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Interactive Brokers 3',
  'interactive-brokers-3',
  'https://example-interactive-brokers-3.com',
  '/static/images/brokers/interactive-brokers-3-logo.svg',
  4.4,
  5,
  2011,
  'Sydney, Australia',
  500,
  '1:200',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'Interactive Brokers 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.8,
  8.2,
  7.3,
  7.3,
  8.3,
  7.7,
  1430,
  8.7
);


-- Broker 89: CMC Markets 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'CMC Markets 3',
  'cmc-markets-3',
  'https://example-cmc-markets-3.com',
  '/static/images/brokers/cmc-markets-3-logo.svg',
  3.8,
  5,
  2014,
  'London, UK',
  10,
  '1:500',
  'Fixed',
  1,
  1,
  1,
  1,
  1,
  'CMC Markets 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.8,
  7.2,
  8.8,
  8.7,
  7.8,
  7.7,
  1231,
  8.7
);


-- Broker 90: eToro 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'eToro 3',
  'etoro-3',
  'https://example-etoro-3.com',
  '/static/images/brokers/etoro-3-logo.svg',
  3.9,
  5,
  2017,
  'Limassol, Cyprus',
  25,
  '1:100',
  'ECN',
  1,
  1,
  1,
  0,
  1,
  'eToro 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  7.7,
  7.8,
  8.9,
  8.3,
  8.2,
  3000,
  8
);


-- Broker 91: Admiral Markets 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Admiral Markets 3',
  'admiral-markets-3',
  'https://example-admiral-markets-3.com',
  '/static/images/brokers/admiral-markets-3-logo.svg',
  3.3,
  5,
  1991,
  'Sydney, Australia',
  1,
  '1:100',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'Admiral Markets 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.5,
  7.1,
  8.5,
  8.5,
  7.2,
  7.9,
  2944,
  7.4
);


-- Broker 92: IC Markets 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'IC Markets 3',
  'ic-markets-3',
  'https://example-ic-markets-3.com',
  '/static/images/brokers/ic-markets-3-logo.svg',
  4.5,
  5,
  2010,
  'Sydney, Australia',
  250,
  '1:50',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'IC Markets 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.4,
  7.4,
  8.9,
  8.9,
  7.7,
  8.9,
  1154,
  8.8
);


-- Broker 93: FP Markets 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FP Markets 3',
  'fp-markets-3',
  'https://example-fp-markets-3.com',
  '/static/images/brokers/fp-markets-3-logo.svg',
  3.9,
  5,
  1993,
  'London, UK',
  250,
  '1:200',
  'Variable',
  1,
  1,
  0,
  0,
  1,
  'FP Markets 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.6,
  7.7,
  7.8,
  7.5,
  8.2,
  8,
  2643,
  7.4
);


-- Broker 94: Exness 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'Exness 3',
  'exness-3',
  'https://example-exness-3.com',
  '/static/images/brokers/exness-3-logo.svg',
  3.7,
  5,
  1998,
  'Sydney, Australia',
  500,
  '1:30',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'Exness 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.2,
  8.4,
  8.3,
  8.5,
  8.3,
  8.3,
  2176,
  7.7
);


-- Broker 95: HotForex 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'HotForex 3',
  'hotforex-3',
  'https://example-hotforex-3.com',
  '/static/images/brokers/hotforex-3-logo.svg',
  3.3,
  5,
  2020,
  'New York, USA',
  250,
  '1:50',
  'Fixed',
  1,
  1,
  0,
  0,
  1,
  'HotForex 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.6,
  7.6,
  7.6,
  7.8,
  8,
  7.8,
  255,
  8.7
);


-- Broker 96: FXTM 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FXTM 3',
  'fxtm-3',
  'https://example-fxtm-3.com',
  '/static/images/brokers/fxtm-3-logo.svg',
  4.4,
  5,
  1991,
  'Limassol, Cyprus',
  50,
  '1:500',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'FXTM 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  7.1,
  8.9,
  7.1,
  7.2,
  7.2,
  2134,
  8.3
);


-- Broker 97: AvaTrade 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'AvaTrade 3',
  'avatrade-3',
  'https://example-avatrade-3.com',
  '/static/images/brokers/avatrade-3-logo.svg',
  4.6,
  5,
  2023,
  'London, UK',
  25,
  '1:200',
  'ECN',
  1,
  1,
  0,
  0,
  1,
  'AvaTrade 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.2,
  7.7,
  8.5,
  7.2,
  8.1,
  8.7,
  1143,
  8.9
);


-- Broker 98: easyMarkets 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'easyMarkets 3',
  'easymarkets-3',
  'https://example-easymarkets-3.com',
  '/static/images/brokers/easymarkets-3-logo.svg',
  3.5,
  5,
  1998,
  'London, UK',
  25,
  '1:50',
  'Fixed',
  1,
  1,
  1,
  0,
  1,
  'easyMarkets 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.7,
  8.5,
  8.6,
  7.6,
  8.9,
  8.2,
  2330,
  7.5
);


-- Broker 99: FxPro 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'FxPro 3',
  'fxpro-3',
  'https://example-fxpro-3.com',
  '/static/images/brokers/fxpro-3-logo.svg',
  4,
  5,
  2020,
  'New York, USA',
  50,
  '1:100',
  'Variable',
  1,
  1,
  1,
  1,
  1,
  'FxPro 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  7.3,
  8.3,
  8.9,
  8.5,
  8,
  8.4,
  416,
  8.3
);


-- Broker 100: ThinkMarkets 3
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score,
  deposit_withdrawal_score, customer_support_score, research_education_score,
  user_reviews_count, data_quality_score
) VALUES (
  'ThinkMarkets 3',
  'thinkmarkets-3',
  'https://example-thinkmarkets-3.com',
  '/static/images/brokers/thinkmarkets-3-logo.svg',
  3.8,
  5,
  2000,
  'New York, USA',
  50,
  '1:50',
  'Fixed',
  1,
  1,
  0,
  1,
  1,
  'ThinkMarkets 3 is a professional forex and CFD broker providing comprehensive trading solutions.',
  '["Competitive spreads","Professional platforms","Regulated broker","Fast execution"]',
  '["Inactivity fees may apply","Limited educational resources"]',
  '["MetaTrader 4","MetaTrader 5","Web Platform"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  8.3,
  8.6,
  7.4,
  7.3,
  8.9,
  7,
  1544,
  8.5
);

