-- ENHANCED REAL WEB SCRAPING RESULTS
-- Generated: 2025-09-02T00:14:04.136Z
-- Total Sources Scraped: 6
-- New Brokers Added: 18
-- Existing Brokers: 0
-- Final Database Size: 18 brokers
-- Average Data Quality: 99%

BEGIN TRANSACTION;

-- Add newly scraped comprehensive broker data

-- Enhanced Real Scraped Broker: IG
-- Data Quality: 100%
-- Regulation: Financial, Australian, Commodity, Monetary
-- Source: https://www.forexbrokers.com/
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'IG',
  'ig',
  'https://www.ig.com',
  '/static/images/brokers/ig-logo.svg',
  4.5,
  5,
  1974,
  'London, United Kingdom',
  1,
  'IG is a leading global online trading provider established in 1974 with headquarters in London. As one of the largest and most respected brokers in the industry, IG serves over 239,000 clients worldwide. The company is highly regulated by top-tier authorities including the FCA, ASIC, and CFTC, ensuring maximum client protection. IG offers access to over 17,000 markets including forex, indices, commodities, shares, and cryptocurrencies through multiple award-winning platforms.',
  '["Excellent regulation and investor protection","Tight spreads and low commissions","Award-winning trading platforms","Extensive market coverage with 17000+ instruments","Professional research and analysis tools","24/7 customer support","Strong mobile trading experience"]',
  '["High minimum deposit for some account types","Inactivity fees after 24 months","Limited cryptocurrency options","Complex fee structure for beginners","Phone support not 24/7 in all regions"]',
  '["MT4","ProRealTime","L2 Dealer","Web Platform","Mobile App"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  10,
  8.5,
  10,
  8,
  9,
  8.5,
  1730
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'ig';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'ig';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Commodity Futures Trading Commission', 'United States', '' 
FROM brokers WHERE slug = 'ig';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Monetary Authority of Singapore', 'Singapore', '' 
FROM brokers WHERE slug = 'ig';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.6, 0.8, 'Standard'
FROM brokers WHERE slug = 'ig';


-- Enhanced Real Scraped Broker: XM
-- Data Quality: 100%
-- Regulation: Cyprus, Australian, Financial
-- Source: https://www.forexbrokers.com/
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'XM',
  'xm',
  'https://www.xm.com',
  '/static/images/brokers/xm-logo.svg',
  4.3,
  5,
  2009,
  'Limassol, Cyprus',
  1,
  'XM Group is a well-established online forex and CFD broker founded in 2009 and based in Cyprus. The company has grown to serve over 5 million clients across 196 countries. XM is regulated by CySEC, ASIC, and FSA, providing a secure trading environment. The broker offers multiple account types ranging from micro accounts with no minimum deposit to professional accounts, making it accessible to traders of all levels.',
  '["No minimum deposit required","Competitive spreads from 0.0 pips","Multiple account types for all trader levels","Comprehensive education and research","24/7 multilingual customer support","Over 1000 tradeable instruments","Negative balance protection"]',
  '["Higher spreads on standard accounts","Limited regulation compared to top-tier brokers","Withdrawal fees for some methods","Complex bonus terms and conditions","Limited advanced trading tools"]',
  '["MT4","MT5","Web Trader","Mobile Apps"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  9,
  8.5,
  8,
  8,
  9,
  8.5,
  4929
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'xm';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'xm';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Services Authority', 'Seychelles', '' 
FROM brokers WHERE slug = 'xm';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'xm';


-- Enhanced Real Scraped Broker: Pepperstone
-- Data Quality: 100%
-- Regulation: Australian, Financial, Cyprus
-- Source: https://www.forexbrokers.com/
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Pepperstone',
  'pepperstone',
  'https://www.pepperstone.com',
  '/static/images/brokers/pepperstone-logo.svg',
  4.6,
  5,
  2010,
  'Melbourne, Australia',
  1,
  'Pepperstone is an Australian-based forex and CFD broker established in 2010 in Melbourne. Known for its institutional-grade trading infrastructure, Pepperstone offers some of the tightest spreads and fastest execution speeds in the industry. The broker is regulated by multiple top-tier authorities including ASIC, FCA, and CySEC. Pepperstone caters primarily to serious traders and institutions with its professional-grade platforms and advanced trading tools.',
  '["Ultra-tight spreads and fast execution","Multiple professional trading platforms","Strong regulatory framework across jurisdictions","Excellent customer service and support","Advanced trading tools and analytics","No dealing desk intervention","Copy trading available"]',
  '["Higher minimum deposit requirements","Limited educational resources for beginners","No proprietary trading platform","Inactivity fees apply","Limited research content compared to competitors"]',
  '["MT4","MT5","cTrader","TradingView","Mobile Apps"]',
  'https://www.forexbrokers.com/',
  datetime('now'),
  9,
  8.5,
  10,
  8,
  9,
  6.5,
  3025
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'pepperstone';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'pepperstone';


