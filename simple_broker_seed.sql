-- Simple Broker Data Seeding - Split into smaller chunks

-- Clear existing data
DELETE FROM brokers;

-- Insert top 10 major brokers first
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
('Exness', 'exness', 4.2, 5.0, '/static/images/brokers/exness-logo.png', 'https://www.exness.com', 2008, 'Limassol, Cyprus', 1, 1, '1:2000', 'Raw', 1, 1, 0, 0);

-- Insert additional brokers
INSERT INTO brokers (name, slug, rating, rating_scale, logo_url, website_url, established, headquarters, is_regulated, min_deposit_usd, max_leverage, spread_type, demo_account, mobile_app, copy_trading, social_trading) VALUES
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