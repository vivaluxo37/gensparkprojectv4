// Broker-related routes with proper ordering (specific to generic)
import { Hono } from 'hono';
import type { Bindings } from '../types';
import { BrokerService } from '../services/brokerService';
import { generateComprehensiveBrokerReviewHTML } from '../components/EnhancedBrokerReview';

const brokerRoutes = new Hono<{ Bindings: Bindings }>();

// API Routes first (most specific)
brokerRoutes.get('/api/brokers', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  const url = new URL(c.req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '12');
  
  try {
    const result = await brokerService.getAllBrokers(page, limit);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to fetch brokers' }, 500);
  }
});

brokerRoutes.get('/api/brokers/:id', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  const id = parseInt(c.req.param('id'));
  
  try {
    const broker = await brokerService.getBrokerById(id);
    if (!broker) {
      return c.json({ error: 'Broker not found' }, 404);
    }
    return c.json({ broker });
  } catch (error) {
    return c.json({ error: 'Failed to fetch broker' }, 500);
  }
});

// Individual Broker Review Pages - CRITICAL SEO IMPLEMENTATION
brokerRoutes.get('/review/:slug', async (c) => {
  const slug = c.req.param('slug');
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug(slug);
    if (!broker) {
      return c.notFound();
    }
    
    // Generate comprehensive broker review page
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error('Error loading broker review:', error);
    return c.html('Error loading broker review', 500);
  }
});

brokerRoutes.get('/api/compare', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  const url = new URL(c.req.url);
  const brokerIds = url.searchParams.get('brokers')?.split(',').filter(id => id).map(id => parseInt(id)) || [];
  
  if (brokerIds.length === 0) {
    return c.json({ error: 'No brokers specified' }, 400);
  }
  
  if (brokerIds.length > 4) {
    return c.json({ error: 'Maximum 4 brokers can be compared' }, 400);
  }
  
  try {
    const result = await brokerService.compareBrokers(brokerIds);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

brokerRoutes.get('/api/search', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  const url = new URL(c.req.url);
  const query = url.searchParams.get('q') || '';
  
  if (query.length < 2) {
    return c.json({ error: 'Query must be at least 2 characters' }, 400);
  }
  
  try {
    const filters = {
      regulation: url.searchParams.get('regulation') || undefined,
      minDeposit: url.searchParams.get('min_deposit') ? parseInt(url.searchParams.get('min_deposit')!) : undefined,
      maxDeposit: url.searchParams.get('max_deposit') ? parseInt(url.searchParams.get('max_deposit')!) : undefined,
      spreadType: url.searchParams.get('spread_type') || undefined,
      platforms: url.searchParams.get('platforms')?.split(',') || undefined
    };
    
    const brokers = await brokerService.searchBrokers(query, filters);
    return c.json({ brokers, query });
  } catch (error) {
    return c.json({ error: 'Search failed' }, 500);
  }
});

// Specific broker review routes (ordered by importance/traffic)
brokerRoutes.get('/reviews/ic-markets', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('ic-markets');
    if (!broker) {
      return c.html('<h1>IC Markets not found</h1><p>Broker data not available in database.</p>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

brokerRoutes.get('/reviews/pepperstone', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('pepperstone');
    if (!broker) {
      return c.html('<h1>Pepperstone not found</h1><p>Broker data not available in database.</p>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

brokerRoutes.get('/reviews/interactive-brokers', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('interactive-brokers');
    if (!broker) {
      return c.html('<h1>Interactive Brokers not found</h1><p>Broker data not available in database.</p>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

brokerRoutes.get('/reviews/oanda', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('oanda');
    if (!broker) {
      return c.html('<h1>OANDA not found</h1><p>Broker data not available in database.</p>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

brokerRoutes.get('/reviews/xm-group', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('xm-group');
    if (!broker) {
      return c.html('<h1>XM Group not found</h1><p>Broker data not available in database.</p>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

// Programmatic SEO routes for broker categories
brokerRoutes.get('/brokers/regulation/:regulator', async (c) => {
  const regulator = c.req.param('regulator').toUpperCase();
  const brokerService = new BrokerService(c.env.DB);
  
  try {
    // This would need to be implemented in the broker service
    // For now, redirect to main reviews page
    return c.redirect('/reviews');
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

brokerRoutes.get('/brokers/spread-type/:spreadType', async (c) => {
  const spreadType = c.req.param('spreadType');
  return c.redirect('/reviews'); // Placeholder
});

brokerRoutes.get('/brokers/platform/:platform', async (c) => {
  const platform = c.req.param('platform');
  return c.redirect('/reviews'); // Placeholder
});

// Compare specific brokers (SEO-friendly URLs)
brokerRoutes.get('/compare/:broker1-vs-:broker2', async (c) => {
  const broker1 = c.req.param('broker1');
  const broker2 = c.req.param('broker2');
  return c.redirect(`/compare?brokers=${broker1},${broker2}`);
});

// Generic dynamic route (LAST - least specific)
brokerRoutes.get('/reviews/:brokerSlug', async (c) => {
  const brokerService = new BrokerService(c.env.DB);
  const brokerSlug = c.req.param('brokerSlug');
  
  // Skip static routes that should be handled above
  const staticRoutes = [
    'ic-markets', 'pepperstone', 'interactive-brokers', 'oanda', 'xm-group',
    'fp-markets', 'fxtm', 'blackbull-markets', 'eightcap', 'octa', 'plus500', 'avatrade', 'cfi'
  ];
  
  if (staticRoutes.includes(brokerSlug)) {
    return c.notFound(); // Let static routes handle these
  }
  
  try {
    const broker = await brokerService.getBrokerBySlug(brokerSlug);
    if (!broker) {
      return c.html(`
        <h1>Broker "${brokerSlug}" not found</h1>
        <p>Available brokers: ic-markets, pepperstone, interactive-brokers, oanda, xm-group</p>
        <p><a href="/reviews">← Back to Reviews</a></p>
      `, 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    return c.html(`<h1>Error</h1><p>Database error: ${error.message}</p>`, 500);
  }
});

export { brokerRoutes };