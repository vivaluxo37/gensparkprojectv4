-- Fixed Comprehensive Broker Data Seeding
-- Updated to match current schema structure

-- Clear existing data and re-populate with comprehensive broker information
DELETE FROM brokers;

-- Insert comprehensive broker data with correct column names
INSERT INTO brokers (name, slug, rating, rating_scale, logo_url, website_url, established, headquarters, is_regulated, min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app, copy_trading, social_trading) VALUES
('IC Markets', 'ic-markets', 4.6, 5.0, '/static/images/brokers/ic-markets-logo.png', 'https://www.icmarkets.com', 2007, 'Sydney, Australia', 1, 200, '1:500', 'Raw', 1, 1, 0, 0),
('Pepperstone', 'pepperstone', 4.5, 5.0, '/static/images/brokers/pepperstone-logo.png', 'https://pepperstone.com', 2010, 'Melbourne, Australia', 1, 0, '1:500', 'Raw', 1, 1, 1, 0),
('Interactive Brokers', 'interactive-brokers', 4.8, 5.0, '/static/images/brokers/interactive-brokers-logo.png', 'https://www.interactivebrokers.com', 1978, 'Greenwich, USA', 1, 0, '1:50', 'Raw', 1, 1, 0, 0),
('OANDA', 'oanda', 4.4, 5.0, '/static/images/brokers/oanda-logo.png', 'https://www.oanda.com', 1996, 'Toronto, Canada', 1, 0, '1:50', 'Variable', 1, 1, 0, 0),
('XM Group', 'xm-group', 4.3, 5.0, '/static/images/brokers/xm-logo.png', 'https://www.xm.com', 2009, 'Limassol, Cyprus', 1, 5, '1:888', 'Variable', 1, 1, 0, 0),
('eToro', 'etoro', 4.2, 5.0, '/static/images/brokers/etoro-logo.png', 'https://www.etoro.com', 2007, 'Tel Aviv, Israel', 1, 200, '1:30', 'Variable', 1, 1, 1, 1),
('Plus500', 'plus500', 4.1, 5.0, '/static/images/brokers/plus500-logo.png', 'https://www.plus500.com', 2008, 'Haifa, Israel', 1, 100, '1:30', 'Variable', 1, 1, 0, 0),
('AvaTrade', 'avatrade', 4.3, 5.0, '/static/images/brokers/avatrade-logo.png', 'https://www.avatrade.com', 2006, 'Dublin, Ireland', 1, 100, '1:400', 'Variable', 1, 1, 1, 1),
('FP Markets', 'fp-markets', 4.4, 5.0, '/static/images/brokers/fp-markets-logo.png', 'https://www.fpmarkets.com', 2005, 'Sydney, Australia', 1, 100, '1:500', 'Raw', 1, 1, 0, 0),
('Exness', 'exness', 4.2, 5.0, '/static/images/brokers/exness-logo.png', 'https://www.exness.com', 2008, 'Limassol, Cyprus', 1, 1, '1:2000', 'Raw', 1, 1, 0, 0),
('ThinkMarkets', 'thinkmarkets', 4.2, 5.0, '/static/images/brokers/thinkmarkets-logo.png', 'https://www.thinkmarkets.com', 2010, 'Melbourne, Australia', 1, 0, '1:500', 'Variable', 1, 1, 0, 0),
('FXTM', 'fxtm', 4.1, 5.0, '/static/images/brokers/fxtm-logo.png', 'https://www.fxtm.com', 2011, 'Limassol, Cyprus', 1, 10, '1:2000', 'Variable', 1, 1, 1, 0),
('Admiral Markets', 'admiral-markets', 4.3, 5.0, '/static/images/brokers/admiral-markets-logo.png', 'https://admiralmarkets.com', 2001, 'Tallinn, Estonia', 1, 100, '1:500', 'Variable', 1, 1, 0, 0),
('XTB', 'xtb', 4.4, 5.0, '/static/images/brokers/xtb-logo.png', 'https://www.xtb.com', 2002, 'Warsaw, Poland', 1, 0, '1:30', 'Variable', 1, 1, 0, 0),
('CMC Markets', 'cmc-markets', 4.3, 5.0, '/static/images/brokers/cmc-markets-logo.png', 'https://www.cmcmarkets.com', 1989, 'London, UK', 1, 0, '1:30', 'Variable', 1, 1, 0, 0),
('IG Group', 'ig-group', 4.5, 5.0, '/static/images/brokers/ig-logo.png', 'https://www.ig.com', 1974, 'London, UK', 1, 300, '1:30', 'Variable', 1, 1, 0, 0),
('Forex.com', 'forex-com', 4.0, 5.0, '/static/images/brokers/forex-com-logo.png', 'https://www.forex.com', 1999, 'Bedminster, USA', 1, 100, '1:50', 'Variable', 1, 1, 0, 0),
('FXCM', 'fxcm', 3.9, 5.0, '/static/images/brokers/fxcm-logo.png', 'https://www.fxcm.com', 1999, 'London, UK', 1, 50, '1:30', 'Variable', 1, 1, 0, 0),
('TastyFX', 'tastyfx', 4.8, 5.0, '/static/images/brokers/tastyfx-logo.png', 'https://tastyfx.com', 2001, 'London, UK', 1, 250, '1:50', 'Variable', 1, 1, 0, 0),
('City Index', 'city-index', 4.0, 5.0, '/static/images/brokers/city-index-logo.png', 'https://www.cityindex.com', 1983, 'London, UK', 1, 250, '1:30', 'Variable', 1, 1, 0, 0);