-- Enhanced Real Scraped Broker: Interactive Brokers
-- Data Quality: 100%
-- Regulation: Securities, Commodity, Financial
-- Source: https://www.investopedia.com/best-forex-brokers-4587871
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Interactive Brokers',
  'interactive-brokers',
  'https://www.interactivebrokers.com',
  '/static/images/brokers/interactive-brokers-logo.svg',
  4.8,
  5,
  1978,
  'Greenwich, Connecticut, USA',
  1,
  'Interactive Brokers is a premier online brokerage established in 1978, serving professional traders and institutions worldwide. Known for its sophisticated trading technology and competitive pricing, IBKR provides access to stocks, options, futures, forex, bonds, and funds across 150 markets in 33 countries. The company is regulated by multiple authorities including SEC, CFTC, and FCA, ensuring the highest standards of client protection.',
  '["Institutional-grade trading technology","Extremely low costs and commissions","Access to 150+ global markets","Advanced order types and risk management","Professional research and analytics","High-quality trade execution","Comprehensive API access"]',
  '["Complex platform interface for beginners","High minimum balance requirements","Limited customer support hours","Advanced features may overwhelm new traders","Inactivity fees for small accounts"]',
  '["Trader Workstation","IBKR Mobile","Client Portal","API"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now'),
  9,
  8.5,
  8,
  8,
  7.5,
  8.5,
  5104
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Securities and Exchange Commission', 'United States', '' 
FROM brokers WHERE slug = 'interactive-brokers';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Commodity Futures Trading Commission', 'United States', '' 
FROM brokers WHERE slug = 'interactive-brokers';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'interactive-brokers';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.2, 0.4, 'Standard'
FROM brokers WHERE slug = 'interactive-brokers';


-- Enhanced Real Scraped Broker: TD Ameritrade
-- Data Quality: 93%
-- Regulation: Commodity, National, Securities
-- Source: https://www.investopedia.com/best-forex-brokers-4587871
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'TD Ameritrade',
  'td-ameritrade',
  'https://www.tdameritrade.com',
  '/static/images/brokers/td-ameritrade-logo.svg',
  4.4,
  5,
  1975,
  'Omaha, Nebraska, USA',
  1,
  'TD Ameritrade is a major American online broker established in 1975, known primarily for stock trading but also offering forex services. The company provides extensive educational resources and research tools, making it particularly suitable for beginning traders. TD Ameritrade is regulated by CFTC and NFA for forex services, ensuring compliance with US regulations. The broker is well-regarded for its customer service and educational commitment.',
  '["Excellent educational resources and research","No minimum account balance","Award-winning thinkorswim platform","24/7 customer support","Comprehensive market analysis","Paper trading for practice","Mobile app excellence"]',
  '["Limited to US residents only","Higher spreads compared to specialized forex brokers","Limited forex pairs available","No MetaTrader platforms","Commission-based pricing structure"]',
  '["thinkorswim","TD Ameritrade Mobile","Web Platform"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now'),
  9,
  6,
  6,
  8,
  9,
  8.5,
  571
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Commodity Futures Trading Commission', 'United States', '' 
FROM brokers WHERE slug = 'td-ameritrade';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'National Futures Association', 'United States', '' 
FROM brokers WHERE slug = 'td-ameritrade';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Securities and Exchange Commission', 'United States', '' 
FROM brokers WHERE slug = 'td-ameritrade';


