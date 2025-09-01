-- Simple SQLite cleanup of remaining duplicates
-- Remove brokers with numeric suffixes when base version exists

BEGIN TRANSACTION;

-- Delete specific duplicate brokers that we know have base versions
DELETE FROM brokers WHERE name IN (
  'FXDD 2', 'FXTM 1', 'FXTM 2', 'FXTM 3', 'Forex.com 1', 'Forex.com 2',
  'FxPro 1', 'FxPro 2', 'FxPro 3', 'HotForex 1', 'HotForex 2', 'HotForex 3',
  'IC Markets 1', 'IC Markets 2', 'IC Markets 3', 'InstaForex 1', 'InstaForex 2',
  'Interactive Brokers 1', 'Interactive Brokers 2', 'Interactive Brokers 3',
  'LMAX Exchange 1', 'LMAX Exchange 2', 'RoboForex 1', 'RoboForex 2',
  'Saxo Bank 1', 'Saxo Bank 2', 'Swissquote 1', 'Swissquote 2',
  'TD Ameritrade 1', 'TD Ameritrade 2', 'ThinkMarkets 1', 'ThinkMarkets 2', 'ThinkMarkets 3',
  'Tickmill 1', 'Tickmill 2', 'Vantage FX 1', 'Vantage FX 2',
  'eToro 1', 'eToro 2', 'eToro 3', 'easyMarkets 1', 'easyMarkets 2', 'easyMarkets 3'
);

COMMIT;