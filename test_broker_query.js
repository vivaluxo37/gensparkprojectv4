// Simple test to verify broker query
import { D1Database } from '@cloudflare/workers-types';

// Test the exact query used in the review route
const testBrokerQuery = async () => {
  const mockDb = {
    prepare: (query) => ({
      bind: (slug) => ({
        first: async () => {
          console.log(`Query: ${query}`);
          console.log(`Slug: ${slug}`);
          // This would simulate the actual database query
          return null; // Simulating not found for debugging
        }
      })
    })
  };
  
  const brokerSlug = 'ic-markets';
  const broker = await mockDb.prepare(`
    SELECT b.*, bd.*, bs.*
    FROM brokers b
    LEFT JOIN broker_details bd ON b.id = bd.broker_id
    LEFT JOIN broker_scores bs ON b.id = bs.broker_id
    WHERE b.slug = ?
  `).bind(brokerSlug).first();
  
  if (!broker) {
    console.log('Broker not found - would return 404');
  } else {
    console.log('Broker found:', broker);
  }
};

testBrokerQuery();