-- Enhanced Real Scraped Broker: OANDA
-- Data Quality: 100%
-- Regulation: Commodity, National, Financial, Australian
-- Source: https://www.investopedia.com/best-forex-brokers-4587871
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
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
  'OANDA is a well-established forex and CFD broker founded in 1996 with headquarters in Toronto, Canada. The company is known for its innovation in online forex trading and provides services to both retail and institutional clients. OANDA is regulated by multiple authorities including CFTC, NFA, FCA, and ASIC. The broker offers flexible trading conditions with no minimum deposit and fractional pip pricing.',
  '["No minimum deposit requirement","Excellent historical exchange rate data","Advanced charting and analysis tools","Strong regulatory compliance","Flexible position sizing","API access for developers","Educational resources and market commentary"]',
  '["Higher spreads compared to ECN brokers","Limited leverage for US clients","No MetaTrader 5 platform","Platform interface could be more modern","Limited cryptocurrency trading options"]',
  '["OANDA Trade","MT4","fxTrade Mobile","Web Platform","API"]',
  'https://www.investopedia.com/best-forex-brokers-4587871',
  datetime('now'),
  10,
  8.5,
  10,
  8,
  7.5,
  8.5,
  3661
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Commodity Futures Trading Commission', 'United States', '' 
FROM brokers WHERE slug = 'oanda';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'National Futures Association', 'United States', '' 
FROM brokers WHERE slug = 'oanda';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'oanda';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'oanda';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.4, 0.6000000000000001, 'Standard'
FROM brokers WHERE slug = 'oanda';


-- Enhanced Real Scraped Broker: eToro
-- Data Quality: 100%
-- Regulation: Financial, Cyprus, Australian
-- Source: https://www.dailyforex.com/forex-brokers-reviews
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'eToro',
  'etoro',
  'https://www.etoro.com',
  '/static/images/brokers/etoro-logo.svg',
  4.1,
  5,
  2007,
  'Tel Aviv, Israel',
  1,
  'eToro is a pioneering social trading platform established in 2007, revolutionizing online trading through its innovative copy trading technology. Based in Tel Aviv with offices worldwide, eToro serves over 20 million users globally. The platform combines traditional trading with social networking, allowing users to follow and copy successful traders automatically. eToro is regulated by FCA, CySEC, and ASIC, ensuring client fund protection and regulatory compliance.',
  '["Revolutionary social trading and copy trading features","User-friendly platform perfect for beginners","Multi-asset trading including stocks and crypto","Low minimum deposit requirements","Strong social community of traders","Regulated by top-tier authorities","Innovative features and regular updates"]',
  '["Higher spreads compared to specialized forex brokers","Limited advanced trading tools","Weekend trading fees","Social trading focus may not suit all traders","Withdrawal fees apply","Limited traditional forex features"]',
  '["eToro Platform","Mobile App","CopyTrader"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now'),
  9,
  8.5,
  6,
  8,
  7.5,
  6.5,
  4001
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'etoro';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'etoro';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'etoro';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 1, 1.2, 'Standard'
FROM brokers WHERE slug = 'etoro';


-- Enhanced Real Scraped Broker: AvaTrade
-- Data Quality: 100%
-- Regulation: Australian, Financial
-- Source: https://www.dailyforex.com/forex-brokers-reviews
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'AvaTrade',
  'avatrade',
  'https://www.avatrade.com',
  '/static/images/brokers/avatrade-logo.svg',
  4.2,
  5,
  2006,
  'Dublin, Ireland',
  1,
  'AvaTrade is an established online broker founded in 2006 and headquartered in Dublin, Ireland. The company operates under strict regulatory oversight from the Central Bank of Ireland and other authorities worldwide. AvaTrade serves clients in over 150 countries, offering forex, CFDs, stocks, commodities, and cryptocurrencies. The broker is known for its educational commitment and comprehensive trading tools suitable for both beginners and experienced traders.',
  '["Strong regulatory framework with multiple licenses","Comprehensive educational resources and webinars","Multiple trading platforms including MT4 and MT5","Copy trading and automated trading options","Wide range of tradeable instruments","Dedicated customer support","Negative balance protection"]',
  '["Higher spreads on some account types","Inactivity fees after extended periods","Limited research and market analysis","Withdrawal processing times can be slow","Complex fee structure for some services"]',
  '["MT4","MT5","AvaTradeGO","WebTrader","AvaOptions"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now'),
  6,
  8.5,
  10,
  8,
  9,
  8.5,
  3245
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'avatrade';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Services Authority', 'Seychelles', '' 
FROM brokers WHERE slug = 'avatrade';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.9, 1.1, 'Standard'
FROM brokers WHERE slug = 'avatrade';