-- Insert enhanced broker details
INSERT OR REPLACE INTO broker_details (broker_id, founded_year, headquarters, client_count, website_url, description_long, description_short, methodology_score, overall_rating, pros_text, cons_text, company_type) 
SELECT id, established, headquarters, 
    CASE 
        WHEN name = 'IC Markets' THEN 180000
        WHEN name = 'Pepperstone' THEN 400000
        WHEN name = 'Interactive Brokers' THEN 1500000
        WHEN name = 'eToro' THEN 30000000
        WHEN name = 'XM Group' THEN 5000000
        WHEN name = 'OANDA' THEN 425000
        ELSE 100000
    END,
    website_url,
    CASE name
        WHEN 'IC Markets' THEN 'IC Markets is a leading Australian forex and CFD broker that has established itself as a premier choice for traders seeking institutional-grade execution and ultra-tight spreads. Founded in 2007, the company has grown to serve over 180,000 active traders worldwide with more than $2 billion in monthly trading volume. As a true ECN (Electronic Communication Network) broker, IC Markets provides direct market access with raw spreads starting from 0.0 pips on major currency pairs, making it particularly attractive to professional traders and scalpers.'
        WHEN 'Pepperstone' THEN 'Pepperstone is a fast-growing Australian forex and CFD broker that has rapidly expanded to become one of the most popular choices for retail traders worldwide. Established in 2010, the company has built a reputation for providing excellent execution speeds, competitive pricing, and innovative trading technology. With over 400,000 clients globally and multiple regulatory licenses including ASIC, FCA, and CySEC, Pepperstone offers a secure and reliable trading environment with access to over 1,200 trading instruments.'
        WHEN 'Interactive Brokers' THEN 'Interactive Brokers is a premier global brokerage firm offering institutional-grade execution and the lowest costs in the industry. Founded in 1978, IBKR provides access to 150+ markets worldwide with advanced trading technology and comprehensive investment solutions. The company serves over 1.5 million accounts globally and is publicly traded on NASDAQ, providing unmatched transparency and financial stability for serious traders and investors.'
        WHEN 'OANDA' THEN 'OANDA is an established forex and CFD broker founded in 1996, known for its transparency, educational excellence, and innovative trading technology. Headquartered in Toronto, Canada, OANDA serves over 425,000 traders worldwide and is regulated by top-tier authorities including CFTC, NFA, FCA, and ASIC. The company pioneered fractional pip pricing and offers unique features like no minimum deposit requirements and comprehensive market analysis tools.'
        ELSE 'Professional forex and CFD broker offering competitive trading conditions and multi-asset trading capabilities.'
    END,
    CASE name
        WHEN 'IC Markets' THEN 'Australian ECN broker offering institutional-grade execution with raw spreads from 0.0 pips and ASIC regulation.'
        WHEN 'Pepperstone' THEN 'Australian broker known for fast execution, competitive spreads, and innovative trading technology with multi-jurisdictional regulation.'
        WHEN 'Interactive Brokers' THEN 'Premier institutional broker with lowest costs globally and access to 150+ markets worldwide.'
        WHEN 'OANDA' THEN 'Established broker with excellent educational resources, transparent pricing, and no minimum deposit requirements.'
        ELSE 'Professional forex and CFD broker with competitive trading conditions.'
    END,
    rating * 20,
    rating,
    CASE name
        WHEN 'IC Markets' THEN 'Raw spreads from 0.0 pips on major pairs|True ECN execution with no dealing desk intervention|ASIC regulation with strong client fund protection|Multiple platforms: MT4, MT5, cTrader|Fast execution speeds averaging under 40ms|No minimum deposit requirement on some accounts|Excellent for scalping and high-frequency trading'
        WHEN 'Pepperstone' THEN 'No minimum deposit requirement|TradingView integration for advanced charting|Fast execution speeds with minimal slippage|ASIC, FCA, and CySEC regulation|cTrader and MetaTrader platforms available|Excellent mobile trading apps|Strong customer support|Copy trading available through cTrader'
        WHEN 'Interactive Brokers' THEN 'Lowest trading costs globally|Access to 150+ markets and exchanges|Institutional-grade Trader Workstation platform|Advanced order types and risk management|Strong regulatory oversight (CFTC, SEC, FINRA)|Comprehensive research and analysis tools|API access for algorithmic trading|SIPC insurance up to $500,000'
        ELSE 'Competitive spreads and commissions|Regulated broker with client fund protection|Multiple trading platforms available|Demo account available|Professional customer support|Mobile trading apps'
    END,
    CASE name
        WHEN 'IC Markets' THEN 'Commission charges on raw spread accounts|Limited educational resources compared to competitors|Customer support could be more responsive|No social trading features|Spreads can widen during news events'
        WHEN 'Pepperstone' THEN 'Commission charges on Razor accounts|Limited educational content for beginners|Spreads can be higher on standard accounts|No proprietary trading platform|Customer support hours could be extended'
        WHEN 'Interactive Brokers' THEN 'Complex platform may intimidate beginners|Inactivity fees on small accounts|Limited social trading features|Minimum activity requirements|Customer service can be impersonal'
        ELSE 'Commission charges on some account types|Limited educational resources|Spreads may widen during volatile periods|Customer support availability varies'
    END,
    CASE 
        WHEN spread_type = 'Raw' THEN 'ECN'
        ELSE 'Market Maker'
    END
