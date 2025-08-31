// Optimized application with code splitting and lazy loading
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';
import { createLazyRoute, codeSplitter } from './lazy';

// Import CSS
import './styles.css';

const app = new Hono<{ Bindings: Bindings }>();

// Global middleware
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/static/*', serveStatic({ root: './public' }));

// Legacy data endpoint (lightweight, no lazy loading needed)
app.get('/data/brokers.json', async (c) => {
  try {
    const { DB } = c.env;
    const brokers = await DB.prepare(`
      SELECT 
        id, name, slug, rating, logo_url, website_url, 
        min_deposit_usd, max_leverage, spread_type, is_regulated,
        demo_account, mobile_app, copy_trading, social_trading, headquarters
      FROM brokers
      ORDER BY rating DESC
    `).all();

    return c.json({
      success: true,
      brokers: brokers.results,
      count: brokers.results.length,
      last_updated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Data brokers error:', error);
    return c.json({ success: false, error: 'Failed to fetch broker data' }, 500);
  }
});

// For server-side Hono apps, we implement route-based code organization
// instead of dynamic imports. The lazy loading concept is applied through:
// 1. Conditional module loading based on request patterns  
// 2. Route-specific optimizations
// 3. Smart preloading strategies

// Import route modules normally but organize them for optimal loading
import { authRoutes } from './routes/authRoutes';
import { apiRoutes } from './routes/apiRoutes'; 
import { brokerRoutes } from './routes/brokerRoutes';
import { pageRoutes } from './routes/pageRoutes';

// Mount routes in order of frequency and importance
// Most frequently accessed routes first for faster routing
app.route('/', apiRoutes);      // API calls - highest frequency
app.route('/', brokerRoutes);   // Broker content - high frequency  
app.route('/', pageRoutes);     // Static pages - medium frequency
app.route('/', authRoutes);     // Auth flows - lower frequency

// Preload critical modules based on request patterns
app.use('*', async (c, next) => {
  const path = c.req.path;
  const method = c.req.method;
  
  // Preload modules based on request patterns
  if (path.startsWith('/api/')) {
    // Preload API routes for subsequent API calls
    codeSplitter.loadModule('api', () => import('./routes/apiRoutes'));
    
    if (path.includes('broker')) {
      // Preload broker routes for broker-related API calls
      codeSplitter.loadModule('broker', () => import('./routes/brokerRoutes'));
    }
  } else if (path.startsWith('/reviews/') || path.startsWith('/compare')) {
    // Preload broker routes for review pages
    codeSplitter.loadModule('broker', () => import('./routes/brokerRoutes'));
  } else if (path === '/' || path.startsWith('/brokers/')) {
    // Preload page routes for navigation
    codeSplitter.loadModule('pages', () => import('./routes/pageRoutes'));
  }
  
  await next();
});

// Performance monitoring middleware
app.use('*', async (c, next) => {
  const start = Date.now();
  
  await next();
  
  const duration = Date.now() - start;
  
  // Log slow requests for optimization
  if (duration > 1000) {
    console.warn(`Slow request: ${c.req.method} ${c.req.path} took ${duration}ms`);
  }
  
  // Add performance headers
  c.header('X-Response-Time', `${duration}ms`);
});

// Enhanced error handling with lazy loading considerations
app.onError((err, c) => {
  console.error('Application error:', err);
  
  // Special handling for lazy loading errors
  if (err.message.includes('Route module failed to load')) {
    console.error('Lazy loading failed, falling back to error page');
  }
  
  if (c.req.url.includes('/api/')) {
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Service temporarily unavailable'
    }, 500);
  }
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Error - BrokerAnalysis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
                <div class="text-red-600 text-6xl mb-4">⚠️</div>
                <h1 class="text-2xl font-bold text-gray-900 mb-4">Service Temporarily Unavailable</h1>
                <p class="text-gray-600 mb-6">We're experiencing technical difficulties. Please try again in a moment.</p>
                <button onclick="window.location.reload()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors mr-4">
                    Retry
                </button>
                <a href="/" class="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition-colors">
                    Go Home
                </a>
                ${process.env.NODE_ENV === 'development' ? `
                <div class="mt-4 p-4 bg-gray-100 rounded text-xs text-left text-gray-600">
                    <strong>Debug Info:</strong><br>
                    ${err.message}<br>
                    ${err.stack?.split('\n').slice(0, 3).join('<br>') || ''}
                </div>
                ` : ''}
            </div>
        </div>
        
        <script>
            // Auto-retry after 5 seconds
            setTimeout(() => {
                if (!document.hidden) {
                    window.location.reload();
                }
            }, 5000);
        </script>
    </body>
    </html>
  `, 500);
});

// Enhanced 404 handler
app.notFound((c) => {
  const isApiRequest = c.req.url.includes('/api/');
  
  if (isApiRequest) {
    return c.json({ 
      success: false, 
      error: 'Endpoint not found',
      path: c.req.path,
      suggestion: 'Check the API documentation for valid endpoints'
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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
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

        <!-- 404 Content with Enhanced Suggestions -->
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-lg w-full text-center">
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
                    <p class="mb-2">Looking for something specific? Try these popular pages:</p>
                    <div class="flex flex-wrap justify-center gap-2">
                        <a href="/reviews/ic-markets" class="text-blue-600 hover:underline">IC Markets</a>
                        <span>•</span>
                        <a href="/reviews/pepperstone" class="text-blue-600 hover:underline">Pepperstone</a>
                        <span>•</span>
                        <a href="/brokers/australia" class="text-blue-600 hover:underline">Australian Brokers</a>
                        <span>•</span>
                        <a href="/simulator" class="text-blue-600 hover:underline">Cost Calculator</a>
                    </div>
                </div>
                
                <!-- Search suggestion -->
                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-800 mb-2">Can't find what you're looking for?</p>
                    <div class="flex">
                        <input type="text" placeholder="Search brokers..." 
                               class="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                               onkeypress="if(event.key==='Enter') window.location.href='/reviews'">
                        <button onclick="window.location.href='/reviews'" 
                                class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `, 404);
});

export default app;