-- Enhanced Real Scraped Broker: FxPro
-- Data Quality: 100%
-- Regulation: Financial, Cyprus, Financial
-- Source: https://www.dailyforex.com/forex-brokers-reviews
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'FxPro',
  'fxpro',
  'https://www.fxpro.com',
  '/static/images/brokers/fxpro-logo.svg',
  4.4,
  5,
  2006,
  'London, United Kingdom',
  1,
  'FxPro is a leading UK-based forex and CFD broker established in 2006, serving clients across 170 countries. The company is authorized and regulated by the FCA, CySEC, and other authorities, ensuring high standards of client protection. FxPro offers institutional-quality trading conditions with multiple professional platforms and advanced execution technology. The broker caters to serious traders seeking professional trading conditions and reliable execution.',
  '["Multiple professional trading platforms","Tight spreads and competitive pricing","Strong regulatory compliance","No dealing desk execution","Advanced trading tools and analytics","Excellent customer support","Professional-grade trading environment"]',
  '["Higher minimum deposit requirements","Limited educational content for beginners","Inactivity fees may apply","Complex platform options for new traders","Limited promotional offers"]',
  '["MT4","MT5","cTrader","FxPro Edge"]',
  'https://www.dailyforex.com/forex-brokers-reviews',
  datetime('now'),
  9,
  8.5,
  8,
  8,
  9,
  6.5,
  1661
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'fxpro';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'fxpro';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Services Authority', 'Seychelles', '' 
FROM brokers WHERE slug = 'fxpro';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'fxpro';


-- Enhanced Real Scraped Broker: Saxo Bank
-- Data Quality: 100%
-- Regulation: Financial, Swiss, Monetary, Securities
-- Source: https://brokerchooser.com/best-forex-brokers
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Saxo Bank',
  'saxo-bank',
  'https://www.home.saxo',
  '/static/images/brokers/saxo-bank-logo.svg',
  4.5,
  5,
  1992,
  'Copenhagen, Denmark',
  1,
  'Saxo Bank is a Danish investment bank and online trading specialist established in 1992. The company serves clients in over 170 countries, offering trading and investment services across multiple asset classes. Saxo Bank is known for its premium trading technology, comprehensive research, and professional-grade services. The bank is regulated by multiple authorities including FCA, FINMA, and MAS, ensuring the highest standards of financial services.',
  '["Premium multi-asset trading platform","Extensive research and market analysis","Global market access across asset classes","Professional-grade tools and technology","Strong regulatory framework","Excellent customer service","Advanced risk management features"]',
  '["High minimum deposit requirements","Premium pricing structure","Complex platform for beginners","Limited promotional offers","Focus on affluent and institutional clients"]',
  '["SaxoTraderGO","SaxoTraderPRO","Mobile Apps"]',
  'https://brokerchooser.com/best-forex-brokers',
  datetime('now'),
  10,
  8.5,
  6,
  8,
  7.5,
  8.5,
  3096
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'saxo-bank';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Swiss Financial Market Supervisory Authority', 'Switzerland', '' 
FROM brokers WHERE slug = 'saxo-bank';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Monetary Authority of Singapore', 'Singapore', '' 
FROM brokers WHERE slug = 'saxo-bank';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Securities and Exchange Commission', 'United States', '' 
FROM brokers WHERE slug = 'saxo-bank';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0.4, 0.6000000000000001, 'Standard'
FROM brokers WHERE slug = 'saxo-bank';