FROM brokers;

-- Insert comprehensive scoring for brokers
INSERT OR REPLACE INTO broker_scores (broker_id, regulation_score, spreads_score, platforms_score, education_score, support_score, mobile_score, research_score, execution_score, fees_score, trust_score, overall_score)
SELECT id,
    CASE name
        WHEN 'Interactive Brokers' THEN 98.0
        WHEN 'OANDA' THEN 95.0
        WHEN 'IC Markets' THEN 92.0
        WHEN 'IG Group' THEN 94.0
        WHEN 'CMC Markets' THEN 91.0
        WHEN 'Pepperstone' THEN 90.0
        WHEN 'TastyFX' THEN 96.0
        WHEN 'XTB' THEN 89.0
        WHEN 'FP Markets' THEN 87.0
        WHEN 'Admiral Markets' THEN 86.0
        ELSE 80.0
    END,
    CASE name
        WHEN 'IC Markets' THEN 98.0
        WHEN 'Interactive Brokers' THEN 97.0
        WHEN 'Pepperstone' THEN 95.0
        WHEN 'FP Markets' THEN 94.0
        WHEN 'Exness' THEN 92.0
        WHEN 'ThinkMarkets' THEN 88.0
        ELSE 82.0
    END,
    CASE name
        WHEN 'Interactive Brokers' THEN 99.0
        WHEN 'TradingView' THEN 95.0
        WHEN 'Pepperstone' THEN 92.0
        WHEN 'IC Markets' THEN 90.0
        WHEN 'eToro' THEN 88.0
        WHEN 'Plus500' THEN 85.0
        ELSE 80.0
    END,
    CASE name
        WHEN 'OANDA' THEN 95.0
        WHEN 'XM Group' THEN 92.0
        WHEN 'Admiral Markets' THEN 90.0
        WHEN 'eToro' THEN 85.0
        WHEN 'AvaTrade' THEN 88.0
        WHEN 'Interactive Brokers' THEN 87.0
        ELSE 75.0
    END,
    CASE name
        WHEN 'OANDA' THEN 93.0
        WHEN 'Interactive Brokers' THEN 88.0
        WHEN 'XM Group' THEN 90.0
        WHEN 'IG Group' THEN 89.0
        WHEN 'CMC Markets' THEN 86.0
        ELSE 78.0
    END,
    CASE name
        WHEN 'Plus500' THEN 95.0
        WHEN 'eToro' THEN 92.0
        WHEN 'Pepperstone' THEN 90.0
        WHEN 'XM Group' THEN 88.0
        WHEN 'IC Markets' THEN 87.0
        ELSE 80.0
    END,
    CASE name
        WHEN 'Interactive Brokers' THEN 98.0
        WHEN 'OANDA' THEN 90.0
        WHEN 'IG Group' THEN 88.0
        WHEN 'Admiral Markets' THEN 85.0
        WHEN 'CMC Markets' THEN 87.0
        ELSE 75.0
    END,
    CASE name
        WHEN 'IC Markets' THEN 96.0
        WHEN 'Interactive Brokers' THEN 98.0
        WHEN 'Pepperstone' THEN 94.0
        WHEN 'FP Markets' THEN 93.0
        WHEN 'Exness' THEN 91.0
        ELSE 82.0
    END,
    CASE name
        WHEN 'Interactive Brokers' THEN 99.0
        WHEN 'IC Markets' THEN 85.0
        WHEN 'Pepperstone' THEN 87.0
        WHEN 'OANDA' THEN 88.0
        WHEN 'FP Markets' THEN 86.0
        ELSE 78.0
    END,
    CASE name
        WHEN 'Interactive Brokers' THEN 98.0
        WHEN 'OANDA' THEN 95.0
        WHEN 'IC Markets' THEN 92.0
        WHEN 'IG Group' THEN 91.0
        WHEN 'TastyFX' THEN 96.0
        ELSE 85.0
    END,
    rating * 20
