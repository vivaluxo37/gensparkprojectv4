-- Enhanced Broker Data Seeding for Review Pages
-- Populate broker_details, broker_scores, and supporting tables with comprehensive data

-- Insert broker_details for major brokers
INSERT OR IGNORE INTO broker_details (broker_id, founded_year, employee_count, trading_volume_monthly, client_count, description_long, description_short, methodology_score, overall_rating, pros_text, cons_text, company_type, ownership_type) VALUES
-- IC Markets (ID: 13)
(13, 2007, 400, 750000000000, 180000, 
'IC Markets is an Australian-based forex and CFD broker known for its ultra-tight spreads and institutional-grade trading conditions. Founded in 2007, the broker has grown to become one of the most trusted names in retail forex trading, serving over 180,000 active clients worldwide. The broker specializes in providing raw spread pricing through its cTrader and MetaTrader platforms, making it particularly attractive to scalpers and high-frequency traders. IC Markets is regulated by ASIC in Australia and FSA in Seychelles, ensuring a high level of client fund protection and regulatory oversight.',
'Award-winning Australian broker offering institutional-grade spreads and execution.',
92, 4.6, 
'Ultra-tight spreads from 0.0 pips|Institutional-grade execution|Strong regulatory oversight|Wide range of trading platforms|Excellent customer support|No dealing desk interference|Comprehensive educational resources',
'Limited educational content for beginners|Higher minimum deposit for some account types|Limited copy trading options|No proprietary platform',
'Market Maker', 'Private'),

-- Pepperstone (ID: 14)
(14, 2010, 250, 580000000000, 120000,
'Pepperstone is an Australian forex and CFD broker that has established itself as a leading provider of online trading services. Founded in 2010, the company has grown rapidly to serve over 120,000 clients across 170+ countries. Pepperstone is renowned for its cutting-edge technology, competitive pricing, and commitment to providing traders with the best possible trading conditions. The broker is regulated by ASIC in Australia, FCA in the UK, BaFin in Germany, and DFSA in Dubai, ensuring comprehensive regulatory coverage across multiple jurisdictions.',
'Fast-growing Australian broker with competitive pricing and advanced technology.',
89, 4.5,
'Competitive spreads and commissions|Multiple regulatory licenses|Advanced trading platforms|Fast execution speeds|Strong client support|Comprehensive market analysis|User-friendly interface',
'Limited educational resources|Higher spreads on some exotic pairs|No guaranteed stops|Limited demo account period',
'ECN/STP', 'Private'),

-- Interactive Brokers (ID: 15)
(15, 1978, 2600, 2400000000000, 1500000,
'Interactive Brokers (IBKR) is a leading global electronic broker founded in 1978 by Thomas Peterffy. With over four decades of experience, IBKR has become one of the largest and most technologically advanced brokerage firms in the world. The company serves over 1.5 million client accounts across 200+ countries and territories, offering access to stocks, options, futures, forex, bonds, and funds on 150+ markets worldwide. IBKR is known for its low-cost commission structure, advanced trading technology, and comprehensive market access.',
'Global leader in electronic trading with access to 150+ markets worldwide.',
95, 4.8,
'Lowest-cost commissions in the industry|Access to 150+ global markets|Advanced trading technology|Comprehensive research tools|Strong regulatory framework|Professional-grade platforms|Excellent API access',
'Complex platform for beginners|High minimum deposit requirements|Limited customer support hours|Inactivity fees for small accounts',
'ECN/DMA', 'Public'),

-- OANDA (ID: 16)
(16, 1996, 800, 450000000000, 200000,
'OANDA Corporation is a leading currency data and forex trading services company founded in 1996. Headquartered in New York City, OANDA was one of the first companies to offer free currency information and exchange rate data online. The company has evolved into a major forex broker serving both retail and institutional clients worldwide. OANDA is known for its proprietary trading platform, competitive pricing, and innovative approach to forex trading, including fractional pip pricing and flexible position sizing.',
'Pioneering forex broker with innovative trading technology and competitive pricing.',
87, 4.3,
'Fractional pip pricing|Flexible position sizing|Strong regulatory oversight|Proprietary trading platform|Comprehensive market analysis|No minimum deposit|Educational resources',
'Higher spreads compared to ECN brokers|Limited cryptocurrency offerings|Platform can be overwhelming for beginners|No MetaTrader platform support',
'Market Maker', 'Private'),