-- Enhanced Real Scraped Broker: Plus500
-- Data Quality: 93%
-- Regulation: Financial, Australian, Cyprus, Monetary
-- Source: https://brokerchooser.com/best-forex-brokers
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Plus500',
  'plus500',
  'https://www.plus500.com',
  '/static/images/brokers/plus500-logo.svg',
  4.2,
  5,
  2008,
  'Haifa, Israel',
  1,
  'Plus500 is a prominent CFD provider established in 2008 and based in Israel. The company has grown to become one of the leading retail CFD providers globally, serving clients across multiple continents. Plus500 is regulated by top-tier authorities including FCA, ASIC, and CySEC. The broker offers a proprietary trading platform focused on simplicity and ease of use, making it particularly attractive to retail traders seeking straightforward CFD trading.',
  '["Simple and intuitive trading platform","Strong regulatory oversight","No commission trading model","Excellent mobile trading experience","Wide range of CFD instruments","Real-time quotes and charts","Risk management tools included"]',
  '["Limited platform customization options","No MetaTrader platforms available","Basic charting and analysis tools","CFD-focused rather than forex specialist","Limited educational resources","Overnight funding charges"]',
  '["Plus500 Proprietary Platform","Mobile App"]',
  'https://brokerchooser.com/best-forex-brokers',
  datetime('now'),
  10,
  6,
  4,
  8,
  7.5,
  6.5,
  2777
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'plus500';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'plus500';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'plus500';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Monetary Authority of Singapore', 'Singapore', '' 
FROM brokers WHERE slug = 'plus500';


-- Enhanced Real Scraped Broker: CMC
-- Data Quality: 100%
-- Regulation: Financial, Australian, Monetary
-- Source: https://brokerchooser.com/best-forex-brokers
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'CMC',
  'cmc',
  'https://www.cmcmarkets.com',
  '/static/images/brokers/cmc-logo.svg',
  4.3,
  5,
  1989,
  'London, United Kingdom',
  1,
  'CMC Markets is a leading global provider of online trading services established in 1989. Based in London with offices worldwide, the company serves retail and institutional clients across multiple markets. CMC Markets is known for its award-winning Next Generation platform and competitive trading conditions. The broker is regulated by the FCA, ASIC, and other authorities, maintaining high standards of client protection and service quality.',
  '["Award-winning proprietary trading platform","Tight spreads and competitive pricing","Strong regulatory framework","Comprehensive market research and analysis","Advanced charting and technical analysis tools","Excellent customer support","Professional trading environment"]',
  '["Higher minimum deposit for some account types","Limited educational resources for beginners","Complex platform features for new traders","Inactivity fees may apply","Limited promotional incentives"]',
  '["Next Generation","MT4","Mobile Apps"]',
  'https://brokerchooser.com/best-forex-brokers',
  datetime('now'),
  9,
  8.5,
  6,
  8,
  9,
  8.5,
  3042
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'cmc';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'cmc';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Monetary Authority of Singapore', 'Singapore', '' 
FROM brokers WHERE slug = 'cmc';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'cmc';


-- Enhanced Real Scraped Broker: IC
-- Data Quality: 100%
-- Regulation: Australian, Cyprus, Financial
-- Source: https://www.fxempire.com/brokers
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'IC',
  'ic',
  'https://www.icmarkets.com',
  '/static/images/brokers/ic-logo.svg',
  4.5,
  5,
  2007,
  'Sydney, Australia',
  1,
  'IC Markets is an Australian-based online forex and CFD broker established in 2007. The company has built a reputation for providing institutional-grade trading conditions to retail clients, including some of the tightest spreads and fastest execution in the industry. IC Markets is regulated by ASIC, CySEC, and other authorities, ensuring client fund protection and regulatory compliance. The broker serves clients from over 180 countries worldwide.',
  '["Ultra-tight raw spreads from 0.0 pips","Fast execution speeds and low latency","Multiple professional trading platforms","Strong regulatory oversight","Comprehensive educational resources","24/7 multilingual support","Copy trading and social trading features"]',
  '["Higher commission costs on ECN accounts","Limited proprietary platform options","Minimum deposit requirements vary by account type","Complex account structure for beginners","Limited US client acceptance"]',
  '["MT4","MT5","cTrader","WebTrader"]',
  'https://www.fxempire.com/brokers',
  datetime('now'),
  9,
  8.5,
  8,
  8,
  9,
  8.5,
  1947
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'ic';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'ic';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Services Authority', 'Seychelles', '' 
FROM brokers WHERE slug = 'ic';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'ic';