FROM brokers;

-- Add platform relationships for brokers
INSERT OR REPLACE INTO broker_platforms (broker_id, platform_id, available, primary_platform)
SELECT b.id, p.id, TRUE, 
    CASE 
        WHEN b.name = 'Plus500' AND p.name = 'Proprietary Web' THEN TRUE
        WHEN b.name = 'eToro' AND p.name = 'Proprietary Web' THEN TRUE
        WHEN b.name = 'Interactive Brokers' AND p.name = 'Proprietary Web' THEN TRUE
        WHEN p.name = 'MetaTrader 4' AND b.spread_type != 'Variable' THEN TRUE
        WHEN p.name = 'Mobile App' THEN FALSE
        ELSE FALSE
    END
FROM brokers b
CROSS JOIN trading_platforms p
WHERE (b.name IN ('IC Markets', 'Pepperstone', 'XM Group', 'OANDA', 'FP Markets', 'Exness', 'ThinkMarkets', 'FXTM', 'Admiral Markets', 'Forex.com', 'FXCM') AND p.name IN ('MetaTrader 4', 'MetaTrader 5'))
   OR (b.name IN ('IC Markets', 'Pepperstone', 'FP Markets') AND p.name = 'cTrader')
   OR (b.name = 'Pepperstone' AND p.name = 'TradingView')
   OR (b.name IN ('eToro', 'Plus500', 'AvaTrade', 'Interactive Brokers', 'IG Group', 'CMC Markets', 'City Index', 'TastyFX') AND p.name = 'Proprietary Web')
   OR (p.name = 'Mobile App');

