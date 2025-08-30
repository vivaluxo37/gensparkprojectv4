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

// ADDITIVE: Test page route for enhanced simulator (embedded HTML)
app.get('/test-simulator', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enhanced Simulator Test - BrokerAnalysis</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .test-output {
                font-family: 'Courier New', monospace;
                background: #1f2937;
                color: #10b981;
                padding: 20px;
                border-radius: 8px;
                white-space: pre-wrap;
                max-height: 400px;
                overflow-y: auto;
            }
        </style>
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto">
            <div class="mb-6">
                <a href="/simulator" class="text-blue-600 hover:text-blue-800">← Back to Simulator</a>
            </div>
            
            <h1 class="text-3xl font-bold mb-6">Enhanced Simulator Integration Test</h1>
            
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">Component Loading Status</h2>
                <div class="grid grid-cols-2 gap-4" id="component-status">
                    <!-- Status will be populated here -->
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">Enhanced Engine Test</h2>
                <button id="run-engine-test" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Test Calculation Engine
                </button>
                <div id="engine-test-results" class="mt-4 test-output" style="display: none;"></div>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-bold mb-4">Integration Status</h2>
                <div id="integration-status" class="space-y-2">
                    <!-- Integration status will be populated here -->
                </div>
            </div>
        </div>

        <!-- Load Enhanced Simulator Components -->
        <script src="/static/enhanced-simulator-engine.js"></script>
        <script src="/static/enhanced-simulator-ui.js"></script>
        <script src="/static/enhanced-simulator-mobile.js"></script>
        <script src="/static/enhanced-simulator-export.js"></script>

        <script>
            document.addEventListener('DOMContentLoaded', () => {
                checkComponentStatus();
                setupEventListeners();
                checkIntegrationStatus();
            });

            function checkComponentStatus() {
                const components = [
                    { name: 'EnhancedSimulatorEngine', class: window.EnhancedSimulatorEngine },
                    { name: 'EnhancedSimulatorUI', class: window.EnhancedSimulatorUI },
                    { name: 'SimulatorMobileOptimizer', class: window.SimulatorMobileOptimizer },
                    { name: 'SimulatorExportManager', class: window.SimulatorExportManager }
                ];

                const statusContainer = document.getElementById('component-status');
                statusContainer.innerHTML = '';

                components.forEach(component => {
                    const isLoaded = typeof component.class === 'function';
                    const statusCard = document.createElement('div');
                    statusCard.className = \`p-4 rounded-lg border-2 \${isLoaded ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}\`;
                    statusCard.innerHTML = \`
                        <div class="flex items-center justify-between">
                            <span class="font-medium">\${component.name}</span>
                            <span class="text-sm \${isLoaded ? 'text-green-600' : 'text-red-600'}">
                                \${isLoaded ? '✅ Loaded' : '❌ Failed'}
                            </span>
                        </div>
                    \`;
                    statusContainer.appendChild(statusCard);
                });
            }

            function setupEventListeners() {
                document.getElementById('run-engine-test').addEventListener('click', runEngineTest);
            }

            async function runEngineTest() {
                const output = document.getElementById('engine-test-results');
                output.style.display = 'block';
                output.textContent = '🔧 Running Enhanced Engine Integration Test...\\n\\n';

                try {
                    const engine = new EnhancedSimulatorEngine();
                    await engine.init();

                    // Test broker data loading
                    output.textContent += '1. Testing broker data:';
                    const brokers = engine.getBrokers();
                    output.textContent += \` ✅ Loaded \${brokers.length} brokers\\n\`;

                    // Test strategy data loading  
                    output.textContent += '2. Testing strategy data:';
                    const strategies = engine.getStrategies();
                    output.textContent += \` ✅ Loaded \${strategies.length} strategies\\n\`;

                    // Test cost calculation
                    output.textContent += '\\n3. Testing cost calculation:\\n';
                    const params = {
                        tradeSize: 1.0,
                        tradesPerMonth: 100,
                        instrument: 'EURUSD',
                        holdingPeriodDays: 1
                    };

                    const result = engine.calculateAdvancedCosts('ic-markets', 'scalping', params);
                    output.textContent += \`   ✅ Total monthly cost: $\${result.costs.totalCost}\\n\`;
                    output.textContent += \`   ✅ Cost per trade: $\${result.costs.costPerTrade}\\n\`;
                    output.textContent += \`   ✅ Suitability score: \${result.qualityMetrics.suitabilityScore}/100\\n\`;

                    // Test broker comparison
                    output.textContent += '\\n4. Testing broker comparison:\\n';
                    const brokerIds = ['ic-markets', 'pepperstone', 'etoro'];
                    const comparison = engine.compareAcrossBrokers(brokerIds, 'scalping', params);
                    
                    output.textContent += \`   ✅ Compared \${comparison.length} brokers\\n\`;
                    output.textContent += \`   ✅ Best: \${comparison[0].brokerName} ($\${comparison[0].costs.totalCost})\\n\`;
                    output.textContent += \`   ✅ Rankings: \${comparison.map(r => \`#\${r.ranking} \${r.brokerName}\`).join(', ')}\\n\`;

                    // Test insights
                    output.textContent += '\\n5. Testing insights generation:\\n';
                    const insights = engine.generateInsights(comparison, 'scalping', params);
                    output.textContent += \`   ✅ Generated \${insights.recommendations.length} recommendations\\n\`;
                    output.textContent += \`   ✅ Potential savings: $\${insights.summary.totalMonthlySavings.toFixed(2)}\\n\`;

                    output.textContent += '\\n🎉 All tests passed! Enhanced simulator is working correctly.';

                } catch (error) {
                    output.textContent += \`\\n❌ Test failed: \${error.message}\`;
                    console.error('Engine test error:', error);
                }
            }

            function checkIntegrationStatus() {
                const statusContainer = document.getElementById('integration-status');
                
                // Check if we're on the correct page
                const isSimulatorPage = window.location.pathname.includes('simulator');
                
                const checks = [
                    { 
                        name: 'Script Loading', 
                        status: typeof EnhancedSimulatorEngine === 'function' && 
                                typeof EnhancedSimulatorUI === 'function',
                        description: 'All enhanced simulator scripts loaded successfully'
                    },
                    { 
                        name: 'Backward Compatibility', 
                        status: typeof TradingSimulator === 'function',
                        description: 'Original simulator functionality preserved'
                    },
                    { 
                        name: 'Mobile Optimization', 
                        status: typeof SimulatorMobileOptimizer === 'function',
                        description: 'Mobile-responsive features available'
                    },
                    { 
                        name: 'Export Features', 
                        status: typeof SimulatorExportManager === 'function',
                        description: 'PDF, CSV export and sharing functionality'
                    }
                ];

                checks.forEach(check => {
                    const statusDiv = document.createElement('div');
                    statusDiv.className = \`p-3 rounded-lg border \${check.status ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}\`;
                    statusDiv.innerHTML = \`
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="font-medium \${check.status ? 'text-green-800' : 'text-red-800'}">\${check.name}</div>
                                <div class="text-sm text-gray-600">\${check.description}</div>
                            </div>
                            <span class="\${check.status ? 'text-green-600' : 'text-red-600'}">
                                \${check.status ? '✅' : '❌'}
                            </span>
                        </div>
                    \`;
                    statusContainer.appendChild(statusDiv);
                });

                // Overall status
                const allPassed = checks.every(check => check.status);
                const overallDiv = document.createElement('div');
                overallDiv.className = \`p-4 rounded-lg border-2 mt-4 \${allPassed ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}\`;
                overallDiv.innerHTML = \`
                    <div class="font-bold text-lg \${allPassed ? 'text-green-800' : 'text-yellow-800'}">
                        \${allPassed ? '🎉 Integration Successful!' : '⚠️ Some Issues Detected'}
                    </div>
                    <div class="text-sm mt-1 \${allPassed ? 'text-green-700' : 'text-yellow-700'}">
                        \${allPassed ? 
                            'Enhanced simulator is fully integrated and ready to use.' : 
                            'Some components may not be working correctly. Check the status above.'}
                    </div>
                \`;
                statusContainer.appendChild(overallDiv);
            }
        </script>
    </body>
    </html>
  `);
})

// API route to serve broker data
app.get('/data/brokers.json', async (c) => {
  // Read the broker data from the public directory
  const brokerData = {
    "brokers": [
      {
        "id": "ic-markets",
        "name": "IC Markets",
        "logo": "/static/logos/ic-markets.svg",
        "rating": 4.5,
        "spread_type": "Raw",
        "min_spread_pips": 0.0,
        "commission": "$7",
        "min_deposit_usd": 200,
        "is_regulated": true,
        "regulation": ["ASIC", "CySEC", "FSA"],
        "platforms": ["MetaTrader 4", "MetaTrader 5", "cTrader"],
        "demo_account": true,
        "social_trading": false,
        "pros": ["Lowest spreads", "Multiple platforms", "Strong regulation"],
        "cons": ["Higher minimum deposit", "Complex for beginners"],
        "review": "IC Markets offers some of the tightest spreads in the industry, making it ideal for serious traders and scalpers."
      },
      {
        "id": "pepperstone",
        "name": "Pepperstone",
        "logo": "/static/logos/pepperstone.svg", 
        "rating": 4.4,
        "spread_type": "Raw",
        "min_spread_pips": 0.0,
        "commission": "$7",
        "min_deposit_usd": 200,
        "is_regulated": true,
        "regulation": ["ASIC", "CySEC", "FCA"],
        "platforms": ["MetaTrader 4", "MetaTrader 5", "cTrader", "DupliTrade"],
        "demo_account": true,
        "social_trading": true,
        "pros": ["Raw spreads", "Social trading", "Fast execution"],
        "cons": ["Commission structure", "Limited educational content"],
        "review": "Pepperstone combines tight spreads with advanced technology, offering both raw spread accounts and social trading features."
      },
      {
        "id": "etoro",
        "name": "eToro",
        "logo": "/static/logos/etoro.svg",
        "rating": 4.2,
        "spread_type": "Fixed",
        "min_spread_pips": 1.0,
        "commission": "0%",
        "min_deposit_usd": 50,
        "is_regulated": true,
        "regulation": ["CySEC", "FCA", "ASIC"],
        "platforms": ["eToro Platform", "eToro Mobile"],
        "demo_account": true,
        "social_trading": true,
        "pros": ["Social trading leader", "Low minimum deposit", "User-friendly"],
        "cons": ["Higher spreads", "Limited advanced tools"],
        "review": "eToro pioneered social trading, making it perfect for beginners who want to copy successful traders."
      },
      {
        "id": "tastyfx",
        "name": "TastyFX", 
        "logo": "/static/logos/tastyfx.svg",
        "rating": 4.3,
        "spread_type": "Variable",
        "min_spread_pips": 0.8,
        "commission": "$1",
        "min_deposit_usd": 250,
        "is_regulated": true,
        "regulation": ["FCA", "CFTC"],
        "platforms": ["TastyFX Platform", "MetaTrader 4"],
        "demo_account": true,
        "social_trading": false,
        "pros": ["Strong regulation", "Innovative platform", "Low commissions"],
        "cons": ["Limited social features", "Newer brand"],
        "review": "TastyFX brings institutional-grade trading to retail investors with strong regulatory backing and innovative tools."
      },
      {
        "id": "oanda",
        "name": "OANDA",
        "logo": "/static/logos/oanda.svg",
        "rating": 4.1,
        "spread_type": "Variable",
        "min_spread_pips": 1.2,
        "commission": "0%",
        "min_deposit_usd": 1,
        "is_regulated": true,
        "regulation": ["CFTC", "NFA", "ASIC"],
        "platforms": ["OANDA Trade", "MetaTrader 4", "TradingView"],
        "demo_account": true,
        "social_trading": false,
        "pros": ["No minimum deposit", "Excellent education", "Established reputation"],
        "cons": ["Higher spreads", "Limited social features"],
        "review": "OANDA is a trusted veteran in forex trading, offering excellent educational resources and no minimum deposit requirement."
      },
      {
        "id": "forex-com",
        "name": "Forex.com",
        "logo": "/static/logos/forex-com.svg",
        "rating": 4.0,
        "spread_type": "Variable",
        "min_spread_pips": 1.5,
        "commission": "0%",
        "min_deposit_usd": 100,
        "is_regulated": true,
        "regulation": ["CFTC", "NFA", "ASIC"],
        "platforms": ["Forex.com Platform", "MetaTrader 4", "TradingView"],
        "demo_account": true,
        "social_trading": false,
        "pros": ["Well-established", "Multiple platforms", "Good support"],
        "cons": ["Higher spreads", "Dated interface"],
        "review": "Forex.com is a well-established broker with a solid reputation, though spreads are not the most competitive."
      }
    ]
  };
  
  return c.json(brokerData);
})

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

// PATCH: Added new page routes while preserving all existing functionality
// Migration note: New routes added for Reviews, Compare, Simulator, About, and broker detail pages

// Session-backed chat API for persistent messages
// TODO: Replace with LLM provider integration
let chatSessions: { [key: string]: any[] } = {};

app.post('/api/chat', async (c) => {
  const { message, session_id } = await c.req.json();
  const sessionId = session_id || `chat_${Date.now()}`;
  
  if (!chatSessions[sessionId]) {
    chatSessions[sessionId] = [];
  }
  
  // Store user message
  chatSessions[sessionId].push({
    role: 'user',
    message,
    timestamp: Date.now()
  });
  
  // Simple response logic - TODO: Replace with actual LLM integration
  let response = "I'd be happy to help you find the right broker! Could you tell me more about what you're looking for?";
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = "Hello! I'm here to help you find the perfect forex broker. What's most important to you - low costs, regulation, or specific features?";
  } else if (lowerMessage.includes('regulat') || lowerMessage.includes('safe')) {
    response = "Great choice! I recommend looking at FCA, CFTC, or ASIC regulated brokers. TastyFX and OANDA are excellent regulated options.";
  } else if (lowerMessage.includes('cost') || lowerMessage.includes('cheap')) {
    response = "For the lowest trading costs, consider IC Markets or Pepperstone with their Raw accounts. They offer spreads from 0.0 pips plus commission.";
  }
  
  // Store bot response
  chatSessions[sessionId].push({
    role: 'bot',
    message: response,
    timestamp: Date.now()
  });
  
  return c.json({
    response,
    session_id: sessionId,
    history: chatSessions[sessionId]
  });
});