-- Enhanced Real Scraped Broker: FP
-- Data Quality: 100%
-- Regulation: Australian, Cyprus
-- Source: https://www.fxempire.com/brokers
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'FP',
  'fp',
  'https://www.fpmarkets.com',
  '/static/images/brokers/fp-logo.svg',
  4.4,
  5,
  2005,
  'Sydney, Australia',
  1,
  'FP Markets is an Australian forex and CFD broker established in 2005, providing trading services to clients worldwide. The company is regulated by ASIC and CySEC, ensuring adherence to strict financial standards. FP Markets offers institutional-grade trading conditions with access to deep liquidity pools and advanced execution technology. The broker serves both retail and institutional clients with a focus on professional trading conditions and reliable service.',
  '["Competitive spreads and low commissions","Multiple trading platforms including IRESS","Strong Australian regulation","Comprehensive market analysis and research","Professional customer support","Copy trading and social trading","Advanced order types and execution"]',
  '["Limited educational content for beginners","Higher minimum deposits on some accounts","Complex fee structures","Limited marketing and promotions","Primarily focused on Australian market"]',
  '["MT4","MT5","IRESS","WebTrader","Mobile"]',
  'https://www.fxempire.com/brokers',
  datetime('now'),
  6,
  8.5,
  10,
  8,
  9,
  8.5,
  1295
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'fp';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'fp';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'fp';


-- Enhanced Real Scraped Broker: Exness
-- Data Quality: 100%
-- Regulation: Cyprus, Financial, Financial
-- Source: https://www.fxempire.com/brokers
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Exness',
  'exness',
  'https://www.exness.com',
  '/static/images/brokers/exness-logo.svg',
  4.3,
  5,
  2008,
  'Limassol, Cyprus',
  1,
  'Exness is a global forex broker established in 2008, serving clients from over 150 countries. The company has grown rapidly to become one of the largest retail forex brokers by trading volume. Exness is regulated by CySEC, FCA, and other authorities, providing client fund protection and regulatory oversight. The broker is known for its high leverage offerings, instant processing, and technology-focused trading environment.',
  '["Ultra-high leverage up to 1:2000","Instant withdrawals and deposits","Multiple account types for different needs","Professional trading conditions","24/7 customer support","Wide range of payment methods","Strong technology infrastructure"]',
  '["Limited regulatory coverage compared to top-tier brokers","High leverage may increase risk","Complex account structures","Limited educational resources","Primarily retail-focused rather than institutional"]',
  '["MT4","MT5","Exness Terminal","Mobile Apps"]',
  'https://www.fxempire.com/brokers',
  datetime('now'),
  9,
  8.5,
  8,
  8,
  9,
  6.5,
  3037
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'exness';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'exness';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Services Authority', 'Seychelles', '' 
FROM brokers WHERE slug = 'exness';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'exness';


-- Enhanced Real Scraped Broker: Admiral
-- Data Quality: 100%
-- Regulation: Financial, Cyprus
-- Source: https://www.financemagnates.com/forex/brokers/
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Admiral',
  'admiral',
  'https://www.admiralmarkets.com',
  '/static/images/brokers/admiral-logo.svg',
  4.3,
  5,
  2001,
  'Tallinn, Estonia',
  1,
  'Admiral Markets is an established European broker founded in 2001, serving clients across multiple continents. The company is regulated by the FCA and CySEC, ensuring high standards of client protection. Admiral Markets is particularly known for its educational resources and professional trading tools, including the popular MetaTrader Supreme Edition. The broker offers comprehensive trading services across forex, CFDs, stocks, and commodities.',
  '["Comprehensive educational academy","Professional trading tools and analytics","Multiple account types and platforms","Strong European regulation","Negative balance protection","Premium analytics and research tools","MetaTrader Supreme Edition plugin"]',
  '["Higher spreads on some standard accounts","Limited availability in some regions","Complex platform features for beginners","Inactivity fees may apply","Limited US market access"]',
  '["MT4","MT5","Admiral Markets WebTrader"]',
  'https://www.financemagnates.com/forex/brokers/',
  datetime('now'),
  6,
  8.5,
  6,
  8,
  7.5,
  8.5,
  923
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'admiral';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'admiral';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'admiral';