-- XM Group (ID: 17)
(17, 2009, 350, 320000000000, 5000000,
'XM Group is a leading online forex and CFD broker that has been serving traders worldwide since 2009. With headquarters in Cyprus and offices in multiple countries, XM has grown to serve over 5 million clients across 190+ countries. The broker is known for its extensive educational resources, multilingual customer support, and competitive trading conditions. XM is regulated by CySEC in Cyprus, ASIC in Australia, and FCA in the UK, providing traders with confidence in the safety of their funds.',
'Global forex broker serving 5+ million clients with comprehensive trading services.',
85, 4.2,
'Extensive educational resources|Multilingual customer support|No re-quotes or rejections|Multiple account types|Strong bonus programs|Comprehensive market analysis|User-friendly platforms',
'Higher spreads on ECN accounts|Limited advanced charting tools|Bonus terms can be restrictive|Platform customization limitations',
'Market Maker/STP', 'Private');

-- Insert broker_scores for detailed scoring breakdown
INSERT OR IGNORE INTO broker_scores (broker_id, regulation_score, spreads_score, platforms_score, education_score, support_score, mobile_score, research_score, execution_score, fees_score, trust_score, overall_score, last_updated) VALUES
(13, 95, 98, 92, 85, 90, 88, 87, 96, 94, 93, 92, datetime('now')),  -- IC Markets
(14, 92, 95, 90, 82, 88, 91, 85, 94, 92, 90, 89, datetime('now')),  -- Pepperstone
(15, 98, 85, 95, 90, 85, 87, 98, 97, 99, 96, 95, datetime('now')),  -- Interactive Brokers
(16, 90, 80, 88, 88, 87, 85, 92, 89, 87, 88, 87, datetime('now')),  -- OANDA
(17, 88, 75, 85, 95, 92, 88, 85, 82, 80, 85, 85, datetime('now'));  -- XM Group

-- Insert trading platforms data
INSERT OR IGNORE INTO trading_platforms (id, name, platform_type, developer, description, mobile_available, api_available, algo_trading, social_trading, copy_trading) VALUES
(1, 'MetaTrader 4', 'Desktop/Mobile/Web', 'MetaQuotes', 'World''s most popular forex trading platform', 1, 1, 1, 0, 0),
(2, 'MetaTrader 5', 'Desktop/Mobile/Web', 'MetaQuotes', 'Advanced multi-asset trading platform', 1, 1, 1, 0, 1),
(3, 'cTrader', 'Desktop/Mobile/Web', 'Spotware', 'Professional ECN trading platform', 1, 1, 1, 1, 1),
(4, 'Trader Workstation (TWS)', 'Desktop/Mobile/Web', 'Interactive Brokers', 'Professional trading platform for global markets', 1, 1, 1, 0, 0),
(5, 'TradingView', 'Web/Mobile', 'TradingView', 'Advanced charting and social trading platform', 1, 1, 1, 1, 0),
(6, 'OANDA Trade', 'Desktop/Mobile/Web', 'OANDA', 'Proprietary trading platform', 1, 1, 0, 0, 0),
(7, 'XM WebTrader', 'Web', 'XM Group', 'Browser-based trading platform', 0, 0, 0, 0, 0);

