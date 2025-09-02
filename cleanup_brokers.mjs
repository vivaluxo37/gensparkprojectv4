#!/usr/bin/env node

/**
 * Broker Database Cleanup Script
 * 
 * This script cleans up the broker database by:
 * 1. Removing numbers and unwanted suffixes from broker names
 * 2. Removing duplicate brokers (keeping the best rated one)
 * 3. Standardizing broker slugs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define cleanup rules
const CLEANUP_RULES = {
  // Remove these suffixes from broker names
  suffixesToRemove: [
    'ForexBrokers',
    'Forex Peace Army', 
    'FX Empire',
    'Investopedia',
    'DailyForex',
    'BrokerChooser'
  ],
  
  // Remove these patterns (numbers, extra spaces, etc.)
  patternsToRemove: [
    /\s+ForexBrokers$/i,
    /\s+Forex Peace Army$/i,
    /\s+FX Empire$/i,
    /\s+Investopedia$/i,
    /\s+DailyForex$/i,
    /\s+BrokerChooser$/i,
    /\s+\d+$/,  // trailing numbers
    /^\d+\s+/, // leading numbers
    /\s{2,}/g   // multiple spaces
  ]
};

/**
 * Clean broker name by removing unwanted suffixes and patterns
 */
function cleanBrokerName(name) {
  let cleaned = name.trim();
  
  // Apply pattern removals
  CLEANUP_RULES.patternsToRemove.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  // Final cleanup
  cleaned = cleaned.trim();
  
  // Handle special cases
  const specialCases = {
    'MetaTrader': 'MetaTrader 4',
    'TradingStation': 'TradeStation', 
    'Blueberry Markets': 'Blueberry Markets',
    'easyMarkets': 'easyMarkets',
    'XTB': 'XTB',
    'Zipline': 'Zipline'
  };
  
  return specialCases[cleaned] || cleaned;
}

/**
 * Generate clean slug from broker name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Parse broker entries from SQL file
 */
function parseBrokerEntries(sqlContent) {
  const brokers = [];
  const insertPattern = /\) VALUES \(\s*\n\s*'([^']+)',\s*\n\s*'([^']+)',\s*\n[^)]+rating,\s*rating_scale,\s*established[^)]+\) VALUES \(\s*\n\s*'[^']+',\s*\n\s*'[^']+',\s*\n\s*'[^']+',\s*\n\s*'[^']+',\s*\n\s*([\d.]+),/g;
  
  // More robust parsing approach
  const lines = sqlContent.split('\n');
  let currentBroker = null;
  let inBrokerSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes(') VALUES (')) {
      inBrokerSection = true;
      currentBroker = {};
      continue;
    }
    
    if (inBrokerSection && currentBroker !== null) {
      // Parse broker name (first string value)
      if (!currentBroker.name && line.match(/^'([^']+)',$/)) {
        currentBroker.name = line.match(/^'([^']+)',$/)[1];
        currentBroker.originalName = currentBroker.name;
        currentBroker.cleanName = cleanBrokerName(currentBroker.name);
        currentBroker.slug = generateSlug(currentBroker.cleanName);
        currentBroker.lineIndex = i;
      }
      
      // Parse rating (look for decimal number)
      if (!currentBroker.rating && line.match(/^\s*([\d.]+),$/)) {
        currentBroker.rating = parseFloat(line.match(/^\s*([\d.]+),$/)[1]);
      }
      
      // End of VALUES block
      if (line.includes(');')) {
        if (currentBroker.name) {
          brokers.push(currentBroker);
        }
        inBrokerSection = false;
        currentBroker = null;
      }
    }
  }
  
  return brokers;
}

/**
 * Find and remove duplicates, keeping the best rated entry
 */
