#!/usr/bin/env tsx
/**
 * Apply Cleaned Broker Database to D1
 * This script applies the cleaned comprehensive_broker_database.sql to the D1 database
 */

import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function applyCleanedDatabase() {
    console.log('🚀 Applying cleaned broker database to D1...\n');
    
    try {
        // Check if cleaned SQL file exists
        if (!fs.existsSync('comprehensive_broker_database.sql')) {
            console.error('❌ comprehensive_broker_database.sql not found');
            console.log('Please ensure the cleaned database file exists');
            process.exit(1);
        }
        
        console.log('📁 Found cleaned database file');
        
        // Apply the SQL to D1 database using wrangler
        console.log('📤 Uploading to D1 database...');
        
        const command = 'npx wrangler d1 execute brokeranalysis-production --file=comprehensive_broker_database.sql';
        console.log(`Executing: ${command}\n`);
        
        const { stdout, stderr } = await execAsync(command, { 
            cwd: process.cwd(),
            maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large SQL files
        });
        
        if (stdout) {
            console.log('📊 D1 Output:');
            console.log(stdout);
        }
        
        if (stderr) {
            console.log('⚠️  D1 Messages:');
            console.log(stderr);
        }
        
        console.log('\n✅ Database update completed!');
        console.log('\nNext steps:');
        console.log('1. Test the application to ensure broker pages work correctly');
        console.log('2. Verify that duplicate brokers have been removed');
        console.log('3. Check that broker names no longer have unwanted suffixes');
        
    } catch (error) {
        console.error('❌ Error applying database:', error);
        
        if (error.message.includes('not found') || error.message.includes('command not found')) {
            console.log('\n💡 Alternative: Manual D1 update');
            console.log('You can manually upload the comprehensive_broker_database.sql file through:');
            console.log('1. Cloudflare Dashboard → Workers → D1 → Your Database');
            console.log('2. Import the comprehensive_broker_database.sql file');
            console.log('3. Or use: wrangler d1 execute brokeranalysis-production --file=comprehensive_broker_database.sql');
        }
        
        process.exit(1);
    }
}

// Run the script
applyCleanedDatabase().catch(console.error);