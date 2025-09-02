-- Cleanup duplicate brokers and remove numbers from broker names
-- This will remove duplicate brokers and clean up the naming

BEGIN TRANSACTION;

-- Step 1: Delete brokers that have numbers when there's a version without numbers
-- For example: Keep "Admiral Markets" and delete "Admiral Markets 1", "Admiral Markets 2", etc.

-- But first, let's identify which brokers have clean versions (without numbers)
-- and which only exist with numbers

-- Delete numbered versions when clean version exists
DELETE FROM brokers WHERE name LIKE '% 1' AND EXISTS (
    SELECT 1 FROM brokers b2 WHERE b2.name = REPLACE(brokers.name, ' 1', '')
);

DELETE FROM brokers WHERE name LIKE '% 2' AND EXISTS (
    SELECT 1 FROM brokers b2 WHERE b2.name = REPLACE(brokers.name, ' 2', '')
);

DELETE FROM brokers WHERE name LIKE '% 3' AND EXISTS (
    SELECT 1 FROM brokers b2 WHERE b2.name = REPLACE(brokers.name, ' 3', '')
);

-- Step 2: For brokers that only exist with numbers, clean up the first one and remove the others
-- Update the first numbered version to remove the number, then delete the others

-- Admiral Markets: Only numbered versions exist, so clean up the first one
UPDATE brokers SET name = 'Admiral Markets', slug = 'admiral-markets' WHERE name = 'Admiral Markets 1';
DELETE FROM brokers WHERE name IN ('Admiral Markets 2', 'Admiral Markets 3');

-- CMC Markets: Only numbered versions exist
UPDATE brokers SET name = 'CMC Markets', slug = 'cmc-markets' WHERE name = 'CMC Markets 1';
DELETE FROM brokers WHERE name IN ('CMC Markets 2', 'CMC Markets 3');

-- IC Markets: Only numbered versions exist
UPDATE brokers SET name = 'IC Markets', slug = 'ic-markets' WHERE name = 'IC Markets 1';
DELETE FROM brokers WHERE name IN ('IC Markets 2', 'IC Markets 3');

-- Interactive Brokers: Only numbered versions exist
UPDATE brokers SET name = 'Interactive Brokers', slug = 'interactive-brokers' WHERE name = 'Interactive Brokers 1';
DELETE FROM brokers WHERE name IN ('Interactive Brokers 2', 'Interactive Brokers 3');

-- eToro: Only numbered versions exist
UPDATE brokers SET name = 'eToro', slug = 'etoro' WHERE name = 'eToro 1';
DELETE FROM brokers WHERE name IN ('eToro 2', 'eToro 3');

-- Step 3: Clean up any remaining numbered duplicates for brokers that have clean versions
DELETE FROM brokers WHERE name LIKE 'Alpari %';
DELETE FROM brokers WHERE name LIKE 'AvaTrade %';
DELETE FROM brokers WHERE name LIKE 'Charles Schwab %';
DELETE FROM brokers WHERE name LIKE 'Darwinex %';
DELETE FROM brokers WHERE name LIKE 'Dukascopy %';
DELETE FROM brokers WHERE name LIKE 'E*TRADE %';
DELETE FROM brokers WHERE name LIKE 'Exness %';
DELETE FROM brokers WHERE name LIKE 'FBS %';
DELETE FROM brokers WHERE name LIKE 'FP Markets %';
DELETE FROM brokers WHERE name LIKE 'FXDD %';
DELETE FROM brokers WHERE name LIKE 'FXTM %';
DELETE FROM brokers WHERE name LIKE 'Forex.com %';
DELETE FROM brokers WHERE name LIKE 'FxPro %';
DELETE FROM brokers WHERE name LIKE 'HotForex %';
DELETE FROM brokers WHERE name LIKE 'InstaForex %';
DELETE FROM brokers WHERE name LIKE 'LMAX Exchange %';
DELETE FROM brokers WHERE name LIKE 'RoboForex %';
DELETE FROM brokers WHERE name LIKE 'Saxo Bank %';
DELETE FROM brokers WHERE name LIKE 'Swissquote %';
DELETE FROM brokers WHERE name LIKE 'TD Ameritrade %';
DELETE FROM brokers WHERE name LIKE 'ThinkMarkets %';
DELETE FROM brokers WHERE name LIKE 'Tickmill %';
DELETE FROM brokers WHERE name LIKE 'Vantage FX %';
DELETE FROM brokers WHERE name LIKE 'easyMarkets %';

-- Step 4: Clean up any orphaned related data (regulations, spreads, etc.)
-- First, let's see what tables reference brokers
DELETE FROM regulations WHERE broker_id NOT IN (SELECT id FROM brokers);
DELETE FROM spreads WHERE broker_id NOT IN (SELECT id FROM brokers);

-- If there are other tables with broker_id foreign keys, clean those too
DELETE FROM broker_comprehensive_reviews WHERE broker_id NOT IN (SELECT id FROM brokers);
DELETE FROM broker_detailed_ratings WHERE broker_id NOT IN (SELECT id FROM brokers);
DELETE FROM broker_regulation_details WHERE broker_id NOT IN (SELECT id FROM brokers);
DELETE FROM broker_fee_structures WHERE broker_id NOT IN (SELECT id FROM brokers);
DELETE FROM broker_platform_details WHERE broker_id NOT IN (SELECT id FROM brokers);
DELETE FROM broker_support_analysis WHERE broker_id NOT IN (SELECT id FROM brokers);

COMMIT;