-- Link brokers to their trading platforms
INSERT OR IGNORE INTO broker_platforms (broker_id, platform_id, available, primary_platform, custom_features) VALUES
-- IC Markets
(13, 1, 1, 0, 'Standard MT4 features'),
(13, 2, 1, 0, 'Standard MT5 features'),
(13, 3, 1, 1, 'Raw spread pricing, Level II data'),  -- Primary platform for IC Markets
-- Pepperstone
(14, 1, 1, 1, 'Enhanced execution, Smart Trader Tools'),  -- Primary platform for Pepperstone
(14, 2, 1, 0, 'Standard MT5 features'),
(14, 3, 1, 0, 'Raw spread pricing'),
(14, 5, 1, 0, 'Advanced charting integration'),
-- Interactive Brokers
(15, 4, 1, 1, 'Global market access, Advanced order types'),  -- Primary platform for IBKR
-- OANDA
(16, 1, 1, 0, 'Standard MT4 features'),
(16, 6, 1, 1, 'Fractional pip pricing, Position flexibility'),  -- Primary platform for OANDA
-- XM Group
(17, 1, 1, 1, 'Standard features, Bonus integration'),  -- Primary platform for XM
(17, 2, 1, 0, 'Standard MT5 features'),
(17, 7, 1, 0, 'Browser-based trading');

-- Insert enhanced spreads data for major pairs
INSERT OR IGNORE INTO spreads_enhanced (broker_id, account_type, currency_pair, spread_from, spread_avg, spread_max, commission_per_lot, last_updated) VALUES
-- IC Markets spreads
(13, 'Raw Spread', 'EURUSD', 0.0, 0.1, 0.8, 7.00, datetime('now')),
(13, 'Raw Spread', 'GBPUSD', 0.0, 0.2, 1.2, 7.00, datetime('now')),
(13, 'Raw Spread', 'USDJPY', 0.0, 0.1, 0.9, 7.00, datetime('now')),
(13, 'Raw Spread', 'AUDUSD', 0.0, 0.1, 1.0, 7.00, datetime('now')),
-- Pepperstone spreads
(14, 'Razor', 'EURUSD', 0.0, 0.16, 0.9, 7.00, datetime('now')),
(14, 'Razor', 'GBPUSD', 0.0, 0.24, 1.3, 7.00, datetime('now')),
(14, 'Razor', 'USDJPY', 0.0, 0.18, 1.0, 7.00, datetime('now')),
(14, 'Razor', 'AUDUSD', 0.0, 0.20, 1.1, 7.00, datetime('now')),
-- Interactive Brokers spreads
(15, 'Pro', 'EURUSD', 0.1, 0.2, 0.6, 2.50, datetime('now')),
(15, 'Pro', 'GBPUSD', 0.1, 0.3, 0.8, 2.50, datetime('now')),
(15, 'Pro', 'USDJPY', 0.1, 0.2, 0.7, 2.50, datetime('now')),
(15, 'Pro', 'AUDUSD', 0.1, 0.3, 0.9, 2.50, datetime('now')),
-- OANDA spreads
(16, 'Standard', 'EURUSD', 0.8, 1.2, 2.5, 0.00, datetime('now')),
(16, 'Standard', 'GBPUSD', 1.0, 1.6, 3.2, 0.00, datetime('now')),
(16, 'Standard', 'USDJPY', 0.9, 1.3, 2.8, 0.00, datetime('now')),
(16, 'Standard', 'AUDUSD', 1.0, 1.4, 2.9, 0.00, datetime('now')),
-- XM Group spreads
(17, 'Standard', 'EURUSD', 1.0, 1.6, 3.0, 0.00, datetime('now')),
(17, 'Standard', 'GBPUSD', 1.2, 2.0, 4.0, 0.00, datetime('now')),
(17, 'Standard', 'USDJPY', 1.0, 1.8, 3.5, 0.00, datetime('now')),
(17, 'Standard', 'AUDUSD', 1.1, 1.9, 3.8, 0.00, datetime('now'));

