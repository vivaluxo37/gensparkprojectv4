-- Broker Logo Update SQL Commands
-- Run these commands to update broker logos in the database

UPDATE brokers SET logo_url = '/static/images/brokers/ig-markets.png' WHERE slug = 'ig-markets' OR name LIKE '%IG Markets%';
UPDATE brokers SET logo_url = '/static/images/brokers/pepperstone.png' WHERE slug = 'pepperstone' OR name LIKE '%Pepperstone%';
UPDATE brokers SET logo_url = '/static/images/brokers/ic-markets.png' WHERE slug = 'ic-markets' OR name LIKE '%IC Markets%';
UPDATE brokers SET logo_url = '/static/images/brokers/xm.png' WHERE slug = 'xm-group' OR name LIKE '%XM Group%' OR name LIKE '%XM%';
UPDATE brokers SET logo_url = '/static/images/brokers/oanda.png' WHERE slug = 'oanda' OR name LIKE '%OANDA%';
UPDATE brokers SET logo_url = '/static/images/brokers/plus500.png' WHERE slug = 'plus500' OR name LIKE '%Plus500%';
UPDATE brokers SET logo_url = '/static/images/brokers/fp-markets.png' WHERE slug = 'fp-markets' OR name LIKE '%FP Markets%';
UPDATE brokers SET logo_url = '/static/images/brokers/exness.png' WHERE slug = 'exness' OR name LIKE '%Exness%';
UPDATE brokers SET logo_url = '/static/images/brokers/hotforex.png' WHERE slug = 'hotforex' OR name LIKE '%HotForex%';
UPDATE brokers SET logo_url = '/static/images/brokers/fxtm.png' WHERE slug = 'fxtm' OR name LIKE '%FXTM%';
UPDATE brokers SET logo_url = '/static/images/brokers/avatrade.png' WHERE slug = 'avatrade' OR name LIKE '%AvaTrade%';
UPDATE brokers SET logo_url = '/static/images/brokers/fxpro.png' WHERE slug = 'fxpro' OR name LIKE '%FxPro%';
UPDATE brokers SET logo_url = '/static/images/brokers/thinkmarkets.png' WHERE slug = 'thinkmarkets' OR name LIKE '%ThinkMarkets%';
UPDATE brokers SET logo_url = '/static/images/brokers/admirals.png' WHERE slug = 'admirals' OR name LIKE '%Admirals%';
UPDATE brokers SET logo_url = '/static/images/brokers/forex-com.png' WHERE slug = 'forex-com' OR name LIKE '%Forex.com%';
UPDATE brokers SET logo_url = '/static/images/brokers/cmc-markets.png' WHERE slug = 'cmc-markets' OR name LIKE '%CMC Markets%';
UPDATE brokers SET logo_url = '/static/images/brokers/city-index.png' WHERE slug = 'city-index' OR name LIKE '%City Index%';
UPDATE brokers SET logo_url = '/static/images/brokers/saxo-bank.png' WHERE slug = 'saxo-bank' OR name LIKE '%Saxo Bank%';
UPDATE brokers SET logo_url = '/static/images/brokers/interactive-brokers.png' WHERE slug = 'interactive-brokers' OR name LIKE '%Interactive Brokers%';
UPDATE brokers SET logo_url = '/static/images/brokers/charles-schwab.png' WHERE slug = 'charles-schwab' OR name LIKE '%Charles Schwab%';
UPDATE brokers SET logo_url = '/static/images/brokers/td-ameritrade.png' WHERE slug = 'td-ameritrade' OR name LIKE '%TD Ameritrade%';
UPDATE brokers SET logo_url = '/static/images/brokers/etrade.png' WHERE slug = 'etrade' OR name LIKE '%E*TRADE%';
UPDATE brokers SET logo_url = '/static/images/brokers/fbs.png' WHERE slug = 'fbs' OR name LIKE '%FBS%';
UPDATE brokers SET logo_url = '/static/images/brokers/tickmill.png' WHERE slug = 'tickmill' OR name LIKE '%Tickmill%';
UPDATE brokers SET logo_url = '/static/images/brokers/xtb.png' WHERE slug = 'xtb' OR name LIKE '%XTB%';
UPDATE brokers SET logo_url = '/static/images/brokers/libertex.png' WHERE slug = 'libertex' OR name LIKE '%Libertex%';
UPDATE brokers SET logo_url = '/static/images/brokers/iq-option.png' WHERE slug = 'iq-option' OR name LIKE '%IQ Option%';
UPDATE brokers SET logo_url = '/static/images/brokers/octafx.png' WHERE slug = 'octafx' OR name LIKE '%OctaFX%';
UPDATE brokers SET logo_url = '/static/images/brokers/instaforex.png' WHERE slug = 'instaforex' OR name LIKE '%InstaForex%';
UPDATE brokers SET logo_url = '/static/images/brokers/alpari.png' WHERE slug = 'alpari' OR name LIKE '%Alpari%';
UPDATE brokers SET logo_url = '/static/images/brokers/roboforex.png' WHERE slug = 'roboforex' OR name LIKE '%RoboForex%';

-- Verify updates
SELECT name, slug, logo_url FROM brokers WHERE logo_url LIKE '/static/images/brokers/%' ORDER BY name;