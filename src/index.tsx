import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

// Type definitions for Cloudflare bindings
type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for all API routes
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Broker recommendation algorithm
const calculateBrokerScore = (broker: any, profile: any): number => {
  let score = broker.rating * 20; // Base score from rating

  // Adjust for minimum deposit
  if (profile.capital_amount) {
    const capitalAmount = parseInt(profile.capital_amount);
    if (broker.min_deposit_usd <= capitalAmount) {
      score += 10; // Bonus for affordable minimum deposit
    } else {
      score -= 20; // Penalty for high minimum deposit
    }
  }

  // Adjust for regulation preference
  if (profile.country && broker.is_regulated) {
    score += 15; // Bonus for regulated brokers
  }

  // Adjust for experience level
  if (profile.experience_level === 'Beginner' && broker.demo_account) {
    score += 10; // Bonus for demo account availability
  }

  // Adjust for trading strategy
  if (profile.trading_strategy === 'Scalping' && broker.spread_type === 'Raw') {
    score += 15; // Bonus for raw spreads for scalpers
  }

  // Adjust for social trading preference
  if (profile.account_type_pref === 'Social' && broker.social_trading) {
    score += 20; // Big bonus for social trading features
  }

  return Math.min(100, Math.max(0, score)); // Cap between 0-100
};

// Generate recommendation reasoning
const generateRecommendationReasoning = (broker: any, profile: any, score: number): string => {
  const reasons = [];
  
  if (broker.rating >= 4.5) {
    reasons.push(`High rating of ${broker.rating}/5.0 indicates excellent service quality`);
  }
  
  if (broker.is_regulated) {
    reasons.push(`Regulated broker providing safety and compliance assurance`);
  }
  
  if (profile.capital_amount && broker.min_deposit_usd <= parseInt(profile.capital_amount)) {
    reasons.push(`Minimum deposit of $${broker.min_deposit_usd} matches your capital requirements`);
  }
  
  if (profile.trading_strategy === 'Scalping' && broker.spread_type === 'Raw') {
    reasons.push(`Raw spreads ideal for ${profile.trading_strategy} strategy`);
  }
  
  if (broker.social_trading && profile.account_type_pref === 'Social') {
    reasons.push(`Offers social trading features you're looking for`);
  }

  return reasons.join('. ') + '.';
};

// API Routes

// Get all brokers with pagination
app.get('/api/brokers', async (c) => {
  const { DB } = c.env;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '12');
  const sortBy = c.req.query('sort') || 'rating';
  const filterRegulated = c.req.query('regulated');
  const minRating = c.req.query('min_rating');
  
  const offset = (page - 1) * limit;
  
  let query = `
    SELECT b.*, 
           GROUP_CONCAT(r.regulator_name) as regulators,
           COUNT(r.id) as regulation_count
    FROM brokers b
    LEFT JOIN regulations r ON b.id = r.broker_id
  `;
  
  const conditions = [];
  const params = [];
  
  if (filterRegulated === 'true') {
    conditions.push('b.is_regulated = ?');
    params.push(1);
  }
  
  if (minRating) {
    conditions.push('b.rating >= ?');
    params.push(parseFloat(minRating));
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' GROUP BY b.id';
  
  // Add sorting
  switch (sortBy) {
    case 'rating':
      query += ' ORDER BY b.rating DESC';
      break;
    case 'min_deposit':
      query += ' ORDER BY b.min_deposit_usd ASC';
      break;
    case 'name':
      query += ' ORDER BY b.name ASC';
      break;
    default:
      query += ' ORDER BY b.rating DESC';
  }
  
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  
  const result = await DB.prepare(query).bind(...params).all();
  
  // Get total count for pagination
  let countQuery = 'SELECT COUNT(*) as total FROM brokers b';
  if (conditions.length > 0) {
    countQuery += ' WHERE ' + conditions.join(' AND ');
  }
  
  const countResult = await DB.prepare(countQuery).bind(...params.slice(0, -2)).first();
  
  return c.json({
    brokers: result.results,
    pagination: {
      page,
      limit,
      total: countResult.total,
      pages: Math.ceil(countResult.total / limit)
    }
  });
});

