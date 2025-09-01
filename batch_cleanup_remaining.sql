-- Batch cleanup of remaining numeric suffixes and duplicates
-- This removes all remaining brokers with numeric suffixes that are duplicates

BEGIN TRANSACTION;

-- Remove remaining duplicate brokers with numeric suffixes
-- Keep only the base version (without numeric suffix) when it exists

DELETE FROM brokers WHERE id IN (
  SELECT b1.id 
  FROM brokers b1
  WHERE b1.name LIKE '% 1' OR b1.name LIKE '% 2' OR b1.name LIKE '% 3'
  AND EXISTS (
    SELECT 1 FROM brokers b2 
    WHERE b2.name = TRIM(REGEXP_REPLACE(b1.name, ' \d+$', ''))
    AND b2.id != b1.id
  )
);

-- For brokers with numeric suffixes that don't have a base version,
-- update them to remove the suffix
UPDATE brokers 
SET 
  name = TRIM(REGEXP_REPLACE(name, ' \d+$', '')),
  slug = LOWER(REPLACE(REPLACE(REPLACE(TRIM(REGEXP_REPLACE(name, ' \d+$', '')), ' ', '-'), '*', ''), '.', ''))
WHERE 
  (name LIKE '% 1' OR name LIKE '% 2' OR name LIKE '% 3')
  AND NOT EXISTS (
    SELECT 1 FROM brokers b2 
    WHERE b2.name = TRIM(REGEXP_REPLACE(brokers.name, ' \d+$', ''))
    AND b2.id != brokers.id
  );

COMMIT;

-- Show final results
SELECT 'Final broker count:' as status, COUNT(*) as count FROM brokers;

SELECT 'Remaining brokers with numeric suffixes:' as status, COUNT(*) as count 
FROM brokers 
WHERE name LIKE '% 1' OR name LIKE '% 2' OR name LIKE '% 3';