// Reviews page route
app.get('/reviews', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Broker Reviews - BrokerAnalysis</title>
        <meta name="description" content="Compare detailed reviews of top forex brokers. Read verified ratings, pros, cons, and user feedback.">
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
                        <a href="/" class="text-xl font-bold text-gray-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-primary font-semibold">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-primary transition-colors">Simulator</a>
                        <a href="/about" class="text-gray-700 hover:text-primary transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Reviews Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold mb-4">Broker Reviews</h1>
                <p class="text-xl text-blue-100">Detailed analysis and ratings of top forex brokers</p>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex flex-wrap gap-4">
                    <select id="region-filter" class="border rounded-lg px-3 py-2">
                        <option value="">All Regions</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="EU">Europe</option>
                    </select>
                    <select id="rating-filter" class="border rounded-lg px-3 py-2">
                        <option value="">All Ratings</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.0">4.0+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                    </select>
                    <input type="text" id="search-input" placeholder="Search brokers..." class="border rounded-lg px-3 py-2 flex-1 min-w-0">
                </div>
            </div>
        </div>

        <!-- Reviews List -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div id="reviews-list" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Broker cards will be loaded here -->
            </div>
        </div>

        <!-- Modern Footer -->
        <footer class="bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fas fa-chart-line text-blue-400 text-2xl"></i>
                            <span class="text-xl font-bold">BrokerAnalysis</span>
                        </div>
                        <p class="text-gray-400">Find your perfect forex broker with our intelligent recommendation system.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Product</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/reviews" class="hover:text-white transition-colors">Reviews</a></li>
                            <li><a href="/compare" class="hover:text-white transition-colors">Compare</a></li>
                            <li><a href="/simulator" class="hover:text-white transition-colors">Simulator</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Resources</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Methodology</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Legal</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/reviews.js"></script>
    </body>
    </html>
  `);
});

// Compare page route
app.get('/compare', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Compare Brokers - BrokerAnalysis</title>
        <meta name="description" content="Compare up to 4 forex brokers side by side. Analyze spreads, commissions, features, and regulation.">
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
                        <a href="/" class="text-xl font-bold text-gray-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-primary font-semibold">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-primary transition-colors">Simulator</a>
                        <a href="/about" class="text-gray-700 hover:text-primary transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Compare Header -->
        <div class="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold mb-4">Compare Brokers</h1>
                <p class="text-xl text-purple-100">Compare up to 4 brokers side by side</p>
            </div>
        </div>

        <!-- Broker Selection -->
        <div class="bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-0">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Select brokers to compare</label>
                        <input type="text" id="broker-search" placeholder="Search and select brokers..." class="w-full border rounded-lg px-3 py-2">
                    </div>
                    <div class="flex items-end gap-2">
                        <button id="reset-comparison" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Reset</button>
                        <button id="print-comparison" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Print</button>
                    </div>
                </div>
                
                <!-- Selected Brokers -->
                <div id="selected-brokers" class="mt-4 flex flex-wrap gap-2">
                    <!-- Selected broker chips will appear here -->
                </div>
            </div>
        </div>

        <!-- Comparison Table -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div id="comparison-container" class="hidden">
                <div class="overflow-x-auto">
                    <table class="comparison-table w-full bg-white rounded-lg shadow">
                        <thead id="comparison-header">
                            <!-- Dynamic header will be generated -->
                        </thead>
                        <tbody id="comparison-body">
                            <!-- Dynamic comparison rows will be generated -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div id="empty-state" class="text-center py-16">
                <i class="fas fa-balance-scale text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-600 mb-2">Select brokers to compare</h3>
                <p class="text-gray-500">Choose up to 4 brokers from the search above to see a detailed comparison</p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/compare.js"></script>
    </body>
    </html>
  `);
});

