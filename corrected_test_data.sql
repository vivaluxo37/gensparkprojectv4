-- Corrected test data for existing database schema

-- Clear existing data  
DELETE FROM spreads;
DELETE FROM regulations;
DELETE FROM brokers;

-- Insert 5 test brokers with correct schema
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, established, headquarters,
  min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app,
  copy_trading, social_trading, crypto_trading, description_short,
  pros, cons, platforms, source_url, last_updated
) VALUES 
('IG Markets', 'ig-markets', 'https://www.ig.com', '/static/images/brokers/ig-markets-logo.svg', 4.5, 1974, 'London, UK', 0, '1:30', 'Variable', 1, 1, 0, 1, 1, 'IG Markets is a leading CFD and forex broker with over 45 years of experience.', '["FCA regulated","Low spreads","Advanced platforms","Professional service"]', '["Limited leverage for retail clients","Complex fee structure"]', '["MetaTrader 4","Proprietary Platform","TradingView"]', 'https://www.forexbrokers.com/', datetime('now')),

('OANDA', 'oanda', 'https://www.oanda.com', '/static/images/brokers/oanda-logo.svg', 4.3, 1996, 'Toronto, Canada', 1, '1:50', 'Variable', 1, 1, 0, 0, 1, 'OANDA is a trusted forex and CFD broker known for transparent pricing and reliable execution.', '["Transparent pricing","Multiple regulations","Good research","Reliable execution"]', '["Limited copy trading","Higher spreads on some pairs"]', '["MetaTrader 4","Proprietary Platform","API Access"]', 'https://www.forexbrokers.com/', datetime('now')),

('XM Group', 'xm-group', 'https://www.xm.com', '/static/images/brokers/xm-group-logo.svg', 4.1, 2009, 'Limassol, Cyprus', 5, '1:888', 'Variable', 1, 1, 1, 1, 1, 'XM Group offers comprehensive trading services with high leverage and diverse instruments.', '["High leverage","Multiple account types","Strong education","Copy trading"]', '["Complex website","Many promotional emails"]', '["MetaTrader 4","MetaTrader 5","WebTrader"]', 'https://www.dailyforex.com/', datetime('now')),

('Pepperstone', 'pepperstone', 'https://www.pepperstone.com', '/static/images/brokers/pepperstone-logo.svg', 4.4, 2010, 'Melbourne, Australia', 200, '1:400', 'ECN', 1, 1, 1, 0, 1, 'Pepperstone is an award-winning forex and CFD broker with tight spreads and fast execution.', '["Tight spreads","Fast execution","Multiple platforms","Good support"]', '["Higher minimum deposit","Limited educational content"]', '["MetaTrader 4","MetaTrader 5","cTrader","TradingView"]', 'https://www.investopedia.com/', datetime('now')),

('Plus500', 'plus500', 'https://www.plus500.com', '/static/images/brokers/plus500-logo.svg', 3.8, 2008, 'Haifa, Israel', 100, '1:30', 'Fixed', 1, 1, 0, 0, 1, 'Plus500 is a popular CFD broker known for its user-friendly proprietary platform.', '["User-friendly platform","FCA regulated","No commission","Wide range of instruments"]', '["Spread only pricing","Limited research","No MT4/MT5"]', '["Proprietary Platform","Mobile Apps"]', 'https://brokerchooser.com/', datetime('now'));

-- Insert regulation data (using broker IDs)
INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) VALUES
(1, 'Financial Conduct Authority', 'United Kingdom', 'FCA-195355'),
(1, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-220440'),
(2, 'Commodity Futures Trading Commission', 'United States', 'CFTC-0325821'),
(2, 'Investment Industry Regulatory Organization of Canada', 'Canada', 'IIROC-2018'),
(3, 'Cyprus Securities and Exchange Commission', 'Cyprus', 'CySEC-120/10'),
(3, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-443670'),
(4, 'Australian Securities and Investments Commission', 'Australia', 'ASIC-414530'),
(4, 'Financial Conduct Authority', 'United Kingdom', 'FCA-684312'),
(5, 'Cyprus Securities and Exchange Commission', 'Cyprus', 'CySEC-250/14'),
(5, 'Financial Conduct Authority', 'United Kingdom', 'FCA-509909');

-- Insert spread data (using broker IDs)
INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) VALUES
(1, 'EUR/USD', 0.6, 0.6, 'Standard'),
(1, 'GBP/USD', 0.9, 0.9, 'Standard'), 
(1, 'USD/JPY', 0.7, 0.7, 'Standard'),
(2, 'EUR/USD', 0.8, 1.2, 'Standard'),
(2, 'GBP/USD', 1.0, 1.5, 'Standard'),
(2, 'USD/JPY', 0.9, 1.3, 'Standard'),
(3, 'EUR/USD', 1.0, 1.0, 'Standard'),
(3, 'GBP/USD', 1.2, 1.2, 'Standard'),
(3, 'USD/JPY', 1.0, 1.0, 'Standard'),
(4, 'EUR/USD', 0.57, 0.57, 'Razor'),
(4, 'GBP/USD', 0.77, 0.77, 'Razor'),
(4, 'USD/JPY', 0.59, 0.59, 'Razor'),
(5, 'EUR/USD', 2.0, 2.0, 'Standard'),
(5, 'GBP/USD', 3.0, 3.0, 'Standard'),
(5, 'USD/JPY', 2.5, 2.5, 'Standard');