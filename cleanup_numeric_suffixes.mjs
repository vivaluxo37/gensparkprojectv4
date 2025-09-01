#!/usr/bin/env node

/**
 * Follow-up Cleanup: Remove Numeric Suffixes and Final Duplicates
 * This script removes numeric suffixes like " 1", " 2" from broker names
 * and eliminates any remaining duplicates in the database
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function removeNumericSuffixes() {
    console.log('🔧 Starting numeric suffix cleanup...\n');
    
    try {
        // First, let's get all brokers with numeric suffixes
        console.log('🔍 Identifying brokers with numeric suffixes...');
        
        const { stdout } = await execAsync(
            `cd /home/user/webapp && npx wrangler d1 execute brokeranalysis-production --command="SELECT id, name, slug FROM brokers WHERE name LIKE '% 1' OR name LIKE '% 2' OR name LIKE '% 3' ORDER BY name;"`
        );
        
        // Extract JSON from wrangler output
        const jsonMatch = stdout.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (!jsonMatch) {
            console.log('❌ Could not parse wrangler output');
            console.log('Raw output:', stdout);
            return;
        }
        
        const result = JSON.parse(jsonMatch[0]);
        const problematicBrokers = result[0]?.results || [];
        
        console.log(`Found ${problematicBrokers.length} brokers with numeric suffixes:`);
        problematicBrokers.forEach(broker => {
            console.log(`  - ${broker.name} (ID: ${broker.id})`);
        });
        
        if (problematicBrokers.length === 0) {
            console.log('✅ No brokers with numeric suffixes found!');
            return;
        }
        
        console.log('\n🧹 Processing numeric suffix removal...');
        
        // Process each broker with numeric suffix
        for (const broker of problematicBrokers) {
            const cleanName = broker.name.replace(/\s+\d+$/, '').trim();
            const cleanSlug = cleanName
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            
            console.log(`\n📝 Processing: "${broker.name}" → "${cleanName}"`);
            
            // Check if a broker with the clean name already exists
            const checkExistingCmd = `cd /home/user/webapp && npx wrangler d1 execute brokeranalysis-production --command="SELECT id, name, rating FROM brokers WHERE name = '${cleanName}' AND id != ${broker.id};"`;
            
            try {
                const { stdout: existingResult } = await execAsync(checkExistingCmd);
                const existingJsonMatch = existingResult.match(/\[\s*\{[\s\S]*\}\s*\]/);
                if (!existingJsonMatch) {
                    console.log('  ❌ Could not parse existing broker check');
                    continue;
                }
                const existing = JSON.parse(existingJsonMatch[0]);
                const existingBrokers = existing[0]?.results || [];
                
                if (existingBrokers.length > 0) {
                    const existingBroker = existingBrokers[0];
                    console.log(`  ⚠️  Duplicate found: "${existingBroker.name}" (ID: ${existingBroker.id}, Rating: ${existingBroker.rating})`);
                    console.log(`  🗑️  Removing duplicate: "${broker.name}" (ID: ${broker.id})`);
                    
                    // Delete the duplicate broker (with numeric suffix)
                    const deleteCmd = `cd /home/user/webapp && npx wrangler d1 execute brokeranalysis-production --command="DELETE FROM brokers WHERE id = ${broker.id};"`;
                    await execAsync(deleteCmd);
                    console.log(`  ✅ Deleted duplicate broker ID ${broker.id}`);
                    
                } else {
                    // No duplicate exists, just update the name and slug
                    console.log(`  ✏️  Updating name and slug for ID ${broker.id}`);
                    
                    const updateCmd = `cd /home/user/webapp && npx wrangler d1 execute brokeranalysis-production --command="UPDATE brokers SET name = '${cleanName}', slug = '${cleanSlug}' WHERE id = ${broker.id};"`;
                    await execAsync(updateCmd);
                    console.log(`  ✅ Updated broker ID ${broker.id}`);
                }
                
            } catch (error) {
                console.error(`  ❌ Error processing broker ${broker.id}:`, error.message);
            }
        }
        
        // Final verification
        console.log('\n🔍 Final verification...');
        const { stdout: finalCheck } = await execAsync(
            `cd /home/user/webapp && npx wrangler d1 execute brokeranalysis-production --command="SELECT COUNT(*) as total FROM brokers;"`
        );
        
        const finalJsonMatch = finalCheck.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (!finalJsonMatch) {
            console.log('❌ Could not parse final count');
            return;
        }
        const finalResult = JSON.parse(finalJsonMatch[0]);
        const finalCount = finalResult[0]?.results[0]?.total || 0;
        
        console.log(`\n📊 Cleanup Summary:`);
        console.log(`  Final broker count: ${finalCount}`);
        console.log(`  Processed: ${problematicBrokers.length} brokers with numeric suffixes`);
        
        console.log('\n✅ Numeric suffix cleanup completed!');
        console.log('\nNext steps:');
        console.log('1. Test the application to verify clean broker names');
        console.log('2. Check that no duplicates remain');
        console.log('3. Verify all broker links still work');
        
    } catch (error) {
        console.error('❌ Error during numeric cleanup:', error.message);
        
        if (error.stdout) {
            console.log('\n📊 Command output:', error.stdout);
        }
        
        process.exit(1);
    }
}

// Run the cleanup
removeNumericSuffixes().catch(console.error);