-- Insert enhanced account types
INSERT OR IGNORE INTO account_types_enhanced (broker_id, account_name, account_type, min_deposit, max_leverage, commission_per_lot, spread_markup, minimum_trade_size, maximum_trade_size, islamic_compliant, demo_available, description, target_trader_type) VALUES
-- IC Markets accounts
(13, 'Raw Spread', 'ECN', 200, 500, 7.00, 0.0, 0.01, 100.0, 1, 1, 'True ECN account with institutional spreads', 'Professional'),
(13, 'Standard', 'Market Maker', 200, 500, 0.00, 1.0, 0.01, 100.0, 1, 1, 'Standard retail account with competitive spreads', 'Beginner'),
-- Pepperstone accounts
(14, 'Razor', 'ECN', 200, 500, 7.00, 0.0, 0.01, 100.0, 1, 1, 'Raw spread account for active traders', 'Professional'),
(14, 'Standard', 'STP', 200, 500, 0.00, 0.8, 0.01, 100.0, 1, 1, 'Commission-free trading with tight spreads', 'Intermediate'),
-- Interactive Brokers accounts
(15, 'Pro', 'DMA', 10000, 50, 2.50, 0.0, 0.01, 1000.0, 0, 1, 'Professional account with direct market access', 'Professional'),
(15, 'Lite', 'Market Maker', 0, 50, 0.00, 0.5, 0.01, 100.0, 0, 1, 'Commission-free account for smaller traders', 'Beginner'),
-- OANDA accounts
(16, 'Standard', 'Market Maker', 0, 50, 0.00, 1.2, 0.01, 100.0, 1, 1, 'Standard trading account with flexible position sizing', 'All Levels'),
-- XM Group accounts
(17, 'Standard', 'Market Maker', 5, 888, 0.00, 1.6, 0.01, 50.0, 1, 1, 'Entry-level account with bonus opportunities', 'Beginner'),
(17, 'XM Zero', 'ECN', 100, 500, 10.00, 0.0, 0.01, 50.0, 1, 1, 'Zero spread account for experienced traders', 'Professional');

-- Insert regulation information
INSERT OR IGNORE INTO regulations (broker_id, regulator_name, license_number, jurisdiction, regulatory_url) VALUES
(13, 'Australian Securities and Investments Commission (ASIC)', '335692', 'Australia', 'https://asic.gov.au'),
(13, 'Financial Services Authority (FSA)', 'SD018', 'Seychelles', 'https://www.fsaseychelles.sc'),
(14, 'Australian Securities and Investments Commission (ASIC)', '414530', 'Australia', 'https://asic.gov.au'),
(14, 'Financial Conduct Authority (FCA)', '684312', 'United Kingdom', 'https://www.fca.org.uk'),
(14, 'BaFin', '154814', 'Germany', 'https://www.bafin.de'),
(15, 'Securities and Exchange Commission (SEC)', '8-27017', 'United States', 'https://www.sec.gov'),
(15, 'Financial Conduct Authority (FCA)', '208159', 'United Kingdom', 'https://www.fca.org.uk'),
(16, 'Commodity Futures Trading Commission (CFTC)', '0325821', 'United States', 'https://www.cftc.gov'),
(16, 'Financial Conduct Authority (FCA)', '542574', 'United Kingdom', 'https://www.fca.org.uk'),
(17, 'Cyprus Securities and Exchange Commission (CySEC)', '120/10', 'Cyprus', 'https://www.cysec.gov.cy'),
(17, 'Australian Securities and Investments Commission (ASIC)', '443670', 'Australia', 'https://asic.gov.au');

-- Update main broker table with enhanced information
UPDATE brokers SET 
    website_url = 'https://www.icmarkets.com',
    headquarters = 'Sydney, Australia',
    min_deposit_usd = 200,
    max_leverage = '1:500'
WHERE slug = 'ic-markets';

UPDATE brokers SET 
    website_url = 'https://pepperstone.com',
    headquarters = 'Melbourne, Australia',
    min_deposit_usd = 200,
    max_leverage = '1:500'
WHERE slug = 'pepperstone';

UPDATE brokers SET 
    website_url = 'https://www.interactivebrokers.com',
    headquarters = 'Greenwich, Connecticut, USA',
    min_deposit_usd = 10000,
    max_leverage = '1:50'
WHERE slug = 'interactive-brokers';

UPDATE brokers SET 
    website_url = 'https://www.oanda.com',
    headquarters = 'New York, USA',
    min_deposit_usd = 0,
    max_leverage = '1:50'
WHERE slug = 'oanda';

UPDATE brokers SET 
    website_url = 'https://www.xm.com',
    headquarters = 'Limassol, Cyprus',
    min_deposit_usd = 5,
    max_leverage = '1:888'
WHERE slug = 'xm-group';