// Simulator page route
app.get('/simulator', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trading Cost Simulator - BrokerAnalysis</title>
        <meta name="description" content="Calculate and compare real trading costs across different brokers based on your strategy and trading volume.">
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
                        <a href="/" class="text-xl font-bold text-gray-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-primary font-semibold">Simulator</a>
                        <a href="/about" class="text-gray-700 hover:text-primary transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Simulator Header -->
        <div class="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl font-bold mb-4">Trading Cost Simulator</h1>
                <p class="text-xl text-green-100">Calculate real trading costs based on your strategy</p>
            </div>
        </div>

        <!-- Simulator Inputs -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-2xl font-bold mb-6">Trading Parameters</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Trading Strategy</label>
                        <select id="strategy-select" class="w-full border rounded-lg px-3 py-2">
                            <option value="scalping">Scalping</option>
                            <option value="swing">Swing Trading</option>
                            <option value="algo">Algorithmic</option>
                            <option value="daytrading">Day Trading</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Trade Size (lots)</label>
                        <input type="number" id="trade-size" value="1" min="0.01" step="0.01" class="w-full border rounded-lg px-3 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Number of Trades per Month</label>
                        <input type="number" id="trades-count" value="100" min="1" class="w-full border rounded-lg px-3 py-2">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Primary Instrument</label>
                        <select id="instrument-select" class="w-full border rounded-lg px-3 py-2">
                            <option value="EURUSD">EUR/USD</option>
                            <option value="GBPUSD">GBP/USD</option>
                            <option value="USDJPY">USD/JPY</option>
                            <option value="AUDUSD">AUD/USD</option>
                        </select>
                    </div>
                </div>
                
                <button id="calculate-costs" class="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Calculate Trading Costs
                </button>
            </div>

            <!-- Results -->
            <div id="results-container" class="hidden">
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h3 class="text-xl font-bold mb-4">Cost Comparison Results</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left">Broker</th>
                                    <th class="px-4 py-3 text-left">Spread Cost</th>
                                    <th class="px-4 py-3 text-left">Commission</th>
                                    <th class="px-4 py-3 text-left">Slippage Est.</th>
                                    <th class="px-4 py-3 text-left">Total Monthly</th>
                                </tr>
                            </thead>
                            <tbody id="results-table">
                                <!-- Results will be populated here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-xl font-bold mb-4">Calculation Methodology</h3>
                    <div class="prose max-w-none">
                        <p class="text-gray-600 mb-4">Our cost calculator uses the following formula:</p>
                        <div class="bg-gray-50 p-4 rounded-lg mb-4">
                            <code>Total Cost = (Spread × Pip Value × Trades) + (Commission × Trades) + (Estimated Slippage × Trades)</code>
                        </div>
                        <ul class="text-sm text-gray-600 space-y-2">
                            <li><strong>Spread Cost:</strong> Based on typical spreads for your chosen strategy</li>
                            <li><strong>Commission:</strong> Per-lot commission charges where applicable</li>
                            <li><strong>Slippage:</strong> Estimated market impact based on strategy type</li>
                            <li><strong>Data Sources:</strong> Broker websites, regulatory filings, and market data</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/simulator.js"></script>
        <!-- ADDITIVE ENHANCEMENT: Professional simulator components -->
        <script src="/static/enhanced-simulator-engine.js"></script>
        <script src="/static/enhanced-simulator-ui.js"></script>
        <script src="/static/enhanced-simulator-mobile.js"></script>
        <script src="/static/enhanced-simulator-export.js"></script>
    </body>
    </html>
  `);
});

// About page route
app.get('/about', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About - BrokerAnalysis</title>
        <meta name="description" content="Learn about our methodology, data sources, and mission to help traders find the perfect forex broker.">
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
                        <a href="/" class="text-xl font-bold text-gray-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-primary transition-colors">Simulator</a>
                        <a href="/about" class="text-primary font-semibold">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- About Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl font-bold mb-4">About BrokerAnalysis</h1>
                <p class="text-xl text-indigo-100">Transparent, data-driven broker recommendations for traders</p>
            </div>
        </div>

        <!-- Mission -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="prose max-w-none">
                <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
                <p class="text-lg text-gray-600 mb-8">
                    BrokerAnalysis exists to help traders make informed decisions when choosing a forex broker. 
                    We believe that access to accurate, comprehensive broker information should be free and 
                    transparent for everyone in the trading community.
                </p>

                <h2 class="text-3xl font-bold mb-6 mt-12">Methodology</h2>
                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Scoring System</h3>
                    <p class="text-gray-600 mb-4">Our broker ratings are based on a weighted scoring system that considers:</p>
                    <ul class="space-y-2 text-gray-600">
                        <li><strong>Regulation & Safety (25%):</strong> Regulatory oversight, financial stability, client fund protection</li>
                        <li><strong>Trading Costs (25%):</strong> Spreads, commissions, overnight fees, and other trading expenses</li>
                        <li><strong>Platform & Tools (20%):</strong> Trading platform quality, mobile apps, charting tools, and research</li>
                        <li><strong>Product Range (15%):</strong> Available instruments, account types, and trading options</li>
                        <li><strong>Customer Service (15%):</strong> Support quality, response times, and availability</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Data Sources</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Regulatory databases (FCA, CFTC, ASIC, CySEC registers)</li>
                        <li>• Broker websites and official documentation</li>
                        <li>• Live spread data and market conditions</li>
                        <li>• User feedback and verified reviews</li>
                        <li>• Financial statements and regulatory filings</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Data Refresh Policy</h3>
                    <p class="text-gray-600">
                        We update our broker database weekly to ensure accuracy. Spread data is monitored daily, 
                        while regulatory information and company details are verified monthly. Any significant 
                        changes to broker terms or regulatory status are updated immediately.
                    </p>
                </div>

                <h2 class="text-3xl font-bold mb-6 mt-12">Trust & Transparency</h2>
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Independent Analysis</h3>
                        <p class="text-gray-600">
                            Our reviews are completely independent and unbiased. We do not accept payment 
                            for positive reviews or ratings.
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Open Methodology</h3>
                        <p class="text-gray-600">
                            Our scoring methodology is fully transparent and publicly available. 
                            We believe traders deserve to know how ratings are calculated.
                        </p>
                    </div>
                </div>

                <h2 class="text-3xl font-bold mb-6 mt-12">Privacy & Data</h2>
                <div class="bg-gray-50 rounded-lg p-6 mb-8">
                    <p class="text-gray-600">
                        We collect minimal user data and never share personal information with third parties. 
                        Our recommendation system uses anonymized usage patterns to improve suggestions while 
                        protecting individual privacy. No trading history or financial information is collected or stored.
                    </p>
                </div>

                <h2 class="text-3xl font-bold mb-6 mt-12">Contact Us</h2>
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-lg font-semibold mb-2">General Inquiries</h3>
                            <p class="text-gray-600">hello@brokeranalysis.com</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-2">Data Corrections</h3>
                            <p class="text-gray-600">data@brokeranalysis.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Individual broker detail page route
app.get('/broker/:slug', (c) => {
  const slug = c.req.param('slug');
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Broker Review - BrokerAnalysis</title>
        <meta name="description" content="Detailed review and analysis of forex broker">
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
                        <a href="/" class="text-xl font-bold text-gray-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-primary transition-colors">Simulator</a>
                        <a href="/about" class="text-gray-700 hover:text-primary transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <div id="broker-detail" data-slug="${slug}">
            <!-- Broker detail content will be loaded here -->
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          // Load broker details on page load
          document.addEventListener('DOMContentLoaded', async function() {
            const slug = document.getElementById('broker-detail').dataset.slug;
            try {
              const response = await fetch('/data/brokers.json');
              const data = await response.json();
              const broker = data.brokers.find(b => b.slug === slug);
              
              if (broker) {
                document.getElementById('broker-detail').innerHTML = renderBrokerDetail(broker);
                document.title = broker.name + ' Review - BrokerAnalysis';
              } else {
                document.getElementById('broker-detail').innerHTML = '<div class="text-center py-16"><h2 class="text-2xl font-bold text-gray-600">Broker not found</h2></div>';
              }
            } catch (error) {
              console.error('Error loading broker data:', error);
            }
          });

          function renderBrokerDetail(broker) {
            return \`
              <!-- Hero Section -->
              <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex items-center space-x-6">
                    <div class="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                      <i class="fas fa-building text-3xl text-gray-600"></i>
                    </div>
                    <div class="flex-1">
                      <h1 class="text-4xl font-bold mb-2">\${broker.name}</h1>
                      <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                          <div class="rating-stars text-yellow-400 mr-2">
                            \${renderStars(broker.rating)}
                          </div>
                          <span class="text-lg">\${broker.rating}/5.0</span>
                        </div>
                        \${broker.verified ? '<span class="bg-green-500 text-white px-2 py-1 rounded text-sm">Verified</span>' : ''}
                      </div>
                      <p class="text-xl text-blue-100 mt-2">\${broker.verdict}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Facts -->
              <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 class="text-2xl font-bold mb-6">Quick Facts</h2>
                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                      <div class="flex justify-between"><span class="font-medium">Founded:</span><span>\${broker.founded || 'N/A'}</span></div>
                      <div class="flex justify-between"><span class="font-medium">Headquarters:</span><span>\${broker.headquarters || 'N/A'}</span></div>
                      <div class="flex justify-between"><span class="font-medium">Min Deposit:</span><span>\${broker.minDeposit ? '$' + broker.minDeposit : 'N/A'}</span></div>
                    </div>
                    <div class="space-y-3">
                      <div class="flex justify-between"><span class="font-medium">Max Leverage:</span><span>\${broker.maxLeverage || 'N/A'}</span></div>
                      <div class="flex justify-between"><span class="font-medium">Typical Spread:</span><span>\${broker.typicalSpread ? broker.typicalSpread + ' pips' : 'N/A'}</span></div>
                      <div class="flex justify-between"><span class="font-medium">Platforms:</span><span>\${broker.platforms ? broker.platforms.length + ' platforms' : 'N/A'}</span></div>
                    </div>
                  </div>
                </div>

                <!-- Regulation & Safety -->
                <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 class="text-2xl font-bold mb-6">Regulation & Safety</h2>
                  \${broker.regulation && broker.regulation.length > 0 ? \`
                    <div class="grid gap-4">
                      \${broker.regulation.map(reg => \`
                        <div class="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div class="font-semibold">\${reg.name}</div>
                            <div class="text-sm text-gray-600">\${reg.jurisdiction}</div>
                          </div>
                          <div class="text-sm text-gray-500">License: \${reg.license || 'Licensed'}</div>
                        </div>
                      \`).join('')}
                    </div>
                  \` : '<p class="text-gray-600">Regulation information not available</p>'}
                </div>

                <!-- Pros & Cons -->
                \${broker.pros && broker.cons ? \`
                  <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <h3 class="text-xl font-bold text-green-600 mb-4">Pros</h3>
                      <ul class="space-y-2">
                        \${broker.pros.map(pro => \`
                          <li class="flex items-start">
                            <i class="fas fa-check text-green-600 mr-2 mt-1"></i>
                            <span class="text-gray-700">\${pro}</span>
                          </li>
                        \`).join('')}
                      </ul>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <h3 class="text-xl font-bold text-red-600 mb-4">Cons</h3>
                      <ul class="space-y-2">
                        \${broker.cons.map(con => \`
                          <li class="flex items-start">
                            <i class="fas fa-times text-red-600 mr-2 mt-1"></i>
                            <span class="text-gray-700">\${con}</span>
                          </li>
                        \`).join('')}
                      </ul>
                    </div>
                  </div>
                \` : ''}

                <!-- Compare Widget -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <h3 class="text-lg font-semibold text-blue-900 mb-2">Compare with other brokers</h3>
                  <p class="text-blue-700 mb-4">See how \${broker.name} stacks up against the competition</p>
                  <a href="/compare" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Comparison
                  </a>
                </div>
              </div>
            \`;
          }

          function renderStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
            
            return [
              ...Array(fullStars).fill('<i class="fas fa-star"></i>'),
              ...(halfStar ? ['<i class="fas fa-star-half-alt"></i>'] : []),
              ...Array(emptyStars).fill('<i class="far fa-star"></i>')
            ].join('');
          }
        </script>
    </body>
    </html>
  `);
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
                        <a href="/" class="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-gray-700 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-gray-700 hover:text-primary transition-colors">Simulator</a>
                        <a href="/about" class="text-gray-700 hover:text-primary transition-colors">About</a>
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
                <a href="/" class="block py-2 text-gray-700 hover:text-primary">Home</a>
                <a href="/reviews" class="block py-2 text-gray-700 hover:text-primary">Reviews</a>
                <a href="/compare" class="block py-2 text-gray-700 hover:text-primary">Compare</a>
                <a href="/simulator" class="block py-2 text-gray-700 hover:text-primary">Simulator</a>
                <a href="/about" class="block py-2 text-gray-700 hover:text-primary">About</a>
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
                        <a href="/reviews" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                            Browse All Brokers
                        </a>
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

        <!-- Modern Footer -->
        <footer class="bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fas fa-chart-line text-blue-400 text-2xl"></i>
                            <span class="text-xl font-bold">BrokerAnalysis</span>
                        </div>
                        <p class="text-gray-400">Find your perfect forex broker with our intelligent recommendation system.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Product</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/reviews" class="hover:text-white transition-colors">Reviews</a></li>
                            <li><a href="/compare" class="hover:text-white transition-colors">Compare</a></li>
                            <li><a href="/simulator" class="hover:text-white transition-colors">Simulator</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Resources</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Methodology</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Legal</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved.</p>
                </div>
            </div>
        </footer>

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
        <script src="/static/chat-fix.js"></script>
    </body>
    </html>
  `)
});

export default app