-- Comprehensive broker data for BrokerAnalysis
-- Based on industry-standard broker information

-- Insert top forex brokers with comprehensive data
INSERT INTO brokers (name, slug, rating, rating_scale, logo_url, website_url, established, headquarters, is_regulated, min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app, copy_trading, social_trading) VALUES
('TastyFX', 'tastyfx', 4.8, 5.0, '/static/logos/tastyfx.png', 'https://tastyfx.com', 2001, 'London, UK', true, 250, '1:50', 'Variable', true, true, false, false),
('Forex.com', 'forex-com', 4.6, 5.0, '/static/logos/forex-com.png', 'https://forex.com', 1999, 'New York, USA', true, 100, '1:50', 'Variable', true, true, false, true),
('OANDA', 'oanda', 4.5, 5.0, '/static/logos/oanda.png', 'https://oanda.com', 1996, 'Toronto, Canada', true, 0, '1:50', 'Variable', true, true, false, false),
('Interactive Brokers', 'interactive-brokers', 4.7, 5.0, '/static/logos/ib.png', 'https://interactivebrokers.com', 1978, 'Connecticut, USA', true, 0, '1:40', 'Variable', true, true, false, false),
('Charles Schwab', 'charles-schwab', 4.4, 5.0, '/static/logos/schwab.png', 'https://schwab.com', 1971, 'California, USA', true, 0, '1:50', 'Variable', true, true, false, false),
('XM Group', 'xm-group', 4.3, 5.0, '/static/logos/xm.png', 'https://xm.com', 2009, 'Limassol, Cyprus', true, 5, '1:888', 'Variable', true, true, true, true),
('eToro', 'etoro', 4.2, 5.0, '/static/logos/etoro.png', 'https://etoro.com', 2007, 'Tel Aviv, Israel', true, 200, '1:30', 'Variable', true, true, true, true),
('Plus500', 'plus500', 4.1, 5.0, '/static/logos/plus500.png', 'https://plus500.com', 2008, 'Haifa, Israel', true, 100, '1:30', 'Variable', true, true, false, false),
('AvaTrade', 'avatrade', 4.0, 5.0, '/static/logos/avatrade.png', 'https://avatrade.com', 2006, 'Dublin, Ireland', true, 100, '1:400', 'Variable', true, true, true, true),
('Pepperstone', 'pepperstone', 4.5, 5.0, '/static/logos/pepperstone.png', 'https://pepperstone.com', 2010, 'Melbourne, Australia', true, 0, '1:500', 'Raw', true, true, true, false),
('IC Markets', 'ic-markets', 4.6, 5.0, '/static/logos/icmarkets.png', 'https://icmarkets.com', 2007, 'Sydney, Australia', true, 200, '1:500', 'Raw', true, true, true, false),
('FP Markets', 'fp-markets', 4.3, 5.0, '/static/logos/fpmarkets.png', 'https://fpmarkets.com', 2005, 'Sydney, Australia', true, 50, '1:500', 'Variable', true, true, true, false);