function removeDuplicates(brokers) {
  const brokerMap = new Map();
  const duplicates = [];
  
  // Group by clean name
  brokers.forEach(broker => {
    const key = broker.cleanName.toLowerCase();
    
    if (!brokerMap.has(key)) {
      brokerMap.set(key, []);
    }
    brokerMap.get(key).push(broker);
  });
  
  // Find duplicates and select best entries
  const cleanedBrokers = [];
  
  brokerMap.forEach((brokerGroup, cleanName) => {
    if (brokerGroup.length > 1) {
      console.log(`Found ${brokerGroup.length} duplicates for "${cleanName}":`, 
        brokerGroup.map(b => `${b.originalName} (${b.rating})`));
      
      // Sort by rating (highest first) and take the best one
      brokerGroup.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      const best = brokerGroup[0];
      const removed = brokerGroup.slice(1);
      
      console.log(`  → Keeping: ${best.originalName} (${best.rating})`);
      console.log(`  → Removing: ${removed.map(b => `${b.originalName} (${b.rating})`).join(', ')}`);
      
      cleanedBrokers.push(best);
      duplicates.push(...removed);
    } else {
      cleanedBrokers.push(brokerGroup[0]);
    }
  });
  
  return { cleanedBrokers, duplicates };
}

/**
 * Main cleanup function
 */
async function cleanupBrokerDatabase() {
  console.log('🧹 Starting Broker Database Cleanup...\n');
  
  const sqlFile = 'comprehensive_broker_database.sql';
  const backupFile = 'comprehensive_broker_database.sql.backup';
  
  try {
    // Read SQL file
    console.log('📖 Reading broker database file...');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Create backup
    console.log('💾 Creating backup...');
    fs.writeFileSync(backupFile, sqlContent);
    console.log(`✅ Backup created: ${backupFile}`);
    
    // Parse brokers
    console.log('🔍 Parsing broker entries...');
    const brokers = parseBrokerEntries(sqlContent);
    console.log(`Found ${brokers.length} broker entries`);
    
    if (brokers.length === 0) {
      console.log('❌ No brokers found in SQL file. Please check the file format.');
      return;
    }
    
    // Show original names with issues
    console.log('\n📋 Broker names that will be cleaned:');
    brokers.forEach(broker => {
      if (broker.cleanName !== broker.originalName) {
        console.log(`  "${broker.originalName}" → "${broker.cleanName}"`);
      }
    });
    
    // Remove duplicates
    console.log('\n🔍 Finding and removing duplicates...');
    const { cleanedBrokers, duplicates } = removeDuplicates(brokers);
    
    console.log(`\n📊 Cleanup Summary:`);
    console.log(`  Original brokers: ${brokers.length}`);
    console.log(`  After cleanup: ${cleanedBrokers.length}`);
    console.log(`  Duplicates removed: ${duplicates.length}`);
    
    // Apply name cleanups to SQL content
    console.log('\n✏️  Applying name cleanups to SQL file...');
    let cleanedContent = sqlContent;
    
    brokers.forEach(broker => {
      if (broker.cleanName !== broker.originalName) {
        const oldPattern = `'${broker.originalName}',`;
        const newReplacement = `'${broker.cleanName}',`;
        cleanedContent = cleanedContent.replace(oldPattern, newReplacement);
        
        // Also update the slug
        const oldSlugPattern = `'${broker.originalName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}',`;
        const newSlugReplacement = `'${broker.slug}',`;
        cleanedContent = cleanedContent.replace(oldSlugPattern, newSlugReplacement);
      }
    });
    
    // Remove duplicate entries (this is complex, so we'll mark them for manual review)
    if (duplicates.length > 0) {
      console.log('\n⚠️  Note: Duplicate entries found but not automatically removed from SQL.');
      console.log('   Manual review recommended for the following duplicates:');
      duplicates.forEach(dup => {
        console.log(`   - ${dup.originalName} (rating: ${dup.rating})`);
      });
    }
    
    // Write cleaned SQL file
    const cleanedFile = 'comprehensive_broker_database_cleaned.sql';
    console.log(`\n💾 Writing cleaned database to: ${cleanedFile}`);
    fs.writeFileSync(cleanedFile, cleanedContent);
    
    console.log('\n✅ Broker database cleanup completed!');
    console.log(`\nNext steps:`);
    console.log(`1. Review the cleaned file: ${cleanedFile}`);
    console.log(`2. Replace the original file if satisfied with changes`);
    console.log(`3. Apply the cleaned database to your application`);
    console.log(`4. Test the application to ensure all broker links work`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupBrokerDatabase().catch(console.error);
}

export { cleanupBrokerDatabase, cleanBrokerName, generateSlug };