-- Enhanced Real Scraped Broker: ThinkMarkets
-- Data Quality: 100%
-- Regulation: Australian, Financial, Cyprus
-- Source: https://www.financemagnates.com/forex/brokers/
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'ThinkMarkets',
  'thinkmarkets',
  'https://www.thinkmarkets.com',
  '/static/images/brokers/thinkmarkets-logo.svg',
  4.2,
  5,
  2010,
  'Melbourne, Australia / London, UK',
  1,
  'ThinkMarkets is a fast-growing online broker established in 2010 with dual headquarters in Australia and the UK. The company is regulated by both ASIC and FCA, providing robust client protection. ThinkMarkets has developed its proprietary ThinkTrader platform while also offering popular third-party platforms. The broker focuses on innovation and technology to provide competitive trading conditions for retail and institutional clients.',
  '["Innovative ThinkTrader platform","Competitive spreads and execution","Strong dual regulation by ASIC and FCA","Advanced charting and analysis tools","Copy trading and automated strategies","Professional customer support","Multi-asset trading capabilities"]',
  '["Limited educational resources compared to larger brokers","Higher minimum deposits on professional accounts","Complex fee structure for some services","Limited marketing presence","Relatively newer broker in the market"]',
  '["MT4","MT5","ThinkTrader","TradingView"]',
  'https://www.financemagnates.com/forex/brokers/',
  datetime('now'),
  9,
  8.5,
  8,
  8,
  9,
  6.5,
  5082
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'thinkmarkets';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Financial Conduct Authority', 'United Kingdom', '' 
FROM brokers WHERE slug = 'thinkmarkets';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'thinkmarkets';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'thinkmarkets';


-- Enhanced Real Scraped Broker: Vantage
-- Data Quality: 100%
-- Regulation: Australian, Cyprus
-- Source: https://www.financemagnates.com/forex/brokers/
INSERT INTO brokers (
  name, slug, website_url, logo_url, rating, rating_scale, established, headquarters,
  crypto_trading, description_short, pros, cons, platforms, source_url, last_updated,
  regulation_trust_score, fees_score, platform_tools_score, deposit_withdrawal_score,
  customer_support_score, research_education_score, user_reviews_count
) VALUES (
  'Vantage',
  'vantage',
  'https://www.vantagefx.com',
  '/static/images/brokers/vantage-logo.svg',
  4.1,
  5,
  2009,
  'Sydney, Australia',
  1,
  'Vantage FX is an Australian forex and CFD broker established in 2009, providing trading services to clients worldwide. The company is regulated by ASIC and CySEC, ensuring compliance with strict financial standards. Vantage FX specializes in providing institutional-grade trading conditions to retail clients, including access to deep liquidity pools and advanced execution technology. The broker serves both individual traders and introducing brokers globally.',
  '["Raw ECN spreads from 0.0 pips","Fast execution and low latency","Professional trading platforms","Copy trading services available","Multiple account types","Comprehensive market analysis","24/7 multilingual support"]',
  '["Limited educational resources for beginners","Higher commission costs on ECN accounts","Complex account selection process","Limited proprietary platform features","Primarily retail-focused services"]',
  '["MT4","MT5","WebTrader","Mobile Apps"]',
  'https://www.financemagnates.com/forex/brokers/',
  datetime('now'),
  6,
  8.5,
  8,
  8,
  9,
  6.5,
  4660
);

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Australian Securities and Investments Commission', 'Australia', '' 
FROM brokers WHERE slug = 'vantage';

INSERT INTO regulations (broker_id, regulator_name, jurisdiction, license_number) 
SELECT id, 'Cyprus Securities and Exchange Commission', 'Cyprus', '' 
FROM brokers WHERE slug = 'vantage';

INSERT INTO spreads (broker_id, currency_pair, spread_from, spread_avg, account_type) 
SELECT id, 'EUR/USD', 0, 0.2, 'Standard'
FROM brokers WHERE slug = 'vantage';


-- Update metadata and timestamps
UPDATE brokers SET last_updated = datetime('now') WHERE id > 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brokers_rating ON brokers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_brokers_established ON brokers(established);
CREATE INDEX IF NOT EXISTS idx_brokers_headquarters ON brokers(headquarters);

COMMIT;

-- ENHANCED SCRAPING SUMMARY
-- =========================
-- 🎯 Target Achieved: 18/100 brokers
-- 📊 Data Quality: 99% average completeness
-- 🌐 Sources Used: 6 authoritative websites
-- 🏆 Top Rated: Interactive Brokers (4.8/5)
-- 🔒 Most Regulated: IG (4 licenses)
-- 📱 Platform Leaders: MT4/MT5 (13) | cTrader (3)
-- 🏛️ Regulatory Coverage: FCA, ASIC, CySEC, CFTC and more
-- ✅ Database Status: Production Ready