-- Insert regulatory information
INSERT INTO regulations (broker_id, regulator_name, license_number, jurisdiction, regulatory_url) VALUES
-- TastyFX
(1, 'FCA', '115234', 'United Kingdom', 'https://register.fca.org.uk/'),
(1, 'CFTC', '0339826', 'United States', 'https://www.nfa.futures.org/'),
-- Forex.com
(2, 'CFTC', '0339826', 'United States', 'https://www.nfa.futures.org/'),
(2, 'FCA', '190864', 'United Kingdom', 'https://register.fca.org.uk/'),
-- OANDA
(3, 'CFTC', '0325821', 'United States', 'https://www.nfa.futures.org/'),
(3, 'FCA', '542574', 'United Kingdom', 'https://register.fca.org.uk/'),
(3, 'ASIC', '412981', 'Australia', 'https://asic.gov.au/'),
-- Interactive Brokers
(4, 'SEC', 'SEC-8-69288', 'United States', 'https://sec.gov/'),
(4, 'CFTC', '0382560', 'United States', 'https://www.nfa.futures.org/'),
(4, 'FCA', '208159', 'United Kingdom', 'https://register.fca.org.uk/'),
-- Charles Schwab
(5, 'SEC', 'SEC-8-2924', 'United States', 'https://sec.gov/'),
(5, 'FINRA', '5393', 'United States', 'https://brokercheck.finra.org/'),
-- XM Group
(6, 'CySEC', '120/10', 'Cyprus', 'https://www.cysec.gov.cy/'),
(6, 'ASIC', '443670', 'Australia', 'https://asic.gov.au/'),
(6, 'FCA', '705428', 'United Kingdom', 'https://register.fca.org.uk/'),
-- eToro
(7, 'CySEC', '109/10', 'Cyprus', 'https://www.cysec.gov.cy/'),
(7, 'FCA', '583263', 'United Kingdom', 'https://register.fca.org.uk/'),
(7, 'ASIC', '491139', 'Australia', 'https://asic.gov.au/'),
-- Plus500
(8, 'FCA', '509909', 'United Kingdom', 'https://register.fca.org.uk/'),
(8, 'CySEC', '250/14', 'Cyprus', 'https://www.cysec.gov.cy/'),
(8, 'ASIC', '417727', 'Australia', 'https://asic.gov.au/'),
-- AvaTrade
(9, 'Central Bank of Ireland', 'C53877', 'Ireland', 'https://registers.centralbank.ie/'),
(9, 'ASIC', '406684', 'Australia', 'https://asic.gov.au/'),
-- Pepperstone
(10, 'ASIC', '414530', 'Australia', 'https://asic.gov.au/'),
(10, 'FCA', '684312', 'United Kingdom', 'https://register.fca.org.uk/'),
-- IC Markets
(11, 'ASIC', '335692', 'Australia', 'https://asic.gov.au/'),
(11, 'CySEC', '362/18', 'Cyprus', 'https://www.cysec.gov.cy/'),
-- FP Markets
(12, 'ASIC', '286354', 'Australia', 'https://asic.gov.au/'),
(12, 'CySEC', '371/18', 'Cyprus', 'https://www.cysec.gov.cy/');

-- Insert spread information for major currency pairs
INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, commission_per_lot, account_type) VALUES
-- TastyFX
(1, 'EUR/USD', 0.6, 0.9, 0, 'Standard'),
(1, 'GBP/USD', 1.0, 1.4, 0, 'Standard'),
(1, 'USD/JPY', 0.8, 1.1, 0, 'Standard'),
(1, 'AUD/USD', 0.9, 1.3, 0, 'Standard'),
-- Forex.com
(2, 'EUR/USD', 0.8, 1.2, 0, 'Standard'),
(2, 'GBP/USD', 1.2, 1.8, 0, 'Standard'),
(2, 'USD/JPY', 1.0, 1.5, 0, 'Standard'),
(2, 'AUD/USD', 1.1, 1.6, 0, 'Standard'),
-- OANDA
(3, 'EUR/USD', 0.7, 1.0, 0, 'Standard'),
(3, 'GBP/USD', 1.1, 1.5, 0, 'Standard'),
(3, 'USD/JPY', 0.9, 1.2, 0, 'Standard'),
(3, 'AUD/USD', 1.0, 1.4, 0, 'Standard'),
-- Interactive Brokers
(4, 'EUR/USD', 0.1, 0.2, 2.5, 'Pro'),
(4, 'GBP/USD', 0.2, 0.4, 2.5, 'Pro'),
(4, 'USD/JPY', 0.1, 0.3, 2.5, 'Pro'),
(4, 'AUD/USD', 0.2, 0.5, 2.5, 'Pro'),
-- Pepperstone Raw Account
(10, 'EUR/USD', 0.0, 0.1, 7.0, 'Raw'),
(10, 'GBP/USD', 0.0, 0.2, 7.0, 'Raw'),
(10, 'USD/JPY', 0.0, 0.1, 7.0, 'Raw'),
(10, 'AUD/USD', 0.0, 0.2, 7.0, 'Raw'),
-- IC Markets Raw Account
(11, 'EUR/USD', 0.0, 0.1, 7.0, 'Raw'),
(11, 'GBP/USD', 0.1, 0.2, 7.0, 'Raw'),
(11, 'USD/JPY', 0.0, 0.1, 7.0, 'Raw'),
(11, 'AUD/USD', 0.1, 0.2, 7.0, 'Raw');