-- Add comprehensive spread data for major currency pairs
INSERT OR REPLACE INTO spreads_enhanced (broker_id, account_type, currency_pair, spread_from, spread_avg, commission_per_lot, swap_long, swap_short)
SELECT b.id, 
    CASE WHEN b.spread_type = 'Raw' THEN 'Raw/ECN' ELSE 'Standard' END,
    cp.pair,
    CASE 
        WHEN b.name IN ('IC Markets', 'Pepperstone', 'FP Markets') AND cp.pair = 'EURUSD' THEN 0.0
        WHEN b.name = 'Interactive Brokers' AND cp.pair = 'EURUSD' THEN 0.1
        WHEN b.name = 'Exness' AND cp.pair = 'EURUSD' THEN 0.3
        WHEN cp.pair = 'EURUSD' THEN 0.8
        WHEN cp.pair = 'GBPUSD' THEN 0.9
        WHEN cp.pair = 'USDJPY' THEN 0.7
        WHEN cp.pair = 'USDCHF' THEN 1.0
        WHEN cp.pair = 'AUDUSD' THEN 0.8
        WHEN cp.pair = 'USDCAD' THEN 1.2
        WHEN cp.pair = 'NZDUSD' THEN 1.5
        WHEN cp.pair = 'XAUUSD' THEN 20.0
        ELSE 2.0
    END,
    CASE 
        WHEN b.name IN ('IC Markets', 'Pepperstone') AND cp.pair = 'EURUSD' THEN 0.1
        WHEN b.name = 'Interactive Brokers' AND cp.pair = 'EURUSD' THEN 0.2
        WHEN b.name = 'FP Markets' AND cp.pair = 'EURUSD' THEN 0.1
        WHEN cp.pair = 'EURUSD' THEN 1.2
        WHEN cp.pair = 'GBPUSD' THEN 1.5
        WHEN cp.pair = 'USDJPY' THEN 1.1
        WHEN cp.pair = 'XAUUSD' THEN 35.0
        ELSE 2.2
    END,
    CASE 
        WHEN b.spread_type = 'Raw' THEN 3.50
        WHEN b.name = 'Interactive Brokers' THEN 2.00
        ELSE 0.00
    END,
    CASE WHEN cp.pair = 'EURUSD' THEN -0.65 ELSE -0.80 END,
    CASE WHEN cp.pair = 'EURUSD' THEN -0.35 ELSE -0.50 END
FROM brokers b
CROSS JOIN (
    SELECT 'EURUSD' as pair UNION ALL SELECT 'GBPUSD' UNION ALL SELECT 'USDJPY' UNION ALL 
    SELECT 'USDCHF' UNION ALL SELECT 'AUDUSD' UNION ALL SELECT 'USDCAD' UNION ALL SELECT 'NZDUSD' UNION ALL
    SELECT 'EURJPY' UNION ALL SELECT 'EURGBP' UNION ALL SELECT 'GBPJPY' UNION ALL SELECT 'AUDJPY' UNION ALL
    SELECT 'XAUUSD' UNION ALL SELECT 'XAGUSD' UNION ALL SELECT 'US30' UNION ALL SELECT 'SPX500'
) cp;