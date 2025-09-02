// Clean, modular main application file - Complete architectural refactor
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';

// Import all route modules in order of specificity (most specific first)
import { authRoutes } from './routes/authRoutes';
import { apiRoutes } from './routes/apiRoutes';
import { brokerRoutes } from './routes/brokerRoutes';
import { pageRoutes } from './routes/pageRoutes';

// Import CSS
import './styles.css';

const app = new Hono<{ Bindings: Bindings }>();

// Global middleware
// Enable CORS for all API routes
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Test route
app.get('/test-static', async (c) => {
  return c.text('Static route test works!');
});

// Fallback CSS handler for development
app.get('/static/styles.css', async (c) => {
  // Return minimal CSS that should work - bypass the host restriction
  return new Response(`
    /* BrokerAnalysis - Essential Styles */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
      line-height: 1.6; 
      color: #1f2937; 
      background: #f9fafb;
    }
    
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .bg-blue-600 { background-color: #2563eb !important; }
    .bg-white { background-color: #ffffff !important; }
    .text-white { color: #ffffff !important; }
    .text-gray-900 { color: #111827 !important; }
    .p-4 { padding: 1rem !important; }
    .p-6 { padding: 1.5rem !important; }
    .mb-4 { margin-bottom: 1rem !important; }
    .mt-8 { margin-top: 2rem !important; }
    .flex { display: flex !important; }
    .items-center { align-items: center !important; }
    .justify-between { justify-content: space-between !important; }
    .rounded { border-radius: 0.375rem !important; }
    .shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important; }
    .text-xl { font-size: 1.25rem !important; }
    .font-bold { font-weight: 700 !important; }
    .grid { display: grid !important; }
    .gap-6 { gap: 1.5rem !important; }
    .border { border: 1px solid #e5e7eb !important; }
    .btn { 
      display: inline-flex; 
      align-items: center; 
      padding: 0.5rem 1rem; 
      border-radius: 0.375rem; 
      font-weight: 500; 
      cursor: pointer; 
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-primary { background-color: #2563eb; color: white; border: none; }
    .btn-primary:hover { background-color: #1d4ed8; }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
      .container { padding: 0 0.5rem; }
      .p-4 { padding: 0.75rem !important; }
    }
  `, {
    status: 200,
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
});

// Legacy data endpoint for backward compatibility
app.get('/data/brokers.json', async (c) => {
  try {
    const { DB } = c.env;
    console.log('Testing database connection...');
    
    // First test basic database connection
    const tables = await DB.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Available tables:', tables);
    
    const brokers = await DB.prepare(`
      SELECT 
        id, name, slug, rating, logo_url, website_url, 
        min_deposit_usd, max_leverage, spread_type, is_regulated,
        demo_account, mobile_app, copy_trading, social_trading, headquarters
      FROM brokers
      ORDER BY rating DESC
      LIMIT 5
    `).all();

    console.log('Found brokers:', brokers.results?.length || 0);

    return c.json({
      success: true,
      brokers: brokers.results || [],
      count: brokers.results?.length || 0,
      last_updated: new Date().toISOString(),
      debug: {
        tables: tables.results,
        env_keys: Object.keys(c.env)
      }
    });
  } catch (error) {
    console.error('Data brokers error:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch broker data', 
      message: error.message,
      debug: {
        env_keys: Object.keys(c.env)
      }
    }, 500);
  }
});

// Simple test endpoint to debug database connection
app.get('/test/db', async (c) => {
  try {
    const { DB } = c.env;
    const result = await DB.prepare("SELECT 1 as test").first();
    return c.json({ success: true, result, env: Object.keys(c.env) });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Mount all route modules in order of specificity
// 1. Authentication routes (most specific API routes)
app.route('/', authRoutes);

// 2. Core API routes (recommendations, search, stats, chatbot)
app.route('/', apiRoutes);

// 3. Page routes with specific broker review routes (PRIORITIZED for SEO)
app.route('/', pageRoutes);

// 4. Broker-specific routes (includes /api/brokers, generic /reviews/*, /api/compare)
app.route('/', brokerRoutes);

// Error handling middleware
app.onError((err, c) => {
  console.error('Application error:', err);
  
  if (c.req.url.includes('/api/')) {
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      message: err.message 
    }, 500);
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Error - BrokerAnalysis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
                <div class="text-red-600 text-6xl mb-4">⚠️</div>
                <h1 class="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
                <p class="text-gray-600 mb-6">We're experiencing technical difficulties. Please try again later.</p>
                <a href="/" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                    Go Home
                </a>
                <div class="mt-4 text-xs text-gray-400">
                    Error: ${err.message}
                </div>
            </div>
        </div>
    </body>
    </html>
  `, 500);
});

// 404 handler
app.notFound((c) => {
  const isApiRequest = c.req.url.includes('/api/');
  
  if (isApiRequest) {
    return c.json({ 
      success: false, 
      error: 'Endpoint not found',
      path: c.req.path
    }, 404);
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page Not Found - BrokerAnalysis</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our forex broker reviews and comparisons.">
        <link href="/static/styles.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <a href="/" class="text-2xl font-bold text-gray-900">
                            <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                            BrokerAnalysis
                        </a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/reviews" class="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-blue-600 transition-colors">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-blue-600 transition-colors">Calculator</a>
                        <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- 404 Content -->
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-md w-full text-center">
                <div class="text-blue-600 text-8xl mb-8">🔍</div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p class="text-gray-600 mb-8">
                    The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>
                
                <div class="space-y-4">
                    <a href="/" class="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        <i class="fas fa-home mr-2"></i>
                        Go to Homepage
                    </a>
                    <a href="/reviews" class="block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors">
                        <i class="fas fa-star mr-2"></i>
                        Browse Broker Reviews
                    </a>
                    <a href="/compare" class="block bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
                        <i class="fas fa-balance-scale mr-2"></i>
                        Compare Brokers
                    </a>
                </div>

                <div class="mt-8 text-sm text-gray-500">
                    <p>Looking for something specific? Try our search or browse popular pages:</p>
                    <div class="flex flex-wrap justify-center gap-2 mt-2">
                        <a href="/reviews/ic-markets" class="text-blue-600 hover:underline">IC Markets</a>
                        <span>•</span>
                        <a href="/reviews/pepperstone" class="text-blue-600 hover:underline">Pepperstone</a>
                        <span>•</span>
                        <a href="/brokers/australia" class="text-blue-600 hover:underline">Australian Brokers</a>
                        <span>•</span>
                        <a href="/simulator" class="text-blue-600 hover:underline">Cost Calculator</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `, 404);
});

export default app;