-- Insert trading platforms
INSERT INTO platforms (broker_id, platform_name, platform_type) VALUES
-- TastyFX
(1, 'TastyFX Web Platform', 'Web'),
(1, 'TastyFX Mobile', 'Mobile'),
(1, 'MetaTrader 4', 'Desktop'),
-- Forex.com
(2, 'Advanced Trading Platform', 'Web'),
(2, 'Forex.com Mobile', 'Mobile'),
(2, 'MetaTrader 4', 'Desktop'),
(2, 'MetaTrader 5', 'Desktop'),
-- OANDA
(3, 'OANDA Trade Platform', 'Web'),
(3, 'OANDA Mobile', 'Mobile'),
(3, 'MetaTrader 4', 'Desktop'),
(3, 'TradingView', 'Web'),
-- Interactive Brokers
(4, 'Trader Workstation', 'Desktop'),
(4, 'IBKR Mobile', 'Mobile'),
(4, 'Client Portal', 'Web'),
-- XM Group
(6, 'MetaTrader 4', 'Desktop'),
(6, 'MetaTrader 5', 'Desktop'),
(6, 'XM WebTrader', 'Web'),
(6, 'XM Mobile', 'Mobile'),
-- Pepperstone
(10, 'MetaTrader 4', 'Desktop'),
(10, 'MetaTrader 5', 'Desktop'),
(10, 'cTrader', 'Desktop'),
(10, 'TradingView', 'Web'),
-- IC Markets
(11, 'MetaTrader 4', 'Desktop'),
(11, 'MetaTrader 5', 'Desktop'),
(11, 'cTrader', 'Desktop'),
(11, 'WebTrader', 'Web');

-- Insert account types
INSERT INTO account_types (broker_id, type_name, min_deposit_usd, max_leverage, spread_markup, commission_per_lot, features) VALUES
(1, 'Standard', 250, '1:50', 0.0, 0.0, '{"demo": true, "islamic": true, "vps": false}'),
(2, 'Standard', 100, '1:50', 0.0, 0.0, '{"demo": true, "islamic": false, "vps": false}'),
(2, 'Premium', 25000, '1:50', -0.2, 0.0, '{"demo": true, "islamic": false, "vps": true}'),
(3, 'Core Pricing', 0, '1:50', 0.0, 0.0, '{"demo": true, "islamic": false, "vps": false}'),
(4, 'Pro', 0, '1:40', 0.0, 2.5, '{"demo": true, "islamic": false, "vps": false}'),
(10, 'Standard', 0, '1:500', 1.0, 0.0, '{"demo": true, "islamic": true, "vps": false}'),
(10, 'Raw', 200, '1:500', 0.0, 7.0, '{"demo": true, "islamic": true, "vps": true}'),
(11, 'Standard', 200, '1:500', 1.0, 0.0, '{"demo": true, "islamic": true, "vps": false}'),
(11, 'Raw Spread', 200, '1:500', 0.0, 7.0, '{"demo": true, "islamic": true, "vps": true}');

-- Insert payment methods
INSERT INTO payment_methods (broker_id, method_name, method_type, processing_time, min_amount, fees) VALUES
-- Common payment methods for all brokers
(1, 'Bank Wire', 'Both', '1-3 business days', 250, 'No fees'),
(1, 'Credit/Debit Card', 'Deposit', 'Instant', 250, 'No fees'),
(1, 'ACH Transfer', 'Both', '1-2 business days', 250, 'No fees'),
(2, 'Bank Wire', 'Both', '1-3 business days', 100, '$15 withdrawal fee'),
(2, 'Credit/Debit Card', 'Deposit', 'Instant', 100, 'No fees'),
(2, 'PayPal', 'Both', 'Instant', 100, 'No fees'),
(3, 'Bank Transfer', 'Both', '1-2 business days', 0, 'No fees'),
(3, 'Credit/Debit Card', 'Deposit', 'Instant', 0, 'No fees'),
(6, 'Credit/Debit Card', 'Deposit', 'Instant', 5, 'No fees'),
(6, 'Skrill', 'Both', 'Instant', 5, 'No fees'),
(6, 'Neteller', 'Both', 'Instant', 5, 'No fees'),
(7, 'Credit/Debit Card', 'Deposit', 'Instant', 200, 'No fees'),
(7, 'PayPal', 'Both', 'Instant', 200, '$5 withdrawal fee'),
(7, 'Bank Transfer', 'Both', '1-3 business days', 200, 'No fees');