// Get single broker with detailed information
app.get('/api/brokers/:id', async (c) => {
  const { DB } = c.env;
  const brokerId = c.req.param('id');
  
  // Get broker basic info
  const broker = await DB.prepare('SELECT * FROM brokers WHERE id = ? OR slug = ?')
    .bind(brokerId, brokerId)
    .first();
  
  if (!broker) {
    return c.json({ error: 'Broker not found' }, 404);
  }
  
  // Get regulations
  const regulations = await DB.prepare('SELECT * FROM regulations WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  // Get spreads
  const spreads = await DB.prepare('SELECT * FROM spreads WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  // Get platforms
  const platforms = await DB.prepare('SELECT * FROM platforms WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  // Get account types
  const accountTypes = await DB.prepare('SELECT * FROM account_types WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  // Get payment methods
  const paymentMethods = await DB.prepare('SELECT * FROM payment_methods WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  // Get features (pros/cons)
  const features = await DB.prepare('SELECT * FROM broker_features WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  // Get instruments
  const instruments = await DB.prepare('SELECT * FROM instruments WHERE broker_id = ?')
    .bind(broker.id)
    .all();
  
  return c.json({
    ...broker,
    regulations: regulations.results,
    spreads: spreads.results,
    platforms: platforms.results,
    account_types: accountTypes.results,
    payment_methods: paymentMethods.results,
    features: features.results,
    instruments: instruments.results
  });
});

// Get broker recommendations based on user profile
app.post('/api/recommendations', async (c) => {
  const { DB } = c.env;
  const profile = await c.req.json();
  
  // Store user profile
  const sessionId = profile.session_id || `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
  await DB.prepare(`
    INSERT OR REPLACE INTO user_profiles 
    (session_id, country, experience_level, trading_strategy, capital_amount, account_type_pref, asset_preferences, risk_tolerance)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    sessionId,
    profile.country || null,
    profile.experience_level || null,
    profile.trading_strategy || null,
    profile.capital_amount || null,
    profile.account_type_pref || null,
    JSON.stringify(profile.asset_preferences || []),
    profile.risk_tolerance || null
  ).run();
  
  // Get all brokers for scoring
  const brokers = await DB.prepare(`
    SELECT b.*, 
           GROUP_CONCAT(r.regulator_name) as regulators
    FROM brokers b
    LEFT JOIN regulations r ON b.id = r.broker_id
    GROUP BY b.id
    ORDER BY b.rating DESC
  `).all();
  
  // Calculate scores for each broker
  const recommendations = brokers.results.map((broker: any) => {
    const score = calculateBrokerScore(broker, profile);
    const reasoning = generateRecommendationReasoning(broker, profile, score);
    
    return {
      ...broker,
      match_score: score,
      reasoning
    };
  }).sort((a: any, b: any) => b.match_score - a.match_score);
  
  // Store top recommendations
  const topRecommendations = recommendations.slice(0, 5);
  for (const rec of topRecommendations) {
    await DB.prepare(`
      INSERT OR REPLACE INTO recommendations (session_id, broker_id, match_score, reasoning)
      VALUES (?, ?, ?, ?)
    `).bind(sessionId, rec.id, rec.match_score, rec.reasoning).run();
  }
  
  return c.json({
    session_id: sessionId,
    recommendations: topRecommendations,
    total_brokers: brokers.results.length
  });
});

// Get comparison data for multiple brokers
app.post('/api/compare', async (c) => {
  const { DB } = c.env;
  const { broker_ids } = await c.req.json();
  
  if (!broker_ids || !Array.isArray(broker_ids) || broker_ids.length === 0) {
    return c.json({ error: 'Invalid broker IDs provided' }, 400);
  }
  
  const placeholders = broker_ids.map(() => '?').join(',');
  
  const comparison = await DB.prepare(`
    SELECT b.*,
           GROUP_CONCAT(DISTINCT r.regulator_name) as regulators,
           GROUP_CONCAT(DISTINCT p.platform_name) as platforms,
           MIN(s.spread_from) as min_spread,
           AVG(s.spread_avg) as avg_spread
    FROM brokers b
    LEFT JOIN regulations r ON b.id = r.broker_id
    LEFT JOIN platforms p ON b.id = p.broker_id
    LEFT JOIN spreads s ON b.id = s.broker_id AND s.currency_pair = 'EUR/USD'
    WHERE b.id IN (${placeholders})
    GROUP BY b.id
    ORDER BY b.rating DESC
  `).bind(...broker_ids).all();
  
  // Get detailed spreads for comparison
  const spreads = await DB.prepare(`
    SELECT broker_id, currency_pair, spread_from, spread_avg, commission_per_lot, account_type
    FROM spreads
    WHERE broker_id IN (${placeholders})
    ORDER BY broker_id, currency_pair
  `).bind(...broker_ids).all();
  
  return c.json({
    brokers: comparison.results,
    spreads: spreads.results
  });
});

// Strategy-aware cost calculator
app.post('/api/calculate-costs', async (c) => {
  const { DB } = c.env;
  const { strategy, trade_size, trades_per_month, broker_ids } = await c.req.json();
  
  const placeholders = broker_ids.map(() => '?').join(',');
  
  // Get spread and commission data for selected brokers
  const brokersData = await DB.prepare(`
    SELECT b.id, b.name, b.rating,
           s.currency_pair, s.spread_from, s.spread_avg, s.commission_per_lot, s.account_type
    FROM brokers b
    LEFT JOIN spreads s ON b.id = s.broker_id
    WHERE b.id IN (${placeholders})
    AND s.currency_pair = 'EUR/USD'
    ORDER BY b.rating DESC
  `).bind(...broker_ids).all();
  
  // Calculate costs based on strategy
  const calculations = brokersData.results.map((broker: any) => {
    const spread = strategy === 'Scalping' ? broker.spread_from : broker.spread_avg;
    const slippage = strategy === 'Scalping' ? 0.3 : (strategy === 'Day Trading' ? 0.2 : 0.1);
    
    const spreadCost = spread * trade_size * trades_per_month;
    const commissionCost = (broker.commission_per_lot || 0) * trade_size * trades_per_month;
    const slippageCost = slippage * trade_size * trades_per_month;
    const totalCost = spreadCost + commissionCost + slippageCost;
    
    return {
      broker_id: broker.id,
      broker_name: broker.name,
      rating: broker.rating,
      account_type: broker.account_type,
      spread_cost: Math.round(spreadCost * 100) / 100,
      commission_cost: Math.round(commissionCost * 100) / 100,
      slippage_cost: Math.round(slippageCost * 100) / 100,
      total_monthly_cost: Math.round(totalCost * 100) / 100,
      cost_per_trade: Math.round((totalCost / trades_per_month) * 100) / 100
    };
  });
  
  // Sort by total cost (lowest first)
  calculations.sort((a: any, b: any) => a.total_monthly_cost - b.total_monthly_cost);
  
  return c.json({
    strategy,
    parameters: {
      trade_size,
      trades_per_month
    },
    calculations,
    best_value: calculations[0]
  });
});

// Search brokers
app.get('/api/search', async (c) => {
  const { DB } = c.env;
  const query = c.req.query('q');
  const limit = parseInt(c.req.query('limit') || '10');
  
  if (!query) {
    return c.json({ error: 'Search query required' }, 400);
  }
  
  const searchResults = await DB.prepare(`
    SELECT b.*, 
           GROUP_CONCAT(r.regulator_name) as regulators
    FROM brokers b
    LEFT JOIN regulations r ON b.id = r.broker_id
    WHERE b.name LIKE ? OR b.headquarters LIKE ?
    GROUP BY b.id
    ORDER BY b.rating DESC
    LIMIT ?
  `).bind(`%${query}%`, `%${query}%`, limit).all();
  
  return c.json({
    query,
    results: searchResults.results
  });
});

// Get broker statistics
app.get('/api/stats', async (c) => {
  const { DB } = c.env;
  
  const stats = await DB.prepare(`
    SELECT 
      COUNT(*) as total_brokers,
      AVG(rating) as avg_rating,
      MIN(min_deposit_usd) as lowest_min_deposit,
      COUNT(CASE WHEN is_regulated = 1 THEN 1 END) as regulated_brokers,
      COUNT(CASE WHEN demo_account = 1 THEN 1 END) as brokers_with_demo,
      COUNT(CASE WHEN social_trading = 1 THEN 1 END) as social_trading_brokers
    FROM brokers
  `).first();
  
  return c.json(stats);
});

// Chatbot endpoint for interactive recommendations
app.post('/api/chatbot', async (c) => {
  const { DB } = c.env;
  const { message, session_id, context } = await c.req.json();
  
  // Simple chatbot logic - in production, integrate with AI service
  const responses = {
    greeting: "Hello! I'm here to help you find the perfect forex broker. What's most important to you - low costs, regulation, or specific features?",
    regulation: "Great choice! I recommend looking at FCA, CFTC, or ASIC regulated brokers. TastyFX and OANDA are excellent regulated options.",
    costs: "For the lowest trading costs, consider IC Markets or Pepperstone with their Raw accounts. They offer spreads from 0.0 pips plus commission.",
    beginner: "For beginners, I'd suggest eToro for social trading features or OANDA for their excellent educational resources and no minimum deposit.",
    scalping: "For scalping, you'll want the tightest spreads. IC Markets and Pepperstone offer raw spreads from 0.0 pips, perfect for high-frequency trading.",
    demo: "Most reputable brokers offer demo accounts. OANDA, TastyFX, and Forex.com all provide unlimited demo accounts to practice with."
  };
  
  let response = "I'd be happy to help you find the right broker! Could you tell me more about your trading experience and what you're looking for?";
  
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = responses.greeting;
  } else if (lowerMessage.includes('regulat') || lowerMessage.includes('safe') || lowerMessage.includes('licens')) {
    response = responses.regulation;
  } else if (lowerMessage.includes('cost') || lowerMessage.includes('cheap') || lowerMessage.includes('spread')) {
    response = responses.costs;
  } else if (lowerMessage.includes('beginner') || lowerMessage.includes('new') || lowerMessage.includes('start')) {
    response = responses.beginner;
  } else if (lowerMessage.includes('scalp') || lowerMessage.includes('fast') || lowerMessage.includes('quick')) {
    response = responses.scalping;
  } else if (lowerMessage.includes('demo') || lowerMessage.includes('practice') || lowerMessage.includes('test')) {
    response = responses.demo;
  }
  
  return c.json({
    response,
    session_id: session_id || `chat_${Date.now()}`,
    suggestions: [
      "Show me regulated brokers",
      "Find low-cost options", 
      "Best for beginners",
      "Scalping-friendly brokers"
    ]
  });
});

// Main homepage route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BrokerAnalysis - Find Your Perfect Forex Broker</title>
        <meta name="description" content="Compare and find the best forex brokers with our intelligent recommendation system. Detailed reviews, ratings, and personalized broker matching.">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#1e40af',
                            secondary: '#64748b',
                            accent: '#3b82f6'
                        }
                    }
                }
            }
        </script>
    </head>
    <body class="bg-gray-50 text-gray-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <span class="text-xl font-bold text-gray-900">BrokerAnalysis</span>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="#home" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="#reviews" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="#compare" class="text-gray-700 hover:text-primary transition-colors">Compare</a>
                        <a href="#simulator" class="text-gray-700 hover:text-primary transition-colors">Simulator</a>
                        <a href="#about" class="text-gray-700 hover:text-primary transition-colors">About</a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-gray-700">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white shadow-md border-b">
            <div class="px-4 py-2 space-y-2">
                <a href="#home" class="block py-2 text-gray-700 hover:text-primary">Home</a>
                <a href="#reviews" class="block py-2 text-gray-700 hover:text-primary">Reviews</a>
                <a href="#compare" class="block py-2 text-gray-700 hover:text-primary">Compare</a>
                <a href="#simulator" class="block py-2 text-gray-700 hover:text-primary">Simulator</a>
                <a href="#about" class="block py-2 text-gray-700 hover:text-primary">About</a>
            </div>
        </div>

        <!-- Main Content -->
        <div id="app" class="min-h-screen">
            <!-- Hero Section -->
            <section id="home" class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Find Your Perfect <span class="text-yellow-400">Forex Broker</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                        Get personalized broker recommendations with our intelligent matching system. 
                        Compare spreads, regulation, and features to make informed decisions.
                    </p>
                    <button onclick="startRecommendation()" class="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors">
                        <i class="fas fa-rocket mr-2"></i>
                        Get My Broker Match
                    </button>
                </div>
            </section>

            <!-- Broker Recommender Section -->
            <section class="py-16 bg-white">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div id="recommendation-widget" class="hidden">
                        <div class="bg-gray-50 rounded-xl p-8 shadow-lg">
                            <h2 class="text-2xl font-bold mb-6 text-center">Smart Broker Recommendation</h2>
                            <div id="questionnaire-form">
                                <!-- Dynamic questionnaire will be loaded here -->
                            </div>
                            <div id="recommendations-results" class="hidden mt-8">
                                <!-- Recommendations will be displayed here -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="py-16 bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold mb-4">Why Choose BrokerAnalysis?</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Our comprehensive platform provides everything you need to make informed broker selection decisions.
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-xl shadow-md text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-brain text-2xl text-blue-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-3">Smart Matching</h3>
                            <p class="text-gray-600">
                                AI-powered recommendation engine that matches you with brokers based on your specific needs and preferences.
                            </p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-xl shadow-md text-center">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-shield-alt text-2xl text-green-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-3">Verified Data</h3>
                            <p class="text-gray-600">
                                Comprehensive database of regulated brokers with verified ratings, spreads, and regulatory information.
                            </p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-xl shadow-md text-center">
                            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-calculator text-2xl text-purple-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-3">Cost Calculator</h3>
                            <p class="text-gray-600">
                                Strategy-aware cost calculator to estimate your real trading expenses with different brokers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Quick Stats -->
            <section class="py-12 bg-blue-900 text-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div class="text-3xl font-bold mb-2" id="total-brokers">12+</div>
                            <div class="text-blue-200">Brokers Analyzed</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold mb-2">100%</div>
                            <div class="text-blue-200">Regulated Brokers</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold mb-2">24/7</div>
                            <div class="text-blue-200">Analysis Available</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold mb-2">Free</div>
                            <div class="text-blue-200">Always Free</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-3xl font-bold mb-4">Ready to Find Your Perfect Broker?</h2>
                    <p class="text-xl mb-8 text-green-100">
                        Join thousands of traders who've found their ideal broker with BrokerAnalysis
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onclick="startRecommendation()" class="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Get Recommendations
                        </button>
                        <button onclick="showSection('reviews')" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                            Browse All Brokers
                        </button>
                    </div>
                </div>
            </section>
        </div>

        <!-- Chatbot Widget -->
        <div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
            <button id="chatbot-toggle" class="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-comments text-xl"></i>
            </button>
            <div id="chatbot-window" class="hidden absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border">
                <div class="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <span class="font-semibold">BrokerAnalysis Assistant</span>
                    <button id="chatbot-close" class="text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="chatbot-messages" class="h-64 overflow-y-auto p-4 space-y-3">
                    <div class="flex items-start space-x-2">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-robot text-blue-600 text-sm"></i>
                        </div>
                        <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
                            <p class="text-sm">Hello! I'm your broker analysis assistant. How can I help you find the perfect forex broker today?</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t">
                    <div class="flex space-x-2">
                        <input type="text" id="chatbot-input" placeholder="Ask about brokers..." class="flex-1 p-2 border rounded-lg text-sm">
                        <button id="chatbot-send" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-1">
                        <button onclick="sendQuickMessage('Show regulated brokers')" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                            Regulated brokers
                        </button>
                        <button onclick="sendQuickMessage('Best for beginners')" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                            For beginners
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading Indicator -->
        <div id="loading-indicator" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
            <div class="bg-white p-6 rounded-lg shadow-xl text-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p class="text-gray-700">Analyzing brokers...</p>
            </div>
        </div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
});

export default app