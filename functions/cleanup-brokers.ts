/**
 * Temporary API endpoint for cleaning up duplicate brokers
 * This endpoint removes numbered broker duplicates and cleans up the database
 */

export async function onRequest(context: any) {
  const { env, request } = context;
  
  // Only allow POST requests for safety
  if (request.method !== 'POST') {
    return new Response('Method not allowed. Use POST to execute cleanup.', { status: 405 });
  }
  
  // Safety check - require confirmation parameter
  const url = new URL(request.url);
  const confirm = url.searchParams.get('confirm');
  
  if (confirm !== 'yes-i-understand-this-will-modify-the-database') {
    return new Response(
      'Safety check failed. Add ?confirm=yes-i-understand-this-will-modify-the-database to proceed.',
      { status: 400 }
    );
  }
  
  try {
    console.log('🔍 Starting broker cleanup process...');
    
    // First, analyze current broker data
    const analysisQuery = `
      SELECT id, name, slug 
      FROM brokers 
      WHERE name LIKE '% 1' 
         OR name LIKE '% 2' 
         OR name LIKE '% 3' 
         OR name LIKE '% 4'
         OR name LIKE '% 5'
      ORDER BY name
    `;
    
    const brokersWithNumbers = await env.DB.prepare(analysisQuery).all();
    const results = brokersWithNumbers.results || [];
    
    console.log(`Found ${results.length} brokers with numbers`);
    
    const report: any = {
      analysisDate: new Date().toISOString(),
      brokersWithNumbers: results.length,
      brokers: results,
      actions: [],
      deletedCount: 0,
      updatedCount: 0,
      errors: []
    };
    
    // Get total broker count before cleanup
    const totalCountBefore = await env.DB.prepare('SELECT COUNT(*) as total FROM brokers').first();
    report.totalBrokersBefore = totalCountBefore.total;
    
    // Process each numbered broker
    for (const broker of results) {
      try {
        // Extract base name by removing number suffix
        const baseName = broker.name.replace(/ \d+$/, '');
        
        // Check if a broker with the base name already exists (without numbers)
        const existingBroker = await env.DB.prepare(`
          SELECT id, name FROM brokers 
          WHERE name = ? AND id != ?
        `).bind(baseName, broker.id).first();
        
        if (existingBroker) {
          // Delete the numbered duplicate
          console.log(`Deleting duplicate: "${broker.name}" (ID: ${broker.id})`);
          console.log(`Base name "${baseName}" already exists (ID: ${existingBroker.id})`);
          
          const deleteResult = await env.DB.prepare('DELETE FROM brokers WHERE id = ?')
            .bind(broker.id).run();
          
          if (deleteResult.success) {
            report.actions.push({
              type: 'deleted',
              brokerId: broker.id,
              brokerName: broker.name,
              reason: `Duplicate of existing broker "${baseName}" (ID: ${existingBroker.id})`
            });
            report.deletedCount++;
          }
        } else {
          // Update the broker to use the clean base name
          console.log(`Updating: "${broker.name}" → "${baseName}"`);
          
          // Also update the slug to match the clean name
          const cleanSlug = baseName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          const updateResult = await env.DB.prepare(`
            UPDATE brokers 
            SET name = ?, slug = ? 
            WHERE id = ?
          `).bind(baseName, cleanSlug, broker.id).run();
          
          if (updateResult.success) {
            report.actions.push({
              type: 'updated',
              brokerId: broker.id,
              oldName: broker.name,
              newName: baseName,
              oldSlug: broker.slug,
              newSlug: cleanSlug
            });
            report.updatedCount++;
          }
        }
      } catch (error) {
        console.error(`Error processing broker ${broker.id}: ${error}`);
        report.errors.push({
          brokerId: broker.id,
          brokerName: broker.name,
          error: error.message
        });
      }
    }
    
    // Get total broker count after cleanup
    const totalCountAfter = await env.DB.prepare('SELECT COUNT(*) as total FROM brokers').first();
    report.totalBrokersAfter = totalCountAfter.total;
    
    // Verify cleanup - check for remaining numbered brokers
    const remainingNumbered = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM brokers 
      WHERE name LIKE '% 1' 
         OR name LIKE '% 2' 
         OR name LIKE '% 3' 
         OR name LIKE '% 4'
         OR name LIKE '% 5'
    `).first();
    
    report.remainingNumberedBrokers = remainingNumbered.count;
    report.success = remainingNumbered.count === 0 && report.errors.length === 0;
    
    console.log('✅ Cleanup completed', {
      deleted: report.deletedCount,
      updated: report.updatedCount,
      errors: report.errors.length
    });
    
    return Response.json({
      success: true,
      message: 'Broker cleanup completed successfully',
      report
    });
    
  } catch (error) {
    console.error('❌ Error during cleanup process:', error);
    
    return Response.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}