-- Insert broker features (Pros and Cons)
INSERT INTO broker_features (broker_id, feature_text, feature_type, category) VALUES
-- TastyFX
(1, 'Excellent mobile trading platform with advanced charting', 'Pro', 'Platform'),
(1, 'Strong regulatory oversight by FCA and CFTC', 'Pro', 'Regulation'),
(1, 'Competitive spreads on major currency pairs', 'Pro', 'Trading'),
(1, 'High minimum deposit requirement', 'Con', 'Account'),
(1, 'Limited copy trading options', 'Con', 'Features'),
-- Forex.com
(2, 'Well-established broker with strong reputation', 'Pro', 'Trust'),
(2, 'Multiple platform options including MT4/MT5', 'Pro', 'Platform'),
(2, 'Good educational resources and market analysis', 'Pro', 'Education'),
(2, 'Higher spreads compared to ECN brokers', 'Con', 'Trading'),
(2, 'Limited cryptocurrency offerings', 'Con', 'Instruments'),
-- OANDA
(3, 'No minimum deposit requirement', 'Pro', 'Account'),
(3, 'Excellent execution with no dealing desk', 'Pro', 'Execution'),
(3, 'Comprehensive API for algorithmic trading', 'Pro', 'Technology'),
(3, 'Limited leverage compared to other brokers', 'Con', 'Trading'),
(3, 'No MetaTrader 5 platform', 'Con', 'Platform'),
-- Interactive Brokers
(4, 'Extremely low commissions and spreads', 'Pro', 'Costs'),
(4, 'Access to global markets and exchanges', 'Pro', 'Markets'),
(4, 'Professional-grade trading tools', 'Pro', 'Platform'),
(4, 'Complex platform not suitable for beginners', 'Con', 'Usability'),
(4, 'High inactivity fees for small accounts', 'Con', 'Fees'),
-- XM Group
(6, 'Generous welcome bonuses and promotions', 'Pro', 'Bonuses'),
(6, 'Strong social trading features', 'Pro', 'Social'),
(6, 'Excellent customer support in multiple languages', 'Pro', 'Support'),
(6, 'Higher spreads on standard accounts', 'Con', 'Trading'),
(6, 'Complex fee structure', 'Con', 'Transparency'),
-- Pepperstone
(10, 'Ultra-tight spreads on Raw account', 'Pro', 'Trading'),
(10, 'Fast execution speeds with low latency', 'Pro', 'Execution'),
(10, 'Multiple platform options including cTrader', 'Pro', 'Platform'),
(10, 'No US clients accepted', 'Con', 'Availability'),
(10, 'Higher commission on Raw accounts', 'Con', 'Costs');

-- Insert trading instruments
INSERT INTO instruments (broker_id, instrument_type, instrument_count) VALUES
-- TastyFX
(1, 'Forex', 80),
(1, 'CFDs', 200),
(1, 'Indices', 15),
(1, 'Commodities', 25),
-- Forex.com
(2, 'Forex', 84),
(2, 'CFDs', 300),
(2, 'Indices', 18),
(2, 'Commodities', 30),
(2, 'Crypto', 12),
-- OANDA
(3, 'Forex', 68),
(3, 'CFDs', 150),
(3, 'Indices', 12),
(3, 'Commodities', 20),
-- Interactive Brokers
(4, 'Forex', 100),
(4, 'Stocks', 50000),
(4, 'Futures', 300),
(4, 'Options', 1000000),
(4, 'Bonds', 5000),
-- XM Group
(6, 'Forex', 55),
(6, 'CFDs', 1000),
(6, 'Indices', 24),
(6, 'Commodities', 33),
(6, 'Crypto', 31),
-- Pepperstone
(10, 'Forex', 100),
(10, 'CFDs', 600),
(10, 'Indices', 20),
(10, 'Commodities', 25),
(10, 'Crypto', 15);