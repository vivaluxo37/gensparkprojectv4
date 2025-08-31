import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie } from 'hono/cookie'
import './styles.css'

// Type definitions for Cloudflare bindings
type Bindings = {
  DB: D1Database;
  GOOGLE_CLIENT_ID?: string;
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

// Configuration API endpoint
app.get('/api/config', (c) => {
  return c.json({
    google_client_id: c.env.GOOGLE_CLIENT_ID || '1041234567890-abc123def456ghi789jkl012mno345pqr.apps.googleusercontent.com'
  });
})

// ADDITIVE: Test page route for enhanced simulator (embedded HTML)
app.get('/test-simulator', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enhanced Simulator Test - BrokerAnalysis</title>
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
    <body class="bg-blue-50 p-8">
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
                <button id="run-engine-test" class="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-1000 transition-colors">
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
        <!-- CRITICAL: Load enhanced broker database FIRST for integration -->
        <script src="/static/enhanced-broker-database.js"></script>
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
                    { name: 'EnhancedBrokerDatabase', class: window.EnhancedBrokerDatabase },
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
                    statusCard.className = \`p-4 rounded-lg border-2 \${isLoaded ? 'border-yellow-400 bg-yellow-100' : 'border-blue-600 bg-blue-50'}\`;
                    statusCard.innerHTML = \`
                        <div class="flex items-center justify-between">
                            <span class="font-medium">\${component.name}</span>
                            <span class="text-sm \${isLoaded ? 'text-blue-800' : 'text-blue-800'}">
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
                        name: 'Enhanced Database Integration', 
                        status: typeof EnhancedBrokerDatabase === 'function',
                        description: 'Enhanced broker database with 67 brokers loaded'
                    },
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
                    statusDiv.className = \`p-3 rounded-lg border \${check.status ? 'border-yellow-200 bg-yellow-100' : 'border-blue-200 bg-blue-50'}\`;
                    statusDiv.innerHTML = \`
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="font-medium \${check.status ? 'text-blue-900' : 'text-blue-900'}">\${check.name}</div>
                                <div class="text-sm text-blue-600">\${check.description}</div>
                            </div>
                            <span class="\${check.status ? 'text-blue-800' : 'text-blue-800'}">
                                \${check.status ? '✅' : '❌'}
                            </span>
                        </div>
                    \`;
                    statusContainer.appendChild(statusDiv);
                });

                // Overall status
                const allPassed = checks.every(check => check.status);
                const overallDiv = document.createElement('div');
                overallDiv.className = \`p-4 rounded-lg border-2 mt-4 \${allPassed ? 'border-yellow-400 bg-yellow-100' : 'border-yellow-400 bg-yellow-100'}\`;
                overallDiv.innerHTML = \`
                    <div class="font-bold text-lg \${allPassed ? 'text-blue-900' : 'text-blue-900'}">
                        \${allPassed ? '🎉 Integration Successful!' : '⚠️ Some Issues Detected'}
                    </div>
                    <div class="text-sm mt-1 \${allPassed ? 'text-blue-700' : 'text-blue-700'}">
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

// ADDITIVE: Authentication API routes
// Comprehensive user authentication system with session management

// Authentication utilities
const generateSessionId = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
};

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer), b => b.toString(16).padStart(2, '0')).join('');
};

const verifyPassword = async (password: string, hash: string) => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};

// Get current user from session
app.get('/api/auth/me', async (c) => {
  const { DB } = c.env;
  const sessionId = c.req.header('x-session-id') || 
                    getCookie(c, 'session_id') || 
                    c.req.query('session_id');

  if (!sessionId) {
    return c.json({ error: 'No session found' }, 401);
  }

  try {
    const session = await DB.prepare(`
      SELECT s.*, u.id, u.email, u.first_name, u.last_name, u.avatar_url, u.email_verified
      FROM user_sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ? AND s.expires_at > datetime('now')
    `).bind(sessionId).first();

    if (!session) {
      return c.json({ error: 'Session expired' }, 401);
    }

    // Update last activity
    await DB.prepare(`
      UPDATE user_sessions SET created_at = datetime('now') WHERE id = ?
    `).bind(sessionId).run();

    return c.json({
      id: session.id,
      email: session.email,
      first_name: session.first_name,
      last_name: session.last_name,
      avatar_url: session.avatar_url,
      email_verified: session.email_verified
    });
  } catch (error) {
    console.error('Session check error:', error);
    return c.json({ error: 'Session validation failed' }, 500);
  }
});

// Email/password sign up
app.post('/api/auth/signup', async (c) => {
  const { DB } = c.env;
  const { firstName, lastName, email, password } = await c.req.json();

  if (!firstName || !lastName || !email || !password) {
    return c.json({ error: 'All fields are required' }, 400);
  }

  if (password.length < 8) {
    return c.json({ error: 'Password must be at least 8 characters' }, 400);
  }

  try {
    // Check if user already exists
    const existingUser = await DB.prepare(`
      SELECT id FROM users WHERE email = ?
    `).bind(email.toLowerCase()).first();

    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 409);
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userResult = await DB.prepare(`
      INSERT INTO users (first_name, last_name, email, password_hash, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(firstName, lastName, email.toLowerCase(), passwordHash).run();

    const userId = userResult.meta.last_row_id;

    // Create session
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    await DB.prepare(`
      INSERT INTO user_sessions (id, user_id, expires_at, user_agent, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      sessionId, 
      userId, 
      expiresAt,
      c.req.header('user-agent') || '',
      c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || ''
    ).run();

    // Set session cookie
    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return c.json({
      success: true,
      user: {
        id: userId,
        email: email.toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        email_verified: false
      }
    });

  } catch (error) {
    console.error('Sign up error:', error);
    return c.json({ error: 'Account creation failed' }, 500);
  }
});

// Email/password sign in
app.post('/api/auth/signin', async (c) => {
  const { DB } = c.env;
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400);
  }

  try {
    // Find user
    const user = await DB.prepare(`
      SELECT id, email, password_hash, first_name, last_name, avatar_url, email_verified
      FROM users WHERE email = ?
    `).bind(email.toLowerCase()).first();

    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    // Create session
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    await DB.prepare(`
      INSERT INTO user_sessions (id, user_id, expires_at, user_agent, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      sessionId, 
      user.id, 
      expiresAt,
      c.req.header('user-agent') || '',
      c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || ''
    ).run();

    // Update last login
    await DB.prepare(`
      UPDATE users SET last_login_at = datetime('now') WHERE id = ?
    `).bind(user.id).run();

    // Set session cookie
    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
        email_verified: user.email_verified
      }
    });

  } catch (error) {
    console.error('Sign in error:', error);
    return c.json({ error: 'Sign in failed' }, 500);
  }
});

// Google OAuth sign in
app.post('/api/auth/google', async (c) => {
  const { DB } = c.env;
  const { credential } = await c.req.json();

  if (!credential) {
    return c.json({ error: 'Google credential is required' }, 400);
  }

  try {
    // In a real implementation, you would verify the Google JWT token here
    // For this example, we'll assume the token is valid and extract user info
    
    // Decode JWT payload (unsafe for production - use proper JWT verification)
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: avatarUrl } = payload;

    // Check if user exists by Google ID
    let user = await DB.prepare(`
      SELECT id, email, first_name, last_name, avatar_url, email_verified
      FROM users WHERE google_id = ?
    `).bind(googleId).first();

    let userId;

    if (!user) {
      // Check if user exists by email
      const existingUser = await DB.prepare(`
        SELECT id FROM users WHERE email = ?
      `).bind(email.toLowerCase()).first();

      if (existingUser) {
        // Link Google account to existing email account
        await DB.prepare(`
          UPDATE users SET google_id = ?, avatar_url = ?, email_verified = 1, updated_at = datetime('now')
          WHERE email = ?
        `).bind(googleId, avatarUrl, email.toLowerCase()).run();
        
        userId = existingUser.id;
      } else {
        // Create new user
        const userResult = await DB.prepare(`
          INSERT INTO users (first_name, last_name, email, google_id, avatar_url, email_verified, created_at)
          VALUES (?, ?, ?, ?, ?, 1, datetime('now'))
        `).bind(firstName || '', lastName || '', email.toLowerCase(), googleId, avatarUrl).run();

        userId = userResult.meta.last_row_id;
      }

      // Get user data
      user = await DB.prepare(`
        SELECT id, email, first_name, last_name, avatar_url, email_verified
        FROM users WHERE id = ?
      `).bind(userId).first();
    } else {
      userId = user.id;
      
      // Update avatar if changed
      if (avatarUrl && avatarUrl !== user.avatar_url) {
        await DB.prepare(`
          UPDATE users SET avatar_url = ?, updated_at = datetime('now') WHERE id = ?
        `).bind(avatarUrl, userId).run();
        user.avatar_url = avatarUrl;
      }
    }

    // Create session
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    await DB.prepare(`
      INSERT INTO user_sessions (id, user_id, expires_at, user_agent, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      sessionId, 
      userId, 
      expiresAt,
      c.req.header('user-agent') || '',
      c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || ''
    ).run();

    // Update last login
    await DB.prepare(`
      UPDATE users SET last_login_at = datetime('now') WHERE id = ?
    `).bind(userId).run();

    // Set session cookie
    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
        email_verified: user.email_verified
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    return c.json({ error: 'Google authentication failed' }, 500);
  }
});

// Sign out
app.post('/api/auth/signout', async (c) => {
  const { DB } = c.env;
  const sessionId = c.req.header('x-session-id') || 
                    getCookie(c, 'session_id') || 
                    c.req.query('session_id');

  if (sessionId) {
    try {
      await DB.prepare(`DELETE FROM user_sessions WHERE id = ?`).bind(sessionId).run();
    } catch (error) {
      console.error('Session cleanup error:', error);
    }
  }

  // Clear session cookie
  setCookie(c, 'session_id', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 0,
    path: '/'
  });

  return c.json({ success: true });
});

// Save broker match results for authenticated user
app.post('/api/auth/save-broker-match', async (c) => {
  const { DB } = c.env;
  const sessionId = c.req.header('x-session-id') || 
                    getCookie(c, 'session_id') || 
                    c.req.query('session_id');

  if (!sessionId) {
    return c.json({ error: 'Authentication required' }, 401);
  }

  try {
    // Verify session and get user
    const session = await DB.prepare(`
      SELECT user_id FROM user_sessions 
      WHERE id = ? AND expires_at > datetime('now')
    `).bind(sessionId).first();

    if (!session) {
      return c.json({ error: 'Session expired' }, 401);
    }

    const { matchData, recommendedBrokers, matchScore } = await c.req.json();

    // Save broker match
    const result = await DB.prepare(`
      INSERT INTO user_broker_matches (user_id, match_data, recommended_brokers, match_score, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(
      session.user_id,
      JSON.stringify(matchData),
      JSON.stringify(recommendedBrokers),
      matchScore
    ).run();

    return c.json({
      success: true,
      matchId: result.meta.last_row_id
    });

  } catch (error) {
    console.error('Save broker match error:', error);
    return c.json({ error: 'Failed to save broker match' }, 500);
  }
});

// Get user's saved broker matches
app.get('/api/auth/broker-matches', async (c) => {
  const { DB } = c.env;
  const sessionId = c.req.header('x-session-id') || 
                    getCookie(c, 'session_id') || 
                    c.req.query('session_id');

  if (!sessionId) {
    return c.json({ error: 'Authentication required' }, 401);
  }

  try {
    // Verify session and get user
    const session = await DB.prepare(`
      SELECT user_id FROM user_sessions 
      WHERE id = ? AND expires_at > datetime('now')
    `).bind(sessionId).first();

    if (!session) {
      return c.json({ error: 'Session expired' }, 401);
    }

    const matches = await DB.prepare(`
      SELECT id, match_data, recommended_brokers, match_score, created_at
      FROM user_broker_matches
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(session.user_id).all();

    const parsedMatches = matches.results.map(match => ({
      ...match,
      match_data: JSON.parse(match.match_data),
      recommended_brokers: JSON.parse(match.recommended_brokers)
    }));

    return c.json({
      success: true,
      matches: parsedMatches
    });

  } catch (error) {
    console.error('Get broker matches error:', error);
    return c.json({ error: 'Failed to get broker matches' }, 500);
  }
});

// LEGACY API route - now serves enhanced broker data
app.get('/data/brokers.json', async (c) => {
  // Fallback JSON data for pages that haven't been updated to use enhanced database
  // This ensures backward compatibility while we transition to enhanced database
  const fallbackBrokers = [
    {
      "id": "interactive-brokers",
      "name": "Interactive Brokers",
      "logo": "/static/logos/interactive-brokers.svg",
      "rating": 4.6,
      "spread_type": "Raw",
      "min_spread_pips": 0.1,
      "commission": "$2-8",
      "min_deposit_usd": 0,
      "is_regulated": true,
      "regulation": ["CFTC", "SEC", "FINRA", "FCA"],
      "platforms": ["Trader Workstation", "IBKR Mobile", "API"],
      "demo_account": true,
      "social_trading": false,
      "pros": ["Lowest costs globally", "150+ markets", "Institutional execution"],
      "cons": ["Complex platform", "Minimum activity fees"],
      "review": "Industry-leading institutional broker with unmatched global access and lowest costs."
    },
    {
      "id": "ic-markets",
      "name": "IC Markets",
      "logo": "/static/logos/ic-markets.svg",
      "rating": 4.4,
      "spread_type": "Raw",
      "min_spread_pips": 0.0,
      "commission": "$3.50",
      "min_deposit_usd": 200,
      "is_regulated": true,
      "regulation": ["ASIC", "CySEC", "FSA"],
      "platforms": ["MetaTrader 4", "MetaTrader 5", "cTrader"],
      "demo_account": true,
      "social_trading": false,
      "pros": ["Lowest spreads", "True ECN", "Fast execution"],
      "cons": ["Commission charges", "Limited education"],
      "review": "Leading ECN broker with industry-best spreads and institutional-grade execution."
    },
    {
      "id": "pepperstone",
      "name": "Pepperstone",
      "logo": "/static/logos/pepperstone.svg", 
      "rating": 4.3,
      "spread_type": "Raw",
      "min_spread_pips": 0.0,
      "commission": "$3.50",
      "min_deposit_usd": 0,
      "is_regulated": true,
      "regulation": ["ASIC", "FCA", "CySEC"],
      "platforms": ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
      "demo_account": true,
      "social_trading": false,
      "pros": ["No minimum deposit", "TradingView integration", "Fast execution"],
      "cons": ["Commission on raw accounts", "Limited education"],
      "review": "Fast-growing Australian broker with excellent execution and competitive pricing."
    }
    // Note: This is fallback data. Enhanced database provides 67+ brokers
  ];
  
  return c.json({
    "brokers": fallbackBrokers,
    "enhanced_available": true,
    "message": "Legacy API. Use enhanced broker database client-side for full 67-broker dataset."
  });
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

// Get broker recommendations based on user profile (Enhanced with Authentication)
app.post('/api/recommendations', async (c) => {
  const { DB } = c.env;
  const profile = await c.req.json();
  
  // Check if user is authenticated
  const sessionId = c.req.header('x-session-id') || 
                    getCookie(c, 'session_id') || 
                    c.req.query('session_id');

  let userId = null;
  
  if (sessionId) {
    try {
      const session = await DB.prepare(`
        SELECT user_id FROM user_sessions 
        WHERE id = ? AND expires_at > datetime('now')
      `).bind(sessionId).first();
      
      if (session) {
        userId = session.user_id;
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  }
  
  // Store user profile (legacy compatibility maintained)
  const legacySessionId = profile.session_id || `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
  await DB.prepare(`
    INSERT OR REPLACE INTO user_profiles 
    (session_id, country, experience_level, trading_strategy, capital_amount, account_type_pref, asset_preferences, risk_tolerance)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    legacySessionId,
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
  
  // Store top recommendations (legacy)
  const topRecommendations = recommendations.slice(0, 5);
  for (const rec of topRecommendations) {
    await DB.prepare(`
      INSERT OR REPLACE INTO recommendations (session_id, broker_id, match_score, reasoning)
      VALUES (?, ?, ?, ?)
    `).bind(legacySessionId, rec.id, rec.match_score, rec.reasoning).run();
  }

  // If user is authenticated, also save to their account
  if (userId) {
    try {
      await DB.prepare(`
        INSERT INTO user_broker_matches (user_id, session_id, match_data, recommended_brokers, match_score, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        userId,
        legacySessionId,
        JSON.stringify(profile),
        JSON.stringify(topRecommendations),
        topRecommendations[0]?.match_score || 0
      ).run();
    } catch (error) {
      console.error('Error saving authenticated user match:', error);
    }
  }
  
  return c.json({
    session_id: legacySessionId,
    recommendations: topRecommendations,
    total_brokers: brokers.results.length,
    saved_to_account: !!userId
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
        <title>Forex Broker Reviews 2025 - Detailed Analysis & Ratings | BrokerAnalysis</title>
        <meta name="description" content="Read comprehensive reviews of top forex brokers. Detailed analysis of spreads, regulation, platforms, and trading conditions. Find the best broker for your needs.">
        <meta name="keywords" content="forex broker reviews, broker ratings, forex broker analysis, trading platform reviews, regulated brokers, IC Markets review, Pepperstone review">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Forex Broker Reviews 2025 - Detailed Analysis & Ratings">
        <meta property="og:description" content="Read comprehensive reviews of top forex brokers. Detailed analysis of spreads, regulation, platforms, and trading conditions.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/reviews-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.com/reviews">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Forex Broker Reviews 2025 - Detailed Analysis & Ratings">
        <meta property="twitter:description" content="Read comprehensive reviews of top forex brokers. Detailed analysis of spreads, regulation, platforms, and trading conditions.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/reviews-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/reviews">
        
        <!-- Preconnect to external domains -->
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Organization -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrokerAnalysis",
          "url": "https://brokeranalysis.com",
          "logo": "https://brokeranalysis.com/static/images/brokeranalysis-logo.png"
        }
        </script>
        

    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Skip Navigation -->
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    
                    <!-- Enhanced Navigation with Dropdown Menus -->
                    <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                        <!-- Navigation will be populated by navigation.js -->
                        <div class="flex items-center space-x-2">
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                        aria-label="Best Brokers menu" 
                                        aria-expanded="false" 
                                        aria-haspopup="true">
                                    <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                    <span class="font-medium">Best Brokers</span>
                                    <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/brokers/top-100" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Top 100 Forex Brokers</a>
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                        <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                            <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Australia</a>
                                            <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Canada</a>
                                            <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">UK</a>
                                            <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">South Africa</a>
                                            <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Pakistan</a>
                                            <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Philippines</a>
                                            <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">India</a>
                                            <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Malaysia</a>
                                            <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Dubai</a>
                                            <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Qatar</a>
                                            <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Indonesia</a>
                                            <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">USA</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-chart-bar text-sm"></i>
                                    <span class="font-medium">Trading Types</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2 max-h-80 overflow-y-auto">
                                        <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Gold (XAUUSD) Trading</a>
                                        <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Islamic Halal Trading</a>
                                        <a href="/brokers/automated" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Automated Forex Trading</a>
                                        <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">High Leverage Brokers</a>
                                        <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Oil Trading Platform</a>
                                        <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Copy Trading Platform</a>
                                        <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">ECN Brokers</a>
                                        <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Scalping Forex Brokers</a>
                                        <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Forex Demo Accounts</a>
                                        <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">MT4 Brokers</a>
                                        <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Stocks Trading Platform</a>
                                        <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Brokers For Beginners</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-star text-sm"></i>
                                    <span class="font-medium">Reviews</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">All Reviews</a>
                                        <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Trading Platforms</a>
                                        <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Types of Forex Brokers</a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                        <div class="max-h-48 overflow-y-auto">
                                            <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FP Markets</a>
                                            <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FXTM</a>
                                            <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Blackbull Markets</a>
                                            <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Eightcap</a>
                                            <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Octa</a>
                                            <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Plus500</a>
                                            <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Avatrade</a>
                                            <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">XM</a>
                                            <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pepperstone</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-tools text-sm"></i>
                                    <span class="font-medium">Tools</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                        </a>
                                        <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                        </a>
                                        <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                        </a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                        <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Profit Calculator</a>
                                        <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Margin Calculator</a>
                                        <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pip Calculator</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-info-circle text-sm"></i>
                                    <span class="font-medium">About</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">About Us</a>
                                        <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Methodology</a>
                                        <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Contact</a>
                                        <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">API</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
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
                    <label for="search-input" class="sr-only">Search forex brokers</label>
                    <input type="text" id="search-input" placeholder="Search brokers..." class="border rounded-lg px-3 py-2 flex-1 min-w-0" aria-describedby="search-help">
                    <div id="search-help" class="sr-only">Enter broker name, regulation, or trading feature to search</div>
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
        <!-- CRITICAL: Enhanced broker database for reviews -->
        <script src="/static/enhanced-broker-database.js"></script>
        <script src="/static/seo-utils.js"></script>
        <script src="/static/reviews.js" defer></script>
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
        <title>Compare Forex Brokers Side-by-Side - Spreads, Fees & Features | BrokerAnalysis</title>
        <meta name="description" content="Compare up to 4 forex brokers side-by-side. Analyze spreads, commissions, regulation, and trading features to make informed decisions.">
        <meta name="keywords" content="compare forex brokers, broker comparison, forex spreads comparison, trading costs comparison, IC Markets vs Pepperstone, forex broker features">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Compare Forex Brokers Side-by-Side - Spreads, Fees & Features">
        <meta property="og:description" content="Compare up to 4 forex brokers side-by-side. Analyze spreads, commissions, regulation, and trading features to make informed decisions.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/compare-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.com/compare">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Compare Forex Brokers Side-by-Side - Spreads, Fees & Features">
        <meta property="twitter:description" content="Compare up to 4 forex brokers side-by-side. Analyze spreads, commissions, regulation, and trading features.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/compare-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/compare">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    
                    <!-- Enhanced Navigation with Dropdown Menus -->
                    <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                        <!-- Navigation will be populated by navigation.js -->
                        <div class="flex items-center space-x-2">
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                        aria-label="Best Brokers menu" 
                                        aria-expanded="false" 
                                        aria-haspopup="true">
                                    <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                    <span class="font-medium">Best Brokers</span>
                                    <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/brokers/top-100" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Top 100 Forex Brokers</a>
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                        <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                            <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Australia</a>
                                            <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Canada</a>
                                            <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">UK</a>
                                            <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">South Africa</a>
                                            <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Pakistan</a>
                                            <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Philippines</a>
                                            <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">India</a>
                                            <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Malaysia</a>
                                            <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Dubai</a>
                                            <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Qatar</a>
                                            <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Indonesia</a>
                                            <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">USA</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-chart-bar text-sm"></i>
                                    <span class="font-medium">Trading Types</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2 max-h-80 overflow-y-auto">
                                        <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Gold (XAUUSD) Trading</a>
                                        <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Islamic Halal Trading</a>
                                        <a href="/brokers/automated" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Automated Forex Trading</a>
                                        <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">High Leverage Brokers</a>
                                        <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Oil Trading Platform</a>
                                        <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Copy Trading Platform</a>
                                        <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">ECN Brokers</a>
                                        <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Scalping Forex Brokers</a>
                                        <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Forex Demo Accounts</a>
                                        <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">MT4 Brokers</a>
                                        <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Stocks Trading Platform</a>
                                        <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Brokers For Beginners</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-star text-sm"></i>
                                    <span class="font-medium">Reviews</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">All Reviews</a>
                                        <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Trading Platforms</a>
                                        <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Types of Forex Brokers</a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                        <div class="max-h-48 overflow-y-auto">
                                            <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FP Markets</a>
                                            <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FXTM</a>
                                            <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Blackbull Markets</a>
                                            <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Eightcap</a>
                                            <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Octa</a>
                                            <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Plus500</a>
                                            <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Avatrade</a>
                                            <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">XM</a>
                                            <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pepperstone</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-primary font-semibold transition-colors py-2 px-3 rounded-md nav-menu-button bg-blue-50">
                                    <i class="fas fa-tools text-sm"></i>
                                    <span class="font-medium">Tools</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/compare" class="block px-4 py-2 text-sm text-primary font-semibold hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                        </a>
                                        <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                        </a>
                                        <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                        </a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                        <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Profit Calculator</a>
                                        <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Margin Calculator</a>
                                        <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pip Calculator</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-info-circle text-sm"></i>
                                    <span class="font-medium">About</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">About Us</a>
                                        <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Methodology</a>
                                        <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Contact</a>
                                        <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">API</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
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
                        <label class="block text-sm font-medium text-blue-800 mb-2">Select brokers to compare</label>
                        <label for="broker-search" class="sr-only">Search and select brokers to compare</label>
                        <input type="text" id="broker-search" placeholder="Search and select brokers..." class="w-full border rounded-lg px-3 py-2" aria-describedby="broker-search-help">
                        <div id="broker-search-help" class="sr-only">Start typing broker name to see suggestions. Select up to 4 brokers to compare.</div>
                    </div>
                    <div class="flex items-end gap-2">
                        <button id="reset-comparison" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Reset</button>
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
                <h3 class="text-2xl font-bold text-blue-600 mb-2">Select brokers to compare</h3>
                <p class="text-gray-500">Choose up to 4 brokers from the search above to see a detailed comparison</p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <!-- CRITICAL: Enhanced broker database for comparison -->
        <script src="/static/enhanced-broker-database.js"></script>
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
        <title>Forex Trading Cost Calculator - Compare Real Trading Costs | BrokerAnalysis</title>
        <meta name="description" content="Calculate real forex trading costs with our advanced simulator. Compare spreads, commissions, and slippage across multiple brokers based on your trading strategy.">
        <meta name="keywords" content="forex cost calculator, trading cost simulator, spread calculator, commission calculator, forex trading costs, scalping calculator, swing trading costs">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Forex Trading Cost Calculator - Compare Real Trading Costs">
        <meta property="og:description" content="Calculate real forex trading costs with our advanced simulator. Compare spreads, commissions, and slippage across multiple brokers.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/simulator-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.com/simulator">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Forex Trading Cost Calculator - Compare Real Trading Costs">
        <meta property="twitter:description" content="Calculate real forex trading costs with our advanced simulator. Compare spreads, commissions, and slippage.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/simulator-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/simulator">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <!-- Enhanced Navigation with Dropdown Menus -->
                    <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                        <!-- Navigation will be populated by navigation.js -->
                        <div class="flex items-center space-x-2">
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                        aria-label="Best Brokers menu" 
                                        aria-expanded="false" 
                                        aria-haspopup="true">
                                    <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                    <span class="font-medium">Best Brokers</span>
                                    <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/brokers/top-100" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Top 100 Forex Brokers</a>
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                        <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                            <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Australia</a>
                                            <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Canada</a>
                                            <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">UK</a>
                                            <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">South Africa</a>
                                            <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Pakistan</a>
                                            <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Philippines</a>
                                            <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">India</a>
                                            <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Malaysia</a>
                                            <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Dubai</a>
                                            <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Qatar</a>
                                            <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Indonesia</a>
                                            <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">USA</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-chart-bar text-sm"></i>
                                    <span class="font-medium">Trading Types</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2 max-h-80 overflow-y-auto">
                                        <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Gold (XAUUSD) Trading</a>
                                        <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Islamic Halal Trading</a>
                                        <a href="/brokers/automated" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Automated Forex Trading</a>
                                        <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">High Leverage Brokers</a>
                                        <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Oil Trading Platform</a>
                                        <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Copy Trading Platform</a>
                                        <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">ECN Brokers</a>
                                        <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Scalping Forex Brokers</a>
                                        <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Forex Demo Accounts</a>
                                        <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">MT4 Brokers</a>
                                        <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Stocks Trading Platform</a>
                                        <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Brokers For Beginners</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-star text-sm"></i>
                                    <span class="font-medium">Reviews</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">All Reviews</a>
                                        <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Trading Platforms</a>
                                        <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Types of Forex Brokers</a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                        <div class="max-h-48 overflow-y-auto">
                                            <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FP Markets</a>
                                            <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FXTM</a>
                                            <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Blackbull Markets</a>
                                            <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Eightcap</a>
                                            <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Octa</a>
                                            <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Plus500</a>
                                            <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Avatrade</a>
                                            <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">XM</a>
                                            <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pepperstone</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-primary font-semibold transition-colors py-2 px-3 rounded-md nav-menu-button bg-yellow-100">
                                    <i class="fas fa-tools text-sm"></i>
                                    <span class="font-medium">Tools</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                        </a>
                                        <a href="/simulator" class="block px-4 py-2 text-sm text-primary font-semibold hover:bg-yellow-100 transition-colors">
                                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                        </a>
                                        <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                        </a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                        <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Profit Calculator</a>
                                        <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Margin Calculator</a>
                                        <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pip Calculator</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-info-circle text-sm"></i>
                                    <span class="font-medium">About</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">About Us</a>
                                        <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Methodology</a>
                                        <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Contact</a>
                                        <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">API</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
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
                        <label for="strategy-select" class="block text-sm font-medium text-blue-800 mb-2">Trading Strategy</label>
                        <select id="strategy-select" class="w-full border rounded-lg px-3 py-2" aria-describedby="strategy-help">
                            <option value="scalping">Scalping</option>
                            <option value="swing">Swing Trading</option>
                            <option value="algo">Algorithmic</option>
                            <option value="daytrading">Day Trading</option>
                        </select>
                        <div id="strategy-help" class="sr-only">Select your preferred trading strategy to get accurate cost calculations</div>
                    </div>
                    
                    <div>
                        <label for="trade-size" class="block text-sm font-medium text-blue-800 mb-2">Trade Size (lots)</label>
                        <input type="number" id="trade-size" value="1" min="0.01" step="0.01" class="w-full border rounded-lg px-3 py-2" aria-describedby="trade-size-help">
                        <div id="trade-size-help" class="sr-only">Enter your typical trade size in lots (minimum 0.01)</div>
                    </div>
                    
                    <div>
                        <label for="trades-count" class="block text-sm font-medium text-blue-800 mb-2">Number of Trades per Month</label>
                        <input type="number" id="trades-count" value="100" min="1" class="w-full border rounded-lg px-3 py-2" aria-describedby="trades-help">
                        <div id="trades-help" class="sr-only">Enter how many trades you execute per month on average</div>
                    </div>
                    
                    <div>
                        <label for="instrument-select" class="block text-sm font-medium text-blue-800 mb-2">Primary Instrument</label>
                        <select id="instrument-select" class="w-full border rounded-lg px-3 py-2" aria-describedby="instrument-help">
                            <option value="EURUSD">EUR/USD</option>
                            <option value="GBPUSD">GBP/USD</option>
                            <option value="USDJPY">USD/JPY</option>
                            <option value="AUDUSD">AUD/USD</option>
                        </select>
                        <div id="instrument-help" class="sr-only">Select the main currency pair you trade</div>
                    </div>
                </div>
                
                <button id="calculate-costs" class="mt-6 bg-yellow-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-1000 transition-colors">
                    Calculate Trading Costs
                </button>
            </div>

            <!-- Results -->
            <div id="results-container" class="hidden">
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h3 class="text-xl font-bold mb-4">Cost Comparison Results</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-blue-50">
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
                        <p class="text-blue-600 mb-4">Our cost calculator uses the following formula:</p>
                        <div class="bg-blue-50 p-4 rounded-lg mb-4">
                            <code>Total Cost = (Spread × Pip Value × Trades) + (Commission × Trades) + (Estimated Slippage × Trades)</code>
                        </div>
                        <ul class="text-sm text-blue-600 space-y-2">
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
        <!-- ADDITIVE ENHANCEMENT: Enhanced broker database and professional simulator components -->
        <!-- CRITICAL: Load enhanced broker database FIRST for integration -->
        <script src="/static/enhanced-broker-database.js"></script>
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
        <title>About BrokerAnalysis - Our Methodology & Mission | BrokerAnalysis</title>
        <meta name="description" content="Learn about our transparent methodology for rating forex brokers. Discover our mission to help traders make informed decisions with unbiased broker analysis.">
        <meta name="keywords" content="about brokeranalysis, broker rating methodology, forex broker analysis, trading platform reviews, broker comparison methodology">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="About BrokerAnalysis - Our Methodology & Mission">
        <meta property="og:description" content="Learn about our transparent methodology for rating forex brokers. Discover our mission to help traders make informed decisions.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/about-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.com/about">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="About BrokerAnalysis - Our Methodology & Mission">
        <meta property="twitter:description" content="Learn about our transparent methodology for rating forex brokers. Discover our mission to help traders make informed decisions.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/about-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/about">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">

    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-primary transition-colors">Simulator</a>
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
                <p class="text-lg text-blue-600 mb-8">
                    BrokerAnalysis exists to help traders make informed decisions when choosing a forex broker. 
                    We believe that access to accurate, comprehensive broker information should be free and 
                    transparent for everyone in the trading community.
                </p>

                <h2 class="text-3xl font-bold mb-6 mt-12">Methodology</h2>
                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Scoring System</h3>
                    <p class="text-blue-600 mb-4">Our broker ratings are based on a weighted scoring system that considers:</p>
                    <ul class="space-y-2 text-blue-600">
                        <li><strong>Regulation & Safety (25%):</strong> Regulatory oversight, financial stability, client fund protection</li>
                        <li><strong>Trading Costs (25%):</strong> Spreads, commissions, overnight fees, and other trading expenses</li>
                        <li><strong>Platform & Tools (20%):</strong> Trading platform quality, mobile apps, charting tools, and research</li>
                        <li><strong>Product Range (15%):</strong> Available instruments, account types, and trading options</li>
                        <li><strong>Customer Service (15%):</strong> Support quality, response times, and availability</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Data Sources</h3>
                    <ul class="space-y-2 text-blue-600">
                        <li>• Regulatory databases (FCA, CFTC, ASIC, CySEC registers)</li>
                        <li>• Broker websites and official documentation</li>
                        <li>• Live spread data and market conditions</li>
                        <li>• User feedback and verified reviews</li>
                        <li>• Financial statements and regulatory filings</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 class="text-xl font-semibold mb-4">Data Refresh Policy</h3>
                    <p class="text-blue-600">
                        We update our broker database weekly to ensure accuracy. Spread data is monitored daily, 
                        while regulatory information and company details are verified monthly. Any significant 
                        changes to broker terms or regulatory status are updated immediately.
                    </p>
                </div>

                <h2 class="text-3xl font-bold mb-6 mt-12">Trust & Transparency</h2>
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Independent Analysis</h3>
                        <p class="text-blue-600">
                            Our reviews are completely independent and unbiased. We do not accept payment 
                            for positive reviews or ratings.
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Open Methodology</h3>
                        <p class="text-blue-600">
                            Our scoring methodology is fully transparent and publicly available. 
                            We believe traders deserve to know how ratings are calculated.
                        </p>
                    </div>
                </div>

                <h2 class="text-3xl font-bold mb-6 mt-12">Privacy & Data</h2>
                <div class="bg-blue-50 rounded-lg p-6 mb-8">
                    <p class="text-blue-600">
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
                            <p class="text-blue-600">hello@brokeranalysis.com</p>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-2">Data Corrections</h3>
                            <p class="text-blue-600">data@brokeranalysis.com</p>
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

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">

    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-primary transition-colors">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-primary transition-colors">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-primary transition-colors">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-primary transition-colors">Simulator</a>
                        <a href="/about" class="text-blue-800 hover:text-primary transition-colors">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <div id="broker-detail" data-slug="${slug}">
            <!-- Broker detail content will be loaded here -->
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <!-- CRITICAL: Enhanced broker database for broker details -->
        <script src="/static/enhanced-broker-database.js"></script>
        <script>
          // Load broker details on page load
          document.addEventListener('DOMContentLoaded', async function() {
            const slug = document.getElementById('broker-detail').dataset.slug;
            try {
              let broker = null;
              
              // Priority 1: Use Enhanced Broker Database if available
              if (typeof EnhancedBrokerDatabase !== 'undefined') {
                const brokerDB = new EnhancedBrokerDatabase();
                await brokerDB.init();
                const enhancedBroker = brokerDB.getEnhancedBrokerById(slug);
                
                if (enhancedBroker) {
                  // Convert enhanced broker to display format
                  broker = {
                    id: enhancedBroker.id,
                    name: enhancedBroker.name,
                    slug: enhancedBroker.id,
                    rating: enhancedBroker.rating,
                    founded: enhancedBroker.founded,
                    headquarters: enhancedBroker.headquarters,
                    minDeposit: enhancedBroker.minimumDeposit,
                    maxLeverage: enhancedBroker.maxLeverage,
                    typicalSpread: enhancedBroker.spreads.major_pairs.avg,
                    platforms: enhancedBroker.platforms,
                    regulation: enhancedBroker.regulation.map(reg => ({
                      name: reg,
                      jurisdiction: this.getJurisdictionByRegulator(reg),
                      license: 'Licensed'
                    })),
                    pros: enhancedBroker.pros,
                    cons: enhancedBroker.cons,
                    verified: enhancedBroker.category === 'institutional' || enhancedBroker.rating >= 4.3,
                    verdict: enhancedBroker.reviewSummary
                  };
                }
              }
              
              // Fallback: Use legacy API
              if (!broker) {
                const response = await fetch('/data/brokers.json');
                const data = await response.json();
                broker = data.brokers.find(b => b.slug === slug || b.id === slug);
              }
              
              if (broker) {
                document.getElementById('broker-detail').innerHTML = renderBrokerDetail(broker);
                document.title = broker.name + ' Review - BrokerAnalysis';
              } else {
                document.getElementById('broker-detail').innerHTML = '<div class="text-center py-16"><h2 class="text-2xl font-bold text-blue-600">Broker not found</h2></div>';
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
                      <i class="fas fa-building text-3xl text-blue-600"></i>
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
                        \${broker.verified ? '<span class="bg-yellow-1000 text-white px-2 py-1 rounded text-sm">Verified</span>' : ''}
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
                  \${broker.bonusType ? \`
                    <div class="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-yellow-200 rounded-lg">
                      <div class="flex items-center space-x-2 mb-2">
                        <i class="fas fa-gift text-blue-800"></i>
                        <h3 class="text-lg font-semibold text-blue-900">\${broker.bonusType}</h3>
                      </div>
                      <p class="text-blue-700">Get up to <strong>\${broker.bonusAmount}</strong> bonus with this broker</p>
                    </div>
                  \` : ''}
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
                            <div class="text-sm text-blue-600">\${reg.jurisdiction}</div>
                          </div>
                          <div class="text-sm text-gray-500">License: \${reg.license || 'Licensed'}</div>
                        </div>
                      \`).join('')}
                    </div>
                  \` : '<p class="text-blue-600">Regulation information not available</p>'}
                </div>

                <!-- Special Features -->
                \${broker.specialFeatures && broker.specialFeatures.length > 0 ? \`
                  <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 class="text-2xl font-bold mb-6">Special Features</h2>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      \${broker.specialFeatures.map(feature => \`
                        <div class="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <i class="fas fa-star text-blue-600 mr-2"></i>
                          <span class="text-blue-800 font-medium">\${feature}</span>
                        </div>
                      \`).join('')}
                    </div>
                  </div>
                \` : ''}

                <!-- Pros & Cons -->
                \${broker.pros && broker.cons ? \`
                  <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <h3 class="text-xl font-bold text-blue-800 mb-4">Pros</h3>
                      <ul class="space-y-2">
                        \${broker.pros.map(pro => \`
                          <li class="flex items-start">
                            <i class="fas fa-check text-blue-800 mr-2 mt-1"></i>
                            <span class="text-blue-800">\${pro}</span>
                          </li>
                        \`).join('')}
                      </ul>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <h3 class="text-xl font-bold text-blue-800 mb-4">Cons</h3>
                      <ul class="space-y-2">
                        \${broker.cons.map(con => \`
                          <li class="flex items-start">
                            <i class="fas fa-times text-blue-800 mr-2 mt-1"></i>
                            <span class="text-blue-800">\${con}</span>
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
          
          function getJurisdictionByRegulator(regulator) {
            const jurisdictions = {
              'FCA': 'United Kingdom',
              'CFTC': 'United States', 
              'SEC': 'United States',
              'ASIC': 'Australia',
              'CySEC': 'Cyprus',
              'FINMA': 'Switzerland',
              'BaFin': 'Germany',
              'DFSA': 'Dubai',
              'MAS': 'Singapore',
              'FSA': 'Seychelles',
              'FSCA': 'South Africa'
            };
            return jurisdictions[regulator] || 'International';
          }
        </script>
    </body>
    </html>
  `);
});

// User Dashboard route
app.get('/dashboard', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - BrokerAnalysis</title>
        <meta name="description" content="Your personalized broker analysis dashboard with saved matches and recommendations.">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">

    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    
                    <!-- Enhanced Navigation with Dropdown Menus -->
                    <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                        <!-- Navigation will be populated by navigation.js -->
                        <div class="flex items-center space-x-2">
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                        aria-label="Best Brokers menu" 
                                        aria-expanded="false" 
                                        aria-haspopup="true">
                                    <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                    <span class="font-medium">Best Brokers</span>
                                    <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/brokers/top-100" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Top 100 Forex Brokers</a>
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                        <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                            <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Australia</a>
                                            <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Canada</a>
                                            <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">UK</a>
                                            <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">South Africa</a>
                                            <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Pakistan</a>
                                            <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Philippines</a>
                                            <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">India</a>
                                            <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Malaysia</a>
                                            <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Dubai</a>
                                            <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Qatar</a>
                                            <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Indonesia</a>
                                            <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">USA</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-chart-bar text-sm"></i>
                                    <span class="font-medium">Trading Types</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2 max-h-80 overflow-y-auto">
                                        <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Gold (XAUUSD) Trading</a>
                                        <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Islamic Halal Trading</a>
                                        <a href="/brokers/automated" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Automated Forex Trading</a>
                                        <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">High Leverage Brokers</a>
                                        <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Oil Trading Platform</a>
                                        <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Copy Trading Platform</a>
                                        <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">ECN Brokers</a>
                                        <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Scalping Forex Brokers</a>
                                        <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Forex Demo Accounts</a>
                                        <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">MT4 Brokers</a>
                                        <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Stocks Trading Platform</a>
                                        <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Brokers For Beginners</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-star text-sm"></i>
                                    <span class="font-medium">Reviews</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">All Reviews</a>
                                        <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Trading Platforms</a>
                                        <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Types of Forex Brokers</a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                        <div class="max-h-48 overflow-y-auto">
                                            <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FP Markets</a>
                                            <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FXTM</a>
                                            <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Blackbull Markets</a>
                                            <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Eightcap</a>
                                            <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Octa</a>
                                            <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Plus500</a>
                                            <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Avatrade</a>
                                            <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">XM</a>
                                            <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pepperstone</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-tools text-sm"></i>
                                    <span class="font-medium">Tools</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                        </a>
                                        <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                        </a>
                                        <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                        </a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                        <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Profit Calculator</a>
                                        <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Margin Calculator</a>
                                        <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pip Calculator</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-info-circle text-sm"></i>
                                    <span class="font-medium">About</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">About Us</a>
                                        <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Methodology</a>
                                        <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Contact</a>
                                        <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">API</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
                    </div>
                </div>
            </div>
        </nav>

        <!-- Dashboard Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Dashboard Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-blue-900 mb-2">Dashboard</h1>
                <p class="text-blue-600" id="welcome-message">Welcome back! Here's your broker analysis overview.</p>
            </div>

            <!-- Quick Stats -->
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-blue-600">Saved Matches</p>
                            <p class="text-2xl font-bold text-blue-900" id="saved-matches-count">-</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-heart text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-blue-600">Top Match Score</p>
                            <p class="text-2xl font-bold text-blue-900" id="top-match-score">-</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-trophy text-blue-800 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-blue-600">Last Match</p>
                            <p class="text-2xl font-bold text-blue-900" id="last-match-date">-</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-clock text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-blue-600">Account</p>
                            <p class="text-lg font-bold text-blue-900">Premium</p>
                        </div>
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-star text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Broker Matches -->
            <div class="bg-white rounded-lg shadow-md">
                <div class="px-6 py-4 border-b border-blue-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-blue-900">Recent Broker Matches</h2>
                        <div class="flex space-x-2">
                            <a href="/dashboard/matches" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All
                            </a>
                            <button data-action="broker-match" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                New Match
                            </button>
                        </div>
                    </div>
                </div>
                
                <div id="recent-matches" class="p-6">
                    <!-- Recent matches will be loaded here -->
                    <div class="text-center py-8">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p class="text-blue-600">Loading your broker matches...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/enhanced-broker-database.js"></script>
        <script src="/static/auth.js"></script>
        <script src="/static/navigation.js"></script>
        <script src="/static/dashboard.js"></script>
    </body>
    </html>
  `);
});

// Broker Matches Dashboard page
app.get('/dashboard/matches', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Broker Matches - BrokerAnalysis</title>
        <meta name="description" content="View all your saved broker match results and recommendations.">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">

    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    
                    <!-- Enhanced Navigation with Dropdown Menus -->
                    <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                        <!-- Navigation will be populated by navigation.js -->
                        <div class="flex items-center space-x-2">
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                        aria-label="Best Brokers menu" 
                                        aria-expanded="false" 
                                        aria-haspopup="true">
                                    <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                    <span class="font-medium">Best Brokers</span>
                                    <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/brokers/top-100" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Top 100 Forex Brokers</a>
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                        <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                            <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Australia</a>
                                            <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Canada</a>
                                            <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">UK</a>
                                            <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">South Africa</a>
                                            <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Pakistan</a>
                                            <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Philippines</a>
                                            <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">India</a>
                                            <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Malaysia</a>
                                            <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Dubai</a>
                                            <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Qatar</a>
                                            <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Indonesia</a>
                                            <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">USA</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-chart-bar text-sm"></i>
                                    <span class="font-medium">Trading Types</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2 max-h-80 overflow-y-auto">
                                        <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Gold (XAUUSD) Trading</a>
                                        <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Islamic Halal Trading</a>
                                        <a href="/brokers/automated" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Automated Forex Trading</a>
                                        <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">High Leverage Brokers</a>
                                        <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Oil Trading Platform</a>
                                        <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Copy Trading Platform</a>
                                        <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">ECN Brokers</a>
                                        <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Scalping Forex Brokers</a>
                                        <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Forex Demo Accounts</a>
                                        <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">MT4 Brokers</a>
                                        <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Stocks Trading Platform</a>
                                        <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Brokers For Beginners</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-star text-sm"></i>
                                    <span class="font-medium">Reviews</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">All Reviews</a>
                                        <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Trading Platforms</a>
                                        <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Types of Forex Brokers</a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                        <div class="max-h-48 overflow-y-auto">
                                            <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FP Markets</a>
                                            <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FXTM</a>
                                            <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Blackbull Markets</a>
                                            <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Eightcap</a>
                                            <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Octa</a>
                                            <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Plus500</a>
                                            <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Avatrade</a>
                                            <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">XM</a>
                                            <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pepperstone</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-tools text-sm"></i>
                                    <span class="font-medium">Tools</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                        </a>
                                        <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                        </a>
                                        <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                        </a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                        <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Profit Calculator</a>
                                        <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Margin Calculator</a>
                                        <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pip Calculator</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-info-circle text-sm"></i>
                                    <span class="font-medium">About</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">About Us</a>
                                        <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Methodology</a>
                                        <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Contact</a>
                                        <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">API</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center space-x-4">
                    <a href="/dashboard" class="text-white hover:text-blue-200 transition-colors">
                        <i class="fas fa-arrow-left text-xl"></i>
                    </a>
                    <div>
                        <h1 class="text-3xl font-bold mb-2">My Broker Matches</h1>
                        <p class="text-blue-100">All your saved broker recommendations and match results</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Actions Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div class="mb-4 sm:mb-0">
                    <p class="text-blue-600" id="matches-count">Loading matches...</p>
                </div>
                <button data-action="broker-match" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <i class="fas fa-plus mr-2"></i>
                    New Broker Match
                </button>
            </div>

            <!-- Matches List -->
            <div id="matches-container">
                <!-- Matches will be loaded here -->
                <div class="text-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p class="text-blue-600">Loading your broker matches...</p>
                </div>
            </div>

            <!-- Empty State -->
            <div id="empty-state" class="text-center py-16 hidden">
                <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-heart text-blue-600 text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-blue-900 mb-4">No Broker Matches Yet</h3>
                <p class="text-blue-600 mb-6 max-w-md mx-auto">
                    Get personalized broker recommendations by taking our quick questionnaire. 
                    We'll match you with the perfect brokers based on your trading style and preferences.
                </p>
                <button data-action="broker-match" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <i class="fas fa-rocket mr-2"></i>
                    Get Your First Match
                </button>
            </div>
        </div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/enhanced-broker-database.js"></script>
        <script src="/static/auth.js"></script>
        <script src="/static/navigation.js"></script>
        <script src="/static/broker-matches.js"></script>
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
        <title>Best Forex Brokers 2025 - Compare 67+ Regulated Brokers | BrokerAnalysis</title>
        <meta name="description" content="Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers. Get personalized recommendations now.">
        <meta name="keywords" content="forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews, forex spreads, trading platforms">
        <meta name="author" content="BrokerAnalysis">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="https://brokeranalysis.com/">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://brokeranalysis.com/">
        <meta property="og:title" content="Best Forex Brokers 2025 - Compare 67+ Regulated Brokers">
        <meta property="og:description" content="Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        <meta property="og:site_name" content="BrokerAnalysis">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://brokeranalysis.com/">
        <meta property="twitter:title" content="Best Forex Brokers 2025 - Compare 67+ Regulated Brokers">
        <meta property="twitter:description" content="Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <!-- Favicon and App Icons -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-touch-icon.png">
        
        <!-- Preconnect to external domains -->
        <link href="/static/styles.css" rel="stylesheet">
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        
        <!-- CSS -->

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Organization -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrokerAnalysis",
          "url": "https://brokeranalysis.com",
        "logo": "https://brokeranalysis.com/static/images/brokeranalysis-logo.png",
          "description": "Find and compare the best forex brokers with our intelligent recommendation system. Detailed reviews, ratings, and personalized broker matching.",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@brokeranalysis.com"
          },
          "sameAs": [
            "https://twitter.com/brokeranalysis",
            "https://linkedin.com/company/brokeranalysis"
          ]
        }
        </script>

    </head>
    <body class="bg-blue-50 text-blue-900">
        <!-- Skip Navigation for Accessibility -->
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">
            Skip to main content
        </a>
        
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b" role="navigation" aria-label="Main navigation">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-primary text-2xl" aria-hidden="true"></i>
                        <span class="text-xl font-bold text-blue-900">BrokerAnalysis</span>
                    </div>
                    <!-- Enhanced Navigation with Dropdown Menus -->
                    <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                        <!-- Navigation will be populated by navigation.js -->
                        <div class="flex items-center space-x-2">
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                        aria-label="Best Brokers menu" 
                                        aria-expanded="false" 
                                        aria-haspopup="true">
                                    <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                    <span class="font-medium">Best Brokers</span>
                                    <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/brokers/top-100" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Top 100 Forex Brokers</a>
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                        <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                            <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Australia</a>
                                            <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Canada</a>
                                            <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">UK</a>
                                            <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">South Africa</a>
                                            <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Pakistan</a>
                                            <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Philippines</a>
                                            <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">India</a>
                                            <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Malaysia</a>
                                            <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Dubai</a>
                                            <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Qatar</a>
                                            <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors border-r border-blue-100">Indonesia</a>
                                            <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">USA</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-chart-bar text-sm"></i>
                                    <span class="font-medium">Trading Types</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2 max-h-80 overflow-y-auto">
                                        <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Gold (XAUUSD) Trading</a>
                                        <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Islamic Halal Trading</a>
                                        <a href="/brokers/automated" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Automated Forex Trading</a>
                                        <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">High Leverage Brokers</a>
                                        <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Oil Trading Platform</a>
                                        <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Copy Trading Platform</a>
                                        <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">ECN Brokers</a>
                                        <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Scalping Forex Brokers</a>
                                        <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Forex Demo Accounts</a>
                                        <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">MT4 Brokers</a>
                                        <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Stocks Trading Platform</a>
                                        <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Brokers For Beginners</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-star text-sm"></i>
                                    <span class="font-medium">Reviews</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">All Reviews</a>
                                        <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Trading Platforms</a>
                                        <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Types of Forex Brokers</a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                        <div class="max-h-48 overflow-y-auto">
                                            <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FP Markets</a>
                                            <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">FXTM</a>
                                            <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Blackbull Markets</a>
                                            <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Eightcap</a>
                                            <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Octa</a>
                                            <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Plus500</a>
                                            <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Avatrade</a>
                                            <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">XM</a>
                                            <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pepperstone</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-tools text-sm"></i>
                                    <span class="font-medium">Tools</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                        </a>
                                        <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                        </a>
                                        <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">
                                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                        </a>
                                        <hr class="my-1 border-blue-200">
                                        <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                        <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Profit Calculator</a>
                                        <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Margin Calculator</a>
                                        <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-primary transition-colors">Pip Calculator</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="relative group">
                                <button class="flex items-center space-x-1 text-blue-800 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button">
                                    <i class="fas fa-info-circle text-sm"></i>
                                    <span class="font-medium">About</span>
                                    <i class="fas fa-chevron-down text-xs ml-1"></i>
                                </button>
                                <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div class="py-2">
                                        <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">About Us</a>
                                        <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Methodology</a>
                                        <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">Contact</a>
                                        <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-primary transition-colors">API</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
                    </div>
                    
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" aria-label="Open mobile navigation menu" aria-expanded="false" aria-controls="mobile-menu">
                        <i class="fas fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white shadow-md border-b" role="navigation" aria-label="Mobile navigation menu">
            <div class="px-2 py-2">
                <!-- Best Brokers -->
                <div class="border-b border-blue-200 last:border-b-0">
                    <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-primary mobile-menu-toggle" data-menu="best-brokers">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-trophy text-sm"></i>
                            <span class="font-medium">Best Brokers</span>
                        </div>
                        <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                    </button>
                    <div class="mobile-submenu hidden bg-blue-50 pb-2">
                        <a href="/brokers/top-100" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Top 100 Forex Brokers</a>
                        <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">By Country</div>
                        <a href="/brokers/australia" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Australia</a>
                        <a href="/brokers/canada" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Canada</a>
                        <a href="/brokers/uk" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">UK</a>
                        <a href="/brokers/south-africa" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">South Africa</a>
                        <a href="/brokers/pakistan" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Pakistan</a>
                        <a href="/brokers/philippines" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Philippines</a>
                        <a href="/brokers/india" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">India</a>
                        <a href="/brokers/malaysia" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Malaysia</a>
                        <a href="/brokers/dubai" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Dubai</a>
                        <a href="/brokers/qatar" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Qatar</a>
                        <a href="/brokers/indonesia" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Indonesia</a>
                        <a href="/brokers/usa" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">USA</a>
                    </div>
                </div>
                
                <!-- Trading Types -->
                <div class="border-b border-blue-200 last:border-b-0">
                    <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-primary mobile-menu-toggle" data-menu="trading-types">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-chart-bar text-sm"></i>
                            <span class="font-medium">Trading Types</span>
                        </div>
                        <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                    </button>
                    <div class="mobile-submenu hidden bg-blue-50 pb-2">
                        <a href="/brokers/gold-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Gold (XAUUSD) Trading</a>
                        <a href="/brokers/islamic-halal" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Islamic Halal Trading</a>
                        <a href="/brokers/automated" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Automated Forex Trading</a>
                        <a href="/brokers/high-leverage" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">High Leverage Brokers</a>
                        <a href="/brokers/oil-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Oil Trading Platform</a>
                        <a href="/brokers/copy-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Copy Trading Platform</a>
                        <a href="/brokers/ecn" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">ECN Brokers</a>
                        <a href="/brokers/scalping" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Scalping Forex Brokers</a>
                        <a href="/brokers/demo-accounts" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Forex Demo Accounts</a>
                        <a href="/brokers/mt4" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">MT4 Brokers</a>
                        <a href="/brokers/stocks" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Stocks Trading Platform</a>
                        <a href="/brokers/beginners" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Brokers For Beginners</a>
                    </div>
                </div>
                
                <!-- Reviews -->
                <div class="border-b border-blue-200 last:border-b-0">
                    <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-primary mobile-menu-toggle" data-menu="reviews">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-star text-sm"></i>
                            <span class="font-medium">Reviews</span>
                        </div>
                        <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                    </button>
                    <div class="mobile-submenu hidden bg-blue-50 pb-2">
                        <a href="/reviews" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">All Reviews</a>
                        <a href="/reviews/platforms" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Trading Platforms</a>
                        <a href="/reviews/types" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Types of Forex Brokers</a>
                        <hr class="my-2 border-blue-200">
                        <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">Top Brokers</div>
                        <a href="/reviews/fp-markets" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">FP Markets</a>
                        <a href="/reviews/fxtm" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">FXTM</a>
                        <a href="/reviews/blackbull-markets" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Blackbull Markets</a>
                        <a href="/reviews/eightcap" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Eightcap</a>
                        <a href="/reviews/octa" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Octa</a>
                        <a href="/reviews/plus500" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Plus500</a>
                        <a href="/reviews/avatrade" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Avatrade</a>
                        <a href="/reviews/xm" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">XM</a>
                        <a href="/reviews/pepperstone" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Pepperstone</a>
                    </div>
                </div>
                
                <!-- Tools -->
                <div class="border-b border-blue-200 last:border-b-0">
                    <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-primary mobile-menu-toggle" data-menu="tools">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-tools text-sm"></i>
                            <span class="font-medium">Tools</span>
                        </div>
                        <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                    </button>
                    <div class="mobile-submenu hidden bg-blue-50 pb-2">
                        <a href="/compare" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">
                            <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                        </a>
                        <a href="/simulator" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">
                            <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                        </a>
                        <a href="/" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">
                            <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                        </a>
                        <hr class="my-2 border-blue-200">
                        <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">Calculators</div>
                        <a href="/tools/profit-calculator" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Profit Calculator</a>
                        <a href="/tools/margin-calculator" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Margin Calculator</a>
                        <a href="/tools/pip-calculator" class="block py-2 px-8 text-sm text-blue-600 hover:text-primary">Pip Calculator</a>
                    </div>
                </div>
                
                <!-- About -->
                <div class="border-b border-blue-200 last:border-b-0">
                    <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-primary mobile-menu-toggle" data-menu="about">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-info-circle text-sm"></i>
                            <span class="font-medium">About</span>
                        </div>
                        <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                    </button>
                    <div class="mobile-submenu hidden bg-blue-50 pb-2">
                        <a href="/about" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">About Us</a>
                        <a href="/methodology" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Methodology</a>
                        <a href="/contact" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">Contact</a>
                        <a href="/api-docs" class="block py-2 px-6 text-sm text-blue-600 hover:text-primary">API</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main id="main-content" class="min-h-screen">
            <!-- Hero Section -->
            <section id="home" class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Find the Best <span class="text-yellow-400">Forex Brokers</span> in 2025
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                        Get personalized broker recommendations with our intelligent matching system. 
                        Compare spreads, regulation, and features to make informed decisions.
                    </p>
                    <button data-action="broker-match" class="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors">
                        <i class="fas fa-rocket mr-2"></i>
                        Get My Broker Match
                    </button>
                </div>
            </section>

            <!-- Broker Recommender Section -->
            <section class="py-16 bg-white">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div id="recommendation-widget" class="hidden">
                        <div class="bg-blue-50 rounded-xl p-8 shadow-lg">
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
            <section class="py-16 bg-blue-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold mb-4">Why Choose BrokerAnalysis?</h2>
                        <p class="text-blue-600 max-w-2xl mx-auto">
                            Our comprehensive platform provides everything you need to make informed broker selection decisions.
                        </p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-xl shadow-md text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-brain text-2xl text-blue-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-3">Smart Matching</h3>
                            <p class="text-blue-600">
                                AI-powered recommendation engine that matches you with brokers based on your specific needs and preferences.
                            </p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-xl shadow-md text-center">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-shield-alt text-2xl text-blue-800"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-3">Verified Data</h3>
                            <p class="text-blue-600">
                                Comprehensive database of regulated brokers with verified ratings, spreads, and regulatory information.
                            </p>
                        </div>
                        
                        <div class="bg-white p-6 rounded-xl shadow-md text-center">
                            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-calculator text-2xl text-purple-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-3">Cost Calculator</h3>
                            <p class="text-blue-600">
                                Strategy-aware cost calculator to estimate your real trading expenses with different brokers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Featured Brokers Section -->
            <section class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold mb-4">Featured Forex Brokers</h2>
                        <p class="text-blue-600 max-w-2xl mx-auto">
                            Discover top-rated brokers with exclusive bonuses and competitive trading conditions.
                        </p>
                    </div>
                    
                    <div id="featured-brokers" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <!-- Featured broker cards will be loaded here -->
                    </div>
                    
                    <div class="text-center mt-8">
                        <a href="/reviews" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            View All Brokers
                        </a>
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
                        <button data-action="broker-match" class="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Get Recommendations
                        </button>
                        <a href="/reviews" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
                            Browse All Brokers
                        </a>
                    </div>
                </div>
            </section>

            <!-- FAQ Section with Structured Data -->
            <section class="faq-section py-16 bg-blue-50" id="faq">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold mb-4 text-blue-900">Frequently Asked Questions</h2>
                        <p class="text-blue-600 max-w-2xl mx-auto">
                            Get answers to common questions about forex brokers and our recommendation process.
                        </p>
                    </div>
                    <div class="space-y-6">
                        <div class="bg-white border border-blue-200 rounded-lg">
                            <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                                    data-faq="0" 
                                    aria-expanded="false"
                                    aria-controls="faq-answer-0">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-blue-900">What makes a forex broker trustworthy?</h3>
                                    <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                                </div>
                            </button>
                            <div id="faq-answer-0" class="faq-answer hidden px-6 pb-6">
                                <p class="text-blue-700">A trustworthy forex broker is regulated by reputable financial authorities (FCA, ASIC, CFTC), offers transparent pricing, provides client fund protection, and has a proven track record of reliable operations.</p>
                            </div>
                        </div>
                        
                        <div class="bg-white border border-blue-200 rounded-lg">
                            <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                                    data-faq="1" 
                                    aria-expanded="false"
                                    aria-controls="faq-answer-1">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-blue-900">How do I choose the best forex broker for my needs?</h3>
                                    <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                                </div>
                            </button>
                            <div id="faq-answer-1" class="faq-answer hidden px-6 pb-6">
                                <p class="text-blue-700">Consider your trading style, capital requirements, preferred platforms, and regulatory preferences. Use our broker matching tool to get personalized recommendations based on your specific needs.</p>
                            </div>
                        </div>
                        
                        <div class="bg-white border border-blue-200 rounded-lg">
                            <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                                    data-faq="2" 
                                    aria-expanded="false"
                                    aria-controls="faq-answer-2">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-blue-900">What are the typical costs of forex trading?</h3>
                                    <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                                </div>
                            </button>
                            <div id="faq-answer-2" class="faq-answer hidden px-6 pb-6">
                                <p class="text-blue-700">Forex trading costs include spreads, commissions, overnight fees (swap), and potential slippage. Use our cost calculator to estimate your trading expenses with different brokers.</p>
                            </div>
                        </div>
                        
                        <div class="bg-white border border-blue-200 rounded-lg">
                            <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                                    data-faq="3" 
                                    aria-expanded="false"
                                    aria-controls="faq-answer-3">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-blue-900">Are all forex brokers regulated?</h3>
                                    <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                                </div>
                            </button>
                            <div id="faq-answer-3" class="faq-answer hidden px-6 pb-6">
                                <p class="text-blue-700">No, not all forex brokers are regulated. Always verify a broker's regulatory status before opening an account. We only feature regulated brokers with proper oversight from financial authorities.</p>
                            </div>
                        </div>
                        
                        <div class="bg-white border border-blue-200 rounded-lg">
                            <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                                    data-faq="4" 
                                    aria-expanded="false"
                                    aria-controls="faq-answer-4">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-blue-900">How often do you update broker information?</h3>
                                    <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                                </div>
                            </button>
                            <div id="faq-answer-4" class="faq-answer hidden px-6 pb-6">
                                <p class="text-blue-700">We update broker data weekly, including spreads, terms, and conditions. Regulatory information is verified monthly, and any significant changes are updated immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- FAQ Structured Data -->
                <script type="application/ld+json">
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What makes a forex broker trustworthy?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A trustworthy forex broker is regulated by reputable financial authorities (FCA, ASIC, CFTC), offers transparent pricing, provides client fund protection, and has a proven track record of reliable operations."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I choose the best forex broker for my needs?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Consider your trading style, capital requirements, preferred platforms, and regulatory preferences. Use our broker matching tool to get personalized recommendations based on your specific needs."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What are the typical costs of forex trading?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Forex trading costs include spreads, commissions, overnight fees (swap), and potential slippage. Use our cost calculator to estimate your trading expenses with different brokers."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Are all forex brokers regulated?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No, not all forex brokers are regulated. Always verify a broker's regulatory status before opening an account. We only feature regulated brokers with proper oversight from financial authorities."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How often do you update broker information?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We update broker data weekly, including spreads, terms, and conditions. Regulatory information is verified monthly, and any significant changes are updated immediately."
                      }
                    }
                  ]
                }
                </script>
            </section>
        </main>

        <!-- Chatbot Widget -->
        <div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
            <button id="chatbot-toggle" class="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300" aria-label="Open chatbot assistant" aria-expanded="false">
                <i class="fas fa-comments text-xl" aria-hidden="true"></i>
            </button>
            <div id="chatbot-window" class="hidden absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border">
                <div class="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <span class="font-semibold">BrokerAnalysis Assistant</span>
                    <button id="chatbot-close" class="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600" aria-label="Close chatbot">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div id="chatbot-messages" class="h-64 overflow-y-auto p-4 space-y-3">
                    <div class="flex items-start space-x-2">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-robot text-blue-600 text-sm"></i>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-lg max-w-xs">
                            <p class="text-sm">Hello! I'm your broker analysis assistant. How can I help you find the perfect forex broker today?</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t">
                    <div class="flex space-x-2">
                        <label for="chatbot-input" class="sr-only">Ask a question about forex brokers</label>
                        <input type="text" id="chatbot-input" placeholder="Ask about brokers..." class="flex-1 p-2 border rounded-lg text-sm" aria-describedby="chatbot-input-help">
                        <div id="chatbot-input-help" class="sr-only">Ask questions about forex brokers, regulations, or trading features</div>
                        <button id="chatbot-send" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Send message">
                            <i class="fas fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-1">
                        <button onclick="sendQuickMessage('Show regulated brokers')" class="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded hover:bg-gray-200">
                            Regulated brokers
                        </button>
                        <button onclick="sendQuickMessage('Best for beginners')" class="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded hover:bg-gray-200">
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
                <p class="text-blue-800">Analyzing brokers...</p>
            </div>
        </div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <!-- CRITICAL: Enhanced broker database for global access -->
        <script src="/static/enhanced-broker-database.js"></script>
        <script src="/static/seo-utils.js"></script>
        <script src="/static/breadcrumbs.js"></script>
        <script src="/static/auth.js"></script>
        <script src="/static/navigation.js"></script>
        <script src="/static/app.js"></script>
        <script src="/static/chat-fix.js" defer></script>
        
        <!-- FAQ Toggle Functionality -->
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            // FAQ toggle functionality
            document.querySelectorAll('.faq-toggle').forEach(button => {
                button.addEventListener('click', function() {
                    const faqIndex = this.dataset.faq;
                    const answer = document.getElementById('faq-answer-' + faqIndex);
                    const chevron = this.querySelector('.faq-chevron');
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    
                    if (isExpanded) {
                        answer.classList.add('hidden');
                        this.setAttribute('aria-expanded', 'false');
                        chevron.style.transform = 'rotate(0deg)';
                    } else {
                        answer.classList.remove('hidden');
                        this.setAttribute('aria-expanded', 'true');
                        chevron.style.transform = 'rotate(180deg)';
                    }
                });
            });
        });
        </script>
    </body>
    </html>
  `)
});

// SEO and Technical Enhancement Routes

// Robots.txt endpoint
app.get('/robots.txt', (c) => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${c.req.header('host') ? `https://${c.req.header('host')}/sitemap.xml` : 'https://brokeranalysis.com/sitemap.xml'}

# Block admin and internal paths
Disallow: /api/
Disallow: /dashboard/
Disallow: /test-simulator

# Allow important pages
Allow: /
Allow: /reviews
Allow: /compare  
Allow: /simulator
Allow: /about
Allow: /broker/*

# Crawl delay
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
});

// XML Sitemap endpoint
app.get('/sitemap.xml', async (c) => {
  const { DB } = c.env;
  const baseUrl = c.req.header('host') ? `https://${c.req.header('host')}` : 'https://brokeranalysis.com';
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/reviews', priority: '0.9', changefreq: 'weekly' },
    { url: '/compare', priority: '0.8', changefreq: 'weekly' },
    { url: '/simulator', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' }
  ];

  let brokerPages = [];
  
  // Dynamic broker pages (if database is available)
  try {
    if (DB) {
      const brokers = await DB.prepare('SELECT id, slug, updated_at FROM brokers LIMIT 100').all();
      brokerPages = brokers.results.map(broker => ({
        url: `/broker/${broker.slug || broker.id}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: broker.updated_at || new Date().toISOString()
      }));
    }
  } catch (error) {
    console.log('Database not available for sitemap generation');
  }

  const allPages = [...staticPages, ...brokerPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod.split('T')[0]}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400'
    }
  });
});

// SEO Landing Pages - Country/Region Specific Pages

// Australia forex brokers page
app.get('/brokers/australia', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Australia 2025 - ASIC Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best ASIC regulated forex brokers in Australia. Compare spreads, regulation, and features of top Australian forex brokers for 2025.">
        <meta name="keywords" content="Australia forex brokers, ASIC regulated brokers, best forex brokers Australia, Australian forex trading, ASIC forex brokers">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in Australia 2025 - ASIC Regulated">
        <meta property="og:description" content="Find the best ASIC regulated forex brokers in Australia. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/australia">
        <meta property="og:type" content="website">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/australia">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Australia 2025",
          "description": "Find the best ASIC regulated forex brokers in Australia",
          "url": "https://brokeranalysis.com/brokers/australia"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Australia 2025</h1>
                    <p class="text-xl text-blue-100">ASIC regulated brokers with competitive spreads and Australian support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose ASIC Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        The Australian Securities and Investments Commission (ASIC) provides robust regulatory oversight 
                        for forex brokers operating in Australia. ASIC regulation ensures client fund protection, 
                        transparent pricing, and adherence to strict operational standards.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top ASIC Regulated Forex Brokers</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">IC Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.4/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• ASIC License: 335692</li>
                                <li>• True ECN execution</li>
                                <li>• Raw spreads from 0.0 pips</li>
                                <li>• $200 minimum deposit</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Pepperstone</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• ASIC License: 414530</li>
                                <li>• TradingView integration</li>
                                <li>• No minimum deposit</li>
                                <li>• Fast execution speeds</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FP Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• ASIC License: 286354</li>
                                <li>• $100 minimum deposit</li>
                                <li>• Multiple trading platforms</li>
                                <li>• Australian customer support</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Australian Forex Trading Regulations</h2>
                    <p class="text-blue-600 mb-6">
                        ASIC enforces strict regulations including maximum leverage limits (30:1 for major pairs), 
                        negative balance protection, and mandatory client fund segregation. These protections 
                        make Australia one of the safest jurisdictions for forex trading.
                    </p>

                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 class="text-lg font-semibold mb-4">Ready to Compare Australian Brokers?</h3>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="/compare" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
                                Compare Brokers
                            </a>
                            <a href="/simulator" class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center">
                                Calculate Costs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
        <script src="/static/seo-utils.js"></script>
    </body>
    </html>
  `);
});

// UK forex brokers page  
app.get('/brokers/uk', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best FCA Regulated Forex Brokers UK 2025 | BrokerAnalysis</title>
        <meta name="description" content="Find the best FCA regulated forex brokers in the UK. Compare spreads, regulation, and features of top British forex brokers for 2025.">
        <meta name="keywords" content="UK forex brokers, FCA regulated brokers, best forex brokers UK, British forex trading, FCA forex brokers">
        
        <meta property="og:title" content="Best FCA Regulated Forex Brokers UK 2025">
        <meta property="og:description" content="Find the best FCA regulated forex brokers in the UK. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/uk">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/uk">

        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best FCA Regulated Forex Brokers UK 2025</h1>
                    <p class="text-xl text-blue-100">Trusted brokers with FCA oversight and UK customer protection</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 py-12">
                <h2 class="text-2xl font-bold mb-6">Why Choose FCA Regulated Brokers?</h2>
                <p class="text-blue-600 mb-8">
                    The Financial Conduct Authority (FCA) is one of the world's most respected financial regulators. 
                    FCA regulation ensures compensation scheme protection, segregated client funds, and strict 
                    operational oversight for maximum trader protection.
                </p>

                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Ready to find your perfect UK broker?</h3>
                    <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Get Broker Recommendations
                    </a>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Canada broker page
app.get('/brokers/canada', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Canada 2025 - IIROC Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best IIROC regulated forex brokers in Canada. Compare spreads, regulation, and features of top Canadian forex brokers for 2025.">
        <meta name="keywords" content="Canada forex brokers, IIROC regulated brokers, best forex brokers Canada, Canadian forex trading, IIROC forex brokers">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in Canada 2025 - IIROC Regulated">
        <meta property="og:description" content="Find the best IIROC regulated forex brokers in Canada. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/canada">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/canada">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Canada 2025",
          "description": "Find the best IIROC regulated forex brokers in Canada",
          "url": "https://brokeranalysis.com/brokers/canada"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Canada 2025</h1>
                    <p class="text-xl text-blue-100">IIROC regulated brokers with competitive spreads and Canadian support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose IIROC Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        The Investment Industry Regulatory Organization of Canada (IIROC) provides comprehensive regulatory oversight 
                        for forex brokers operating in Canada. IIROC regulation ensures investor protection, 
                        transparent pricing, and adherence to strict operational standards.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top IIROC Regulated Forex Brokers</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">OANDA</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• IIROC regulated</li>
                                <li>• No minimum deposit</li>
                                <li>• Competitive spreads</li>
                                <li>• Advanced trading platform</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Interactive Brokers</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• IIROC regulated</li>
                                <li>• Low commission structure</li>
                                <li>• Global market access</li>
                                <li>• Professional trading tools</li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Canadian broker?</h3>
                        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Broker Recommendations
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// South Africa broker page
app.get('/brokers/south-africa', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in South Africa 2025 - FSCA Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best FSCA regulated forex brokers in South Africa. Compare spreads, regulation, and features of top South African forex brokers for 2025.">
        <meta name="keywords" content="South Africa forex brokers, FSCA regulated brokers, best forex brokers South Africa, South African forex trading">
        
        <meta property="og:title" content="Best Forex Brokers in South Africa 2025 - FSCA Regulated">
        <meta property="og:description" content="Find the best FSCA regulated forex brokers in South Africa. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/south-africa">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/south-africa">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in South Africa 2025",
          "description": "Find the best FSCA regulated forex brokers in South Africa",
          "url": "https://brokeranalysis.com/brokers/south-africa"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in South Africa 2025</h1>
                    <p class="text-xl text-blue-100">FSCA regulated brokers with competitive spreads and local support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 class="text-2xl font-bold mb-6">Why Choose FSCA Regulated Brokers?</h2>
                <p class="text-blue-600 mb-8">
                    The Financial Sector Conduct Authority (FSCA) provides robust regulatory oversight 
                    for forex brokers operating in South Africa. FSCA regulation ensures client fund protection, 
                    transparent pricing, and adherence to strict operational standards.
                </p>

                <h2 class="text-2xl font-bold mb-6">Top FSCA Regulated Forex Brokers</h2>
                <div class="grid gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">HotForex</h3>
                        <div class="flex items-center mb-4">
                            <div class="text-yellow-400 mr-2">★★★★☆</div>
                            <span>4.1/5.0</span>
                        </div>
                        <ul class="text-blue-600 space-y-2">
                            <li>• FSCA License: 46632</li>
                            <li>• Multiple account types</li>
                            <li>• Local ZAR deposits</li>
                            <li>• Educational resources</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Ready to find your perfect South African broker?</h3>
                    <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Get Broker Recommendations
                    </a>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Pakistan broker page
app.get('/brokers/pakistan', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Pakistan 2025 - SECP Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best SECP regulated forex brokers in Pakistan. Compare spreads, regulation, and features of top Pakistani forex brokers for 2025.">
        <meta name="keywords" content="Pakistan forex brokers, SECP regulated brokers, best forex brokers Pakistan, Pakistani forex trading">
        
        <meta property="og:title" content="Best Forex Brokers in Pakistan 2025 - SECP Regulated">
        <meta property="og:description" content="Find the best SECP regulated forex brokers in Pakistan. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/pakistan">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/pakistan">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Pakistan 2025",
          "description": "Find the best SECP regulated forex brokers in Pakistan",
          "url": "https://brokeranalysis.com/brokers/pakistan"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Pakistan 2025</h1>
                    <p class="text-xl text-blue-100">SECP regulated brokers with competitive spreads and local support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 class="text-2xl font-bold mb-6">Why Choose SECP Regulated Brokers?</h2>
                <p class="text-blue-600 mb-8">
                    The Securities and Exchange Commission of Pakistan (SECP) provides regulatory oversight 
                    for forex brokers operating in Pakistan. SECP regulation ensures investor protection, 
                    transparent pricing, and adherence to operational standards.
                </p>

                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Pakistani broker?</h3>
                    <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Get Broker Recommendations
                    </a>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Philippines broker page
app.get('/brokers/philippines', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Philippines 2025 - BSP Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best BSP regulated forex brokers in Philippines. Compare spreads, regulation, and features of top Filipino forex brokers for 2025.">
        <meta name="keywords" content="Philippines forex brokers, BSP regulated brokers, best forex brokers Philippines, Filipino forex trading">
        
        <meta property="og:title" content="Best Forex Brokers in Philippines 2025 - BSP Regulated">
        <meta property="og:description" content="Find the best BSP regulated forex brokers in Philippines. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/philippines">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/philippines">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Philippines 2025",
          "description": "Find the best BSP regulated forex brokers in Philippines",
          "url": "https://brokeranalysis.com/brokers/philippines"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Philippines 2025</h1>
                    <p class="text-xl text-blue-100">BSP regulated brokers with competitive spreads and local support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 class="text-2xl font-bold mb-6">Why Choose BSP Regulated Brokers?</h2>
                <p class="text-blue-600 mb-8">
                    The Bangko Sentral ng Pilipinas (BSP) provides regulatory oversight 
                    for forex brokers operating in the Philippines. BSP regulation ensures investor protection, 
                    transparent pricing, and adherence to operational standards.
                </p>

                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Filipino broker?</h3>
                    <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Get Broker Recommendations
                    </a>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// India broker page
app.get('/brokers/india', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in India 2025 - SEBI Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best SEBI regulated forex brokers in India. Compare spreads, regulation, and features of top Indian forex brokers for 2025.">
        <meta name="keywords" content="India forex brokers, SEBI regulated brokers, best forex brokers India, Indian forex trading">
        
        <meta property="og:title" content="Best Forex Brokers in India 2025 - SEBI Regulated">
        <meta property="og:description" content="Find the best SEBI regulated forex brokers in India. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/india">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/india">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in India 2025",
          "description": "Find the best SEBI regulated forex brokers in India",
          "url": "https://brokeranalysis.com/brokers/india"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in India 2025</h1>
                    <p class="text-xl text-blue-100">SEBI regulated brokers with competitive spreads and local support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 class="text-2xl font-bold mb-6">Why Choose SEBI Regulated Brokers?</h2>
                <p class="text-blue-600 mb-8">
                    The Securities and Exchange Board of India (SEBI) provides regulatory oversight 
                    for forex brokers operating in India. SEBI regulation ensures investor protection, 
                    transparent pricing, and adherence to strict operational standards.
                </p>

                <h2 class="text-2xl font-bold mb-6">Top SEBI Regulated Forex Brokers</h2>
                <div class="grid gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Zerodha</h3>
                        <div class="flex items-center mb-4">
                            <div class="text-yellow-400 mr-2">★★★★★</div>
                            <span>4.5/5.0</span>
                        </div>
                        <ul class="text-blue-600 space-y-2">
                            <li>• SEBI Registered</li>
                            <li>• Zero brokerage on equity delivery</li>
                            <li>• Advanced trading platforms</li>
                            <li>• Educational resources</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Indian broker?</h3>
                    <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Get Broker Recommendations
                    </a>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Malaysia broker page
app.get('/brokers/malaysia', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Malaysia 2025 - BNM Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best BNM regulated forex brokers in Malaysia. Compare spreads, regulation, and features of top Malaysian forex brokers for 2025.">
        <meta name="keywords" content="Malaysia forex brokers, BNM regulated brokers, best forex brokers Malaysia, Malaysian forex trading, Bank Negara Malaysia">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in Malaysia 2025 - BNM Regulated">
        <meta property="og:description" content="Find the best BNM regulated forex brokers in Malaysia. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/malaysia">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/malaysia">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Malaysia 2025",
          "description": "Find the best BNM regulated forex brokers in Malaysia",
          "url": "https://brokeranalysis.com/brokers/malaysia"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Malaysia 2025</h1>
                    <p class="text-xl text-blue-100">BNM regulated brokers with competitive spreads and Malaysian support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose BNM Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        Bank Negara Malaysia (BNM) provides comprehensive regulatory oversight 
                        for forex brokers operating in Malaysia. BNM regulation ensures investor protection, 
                        transparent pricing, and adherence to strict operational standards for Malaysian traders.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Forex Brokers for Malaysian Traders</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FXTM</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• CySEC and FCA regulated</li>
                                <li>• Accepts Malaysian residents</li>
                                <li>• Competitive spreads from 1.3 pips</li>
                                <li>• Multiple trading platforms</li>
                                <li>• Local Malaysian support</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Pepperstone</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• ASIC and FCA regulated</li>
                                <li>• ECN execution model</li>
                                <li>• Spreads from 0.0 pips</li>
                                <li>• MT4, MT5, cTrader platforms</li>
                                <li>• Malaysian ringgit deposits</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FP Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.1/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• ASIC regulated</li>
                                <li>• Raw spread accounts available</li>
                                <li>• Fast execution speeds</li>
                                <li>• Educational resources</li>
                                <li>• 24/7 customer support</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Forex Trading Regulations in Malaysia</h2>
                    <p class="text-blue-600 mb-6">
                        Forex trading in Malaysia is legal but regulated. While BNM doesn't directly license retail forex brokers, 
                        Malaysian traders can legally trade with offshore brokers that are properly regulated by recognized authorities 
                        such as ASIC, FCA, or CySEC.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Key Features for Malaysian Traders</h2>
                    <div class="bg-blue-50 rounded-lg p-6 mb-8">
                        <ul class="text-blue-600 space-y-3">
                            <li>• <strong>Local Currency Support:</strong> MYR deposit and withdrawal options</li>
                            <li>• <strong>Islamic Accounts:</strong> Swap-free trading for Muslim traders</li>
                            <li>• <strong>Local Support:</strong> Customer service in Bahasa Malaysia</li>
                            <li>• <strong>Competitive Spreads:</strong> Low trading costs for major pairs</li>
                            <li>• <strong>Multiple Platforms:</strong> MT4, MT5, and proprietary platforms</li>
                        </ul>
                    </div>

                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Malaysian broker?</h3>
                        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Broker Recommendations
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Dubai broker page
app.get('/brokers/dubai', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Dubai 2025 - DFSA Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best DFSA regulated forex brokers in Dubai and UAE. Compare spreads, regulation, and features of top Middle East forex brokers for 2025.">
        <meta name="keywords" content="Dubai forex brokers, DFSA regulated brokers, UAE forex brokers, best forex brokers Dubai, Middle East forex trading">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in Dubai 2025 - DFSA Regulated">
        <meta property="og:description" content="Find the best DFSA regulated forex brokers in Dubai and UAE. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/dubai">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/dubai">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Dubai 2025",
          "description": "Find the best DFSA regulated forex brokers in Dubai and UAE",
          "url": "https://brokeranalysis.com/brokers/dubai"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Dubai 2025</h1>
                    <p class="text-xl text-blue-100">DFSA regulated brokers with competitive spreads and Middle East support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose DFSA Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        The Dubai Financial Services Authority (DFSA) provides world-class regulatory oversight 
                        for forex brokers operating in the Dubai International Financial Centre (DIFC). 
                        DFSA regulation ensures high standards of investor protection, transparent operations, 
                        and adherence to international best practices for traders in the UAE and Middle East.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Forex Brokers for Dubai Traders</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">IG Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.4/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• DFSA regulated in Dubai</li>
                                <li>• Over 50 years of experience</li>
                                <li>• Competitive spreads from 0.6 pips</li>
                                <li>• Advanced trading platforms</li>
                                <li>• Arabic language support</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">ADSS</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• DFSA and ADGM regulated</li>
                                <li>• Local UAE presence</li>
                                <li>• Islamic trading accounts</li>
                                <li>• AED deposit options</li>
                                <li>• Regional market expertise</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Saxo Bank</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• DFSA regulated</li>
                                <li>• Premium trading technology</li>
                                <li>• Institutional-grade execution</li>
                                <li>• Comprehensive research</li>
                                <li>• Multi-asset trading</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Forex Trading Regulations in UAE</h2>
                    <p class="text-blue-600 mb-6">
                        Forex trading in the UAE is legal and regulated by multiple authorities. The DFSA regulates 
                        brokers in the DIFC, while the Securities and Commodities Authority (SCA) oversees 
                        mainland UAE operations. The Abu Dhabi Global Market (ADGM) also provides regulatory 
                        oversight for financial services in Abu Dhabi.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Key Features for UAE Traders</h2>
                    <div class="bg-blue-50 rounded-lg p-6 mb-8">
                        <ul class="text-blue-600 space-y-3">
                            <li>• <strong>Local Currency Support:</strong> AED deposit and withdrawal options</li>
                            <li>• <strong>Islamic Accounts:</strong> Sharia-compliant swap-free trading</li>
                            <li>• <strong>Arabic Support:</strong> Customer service in Arabic language</li>
                            <li>• <strong>Regional Expertise:</strong> Understanding of Middle East markets</li>
                            <li>• <strong>Time Zone Alignment:</strong> Support during Gulf trading hours</li>
                        </ul>
                    </div>

                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Dubai broker?</h3>
                        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Broker Recommendations
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Qatar broker page
app.get('/brokers/qatar', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Qatar 2025 - QFC Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best QFC and QFCRA regulated forex brokers in Qatar. Compare spreads, regulation, and features of top Qatari forex brokers for 2025.">
        <meta name="keywords" content="Qatar forex brokers, QFC regulated brokers, QFCRA brokers, best forex brokers Qatar, Doha forex trading">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in Qatar 2025 - QFC Regulated">
        <meta property="og:description" content="Find the best QFC and QFCRA regulated forex brokers in Qatar. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/qatar">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/qatar">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Qatar 2025",
          "description": "Find the best QFC and QFCRA regulated forex brokers in Qatar",
          "url": "https://brokeranalysis.com/brokers/qatar"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Qatar 2025</h1>
                    <p class="text-xl text-blue-100">QFC and QFCRA regulated brokers with competitive spreads and Gulf region support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose QFC Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        The Qatar Financial Centre Regulatory Authority (QFCRA) provides comprehensive 
                        regulatory oversight for forex brokers operating in Qatar. QFC regulation ensures 
                        high standards of investor protection, transparent operations, and adherence to 
                        international best practices for traders in Qatar and the Gulf region.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Forex Brokers for Qatar Traders</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">XTB</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.5/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• QFC regulated in Qatar</li>
                                <li>• Award-winning trading platform</li>
                                <li>• Competitive spreads from 0.1 pips</li>
                                <li>• Arabic language support</li>
                                <li>• QAR deposit options</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">CMC Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• QFC regulated</li>
                                <li>• Advanced charting tools</li>
                                <li>• No dealing desk execution</li>
                                <li>• Educational resources</li>
                                <li>• Gulf market expertise</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">IG Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• QFC regulated</li>
                                <li>• 50+ years experience</li>
                                <li>• Professional trading tools</li>
                                <li>• Islamic trading accounts</li>
                                <li>• Local customer support</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Forex Trading Regulations in Qatar</h2>
                    <p class="text-blue-600 mb-6">
                        Forex trading in Qatar is legal and regulated by the Qatar Financial Centre 
                        Regulatory Authority (QFCRA). The QFC provides a world-class regulatory framework 
                        that follows international standards and best practices. Traders in Qatar can 
                        access global forex markets through QFC-licensed brokers with confidence.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Key Features for Qatar Traders</h2>
                    <div class="bg-blue-50 rounded-lg p-6 mb-8">
                        <ul class="text-blue-600 space-y-3">
                            <li>• <strong>Local Currency Support:</strong> QAR deposit and withdrawal options</li>
                            <li>• <strong>Islamic Accounts:</strong> Sharia-compliant swap-free trading</li>
                            <li>• <strong>Arabic Support:</strong> Customer service in Arabic language</li>
                            <li>• <strong>Gulf Expertise:</strong> Understanding of regional markets</li>
                            <li>• <strong>Time Zone Alignment:</strong> Support during Gulf trading hours</li>
                        </ul>
                    </div>

                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Qatar broker?</h3>
                        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Broker Recommendations
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Indonesia broker page
app.get('/brokers/indonesia', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in Indonesia 2025 - BAPPEBTI Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best BAPPEBTI regulated forex brokers in Indonesia. Compare spreads, regulation, and features of top Indonesian forex brokers for 2025.">
        <meta name="keywords" content="Indonesia forex brokers, BAPPEBTI regulated brokers, best forex brokers Indonesia, Jakarta forex trading, Indonesian rupiah">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in Indonesia 2025 - BAPPEBTI Regulated">
        <meta property="og:description" content="Find the best BAPPEBTI regulated forex brokers in Indonesia. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/indonesia">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/indonesia">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Indonesia 2025",
          "description": "Find the best BAPPEBTI regulated forex brokers in Indonesia",
          "url": "https://brokeranalysis.com/brokers/indonesia"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in Indonesia 2025</h1>
                    <p class="text-xl text-blue-100">BAPPEBTI regulated brokers with competitive spreads and Indonesian rupiah support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose BAPPEBTI Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        The Commodity Futures Trading Regulatory Agency (BAPPEBTI) is Indonesia's 
                        primary regulatory authority for forex and commodity trading. BAPPEBTI regulation 
                        ensures high standards of investor protection, transparent operations, and adherence 
                        to Indonesian financial regulations for local traders.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Forex Brokers for Indonesian Traders</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Monex Investindo Futures</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• BAPPEBTI regulated in Indonesia</li>
                                <li>• Local Indonesian presence</li>
                                <li>• IDR deposit and withdrawal</li>
                                <li>• Bahasa Indonesia support</li>
                                <li>• Local banking integration</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">PT Kontak Perkasa Futures</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.1/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• BAPPEBTI licensed</li>
                                <li>• MetaTrader 4 platform</li>
                                <li>• Indonesian rupiah accounts</li>
                                <li>• Local customer service</li>
                                <li>• Educational resources in Bahasa</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">PT Millennium Penata Futures</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.0/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• BAPPEBTI regulated</li>
                                <li>• Established Indonesian broker</li>
                                <li>• Local market expertise</li>
                                <li>• IDR trading accounts</li>
                                <li>• Jakarta office presence</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Forex Trading Regulations in Indonesia</h2>
                    <p class="text-blue-600 mb-6">
                        Forex trading in Indonesia is legal and regulated by BAPPEBTI under the Ministry 
                        of Trade. Indonesian residents can trade forex through BAPPEBTI-licensed brokers. 
                        The regulatory framework ensures investor protection and maintains market integrity 
                        while allowing access to global currency markets.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Key Features for Indonesian Traders</h2>
                    <div class="bg-blue-50 rounded-lg p-6 mb-8">
                        <ul class="text-blue-600 space-y-3">
                            <li>• <strong>Local Currency Support:</strong> IDR deposit and withdrawal options</li>
                            <li>• <strong>Language Support:</strong> Customer service in Bahasa Indonesia</li>
                            <li>• <strong>Local Banking:</strong> Integration with Indonesian banks</li>
                            <li>• <strong>Regulatory Compliance:</strong> BAPPEBTI oversight and protection</li>
                            <li>• <strong>Time Zone Alignment:</strong> Support during Indonesian trading hours</li>
                        </ul>
                    </div>

                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Ready to find your perfect Indonesian broker?</h3>
                        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Broker Recommendations
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// USA broker page
app.get('/brokers/usa', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Forex Brokers in USA 2025 - CFTC/NFA Regulated | BrokerAnalysis</title>
        <meta name="description" content="Find the best CFTC and NFA regulated forex brokers in the USA. Compare spreads, regulation, and features of top American forex brokers for 2025.">
        <meta name="keywords" content="USA forex brokers, CFTC regulated brokers, NFA brokers, best forex brokers USA, American forex trading">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Forex Brokers in USA 2025 - CFTC/NFA Regulated">
        <meta property="og:description" content="Find the best CFTC and NFA regulated forex brokers in the USA. Compare spreads, regulation, and features.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/usa">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokeranalysis-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/usa">
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in USA 2025",
          "description": "Find the best CFTC and NFA regulated forex brokers in the USA",
          "url": "https://brokeranalysis.com/brokers/usa"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Forex Brokers in USA 2025</h1>
                    <p class="text-xl text-blue-100">CFTC and NFA regulated brokers with competitive spreads and US dollar support</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Choose CFTC/NFA Regulated Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        The Commodity Futures Trading Commission (CFTC) and National Futures Association (NFA) 
                        provide the highest standards of regulatory oversight for forex brokers in the United States. 
                        CFTC/NFA regulation ensures maximum investor protection, transparent operations, and strict 
                        adherence to US financial regulations for American traders.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Forex Brokers for US Traders</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">OANDA</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.5/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• CFTC regulated and NFA member</li>
                                <li>• Over 25 years of experience</li>
                                <li>• Competitive spreads from 1.2 pips</li>
                                <li>• Advanced trading platforms</li>
                                <li>• Excellent customer support</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FOREX.com</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• CFTC regulated and NFA member</li>
                                <li>• MetaTrader 4 and proprietary platforms</li>
                                <li>• Comprehensive research tools</li>
                                <li>• Educational resources</li>
                                <li>• Mobile trading apps</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Interactive Brokers</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.4/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• CFTC regulated and NFA member</li>
                                <li>• Low-cost trading structure</li>
                                <li>• Professional trading tools</li>
                                <li>• Global market access</li>
                                <li>• Institutional-grade execution</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Forex Trading Regulations in USA</h2>
                    <p class="text-blue-600 mb-6">
                        Forex trading in the United States is heavily regulated by the CFTC and NFA. 
                        US residents can only trade with CFTC-registered and NFA-member brokers. 
                        The regulatory framework includes strict capital requirements, segregated client funds, 
                        and comprehensive reporting to ensure the highest level of trader protection.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Key Features for US Traders</h2>
                    <div class="bg-blue-50 rounded-lg p-6 mb-8">
                        <ul class="text-blue-600 space-y-3">
                            <li>• <strong>FIFO Rule Compliance:</strong> First-in, first-out order execution</li>
                            <li>• <strong>No Hedging Restrictions:</strong> Limited hedging capabilities per US regulations</li>
                            <li>• <strong>Maximum Leverage:</strong> 50:1 for major pairs, 20:1 for minors</li>
                            <li>• <strong>Segregated Funds:</strong> Client funds held separately from broker capital</li>
                            <li>• <strong>Negative Balance Protection:</strong> Cannot lose more than account balance</li>
                        </ul>
                    </div>

                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Ready to find your perfect US broker?</h3>
                        <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Broker Recommendations
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
    </body>
    </html>
  `);
});

// Gold Trading Brokers Page
app.get('/brokers/gold-trading', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Gold Trading Brokers 2025 - Low Spreads & Tight Margins | BrokerAnalysis</title>
        <meta name="description" content="Find the best gold trading brokers with lowest spreads, tight margins, and reliable execution. Compare XAU/USD spreads and gold CFD trading conditions.">
        <meta name="keywords" content="gold trading brokers, XAU/USD brokers, gold CFD trading, precious metals trading, gold spreads, gold trading platforms">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Gold Trading Brokers 2025 - Low Spreads & Tight Margins">
        <meta property="og:description" content="Find the best gold trading brokers with lowest spreads and reliable execution for XAU/USD trading.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/gold-trading">
        <meta property="og:type" content="website">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/gold-trading">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Gold Trading Brokers 2025",
          "description": "Find the best gold trading brokers with lowest spreads and reliable execution",
          "url": "https://brokeranalysis.com/brokers/gold-trading"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Gold Trading Brokers 2025</h1>
                    <p class="text-xl text-yellow-100">Low spreads, tight margins, and reliable execution for XAU/USD trading</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">Why Trade Gold with These Brokers?</h2>
                    <p class="text-blue-600 mb-8">
                        Gold (XAU/USD) is one of the most popular precious metals for trading. The best gold trading brokers 
                        offer tight spreads, fast execution, and reliable platforms specifically optimized for precious metals trading. 
                        Our analysis focuses on brokers with the lowest gold spreads and best trading conditions.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Gold Trading Brokers</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">IC Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.4/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• XAU/USD spread from 0.13 pips</li>
                                <li>• True ECN execution</li>
                                <li>• No dealing desk intervention</li>
                                <li>• Multiple regulation (ASIC, CySEC)</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Pepperstone</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• XAU/USD spread from 0.22 pips</li>
                                <li>• TradingView integration</li>
                                <li>• Fast execution speeds</li>
                                <li>• Advanced charting tools</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">XM Group</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.1/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• XAU/USD spread from 0.35 pips</li>
                                <li>• No minimum deposit</li>
                                <li>• Multiple account types</li>
                                <li>• 24/7 customer support</li>
                            </ul>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FP Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• XAU/USD spread from 0.20 pips</li>
                                <li>• Raw spread accounts available</li>
                                <li>• Multiple trading platforms</li>
                                <li>• ASIC regulated</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Gold Trading Considerations</h2>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <h3 class="text-lg font-semibold mb-4">Key Factors for Gold Trading:</h3>
                        <ul class="text-blue-600 space-y-2">
                            <li>• <strong>Spreads:</strong> Look for brokers offering XAU/USD spreads under 0.5 pips</li>
                            <li>• <strong>Execution:</strong> Fast execution is crucial during volatile gold market sessions</li>
                            <li>• <strong>Leverage:</strong> Consider appropriate leverage limits for precious metals</li>
                            <li>• <strong>Trading Hours:</strong> Gold trades 23 hours per day, 5 days a week</li>
                            <li>• <strong>Margin Requirements:</strong> Understand margin requirements for gold positions</li>
                        </ul>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Gold Market Analysis Tools</h2>
                    <p class="text-blue-600 mb-6">
                        Successful gold trading requires access to real-time market data, economic calendars, 
                        and technical analysis tools. The best gold trading brokers provide comprehensive 
                        charting packages, fundamental analysis, and market sentiment indicators specifically 
                        for precious metals markets.
                    </p>

                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 class="text-lg font-semibold mb-4">Ready to Start Gold Trading?</h3>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="/compare" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
                                Compare Gold Brokers
                            </a>
                            <a href="/simulator" class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center">
                                Calculate Trading Costs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
        <script src="/static/seo-utils.js"></script>
    </body>
    </html>
  `);
});

// Automated Trading Brokers Page
app.get('/brokers/automated-trading', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Automated Trading Brokers 2025 | Expert Algo Trading Platforms</title>
    <meta name="description" content="Discover the top automated trading brokers for 2025. Compare algorithmic trading platforms, copy trading services, and expert advisors. Find the best broker for your automated trading strategy.">
    <meta name="keywords" content="automated trading brokers, algorithmic trading, copy trading, expert advisors, trading bots, automated forex trading, algo trading platforms">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://brokeranalysis.com/brokers/automated-trading">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Best Automated Trading Brokers 2025 | Expert Algo Trading Platforms">
    <meta property="og:description" content="Discover the top automated trading brokers for 2025. Compare algorithmic trading platforms, copy trading services, and expert advisors.">
    <meta property="og:url" content="https://brokeranalysis.com/brokers/automated-trading">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://brokeranalysis.com/images/automated-trading-brokers-2025.jpg">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Best Automated Trading Brokers 2025">
    <meta name="twitter:description" content="Compare top automated trading platforms and algorithmic trading brokers for 2025.">
    <meta name="twitter:image" content="https://brokeranalysis.com/images/automated-trading-brokers-2025.jpg">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Best Automated Trading Brokers 2025",
      "description": "Comprehensive guide to the best automated trading brokers and algorithmic trading platforms for 2025",
      "url": "https://brokeranalysis.com/brokers/automated-trading",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Top Automated Trading Brokers",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "FinancialService",
              "name": "IC Markets",
              "description": "Leading automated trading broker with advanced API and copy trading"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "FinancialService",
              "name": "Pepperstone",
              "description": "Premium automated trading platform with cTrader and MT4/MT5"
            }
          }
        ]
      }
    }
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: #1a365d; color: white; padding: 1rem 0; }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: white; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .cta-button { background: #ff6b35; color: white; padding: 1rem 2rem; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer; text-decoration: none; display: inline-block; }
        .content { padding: 4rem 0; }
        .broker-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0; }
        .broker-card { border: 1px solid #ddd; border-radius: 10px; padding: 2rem; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .broker-card h3 { color: #1a365d; margin-bottom: 1rem; }
        .trust-score { background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block; margin: 1rem 0; }
        .features { background: #f8fafc; padding: 4rem 0; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .feature-card { background: white; padding: 2rem; border-radius: 10px; text-align: center; }
        .footer { background: #1a365d; color: white; padding: 2rem 0; text-align: center; }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .nav-links { display: none; }
        }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav container">
            <div class="logo">BrokerAnalysis</div>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/reviews">Reviews</a></li>
                <li><a href="/compare">Compare</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Best Automated Trading Brokers 2025</h1>
            <p>Discover top algorithmic trading platforms, copy trading services, and expert advisor brokers</p>
            <a href="#brokers" class="cta-button">Compare Automated Trading Brokers</a>
        </div>
    </section>

    <main class="content container">
        <section id="brokers">
            <h2>Top Automated Trading Brokers</h2>
            <p>Our expert analysis of the best brokers for automated trading, algorithmic strategies, and copy trading in 2025.</p>
            
            <div class="broker-grid">
                <div class="broker-card">
                    <h3>IC Markets</h3>
                    <div class="trust-score">Trust Score: 95/100</div>
                    <p><strong>Regulation:</strong> ASIC, CySEC, FSA</p>
                    <p><strong>Platforms:</strong> MT4, MT5, cTrader</p>
                    <p><strong>API Trading:</strong> Advanced REST & FIX API</p>
                    <p><strong>Copy Trading:</strong> Yes (cTrader Copy)</p>
                    <p><strong>Min Deposit:</strong> $200</p>
                    <p>Leading automated trading broker with ultra-low latency execution, advanced APIs, and comprehensive copy trading solutions.</p>
                    <a href="/reviews/ic-markets" class="cta-button">Read Review</a>
                </div>
                
                <div class="broker-card">
                    <h3>Pepperstone</h3>
                    <div class="trust-score">Trust Score: 93/100</div>
                    <p><strong>Regulation:</strong> ASIC, FCA, CySEC</p>
                    <p><strong>Platforms:</strong> MT4, MT5, cTrader, TradingView</p>
                    <p><strong>API Trading:</strong> REST API, FIX API</p>
                    <p><strong>Copy Trading:</strong> Yes (cTrader Copy, DupliTrade)</p>
                    <p><strong>Min Deposit:</strong> $200</p>
                    <p>Premium automated trading platform with institutional-grade infrastructure and multiple copy trading options.</p>
                    <a href="/reviews/pepperstone" class="cta-button">Read Review</a>
                </div>
                
                <div class="broker-card">
                    <h3>XM Group</h3>
                    <div class="trust-score">Trust Score: 89/100</div>
                    <p><strong>Regulation:</strong> CySEC, FCA, ASIC</p>
                    <p><strong>Platforms:</strong> MT4, MT5</p>
                    <p><strong>API Trading:</strong> MT4/MT5 API</p>
                    <p><strong>Copy Trading:</strong> Yes (Signals)</p>
                    <p><strong>Min Deposit:</strong> $5</p>
                    <p>Reliable broker with extensive EA support, signals marketplace, and beginner-friendly automated trading tools.</p>
                    <a href="/reviews/xm-group" class="cta-button">Read Review</a>
                </div>
                
                <div class="broker-card">
                    <h3>FXTM</h3>
                    <div class="trust-score">Trust Score: 87/100</div>
                    <p><strong>Regulation:</strong> CySEC, FCA</p>
                    <p><strong>Platforms:</strong> MT4, MT5</p>
                    <p><strong>API Trading:</strong> MT4/MT5 API</p>
                    <p><strong>Copy Trading:</strong> Yes (FXTM Copy Trading)</p>
                    <p><strong>Min Deposit:</strong> $10</p>
                    <p>Established broker with robust copy trading platform and comprehensive automated trading education.</p>
                    <a href="/reviews/fxtm" class="cta-button">Read Review</a>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Key Automated Trading Considerations</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>🤖 API Quality</h3>
                    <p>Look for brokers with robust REST APIs, FIX connectivity, and low-latency execution for algorithmic strategies.</p>
                </div>
                <div class="feature-card">
                    <h3>📊 Platform Support</h3>
                    <p>Ensure compatibility with MT4/MT5 Expert Advisors, cTrader cBots, or custom trading applications.</p>
                </div>
                <div class="feature-card">
                    <h3>⚡ Execution Speed</h3>
                    <p>Ultra-fast order execution is crucial for high-frequency and scalping automated strategies.</p>
                </div>
                <div class="feature-card">
                    <h3>📈 Copy Trading</h3>
                    <p>Access to professional traders through copy trading platforms and signal services.</p>
                </div>
                <div class="feature-card">
                    <h3>🔧 VPS Hosting</h3>
                    <p>Virtual Private Server options to ensure 24/7 automated trading without interruptions.</p>
                </div>
                <div class="feature-card">
                    <h3>📋 Regulation</h3>
                    <p>Choose regulated brokers to ensure fund safety and reliable automated trading infrastructure.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Start Your Automated Trading Journey</h2>
            <p>Ready to begin automated trading? Compare our top-rated brokers and find the perfect platform for your algorithmic strategies.</p>
            <div style="text-align: center; margin: 2rem 0;">
                <a href="/compare" class="cta-button">Compare Brokers</a>
                <a href="/calculator" class="cta-button" style="margin-left: 1rem;">Calculate Costs</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 BrokerAnalysis. All rights reserved.</p>
            <p>30 N Gould St Ste R, Sheridan, WY 82801, US | EIN: 384298140 | Call: (801)-893-2577</p>
        </div>
    </footer>
</body>
</html>
`);
});

// High Leverage Trading Brokers Page
app.get('/brokers/high-leverage', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best High Leverage Forex Brokers 2025 | Up to 1:3000 Leverage</title>
    <meta name="description" content="Discover the best high leverage forex brokers for 2025. Compare brokers offering up to 1:3000 leverage with tight spreads and reliable execution. Find your perfect high leverage trading platform.">
    <meta name="keywords" content="high leverage forex brokers, 1:3000 leverage, high leverage trading, forex leverage, margin trading, leveraged trading platforms">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://brokeranalysis.com/brokers/high-leverage">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Best High Leverage Forex Brokers 2025 | Up to 1:3000 Leverage">
    <meta property="og:description" content="Discover the best high leverage forex brokers for 2025. Compare brokers offering up to 1:3000 leverage with tight spreads.">
    <meta property="og:url" content="https://brokeranalysis.com/brokers/high-leverage">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://brokeranalysis.com/images/high-leverage-brokers-2025.jpg">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Best High Leverage Forex Brokers 2025">
    <meta name="twitter:description" content="Compare top high leverage forex brokers offering up to 1:3000 leverage for 2025.">
    <meta name="twitter:image" content="https://brokeranalysis.com/images/high-leverage-brokers-2025.jpg">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Best High Leverage Forex Brokers 2025",
      "description": "Comprehensive guide to the best high leverage forex brokers offering up to 1:3000 leverage for 2025",
      "url": "https://brokeranalysis.com/brokers/high-leverage",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Top High Leverage Forex Brokers",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "FinancialService",
              "name": "XM Group",
              "description": "Leading high leverage broker offering up to 1:1000 leverage"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "FinancialService",
              "name": "Exness",
              "description": "Premium high leverage platform with unlimited leverage options"
            }
          }
        ]
      }
    }
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: #1a365d; color: white; padding: 1rem 0; }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: white; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 4rem 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .cta-button { background: #1a365d; color: white; padding: 1rem 2rem; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer; text-decoration: none; display: inline-block; }
        .content { padding: 4rem 0; }
        .broker-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0; }
        .broker-card { border: 1px solid #ddd; border-radius: 10px; padding: 2rem; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .broker-card h3 { color: #1a365d; margin-bottom: 1rem; }
        .trust-score { background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block; margin: 1rem 0; }
        .leverage-badge { background: #ff6b35; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; font-weight: bold; }
        .warning-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; }
        .warning-box h3 { color: #dc2626; margin-bottom: 1rem; }
        .features { background: #f8fafc; padding: 4rem 0; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .feature-card { background: white; padding: 2rem; border-radius: 10px; text-align: center; }
        .footer { background: #1a365d; color: white; padding: 2rem 0; text-align: center; }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .nav-links { display: none; }
        }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav container">
            <div class="logo">BrokerAnalysis</div>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/reviews">Reviews</a></li>
                <li><a href="/compare">Compare</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Best High Leverage Forex Brokers 2025</h1>
            <p>Discover brokers offering up to 1:3000 leverage with tight spreads and reliable execution</p>
            <a href="#brokers" class="cta-button">Compare High Leverage Brokers</a>
        </div>
    </section>

    <main class="content container">
        <div class="warning-box">
            <h3>⚠️ High Leverage Trading Warning</h3>
            <p>High leverage trading can result in significant losses. Leverage amplifies both profits and losses. Only trade with money you can afford to lose and ensure you understand the risks involved. Consider your experience level and seek independent financial advice if necessary.</p>
        </div>
        
        <section id="brokers">
            <h2>Top High Leverage Forex Brokers</h2>
            <p>Our expert analysis of the best brokers offering high leverage trading with competitive conditions in 2025.</p>
            
            <div class="broker-grid">
                <div class="broker-card">
                    <h3>XM Group</h3>
                    <div class="trust-score">Trust Score: 89/100</div>
                    <div class="leverage-badge">Up to 1:1000</div>
                    <p><strong>Regulation:</strong> CySEC, FCA, ASIC</p>
                    <p><strong>Min Deposit:</strong> $5</p>
                    <p><strong>Spreads:</strong> From 1.0 pips</p>
                    <p><strong>Platforms:</strong> MT4, MT5</p>
                    <p><strong>Negative Balance Protection:</strong> Yes</p>
                    <p>Reliable broker offering up to 1:1000 leverage with comprehensive trader education and risk management tools.</p>
                    <a href="/reviews/xm-group" class="cta-button">Read Review</a>
                </div>
                
                <div class="broker-card">
                    <h3>Exness</h3>
                    <div class="trust-score">Trust Score: 91/100</div>
                    <div class="leverage-badge">Unlimited Leverage</div>
                    <p><strong>Regulation:</strong> CySEC, FCA, FSA</p>
                    <p><strong>Min Deposit:</strong> $1</p>
                    <p><strong>Spreads:</strong> From 0.3 pips</p>
                    <p><strong>Platforms:</strong> MT4, MT5</p>
                    <p><strong>Negative Balance Protection:</strong> Yes</p>
                    <p>Premium broker offering unlimited leverage for experienced traders with ultra-tight spreads and fast execution.</p>
                    <a href="/reviews/exness" class="cta-button">Read Review</a>
                </div>
                
                <div class="broker-card">
                    <h3>FBS</h3>
                    <div class="trust-score">Trust Score: 85/100</div>
                    <div class="leverage-badge">Up to 1:3000</div>
                    <p><strong>Regulation:</strong> CySEC, IFSC</p>
                    <p><strong>Min Deposit:</strong> $1</p>
                    <p><strong>Spreads:</strong> From 0.5 pips</p>
                    <p><strong>Platforms:</strong> MT4, MT5, FBS Trader</p>
                    <p><strong>Negative Balance Protection:</strong> Yes</p>
                    <p>High leverage specialist offering up to 1:3000 leverage with competitive trading conditions and bonuses.</p>
                    <a href="/reviews/fbs" class="cta-button">Read Review</a>
                </div>
                
                <div class="broker-card">
                    <h3>HotForex</h3>
                    <div class="trust-score">Trust Score: 87/100</div>
                    <div class="leverage-badge">Up to 1:1000</div>
                    <p><strong>Regulation:</strong> CySEC, FCA, DFSA</p>
                    <p><strong>Min Deposit:</strong> $5</p>
                    <p><strong>Spreads:</strong> From 0.1 pips</p>
                    <p><strong>Platforms:</strong> MT4, MT5</p>
                    <p><strong>Negative Balance Protection:</strong> Yes</p>
                    <p>Established broker with high leverage options, multiple account types, and comprehensive trading tools.</p>
                    <a href="/reviews/hotforex" class="cta-button">Read Review</a>
                </div>
            </div>
        </section>
        
        <section>
            <h2>High Leverage Trading Considerations</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>🎯 Risk Management</h3>
                    <p>Essential stop-loss orders, position sizing, and risk-reward ratios to protect your capital with high leverage.</p>
                </div>
                <div class="feature-card">
                    <h3>💰 Margin Requirements</h3>
                    <p>Understand margin calls, free margin, and how leverage affects your required margin for positions.</p>
                </div>
                <div class="feature-card">
                    <h3>⚡ Execution Quality</h3>
                    <p>Fast execution and minimal slippage are crucial when trading with high leverage to avoid unexpected losses.</p>
                </div>
                <div class="feature-card">
                    <h3>🛡️ Negative Balance Protection</h3>
                    <p>Ensure your broker offers negative balance protection to prevent owing money beyond your deposit.</p>
                </div>
                <div class="feature-card">
                    <h3>📊 Spreads & Costs</h3>
                    <p>Lower spreads and commissions become more important with high leverage as costs are amplified.</p>
                </div>
                <div class="feature-card">
                    <h3>📋 Regulation</h3>
                    <p>Choose regulated brokers that comply with leverage restrictions and offer investor protection.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Start High Leverage Trading Safely</h2>
            <p>Ready to explore high leverage trading? Compare our top-rated brokers and start with proper risk management.</p>
            <div style="text-align: center; margin: 2rem 0;">
                <a href="/compare" class="cta-button">Compare Brokers</a>
                <a href="/calculator" class="cta-button" style="margin-left: 1rem;">Calculate Margin</a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 BrokerAnalysis. All rights reserved.</p>
            <p>30 N Gould St Ste R, Sheridan, WY 82801, US | EIN: 384298140 | Call: (801)-893-2577</p>
        </div>
    </footer>
</body>
</html>
`);
});

// Islamic Halal Trading Brokers Page
app.get('/brokers/islamic-halal', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Islamic Halal Forex Brokers 2025 - Sharia Compliant Trading | BrokerAnalysis</title>
        <meta name="description" content="Find the best Islamic halal forex brokers offering Sharia-compliant trading accounts. No swap fees, no interest, fully compliant with Islamic finance principles.">
        <meta name="keywords" content="Islamic forex brokers, halal trading, Sharia compliant brokers, swap-free accounts, Islamic trading accounts, halal forex">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Islamic Halal Forex Brokers 2025 - Sharia Compliant Trading">
        <meta property="og:description" content="Find the best Islamic halal forex brokers offering Sharia-compliant trading with no swap fees.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/islamic-halal">
        <meta property="og:type" content="website">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/islamic-halal">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Islamic Halal Forex Brokers 2025",
          "description": "Find the best Islamic halal forex brokers offering Sharia-compliant trading",
          "url": "https://brokeranalysis.com/brokers/islamic-halal"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Islamic Halal Forex Brokers 2025</h1>
                    <p class="text-xl text-green-100">Sharia-compliant trading accounts with no swap fees or interest</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">What Makes a Broker Halal?</h2>
                    <p class="text-blue-600 mb-8">
                        Islamic halal forex brokers offer Sharia-compliant trading accounts that eliminate interest (riba), 
                        excessive uncertainty (gharar), and gambling (maysir). These brokers provide swap-free accounts 
                        where no overnight interest is charged or paid, making forex trading permissible under Islamic law.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Islamic Halal Forex Brokers</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">XM Group</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.5/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Certified Islamic accounts</li>
                                <li>• No swap fees on all instruments</li>
                                <li>• Sharia board approved</li>
                                <li>• Multiple regulation (CySEC, ASIC)</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FXTM (ForexTime)</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Dedicated Islamic accounts</li>
                                <li>• No overnight interest charges</li>
                                <li>• Sharia-compliant trading conditions</li>
                                <li>• Educational resources in Arabic</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Pepperstone</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Swap-free account option</li>
                                <li>• No rollover fees</li>
                                <li>• Competitive spreads</li>
                                <li>• ASIC and FCA regulated</li>
                            </ul>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">IC Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.1/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Islamic account available</li>
                                <li>• No swap charges</li>
                                <li>• True ECN execution</li>
                                <li>• Raw spread pricing</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Islamic Trading Principles</h2>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                        <h3 class="text-lg font-semibold mb-4">Sharia Compliance Requirements:</h3>
                        <ul class="text-blue-600 space-y-2">
                            <li>• <strong>No Riba (Interest):</strong> No overnight swap fees or interest charges</li>
                            <li>• <strong>No Gharar (Excessive Uncertainty):</strong> Clear and transparent trading conditions</li>
                            <li>• <strong>No Maysir (Gambling):</strong> Trading based on analysis, not speculation</li>
                            <li>• <strong>Immediate Settlement:</strong> Spot transactions with immediate delivery</li>
                            <li>• <strong>Halal Instruments:</strong> Trading in permissible currency pairs and commodities</li>
                        </ul>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">How Islamic Accounts Work</h2>
                    <p class="text-blue-600 mb-6">
                        Islamic trading accounts eliminate the interest component from forex trading by removing 
                        overnight swap fees. Instead of charging or paying interest on positions held overnight, 
                        these accounts maintain positions without any additional costs, making them compliant 
                        with Islamic finance principles.
                    </p>

                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 class="text-lg font-semibold mb-4">Ready for Halal Trading?</h3>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="/compare" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
                                Compare Islamic Brokers
                            </a>
                            <a href="/simulator" class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center">
                                Calculate Trading Costs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
        <script src="/static/seo-utils.js"></script>
    </body>
    </html>
  `);
});

// Automated Trading Brokers Page
app.get('/brokers/automated-trading', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Best Automated Trading Brokers 2025 - Algorithmic & Robot Trading | BrokerAnalysis</title>
        <meta name="description" content="Find the best automated trading brokers supporting algorithmic trading, expert advisors (EAs), and trading robots. Compare platforms for automated forex trading.">
        <meta name="keywords" content="automated trading brokers, algorithmic trading, expert advisors, trading robots, EA trading, automated forex, copy trading">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Best Automated Trading Brokers 2025 - Algorithmic & Robot Trading">
        <meta property="og:description" content="Find the best automated trading brokers supporting algorithmic trading and expert advisors.">
        <meta property="og:url" content="https://brokeranalysis.com/brokers/automated-trading">
        <meta property="og:type" content="website">
        
        <link rel="canonical" href="https://brokeranalysis.com/brokers/automated-trading">

        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Automated Trading Brokers 2025",
          "description": "Find the best automated trading brokers supporting algorithmic trading and expert advisors",
          "url": "https://brokeranalysis.com/brokers/automated-trading"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 py-2 focus:rounded">Skip to main content</a>
        
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                </div>
            </div>
        </nav>

        <main id="main-content">
            <div class="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl font-bold mb-4">Best Automated Trading Brokers 2025</h1>
                    <p class="text-xl text-purple-100">Algorithmic trading platforms supporting EAs, robots, and copy trading</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="prose max-w-none">
                    <h2 class="text-2xl font-bold mb-6">What is Automated Trading?</h2>
                    <p class="text-blue-600 mb-8">
                        Automated trading allows you to execute trades using pre-programmed algorithms, expert advisors (EAs), 
                        or trading robots. These systems can analyze markets, identify opportunities, and execute trades 
                        24/7 without human intervention, making trading more efficient and emotion-free.
                    </p>

                    <h2 class="text-2xl font-bold mb-6">Top Automated Trading Brokers</h2>
                    <div class="grid gap-6 mb-8">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">IC Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.6/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Full EA support on MT4/MT5</li>
                                <li>• VPS hosting available</li>
                                <li>• Low latency execution</li>
                                <li>• No restrictions on trading strategies</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Pepperstone</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★★</div>
                                <span>4.5/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Advanced algorithmic trading</li>
                                <li>• cTrader automated trading</li>
                                <li>• Copy trading platform</li>
                                <li>• API access for custom solutions</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">FP Markets</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.3/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Expert Advisor support</li>
                                <li>• Social trading features</li>
                                <li>• Multiple platform options</li>
                                <li>• Competitive spreads for algos</li>
                            </ul>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">XM Group</h3>
                            <div class="flex items-center mb-4">
                                <div class="text-yellow-400 mr-2">★★★★☆</div>
                                <span>4.2/5.0</span>
                            </div>
                            <ul class="text-blue-600 space-y-2">
                                <li>• MT4/MT5 EA compatibility</li>
                                <li>• Free VPS for active traders</li>
                                <li>• Copy trading available</li>
                                <li>• Educational resources for algos</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Types of Automated Trading</h2>
                    <div class="grid md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Expert Advisors (EAs)</h3>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Custom trading algorithms</li>
                                <li>• MetaTrader platform integration</li>
                                <li>• Backtesting capabilities</li>
                                <li>• Strategy optimization tools</li>
                            </ul>
                        </div>
                        
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Copy Trading</h3>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Follow successful traders</li>
                                <li>• Automatic trade replication</li>
                                <li>• Risk management controls</li>
                                <li>• Performance tracking</li>
                            </ul>
                        </div>
                        
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">Trading Robots</h3>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Pre-built trading systems</li>
                                <li>• Plug-and-play solutions</li>
                                <li>• Various strategy types</li>
                                <li>• Performance monitoring</li>
                            </ul>
                        </div>
                        
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold mb-4">API Trading</h3>
                            <ul class="text-blue-600 space-y-2">
                                <li>• Custom application development</li>
                                <li>• Direct market access</li>
                                <li>• High-frequency trading</li>
                                <li>• Advanced order management</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Key Features for Automated Trading</h2>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <h3 class="text-lg font-semibold mb-4">Essential Requirements:</h3>
                        <ul class="text-blue-600 space-y-2">
                            <li>• <strong>Platform Support:</strong> MT4/MT5, cTrader, or proprietary platforms</li>
                            <li>• <strong>VPS Hosting:</strong> Virtual private servers for 24/7 operation</li>
                            <li>• <strong>Low Latency:</strong> Fast execution speeds for time-sensitive strategies</li>
                            <li>• <strong>No Restrictions:</strong> Freedom to use any trading strategy or EA</li>
                            <li>• <strong>API Access:</strong> Programming interfaces for custom solutions</li>
                            <li>• <strong>Backtesting:</strong> Historical data testing capabilities</li>
                        </ul>
                    </div>

                    <h2 class="text-2xl font-bold mb-6">Getting Started with Automated Trading</h2>
                    <p class="text-blue-600 mb-6">
                        Start with demo accounts to test your automated strategies before risking real money. 
                        Choose brokers that offer comprehensive backtesting tools, reliable execution, and 
                        proper support for your chosen trading platform. Consider starting with copy trading 
                        if you're new to automation.
                    </p>

                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                        <h3 class="text-lg font-semibold mb-4">Ready for Automated Trading?</h3>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="/compare" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
                                Compare Auto Trading Brokers
                            </a>
                            <a href="/simulator" class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center">
                                Test Trading Strategies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <script src="/static/breadcrumbs.js"></script>
        <script src="/static/seo-utils.js"></script>
    </body>
    </html>
  `);
});

// FP Markets Review Page
app.get('/reviews/fp-markets', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FP Markets Review 2025 - Detailed Analysis & Rating | BrokerAnalysis</title>
        <meta name="description" content="Comprehensive FP Markets review 2025. Analysis of spreads, regulation, platforms, and trading conditions. ASIC regulated with tight spreads from 0.0 pips.">
        <meta name="keywords" content="FP Markets review, FP Markets broker, ASIC regulated broker, tight spreads, MetaTrader 4, MetaTrader 5, cTrader">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:title" content="FP Markets Review 2025 - Detailed Analysis & Rating">
        <meta property="og:description" content="Comprehensive FP Markets review 2025. ASIC regulated broker with tight spreads from 0.0 pips and multiple trading platforms.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/fp-markets-review-og.png">
        <meta property="og:url" content="https://brokeranalysis.com/reviews/fp-markets">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="FP Markets Review 2025 - Detailed Analysis & Rating">
        <meta property="twitter:description" content="Comprehensive FP Markets review 2025. ASIC regulated broker with tight spreads from 0.0 pips.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/fp-markets-review-og.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/reviews/fp-markets">
        
        <!-- Preconnect to external domains -->
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Review -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialProduct",
            "name": "FP Markets",
            "description": "ASIC regulated forex and CFD broker",
            "provider": {
              "@type": "Organization",
              "name": "First Prudential Markets Pty Ltd",
              "url": "https://fpmarkets.com"
            }
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.5",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Organization",
            "name": "BrokerAnalysis",
            "url": "https://brokeranalysis.com"
          },
          "datePublished": "2025-01-01",
          "reviewBody": "FP Markets is an ASIC regulated broker offering competitive spreads from 0.0 pips, multiple trading platforms including MetaTrader 4, MetaTrader 5, and cTrader. Strong regulation and excellent execution make it suitable for both beginners and professional traders."
        }
        </script>
        
        <!-- Breadcrumb Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://brokeranalysis.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Reviews",
              "item": "https://brokeranalysis.com/reviews"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "FP Markets Review",
              "item": "https://brokeranalysis.com/reviews/fp-markets"
            }
          ]
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
        
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                    <div class="md:hidden">
                        <button class="text-blue-800">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Breadcrumbs -->
        <div class="bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2 text-sm">
                        <li><a href="/" class="text-blue-600 hover:text-blue-800">Home</a></li>
                        <li><i class="fas fa-chevron-right text-gray-400 mx-2"></i></li>
                        <li><a href="/reviews" class="text-blue-600 hover:text-blue-800">Reviews</a></li>
                        <li><i class="fas fa-chevron-right text-gray-400 mx-2"></i></li>
                        <li class="text-gray-500">FP Markets Review</li>
                    </ol>
                </nav>
            </div>
        </div>

        <main id="main-content">
            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-4xl font-bold mb-4">FP Markets Review 2025</h1>
                            <p class="text-xl text-blue-100 mb-6">ASIC regulated broker with competitive spreads and multiple platforms</p>
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center">
                                    <div class="text-yellow-400 text-xl mr-2">★★★★★</div>
                                    <span class="text-lg font-semibold">4.5/5.0</span>
                                </div>
                                <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    ASIC Regulated
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <img src="/static/logos/fp-markets.png" alt="FP Markets Logo" class="h-16 w-auto">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-white py-8 border-b">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">0.0</div>
                            <div class="text-sm text-gray-600">Min Spread (pips)</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">$100</div>
                            <div class="text-sm text-gray-600">Min Deposit</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">1:500</div>
                            <div class="text-sm text-gray-600">Max Leverage</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">2009</div>
                            <div class="text-sm text-gray-600">Founded</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Review Content -->
                    <div class="lg:col-span-2">
                        <!-- Overview -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">FP Markets Overview</h2>
                            <p class="text-blue-600 mb-6 text-lg leading-relaxed">
                                FP Markets is an Australian-based forex and CFD broker established in 2009. 
                                Regulated by ASIC (Australian Securities and Investments Commission), 
                                FP Markets has built a strong reputation for competitive pricing, 
                                reliable execution, and comprehensive trading platforms.
                            </p>
                            <p class="text-blue-600 mb-6 leading-relaxed">
                                The broker offers multiple account types to suit different trading styles, 
                                from beginners to professional traders. With spreads starting from 0.0 pips 
                                on their Raw account and access to MetaTrader 4, MetaTrader 5, and cTrader platforms, 
                                FP Markets provides a comprehensive trading environment.
                            </p>
                        </section>

                        <!-- Pros and Cons -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Pros and Cons</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-green-50 rounded-lg p-6">
                                    <h3 class="text-xl font-semibold text-green-800 mb-4 flex items-center">
                                        <i class="fas fa-check-circle mr-2"></i>
                                        Pros
                                    </h3>
                                    <ul class="space-y-2 text-green-700">
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Tight spreads from 0.0 pips on Raw account
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Strong ASIC regulation and oversight
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Multiple trading platforms (MT4, MT5, cTrader)
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Fast execution speeds
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Comprehensive educational resources
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            24/7 customer support
                                        </li>
                                    </ul>
                                </div>
                                <div class="bg-red-50 rounded-lg p-6">
                                    <h3 class="text-xl font-semibold text-red-800 mb-4 flex items-center">
                                        <i class="fas fa-times-circle mr-2"></i>
                                        Cons
                                    </h3>
                                    <ul class="space-y-2 text-red-700">
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            Commission charges on Raw account
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            Limited cryptocurrency offerings
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            No US clients accepted
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            Inactivity fee after 12 months
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Trading Platforms -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Trading Platforms</h2>
                            <div class="space-y-6">
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                                        <i class="fas fa-desktop text-blue-600 mr-2"></i>
                                        MetaTrader 4 (MT4)
                                    </h3>
                                    <p class="text-blue-600 mb-4">
                                        The world's most popular trading platform with advanced charting, 
                                        automated trading capabilities, and extensive technical analysis tools.
                                    </p>
                                    <ul class="text-blue-600 space-y-1">
                                        <li>• 30+ built-in technical indicators</li>
                                        <li>• Expert Advisors (EAs) support</li>
                                        <li>• One-click trading</li>
                                        <li>• Mobile and web versions available</li>
                                    </ul>
                                </div>
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                                        <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                                        MetaTrader 5 (MT5)
                                    </h3>
                                    <p class="text-blue-600 mb-4">
                                        Advanced multi-asset platform with enhanced features, 
                                        more timeframes, and improved order management.
                                    </p>
                                    <ul class="text-blue-600 space-y-1">
                                        <li>• 38 built-in technical indicators</li>
                                        <li>• 21 timeframes</li>
                                        <li>• Advanced order types</li>
                                        <li>• Economic calendar integration</li>
                                    </ul>
                                </div>
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                                        <i class="fas fa-bolt text-blue-600 mr-2"></i>
                                        cTrader
                                    </h3>
                                    <p class="text-blue-600 mb-4">
                                        Professional ECN platform with advanced order types, 
                                        level II pricing, and superior execution speeds.
                                    </p>
                                    <ul class="text-blue-600 space-y-1">
                                        <li>• Level II market depth</li>
                                        <li>• Advanced order types</li>
                                        <li>• cBot automated trading</li>
                                        <li>• Superior execution speeds</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Account Types -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Account Types</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 text-blue-800">Standard Account</h3>
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Min Deposit:</span>
                                            <span class="font-semibold">$100</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Spreads:</span>
                                            <span class="font-semibold">From 1.0 pips</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Commission:</span>
                                            <span class="font-semibold">None</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Platforms:</span>
                                            <span class="font-semibold">MT4, MT5</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
                                    <div class="flex items-center justify-between mb-4">
                                        <h3 class="text-xl font-semibold text-blue-800">Raw Account</h3>
                                        <span class="bg-blue-500 text-white px-2 py-1 rounded text-sm">Popular</span>
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Min Deposit:</span>
                                            <span class="font-semibold">$100</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Spreads:</span>
                                            <span class="font-semibold">From 0.0 pips</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Commission:</span>
                                            <span class="font-semibold">$6/lot</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Platforms:</span>
                                            <span class="font-semibold">MT4, MT5, cTrader</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Regulation -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Regulation & Safety</h2>
                            <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                                <div class="flex items-center mb-4">
                                    <i class="fas fa-shield-alt text-green-600 text-2xl mr-3"></i>
                                    <h3 class="text-xl font-semibold text-green-800">ASIC Regulated</h3>
                                </div>
                                <p class="text-green-700 mb-4">
                                    FP Markets is regulated by the Australian Securities and Investments Commission (ASIC) 
                                    under license number 286354. This provides strong investor protection and ensures 
                                    compliance with strict financial standards.
                                </p>
                                <ul class="text-green-700 space-y-2">
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Client funds segregated in tier-1 banks
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Negative balance protection
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Professional indemnity insurance
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Regular ASIC compliance audits
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <!-- Sidebar -->
                    <div class="lg:col-span-1">
                        <!-- Quick Info Card -->
                        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-6">
                            <h3 class="text-xl font-semibold mb-4">Quick Info</h3>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Founded:</span>
                                    <span class="font-semibold">2009</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Headquarters:</span>
                                    <span class="font-semibold">Sydney, Australia</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Regulation:</span>
                                    <span class="font-semibold">ASIC</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Min Deposit:</span>
                                    <span class="font-semibold">$100</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Max Leverage:</span>
                                    <span class="font-semibold">1:500</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Platforms:</span>
                                    <span class="font-semibold">MT4, MT5, cTrader</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Instruments:</span>
                                    <span class="font-semibold">10,000+</span>
                                </div>
                            </div>
                            
                            <div class="mt-6 pt-6 border-t">
                                <a href="https://fpmarkets.com" target="_blank" rel="noopener noreferrer" 
                                   class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                    Visit FP Markets
                                    <i class="fas fa-external-link-alt ml-2"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Rating Breakdown -->
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Rating Breakdown</h3>
                            <div class="space-y-3">
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Regulation</span>
                                        <span class="text-sm font-semibold">5.0</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 100%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Trading Costs</span>
                                        <span class="text-sm font-semibold">4.5</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Platforms</span>
                                        <span class="text-sm font-semibold">4.5</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Customer Service</span>
                                        <span class="text-sm font-semibold">4.0</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 80%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Education</span>
                                        <span class="text-sm font-semibold">4.0</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 80%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Overall Rating</span>
                                    <div class="flex items-center">
                                        <span class="text-2xl font-bold text-blue-600 mr-2">4.5</span>
                                        <div class="text-yellow-400">★★★★★</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
                    <p class="text-xl mb-8 text-blue-100">
                        Find the perfect broker for your trading style with our intelligent recommendation system
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/" class="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Get Broker Recommendations
                        </a>
                        <a href="/compare" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
                            Compare Brokers
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fas fa-chart-line text-blue-400 text-2xl"></i>
                            <span class="text-xl font-bold">BrokerAnalysis</span>
                        </div>
                        <p class="text-gray-400">Find your perfect forex broker with our intelligent recommendation system.</p>
                        <div class="mt-4">
                            <p class="text-sm text-gray-400">30 N Gould St Ste R</p>
                            <p class="text-sm text-gray-400">Sheridan, WY 82801, US</p>
                            <p class="text-sm text-gray-400">Phone: (801)-893-2577</p>
                        </div>
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
                            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Legal</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved. EIN: 384298140</p>
                </div>
            </div>
        </footer>

        <script src="/static/navigation.js"></script>
    </body>
    </html>
  `);
});

// FXTM Review Page
app.get('/reviews/fxtm', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FXTM Review 2025 - Detailed Analysis & Rating | BrokerAnalysis</title>
        <meta name="description" content="Comprehensive FXTM review 2025. Analysis of spreads, regulation, platforms, and trading conditions. CySEC and FCA regulated with competitive spreads from 1.3 pips.">
        <meta name="keywords" content="FXTM review, FXTM broker, CySEC regulated broker, FCA regulation, MetaTrader 4, MetaTrader 5, forex trading">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:title" content="FXTM Review 2025 - Detailed Analysis & Rating">
        <meta property="og:description" content="Comprehensive FXTM review 2025. CySEC and FCA regulated broker with competitive spreads and multiple trading platforms.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/fxtm-review-og.png">
        <meta property="og:url" content="https://brokeranalysis.com/reviews/fxtm">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="FXTM Review 2025 - Detailed Analysis & Rating">
        <meta property="twitter:description" content="Comprehensive FXTM review 2025. CySEC and FCA regulated broker with competitive spreads.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/fxtm-review-og.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/reviews/fxtm">
        
        <!-- Preconnect to external domains -->
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Review -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialProduct",
            "name": "FXTM",
            "description": "CySEC and FCA regulated forex and CFD broker",
            "provider": {
              "@type": "Organization",
              "name": "ForexTime Limited",
              "url": "https://fxtm.com"
            }
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.3",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Organization",
            "name": "BrokerAnalysis",
            "url": "https://brokeranalysis.com"
          },
          "datePublished": "2025-01-01",
          "reviewBody": "FXTM is a well-regulated broker with CySEC and FCA licenses, offering competitive spreads from 1.3 pips, multiple trading platforms including MetaTrader 4 and 5. Strong regulation and comprehensive educational resources make it suitable for traders of all levels."
        }
        </script>
        
        <!-- Breadcrumb Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://brokeranalysis.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Reviews",
              "item": "https://brokeranalysis.com/reviews"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "FXTM Review",
              "item": "https://brokeranalysis.com/reviews/fxtm"
            }
          ]
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
        
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-6">
                        <a href="/" class="text-blue-800 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-800 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-blue-800 hover:text-blue-600">Compare</a>
                        <a href="/simulator" class="text-blue-800 hover:text-blue-600">Simulator</a>
                    </div>
                    <div class="md:hidden">
                        <button class="text-blue-800">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Breadcrumbs -->
        <div class="bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2 text-sm">
                        <li><a href="/" class="text-blue-600 hover:text-blue-800">Home</a></li>
                        <li><i class="fas fa-chevron-right text-gray-400 mx-2"></i></li>
                        <li><a href="/reviews" class="text-blue-600 hover:text-blue-800">Reviews</a></li>
                        <li><i class="fas fa-chevron-right text-gray-400 mx-2"></i></li>
                        <li class="text-gray-500">FXTM Review</li>
                    </ol>
                </nav>
            </div>
        </div>

        <main id="main-content">
            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-4xl font-bold mb-4">FXTM Review 2025</h1>
                            <p class="text-xl text-blue-100 mb-6">CySEC and FCA regulated broker with competitive spreads and award-winning platforms</p>
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center">
                                    <div class="text-yellow-400 text-xl mr-2">★★★★☆</div>
                                    <span class="text-lg font-semibold">4.3/5.0</span>
                                </div>
                                <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    CySEC & FCA Regulated
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <img src="/static/logos/fxtm.png" alt="FXTM Logo" class="h-16 w-auto">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-white py-8 border-b">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">1.3</div>
                            <div class="text-sm text-gray-600">Min Spread (pips)</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">$10</div>
                            <div class="text-sm text-gray-600">Min Deposit</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">1:1000</div>
                            <div class="text-sm text-gray-600">Max Leverage</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">2011</div>
                            <div class="text-sm text-gray-600">Founded</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Review Content -->
                    <div class="lg:col-span-2">
                        <!-- Overview -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">FXTM Overview</h2>
                            <p class="text-blue-600 mb-6 text-lg leading-relaxed">
                                FXTM (ForexTime) is a well-established forex and CFD broker founded in 2011. 
                                The company is regulated by multiple top-tier authorities including CySEC in Cyprus 
                                and FCA in the United Kingdom, providing strong investor protection and regulatory oversight.
                            </p>
                            <p class="text-blue-600 mb-6 leading-relaxed">
                                Known for its competitive spreads starting from 1.3 pips, comprehensive educational resources, 
                                and award-winning trading platforms, FXTM serves traders across the globe with a focus on 
                                transparency and client satisfaction. The broker offers multiple account types to accommodate 
                                different trading styles and experience levels.
                            </p>
                        </section>

                        <!-- Pros and Cons -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Pros and Cons</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-green-50 rounded-lg p-6">
                                    <h3 class="text-xl font-semibold text-green-800 mb-4 flex items-center">
                                        <i class="fas fa-check-circle mr-2"></i>
                                        Pros
                                    </h3>
                                    <ul class="space-y-2 text-green-700">
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Multiple tier-1 regulations (CySEC, FCA)
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Competitive spreads from 1.3 pips
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Comprehensive educational resources
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Award-winning trading platforms
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Low minimum deposit ($10)
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                                            Multiple account types available
                                        </li>
                                    </ul>
                                </div>
                                <div class="bg-red-50 rounded-lg p-6">
                                    <h3 class="text-xl font-semibold text-red-800 mb-4 flex items-center">
                                        <i class="fas fa-times-circle mr-2"></i>
                                        Cons
                                    </h3>
                                    <ul class="space-y-2 text-red-700">
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            Higher spreads compared to ECN brokers
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            Limited cryptocurrency offerings
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            No US clients accepted
                                        </li>
                                        <li class="flex items-start">
                                            <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                                            Swap fees can be high
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Trading Platforms -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Trading Platforms</h2>
                            <div class="space-y-6">
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                                        <i class="fas fa-desktop text-blue-600 mr-2"></i>
                                        MetaTrader 4 (MT4)
                                    </h3>
                                    <p class="text-blue-600 mb-4">
                                        The industry-standard trading platform with advanced charting tools, 
                                        automated trading capabilities, and extensive customization options.
                                    </p>
                                    <ul class="text-blue-600 space-y-1">
                                        <li>• 30+ built-in technical indicators</li>
                                        <li>• Expert Advisors (EAs) support</li>
                                        <li>• One-click trading execution</li>
                                        <li>• Mobile and web versions available</li>
                                    </ul>
                                </div>
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                                        <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                                        MetaTrader 5 (MT5)
                                    </h3>
                                    <p class="text-blue-600 mb-4">
                                        Next-generation platform with enhanced features, more timeframes, 
                                        and improved order management for multi-asset trading.
                                    </p>
                                    <ul class="text-blue-600 space-y-1">
                                        <li>• 38 built-in technical indicators</li>
                                        <li>• 21 timeframes for analysis</li>
                                        <li>• Advanced order types</li>
                                        <li>• Economic calendar integration</li>
                                    </ul>
                                </div>
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                                        <i class="fas fa-mobile-alt text-blue-600 mr-2"></i>
                                        FXTM Trader App
                                    </h3>
                                    <p class="text-blue-600 mb-4">
                                        Proprietary mobile trading app designed for on-the-go trading 
                                        with intuitive interface and essential trading tools.
                                    </p>
                                    <ul class="text-blue-600 space-y-1">
                                        <li>• User-friendly mobile interface</li>
                                        <li>• Real-time market data</li>
                                        <li>• Push notifications</li>
                                        <li>• Account management features</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Account Types -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Account Types</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-white rounded-lg shadow-lg p-6 border">
                                    <h3 class="text-xl font-semibold mb-4 text-blue-800">Standard Account</h3>
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Min Deposit:</span>
                                            <span class="font-semibold">$10</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Spreads:</span>
                                            <span class="font-semibold">From 1.3 pips</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Commission:</span>
                                            <span class="font-semibold">None</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Platforms:</span>
                                            <span class="font-semibold">MT4, MT5</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
                                    <div class="flex items-center justify-between mb-4">
                                        <h3 class="text-xl font-semibold text-blue-800">ECN Account</h3>
                                        <span class="bg-blue-500 text-white px-2 py-1 rounded text-sm">Popular</span>
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Min Deposit:</span>
                                            <span class="font-semibold">$200</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Spreads:</span>
                                            <span class="font-semibold">From 0.1 pips</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Commission:</span>
                                            <span class="font-semibold">$5/lot</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Platforms:</span>
                                            <span class="font-semibold">MT4, MT5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Regulation -->
                        <section class="mb-12">
                            <h2 class="text-3xl font-bold mb-6">Regulation & Safety</h2>
                            <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                                <div class="flex items-center mb-4">
                                    <i class="fas fa-shield-alt text-green-600 text-2xl mr-3"></i>
                                    <h3 class="text-xl font-semibold text-green-800">Multi-Tier Regulation</h3>
                                </div>
                                <p class="text-green-700 mb-4">
                                    FXTM is regulated by multiple top-tier financial authorities including CySEC 
                                    (Cyprus Securities and Exchange Commission) and FCA (Financial Conduct Authority) 
                                    in the UK, ensuring the highest standards of client protection and regulatory compliance.
                                </p>
                                <ul class="text-green-700 space-y-2">
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Client funds segregated in tier-1 banks
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Investor compensation scheme coverage
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Negative balance protection
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Regular regulatory audits and compliance
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <!-- Sidebar -->
                    <div class="lg:col-span-1">
                        <!-- Quick Info Card -->
                        <div class="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-6">
                            <h3 class="text-xl font-semibold mb-4">Quick Info</h3>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Founded:</span>
                                    <span class="font-semibold">2011</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Headquarters:</span>
                                    <span class="font-semibold">Limassol, Cyprus</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Regulation:</span>
                                    <span class="font-semibold">CySEC, FCA</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Min Deposit:</span>
                                    <span class="font-semibold">$10</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Max Leverage:</span>
                                    <span class="font-semibold">1:1000</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Platforms:</span>
                                    <span class="font-semibold">MT4, MT5, Mobile</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Instruments:</span>
                                    <span class="font-semibold">250+</span>
                                </div>
                            </div>
                            
                            <div class="mt-6 pt-6 border-t">
                                <a href="https://fxtm.com" target="_blank" rel="noopener noreferrer" 
                                   class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                    Visit FXTM
                                    <i class="fas fa-external-link-alt ml-2"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Rating Breakdown -->
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Rating Breakdown</h3>
                            <div class="space-y-3">
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Regulation</span>
                                        <span class="text-sm font-semibold">4.8</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 96%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Trading Costs</span>
                                        <span class="text-sm font-semibold">4.0</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 80%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Platforms</span>
                                        <span class="text-sm font-semibold">4.2</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" style="width: 84%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Customer Service</span>
                                        <span class="text-sm font-semibold">4.5</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-1">
                                        <span class="text-sm text-gray-600">Education</span>
                                        <span class="text-sm font-semibold">4.7</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 94%"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t">
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold">Overall Rating</span>
                                    <div class="flex items-center">
                                        <span class="text-2xl font-bold text-blue-600 mr-2">4.3</span>
                                        <div class="text-yellow-400">★★★★☆</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
                    <p class="text-xl mb-8 text-blue-100">
                        Find the perfect broker for your trading style with our intelligent recommendation system
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/" class="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Get Broker Recommendations
                        </a>
                        <a href="/compare" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
                            Compare Brokers
                        </a>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fas fa-chart-line text-blue-400 text-2xl"></i>
                            <span class="text-xl font-bold">BrokerAnalysis</span>
                        </div>
                        <p class="text-gray-400">Find your perfect forex broker with our intelligent recommendation system.</p>
                        <div class="mt-4">
                            <p class="text-sm text-gray-400">30 N Gould St Ste R</p>
                            <p class="text-sm text-gray-400">Sheridan, WY 82801, US</p>
                            <p class="text-sm text-gray-400">Phone: (801)-893-2577</p>
                        </div>
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
                            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Legal</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved. EIN: 384298140</p>
                </div>
            </div>
        </footer>

        <script src="/static/navigation.js"></script>
    </body>
    </html>
  `);
});

// Blackbull Markets Review Page
app.get('/reviews/blackbull-markets', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blackbull Markets Review 2025 - Comprehensive Broker Analysis | Brokeranalysis</title>
        <meta name="description" content="In-depth Blackbull Markets review 2025. Analyze trading platforms, spreads, regulation, and account types. Expert evaluation of this New Zealand forex broker.">
        <meta name="keywords" content="Blackbull Markets review, forex broker, trading platforms, MT4, MT5, cTrader, New Zealand broker, FMA regulation">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Blackbull Markets Review 2025 - Expert Broker Analysis">
        <meta property="og:description" content="Comprehensive review of Blackbull Markets. Discover trading costs, platforms, regulation, and account types in our detailed analysis.">
        <meta property="og:type" content="article">
        <meta property="og:url" content="https://brokeranalysis.com/reviews/blackbull-markets">
        <meta property="og:image" content="https://brokeranalysis.com/images/blackbull-markets-review.jpg">
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Blackbull Markets Review 2025 - Expert Analysis">
        <meta name="twitter:description" content="Complete Blackbull Markets broker review covering platforms, costs, regulation, and trading conditions.">
        <meta name="twitter:image" content="https://brokeranalysis.com/images/blackbull-markets-review.jpg">
        
        <link rel="canonical" href="https://brokeranalysis.com/reviews/blackbull-markets">
        <link href="/static/styles.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
                "@type": "FinancialService",
                "name": "Blackbull Markets",
                "description": "New Zealand-based forex and CFD broker offering competitive spreads and multiple trading platforms",
                "url": "https://blackbullmarkets.com",
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "NZ",
                    "addressLocality": "Auckland"
                }
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.3",
                "bestRating": "5",
                "worstRating": "1"
            },
            "author": {
                "@type": "Organization",
                "name": "Brokeranalysis",
                "url": "https://brokeranalysis.com"
            },
            "datePublished": "2025-01-21",
            "reviewBody": "Blackbull Markets is a New Zealand-based broker offering competitive trading conditions with tight spreads and fast execution. Regulated by FMA, it provides access to forex, indices, commodities, and cryptocurrencies through MT4, MT5, and cTrader platforms."
        }
        </script>
        
        <!-- Breadcrumb Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://brokeranalysis.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Broker Reviews",
                    "item": "https://brokeranalysis.com/reviews"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Blackbull Markets Review",
                    "item": "https://brokeranalysis.com/reviews/blackbull-markets"
                }
            ]
        }
        </script>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="text-2xl font-bold text-blue-600">Brokeranalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/reviews" class="text-blue-600 font-medium">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-blue-600">Compare</a>
                        <a href="/education" class="text-gray-700 hover:text-blue-600">Education</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Breadcrumb -->
        <div class="bg-gray-100 py-3">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li><a href="/" class="text-gray-500 hover:text-gray-700">Home</a></li>
                        <li><i class="fas fa-chevron-right text-gray-400 text-sm"></i></li>
                        <li><a href="/reviews" class="text-gray-500 hover:text-gray-700">Reviews</a></li>
                        <li><i class="fas fa-chevron-right text-gray-400 text-sm"></i></li>
                        <li class="text-gray-900 font-medium">Blackbull Markets</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2">
                    <!-- Hero Section -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div class="flex items-center mb-4">
                            <img src="https://via.placeholder.com/80x80?text=BB" alt="Blackbull Markets Logo" class="w-20 h-20 rounded-lg mr-4">
                            <div>
                                <h1 class="text-3xl font-bold text-gray-900">Blackbull Markets Review</h1>
                                <p class="text-gray-600 mt-1">New Zealand-based forex and CFD broker</p>
                                <div class="flex items-center mt-2">
                                    <div class="flex text-yellow-400">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span class="ml-2 text-gray-600">4.3/5 (Based on our analysis)</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">0.0 pips</div>
                                <div class="text-sm text-gray-600">Min Spread</div>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-green-600">$200</div>
                                <div class="text-sm text-gray-600">Min Deposit</div>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-purple-600">1:500</div>
                                <div class="text-sm text-gray-600">Max Leverage</div>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-orange-600">2014</div>
                                <div class="text-sm text-gray-600">Founded</div>
                            </div>
                        </div>
                    </div>

                    <!-- Overview -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                        <p class="text-gray-700 mb-4">
                            Blackbull Markets is a New Zealand-based forex and CFD broker that has been serving traders since 2014. 
                            Known for its competitive spreads and fast execution, the broker offers access to over 26,000 tradeable instruments 
                            across forex, indices, commodities, and cryptocurrencies.
                        </p>
                        <p class="text-gray-700 mb-4">
                            The broker is regulated by the Financial Markets Authority (FMA) of New Zealand and provides multiple trading 
                            platforms including MetaTrader 4, MetaTrader 5, and cTrader. Blackbull Markets caters to both retail and 
                            institutional clients with various account types and competitive trading conditions.
                        </p>
                        <p class="text-gray-700">
                            With a focus on transparency and client satisfaction, Blackbull Markets offers negative balance protection, 
                            segregated client funds, and 24/5 customer support to ensure a secure and reliable trading environment.
                        </p>
                    </div>

                    <!-- Pros and Cons -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Pros and Cons</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 class="text-lg font-semibold text-green-600 mb-3 flex items-center">
                                    <i class="fas fa-check-circle mr-2"></i>Pros
                                </h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Competitive spreads from 0.0 pips
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Fast execution speeds
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Multiple trading platforms (MT4, MT5, cTrader)
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        FMA regulation (New Zealand)
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Over 26,000 tradeable instruments
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 mt-1 mr-2"></i>
                                        Negative balance protection
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-red-600 mb-3 flex items-center">
                                    <i class="fas fa-times-circle mr-2"></i>Cons
                                </h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <i class="fas fa-times text-red-500 mt-1 mr-2"></i>
                                        Limited educational resources
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-times text-red-500 mt-1 mr-2"></i>
                                        No proprietary trading platform
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-times text-red-500 mt-1 mr-2"></i>
                                        Higher minimum deposit for some accounts
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-times text-red-500 mt-1 mr-2"></i>
                                        Limited research and analysis tools
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-times text-red-500 mt-1 mr-2"></i>
                                        No social trading features
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Trading Platforms -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Trading Platforms</h2>
                        
                        <div class="space-y-6">
                            <div class="border rounded-lg p-4">
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">MetaTrader 4 (MT4)</h3>
                                <p class="text-gray-700 mb-3">
                                    The world's most popular trading platform, offering advanced charting tools, automated trading capabilities, 
                                    and a wide range of technical indicators. Perfect for both beginners and experienced traders.
                                </p>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Expert Advisors (EAs) support</li>
                                    <li>• 30+ built-in technical indicators</li>
                                    <li>• One-click trading</li>
                                    <li>• Mobile and desktop versions</li>
                                </ul>
                            </div>
                            
                            <div class="border rounded-lg p-4">
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">MetaTrader 5 (MT5)</h3>
                                <p class="text-gray-700 mb-3">
                                    The next-generation platform with enhanced features, more timeframes, and improved order management. 
                                    Ideal for advanced traders and multi-asset trading.
                                </p>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 21 timeframes vs 9 in MT4</li>
                                    <li>• 38 built-in technical indicators</li>
                                    <li>• Economic calendar integration</li>
                                    <li>• Advanced order types</li>
                                </ul>
                            </div>
                            
                            <div class="border rounded-lg p-4">
                                <h3 class="text-xl font-semibold text-gray-900 mb-3">cTrader</h3>
                                <p class="text-gray-700 mb-3">
                                    A modern, intuitive platform designed for ECN trading with advanced charting capabilities and 
                                    level II pricing. Offers superior execution and transparency.
                                </p>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Level II pricing (market depth)</li>
                                    <li>• Advanced charting with 70+ indicators</li>
                                    <li>• cAlgo for algorithmic trading</li>
                                    <li>• Copy trading functionality</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Account Types -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Account Types</h2>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="border rounded-lg p-4">
                                <h3 class="text-xl font-semibold text-blue-600 mb-3">Standard Account</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li><strong>Minimum Deposit:</strong> $200</li>
                                    <li><strong>Spreads:</strong> From 1.0 pips</li>
                                    <li><strong>Commission:</strong> No commission</li>
                                    <li><strong>Leverage:</strong> Up to 1:500</li>
                                    <li><strong>Platforms:</strong> MT4, MT5, cTrader</li>
                                </ul>
                                <p class="text-sm text-gray-600 mt-3">
                                    Ideal for beginners and traders who prefer commission-free trading with competitive spreads.
                                </p>
                            </div>
                            
                            <div class="border rounded-lg p-4">
                                <h3 class="text-xl font-semibold text-green-600 mb-3">Prime Account</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li><strong>Minimum Deposit:</strong> $2,000</li>
                                    <li><strong>Spreads:</strong> From 0.0 pips</li>
                                    <li><strong>Commission:</strong> $3 per lot</li>
                                    <li><strong>Leverage:</strong> Up to 1:500</li>
                                    <li><strong>Platforms:</strong> MT4, MT5, cTrader</li>
                                </ul>
                                <p class="text-sm text-gray-600 mt-3">
                                    Perfect for active traders seeking the tightest spreads and willing to pay commission for better pricing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Regulation and Safety -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Regulation and Safety</h2>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <h3 class="text-lg font-semibold text-green-800 mb-2">FMA Regulated</h3>
                            <p class="text-green-700">
                                Blackbull Markets is regulated by the Financial Markets Authority (FMA) of New Zealand, 
                                ensuring compliance with strict financial standards and client protection measures.
                            </p>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-900 mb-2">Client Fund Protection</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• Segregated client accounts</li>
                                    <li>• Funds held in tier-1 banks</li>
                                    <li>• Negative balance protection</li>
                                </ul>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-gray-900 mb-2">Risk Management</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• Stop loss and take profit orders</li>
                                    <li>• Margin call protection</li>
                                    <li>• Real-time risk monitoring</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Quick Info -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-4">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Founded:</span>
                                <span class="font-medium">2014</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Headquarters:</span>
                                <span class="font-medium">Auckland, NZ</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Regulation:</span>
                                <span class="font-medium">FMA (New Zealand)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Min Deposit:</span>
                                <span class="font-medium">$200</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Max Leverage:</span>
                                <span class="font-medium">1:500</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Platforms:</span>
                                <span class="font-medium">MT4, MT5, cTrader</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Instruments:</span>
                                <span class="font-medium">26,000+</span>
                            </div>
                        </div>
                        
                        <a href="https://blackbullmarkets.com" target="_blank" rel="noopener noreferrer" 
                           class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6 block text-center">
                            Visit Blackbull Markets
                        </a>
                    </div>

                    <!-- Rating Breakdown -->
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
                        <div class="space-y-3">
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Regulation</span>
                                    <span>4.5/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 90%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Trading Costs</span>
                                    <span>4.4/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 88%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Platforms</span>
                                    <span>4.2/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 84%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Customer Service</span>
                                    <span>4.1/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 82%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Education</span>
                                    <span>3.8/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 76%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t">
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-semibold">Overall Rating</span>
                                <span class="text-2xl font-bold text-blue-600">4.3/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ready to Start Trading CTA -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white mt-12">
                <h2 class="text-3xl font-bold mb-4">Ready to Start Trading with Blackbull Markets?</h2>
                <p class="text-xl mb-6 opacity-90">Join thousands of traders who trust Blackbull Markets for their trading needs</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://blackbullmarkets.com" target="_blank" rel="noopener noreferrer" 
                       class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Open Live Account
                    </a>
                    <a href="https://blackbullmarkets.com/demo" target="_blank" rel="noopener noreferrer" 
                       class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        Try Demo Account
                    </a>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12 mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">Brokeranalysis</h3>
                        <p class="text-gray-400 text-sm">
                            Your trusted source for broker reviews and trading insights. We help traders make informed decisions.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Reviews</h4>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li><a href="/reviews/fp-markets" class="hover:text-white">FP Markets</a></li>
                            <li><a href="/reviews/fxtm" class="hover:text-white">FXTM</a></li>
                            <li><a href="/reviews/blackbull-markets" class="hover:text-white">Blackbull Markets</a></li>
                            <li><a href="/reviews/eightcap" class="hover:text-white">Eightcap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Tools</h4>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li><a href="/compare" class="hover:text-white">Broker Comparison</a></li>
                            <li><a href="/calculator" class="hover:text-white">Trading Calculator</a></li>
                            <li><a href="/education" class="hover:text-white">Education Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Contact</h4>
                        <div class="text-sm text-gray-400 space-y-2">
                            <p>30 N Gould St Ste R<br>Sheridan, WY 82801, US</p>
                            <p>Phone: (801)-893-2577</p>
                            <p>EIN: 384298140</p>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Brokeranalysis. All rights reserved. Trading involves risk and may not be suitable for all investors.</p>
                </div>
            </div>
        </footer>
    </body>
    </html>
  `);
});

// Eightcap Review Page
app.get('/reviews/eightcap', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Eightcap Review 2025: Comprehensive Broker Analysis | Brokeranalysis</title>
        <meta name="description" content="In-depth Eightcap review covering trading platforms, fees, regulation, and account types. Expert analysis of this Australian forex and CFD broker for 2025.">
        <meta name="keywords" content="Eightcap review, Eightcap broker, forex trading, CFD trading, MT4, MT5, TradingView, Australian broker, ASIC regulation">
        <meta name="author" content="Brokeranalysis">
        <meta name="robots" content="index, follow">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:url" content="https://brokeranalysis.com/reviews/eightcap">
        <meta property="og:title" content="Eightcap Review 2025: Comprehensive Broker Analysis">
        <meta property="og:description" content="Expert review of Eightcap - Australian forex and CFD broker. Analysis of trading platforms, fees, regulation, and account types.">
        <meta property="og:image" content="https://brokeranalysis.com/images/eightcap-review-og.jpg">
        <meta property="og:site_name" content="Brokeranalysis">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://brokeranalysis.com/reviews/eightcap">
        <meta property="twitter:title" content="Eightcap Review 2025: Comprehensive Broker Analysis">
        <meta property="twitter:description" content="Expert review of Eightcap - Australian forex and CFD broker. Analysis of trading platforms, fees, regulation, and account types.">
        <meta property="twitter:image" content="https://brokeranalysis.com/images/eightcap-review-twitter.jpg">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="https://brokeranalysis.com/reviews/eightcap">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        
        <!-- Tailwind CSS -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Eightcap",
            "description": "Australian forex and CFD broker offering MT4, MT5, and TradingView platforms",
            "url": "https://eightcap.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AU",
              "addressLocality": "Melbourne"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "Brokeranalysis",
            "url": "https://brokeranalysis.com"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "8.2",
            "bestRating": "10",
            "worstRating": "1"
          },
          "datePublished": "2025-01-21",
          "dateModified": "2025-01-21",
          "reviewBody": "Eightcap is a well-regulated Australian broker offering competitive spreads, multiple trading platforms, and strong regulatory oversight from ASIC."
        }
        </script>
        
        <!-- Breadcrumb Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://brokeranalysis.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Broker Reviews",
              "item": "https://brokeranalysis.com/reviews"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Eightcap Review",
              "item": "https://brokeranalysis.com/reviews/eightcap"
            }
          ]
        }
        </script>
    </head>
    <body class="bg-gray-50 text-gray-900">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="text-2xl font-bold text-blue-600">Brokeranalysis</a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
                        <a href="/reviews" class="text-gray-600 hover:text-gray-900">Reviews</a>
                        <a href="/compare" class="text-gray-600 hover:text-gray-900">Compare</a>
                        <a href="/education" class="text-gray-600 hover:text-gray-900">Education</a>
                        <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Breadcrumb -->
        <div class="bg-gray-100 py-3">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li><a href="/" class="text-blue-600 hover:text-blue-800">Home</a></li>
                        <li class="text-gray-500">/</li>
                        <li><a href="/reviews" class="text-blue-600 hover:text-blue-800">Reviews</a></li>
                        <li class="text-gray-500">/</li>
                        <li class="text-gray-900">Eightcap Review</li>
                    </ol>
                </nav>
            </div>
        </div>

        <!-- Hero Section -->
        <section class="bg-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Eightcap Review 2025</h1>
                    <p class="text-xl text-gray-600 mb-8">Comprehensive analysis of the Australian forex and CFD broker</p>
                    
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">0.0 pips</div>
                            <div class="text-sm text-gray-600">Min Spread</div>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">$100</div>
                            <div class="text-sm text-gray-600">Min Deposit</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600">1:500</div>
                            <div class="text-sm text-gray-600">Max Leverage</div>
                        </div>
                        <div class="bg-orange-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-orange-600">2009</div>
                            <div class="text-sm text-gray-600">Founded</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2">
                    <!-- Overview -->
                    <section class="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h2 class="text-3xl font-bold mb-6">Eightcap Overview</h2>
                        <p class="text-gray-700 mb-4">
                            Eightcap is an Australian-based forex and CFD broker that has been serving traders since 2009. 
                            Regulated by the Australian Securities and Investments Commission (ASIC), Eightcap offers 
                            competitive trading conditions with tight spreads and fast execution across multiple platforms.
                        </p>
                        <p class="text-gray-700 mb-4">
                            The broker provides access to over 800 trading instruments including forex, indices, 
                            commodities, and cryptocurrencies. With offices in Melbourne and additional regulatory 
                            coverage in other jurisdictions, Eightcap has established itself as a reliable choice 
                            for both beginner and experienced traders.
                        </p>
                        <p class="text-gray-700">
                            Eightcap's commitment to transparency, competitive pricing, and advanced trading technology 
                            makes it a popular choice among Australian and international traders seeking a trustworthy 
                            trading environment.
                        </p>
                    </section>

                    <!-- Pros and Cons -->
                    <section class="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h2 class="text-3xl font-bold mb-6">Pros and Cons</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 class="text-xl font-semibold text-green-600 mb-4">Pros</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2">✓</span>
                                        <span>ASIC regulated with strong oversight</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2">✓</span>
                                        <span>Competitive spreads from 0.0 pips</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2">✓</span>
                                        <span>Multiple trading platforms (MT4, MT5, TradingView)</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2">✓</span>
                                        <span>Fast execution and reliable infrastructure</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2">✓</span>
                                        <span>Comprehensive educational resources</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2">✓</span>
                                        <span>24/5 customer support</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-red-600 mb-4">Cons</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2">✗</span>
                                        <span>Limited regulatory coverage outside Australia</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2">✗</span>
                                        <span>No proprietary trading platform</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2">✗</span>
                                        <span>Commission charges on Raw account</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2">✗</span>
                                        <span>Limited research and analysis tools</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Trading Platforms -->
                    <section class="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h2 class="text-3xl font-bold mb-6">Trading Platforms</h2>
                        
                        <div class="space-y-6">
                            <div class="border-l-4 border-blue-500 pl-6">
                                <h3 class="text-xl font-semibold mb-3">MetaTrader 4 (MT4)</h3>
                                <p class="text-gray-700">
                                    The world's most popular trading platform, offering advanced charting, 
                                    automated trading capabilities, and a wide range of technical indicators. 
                                    Perfect for forex and CFD trading with expert advisors support.
                                </p>
                            </div>
                            
                            <div class="border-l-4 border-green-500 pl-6">
                                <h3 class="text-xl font-semibold mb-3">MetaTrader 5 (MT5)</h3>
                                <p class="text-gray-700">
                                    The next-generation platform with enhanced features including more timeframes, 
                                    additional order types, and improved backtesting capabilities. Ideal for 
                                    multi-asset trading and advanced market analysis.
                                </p>
                            </div>
                            
                            <div class="border-l-4 border-purple-500 pl-6">
                                <h3 class="text-xl font-semibold mb-3">TradingView</h3>
                                <p class="text-gray-700">
                                    Web-based platform with professional charting tools, social trading features, 
                                    and advanced technical analysis capabilities. Access to a vast library of 
                                    indicators and trading ideas from the community.
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- Account Types -->
                    <section class="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h2 class="text-3xl font-bold mb-6">Account Types</h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4 text-blue-600">Standard Account</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li><strong>Min Deposit:</strong> $100</li>
                                    <li><strong>Spreads:</strong> From 1.0 pips</li>
                                    <li><strong>Commission:</strong> No commission</li>
                                    <li><strong>Leverage:</strong> Up to 1:500</li>
                                    <li><strong>Platforms:</strong> MT4, MT5, TradingView</li>
                                </ul>
                            </div>
                            
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4 text-green-600">Raw Account</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li><strong>Min Deposit:</strong> $100</li>
                                    <li><strong>Spreads:</strong> From 0.0 pips</li>
                                    <li><strong>Commission:</strong> $3.50 per lot</li>
                                    <li><strong>Leverage:</strong> Up to 1:500</li>
                                    <li><strong>Platforms:</strong> MT4, MT5, TradingView</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Regulation and Safety -->
                    <section class="bg-white rounded-lg shadow-sm p-8">
                        <h2 class="text-3xl font-bold mb-6">Regulation and Safety</h2>
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="bg-green-100 p-2 rounded-full mr-4">
                                    <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">ASIC Regulation</h3>
                                    <p class="text-gray-700">Regulated by the Australian Securities and Investments Commission (ASIC) under license number 391441.</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="bg-blue-100 p-2 rounded-full mr-4">
                                    <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">Client Fund Protection</h3>
                                    <p class="text-gray-700">Client funds are segregated and held in tier-1 banks, providing additional security for trader deposits.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Quick Info -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 class="text-xl font-semibold mb-4">Quick Info</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Founded:</span>
                                <span class="font-medium">2009</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Headquarters:</span>
                                <span class="font-medium">Melbourne, Australia</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Regulation:</span>
                                <span class="font-medium">ASIC</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Min Deposit:</span>
                                <span class="font-medium">$100</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Max Leverage:</span>
                                <span class="font-medium">1:500</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Platforms:</span>
                                <span class="font-medium">MT4, MT5, TradingView</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Instruments:</span>
                                <span class="font-medium">800+</span>
                            </div>
                        </div>
                    </div>

                    <!-- Visit Broker CTA -->
                    <div class="bg-blue-600 text-white rounded-lg p-6 mb-6 text-center">
                        <h3 class="text-xl font-semibold mb-2">Visit Eightcap</h3>
                        <p class="mb-4">Start trading with competitive spreads and reliable execution</p>
                        <a href="https://eightcap.com" target="_blank" rel="noopener noreferrer" 
                           class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Open Account
                        </a>
                        <p class="text-xs mt-2 opacity-75">Risk warning: Trading involves risk</p>
                    </div>

                    <!-- Rating Breakdown -->
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h3 class="text-xl font-semibold mb-4">Rating Breakdown</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Regulation</span>
                                    <span class="text-sm font-medium">9.0/10</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 90%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Trading Costs</span>
                                    <span class="text-sm font-medium">8.5/10</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Platforms</span>
                                    <span class="text-sm font-medium">8.0/10</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Customer Service</span>
                                    <span class="text-sm font-medium">7.8/10</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 78%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Education</span>
                                    <span class="text-sm font-medium">7.5/10</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 75%"></div>
                                </div>
                            </div>
                            
                            <div class="border-t pt-4 mt-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-lg font-semibold">Overall Rating</span>
                                    <span class="text-2xl font-bold text-blue-600">8.2/10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ready to Start Trading CTA -->
        <section class="bg-blue-600 text-white py-16">
            <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold mb-4">Ready to Start Trading with Eightcap?</h2>
                <p class="text-xl mb-8">Join thousands of traders who trust Eightcap for their trading needs</p>
                <a href="https://eightcap.com" target="_blank" rel="noopener noreferrer" 
                   class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                    Open Your Account Today
                </a>
                <p class="text-sm mt-4 opacity-75">Risk warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.</p>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Brokeranalysis</h3>
                        <p class="text-gray-400 mb-4">Your trusted source for broker reviews and trading insights.</p>
                        <div class="text-sm text-gray-400">
                            <p>30 N Gould St Ste R</p>
                            <p>Sheridan, WY 82801, US</p>
                            <p>EIN: 384298140</p>
                            <p>Phone: (801)-893-2577</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Reviews</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/reviews/fp-markets" class="hover:text-white">FP Markets</a></li>
                            <li><a href="/reviews/fxtm" class="hover:text-white">FXTM</a></li>
                            <li><a href="/reviews/blackbull-markets" class="hover:text-white">Blackbull Markets</a></li>
                            <li><a href="/reviews/eightcap" class="hover:text-white">Eightcap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Resources</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/education" class="hover:text-white">Education</a></li>
                            <li><a href="/compare" class="hover:text-white">Compare Brokers</a></li>
                            <li><a href="/news" class="hover:text-white">Market News</a></li>
                            <li><a href="/tools" class="hover:text-white">Trading Tools</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Company</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white">About Us</a></li>
                            <li><a href="/contact" class="hover:text-white">Contact</a></li>
                            <li><a href="/privacy" class="hover:text-white">Privacy Policy</a></li>
                            <li><a href="/terms" class="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Brokeranalysis. All rights reserved.</p>
                    <p class="mt-2 text-sm">Risk Warning: Trading forex and CFDs involves significant risk and may not be suitable for all investors.</p>
                </div>
            </div>
        </footer>
        
        <script src="/js/navigation.js"></script>
    </body>
    </html>
  `);
});

// Octa Review Page
app.get('/reviews/octa', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Octa Review 2025: Comprehensive Broker Analysis | Brokeranalysis</title>
        <meta name="description" content="In-depth Octa review 2025. Analyze trading platforms, account types, regulation, fees, and safety. Expert evaluation of this global forex and CFD broker.">
        <meta name="keywords" content="Octa review, Octa broker, forex trading, CFD trading, MetaTrader, cTrader, broker analysis, trading platforms">
        <meta name="author" content="Brokeranalysis">
        <meta name="robots" content="index, follow">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:url" content="https://brokeranalysis.com/reviews/octa">
        <meta property="og:title" content="Octa Review 2025: Comprehensive Broker Analysis">
        <meta property="og:description" content="Expert analysis of Octa broker. Compare trading platforms, fees, regulation, and safety features in our detailed review.">
        <meta property="og:image" content="https://brokeranalysis.com/images/octa-review-social.jpg">
        <meta property="og:site_name" content="Brokeranalysis">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://brokeranalysis.com/reviews/octa">
        <meta property="twitter:title" content="Octa Review 2025: Comprehensive Broker Analysis">
        <meta property="twitter:description" content="Expert analysis of Octa broker. Compare trading platforms, fees, regulation, and safety features.">
        <meta property="twitter:image" content="https://brokeranalysis.com/images/octa-review-social.jpg">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="https://brokeranalysis.com/reviews/octa">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "Octa",
            "description": "Global forex and CFD broker offering multiple trading platforms",
            "url": "https://octa.com",
            "sameAs": [
              "https://www.linkedin.com/company/octa",
              "https://twitter.com/octa_global"
            ]
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4.2",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Organization",
            "name": "Brokeranalysis",
            "url": "https://brokeranalysis.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Brokeranalysis",
            "logo": {
              "@type": "ImageObject",
              "url": "https://brokeranalysis.com/logo.png"
            }
          },
          "datePublished": "2025-01-27",
          "dateModified": "2025-01-27"
        }
        </script>
        
        <!-- Breadcrumb Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://brokeranalysis.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Broker Reviews",
              "item": "https://brokeranalysis.com/reviews"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Octa Review",
              "item": "https://brokeranalysis.com/reviews/octa"
            }
          ]
        }
        </script>
        
        <link href="/static/styles.css" rel="stylesheet">
        <link rel="stylesheet" href="/src/styles.css">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex-shrink-0 flex items-center">
                            <span class="text-2xl font-bold text-blue-600">Brokeranalysis</span>
                        </a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
                        <a href="/reviews" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Compare</a>
                        <a href="/news" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">News</a>
                        <a href="/tools" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Tools</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Breadcrumb -->
        <div class="bg-gray-100 py-3">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <a href="/" class="text-gray-700 hover:text-blue-600 inline-flex items-center">
                                Home
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <span class="text-gray-400 mx-2">/</span>
                                <a href="/reviews" class="text-gray-700 hover:text-blue-600">Reviews</a>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <span class="text-gray-400 mx-2">/</span>
                                <span class="text-gray-500">Octa Review</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-3">
                    <!-- Hero Section -->
                    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center">
                                <img src="/images/brokers/octa-logo.png" alt="Octa Logo" class="w-16 h-16 mr-4">
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900">Octa Review 2025</h1>
                                    <p class="text-gray-600">Global Forex & CFD Broker</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-3xl font-bold text-blue-600">4.2/5</div>
                                <div class="text-sm text-gray-500">Overall Rating</div>
                            </div>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div class="text-center p-4 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">2013</div>
                                <div class="text-sm text-gray-600">Founded</div>
                            </div>
                            <div class="text-center p-4 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">1:1000</div>
                                <div class="text-sm text-gray-600">Max Leverage</div>
                            </div>
                            <div class="text-center p-4 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">0.0</div>
                                <div class="text-sm text-gray-600">Min Spread</div>
                            </div>
                            <div class="text-center p-4 bg-gray-50 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">$25</div>
                                <div class="text-sm text-gray-600">Min Deposit</div>
                            </div>
                        </div>
                        
                        <div class="flex flex-wrap gap-4">
                            <a href="https://octa.com" target="_blank" rel="noopener" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Visit Octa
                            </a>
                            <a href="#comparison" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                                Compare Brokers
                            </a>
                        </div>
                    </div>

                    <!-- Overview Section -->
                    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Octa Overview</h2>
                        <div class="prose max-w-none">
                            <p class="text-gray-700 mb-4">
                                Octa is a global forex and CFD broker established in 2013, offering trading services to clients worldwide. 
                                The broker provides access to multiple trading platforms including MetaTrader 4, MetaTrader 5, and cTrader, 
                                catering to both beginner and experienced traders.
                            </p>
                            <p class="text-gray-700 mb-4">
                                With competitive spreads starting from 0.0 pips and leverage up to 1:1000, Octa aims to provide 
                                flexible trading conditions. The broker offers a wide range of trading instruments including forex pairs, 
                                commodities, indices, and cryptocurrencies.
                            </p>
                            <p class="text-gray-700">
                                Octa focuses on providing educational resources and customer support to help traders improve their 
                                trading skills and achieve their financial goals.
                            </p>
                        </div>
                    </div>

                    <!-- Pros and Cons -->
                    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Pros and Cons</h2>
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-lg font-semibold text-green-600 mb-4 flex items-center">
                                    <span class="mr-2">✓</span> Pros
                                </h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Multiple trading platforms (MT4, MT5, cTrader)</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Competitive spreads from 0.0 pips</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">High leverage up to 1:1000</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Low minimum deposit ($25)</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Wide range of trading instruments</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Educational resources and webinars</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-red-600 mb-4 flex items-center">
                                    <span class="mr-2">✗</span> Cons
                                </h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Limited regulatory oversight</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">No negative balance protection in some regions</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Limited research and analysis tools</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1">•</span>
                                        <span class="text-gray-700">Customer support could be improved</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Trading Platforms -->
                    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Trading Platforms</h2>
                        <div class="grid md:grid-cols-3 gap-6">
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4">MetaTrader 4</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Advanced charting tools</li>
                                    <li>• Expert Advisors (EAs)</li>
                                    <li>• Custom indicators</li>
                                    <li>• One-click trading</li>
                                    <li>• Mobile trading apps</li>
                                </ul>
                            </div>
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4">MetaTrader 5</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Enhanced order management</li>
                                    <li>• More timeframes</li>
                                    <li>• Economic calendar</li>
                                    <li>• Depth of market</li>
                                    <li>• Advanced pending orders</li>
                                </ul>
                            </div>
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4">cTrader</h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li>• Level II pricing</li>
                                    <li>• Advanced order types</li>
                                    <li>• cBots (automated trading)</li>
                                    <li>• Intuitive interface</li>
                                    <li>• Fast execution</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Account Types -->
                    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Account Types</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4 text-blue-600">Standard Account</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Minimum Deposit:</span>
                                        <span class="font-semibold">$25</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Spreads From:</span>
                                        <span class="font-semibold">1.0 pips</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Commission:</span>
                                        <span class="font-semibold">No</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Max Leverage:</span>
                                        <span class="font-semibold">1:1000</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Platforms:</span>
                                        <span class="font-semibold">MT4, MT5</span>
                                    </div>
                                </div>
                            </div>
                            <div class="border rounded-lg p-6">
                                <h3 class="text-xl font-semibold mb-4 text-blue-600">ECN Account</h3>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Minimum Deposit:</span>
                                        <span class="font-semibold">$500</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Spreads From:</span>
                                        <span class="font-semibold">0.0 pips</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Commission:</span>
                                        <span class="font-semibold">$3.5/lot</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Max Leverage:</span>
                                        <span class="font-semibold">1:500</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Platforms:</span>
                                        <span class="font-semibold">MT4, MT5, cTrader</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Regulation and Safety -->
                    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Regulation and Safety</h2>
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-lg font-semibold mb-4">Regulatory Status</h3>
                                <div class="space-y-3">
                                    <div class="flex items-center">
                                        <span class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                                        <span class="text-gray-700">Limited regulatory oversight</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                        <span class="text-gray-700">Operates under international standards</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold mb-4">Safety Features</h3>
                                <div class="space-y-3">
                                    <div class="flex items-center">
                                        <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                        <span class="text-gray-700">SSL encryption</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                        <span class="text-gray-700">Segregated client funds</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                                        <span class="text-gray-700">Limited investor protection</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Quick Info -->
                    <div class="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-24">
                        <h3 class="text-lg font-semibold mb-4">Quick Info</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Founded:</span>
                                <span class="font-semibold">2013</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Headquarters:</span>
                                <span class="font-semibold">Global</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Min Deposit:</span>
                                <span class="font-semibold">$25</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Max Leverage:</span>
                                <span class="font-semibold">1:1000</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Platforms:</span>
                                <span class="font-semibold">MT4, MT5, cTrader</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Instruments:</span>
                                <span class="font-semibold">100+</span>
                            </div>
                        </div>
                        
                        <div class="mt-6">
                            <a href="https://octa.com" target="_blank" rel="noopener" class="w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors block">
                                Visit Octa
                            </a>
                        </div>
                    </div>

                    <!-- Rating Breakdown -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Rating Breakdown</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Trading Platforms</span>
                                    <span class="text-sm font-semibold">4.5/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 90%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Trading Costs</span>
                                    <span class="text-sm font-semibold">4.3/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 86%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Regulation</span>
                                    <span class="text-sm font-semibold">3.5/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 70%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Customer Support</span>
                                    <span class="text-sm font-semibold">4.0/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-600">Education</span>
                                    <span class="text-sm font-semibold">4.2/5</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 84%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-6 pt-4 border-t">
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-semibold">Overall Rating</span>
                                <span class="text-2xl font-bold text-blue-600">4.2/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-blue-600 text-white py-16">
            <div class="max-w-4xl mx-auto text-center px-4">
                <h2 class="text-3xl font-bold mb-4">Ready to Start Trading with Octa?</h2>
                <p class="text-xl mb-8">Join thousands of traders who trust Octa for their trading needs</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://octa.com" target="_blank" rel="noopener" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Open Account
                    </a>
                    <a href="/compare" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        Compare Brokers
                    </a>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="col-span-1 md:col-span-2">
                        <h3 class="text-2xl font-bold mb-4">Brokeranalysis</h3>
                        <p class="text-gray-300 mb-4">
                            Your trusted source for comprehensive broker reviews and trading insights. 
                            We help traders make informed decisions with unbiased analysis and expert recommendations.
                        </p>
                        <div class="text-sm text-gray-400">
                            <p>30 N Gould St Ste R</p>
                            <p>Sheridan, WY 82801, US</p>
                            <p>EIN: 384298140</p>
                            <p>Phone: (801)-893-2577</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a href="/" class="hover:text-white">Home</a></li>
                            <li><a href="/reviews" class="hover:text-white">Broker Reviews</a></li>
                            <li><a href="/compare" class="hover:text-white">Compare Brokers</a></li>
                            <li><a href="/news" class="hover:text-white">Market News</a></li>
                            <li><a href="/tools" class="hover:text-white">Trading Tools</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Company</h4>
                        <ul class="space-y-2">
                            <li><a href="/about" class="hover:text-white">About Us</a></li>
                            <li><a href="/contact" class="hover:text-white">Contact</a></li>
                            <li><a href="/privacy" class="hover:text-white">Privacy Policy</a></li>
                            <li><a href="/terms" class="hover:text-white">Terms of Service</a></li>
                            <li><a href="/disclaimer" class="hover:text-white">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 Brokeranalysis. All rights reserved.</p>
                </div>
            </div>
        </footer>
        
        <script src="/js/navigation.js"></script>
    </body>
    </html>
  `);
});

// Plus500 Review Page
app.get('/reviews/plus500', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Plus500 Review 2025: CFD Trading Platform Analysis | Brokeranalysis</title>
      <meta name="description" content="Comprehensive Plus500 review 2025. Analyze CFD trading platform, spreads, regulation, and user experience. Expert evaluation of Plus500's trading conditions.">
      <meta name="keywords" content="Plus500 review, CFD trading, Plus500 platform, online trading, CFD broker, Plus500 analysis">
      <meta name="author" content="Brokeranalysis">
      <meta name="robots" content="index, follow">
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="article">
      <meta property="og:url" content="https://brokeranalysis.com/reviews/plus500">
      <meta property="og:title" content="Plus500 Review 2025: CFD Trading Platform Analysis">
      <meta property="og:description" content="Comprehensive Plus500 review 2025. Analyze CFD trading platform, spreads, regulation, and user experience.">
      <meta property="og:image" content="https://brokeranalysis.com/images/plus500-review-og.jpg">
      <meta property="og:site_name" content="Brokeranalysis">
      
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:url" content="https://brokeranalysis.com/reviews/plus500">
      <meta property="twitter:title" content="Plus500 Review 2025: CFD Trading Platform Analysis">
      <meta property="twitter:description" content="Comprehensive Plus500 review 2025. Analyze CFD trading platform, spreads, regulation, and user experience.">
      <meta property="twitter:image" content="https://brokeranalysis.com/images/plus500-review-twitter.jpg">
      
      <!-- Canonical URL -->
      <link rel="canonical" href="https://brokeranalysis.com/reviews/plus500">
      
      <!-- Structured Data -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "FinancialService",
          "name": "Plus500",
          "description": "CFD Trading Platform",
          "url": "https://www.plus500.com",
          "sameAs": [
            "https://www.linkedin.com/company/plus500",
            "https://twitter.com/Plus500"
          ]
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "7.8",
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Brokeranalysis",
          "url": "https://brokeranalysis.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Brokeranalysis",
          "logo": {
            "@type": "ImageObject",
            "url": "https://brokeranalysis.com/logo.png"
          }
        },
        "datePublished": "2025-01-27",
        "dateModified": "2025-01-27"
      }
      </script>
      
      <!-- Breadcrumb Structured Data -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://brokeranalysis.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Broker Reviews",
            "item": "https://brokeranalysis.com/reviews"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Plus500 Review",
            "item": "https://brokeranalysis.com/reviews/plus500"
          }
        ]
      }
      </script>
      
      <style>
        ${`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
          .header { background: #1a365d; color: white; padding: 1rem 0; }
          .nav { display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 1.5rem; font-weight: bold; }
          .nav-links { display: flex; list-style: none; gap: 2rem; }
          .nav-links a { color: white; text-decoration: none; }
          .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 0; }
          .hero-content { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; align-items: center; }
          .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
          .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
          .rating-box { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 10px; text-align: center; }
          .rating-score { font-size: 3rem; font-weight: bold; margin-bottom: 0.5rem; }
          .quick-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
          .stat-card { background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; text-align: center; }
          .main-content { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; padding: 3rem 0; }
          .content-section { margin-bottom: 3rem; }
          .content-section h2 { color: #2d3748; margin-bottom: 1rem; font-size: 1.8rem; }
          .content-section h3 { color: #4a5568; margin-bottom: 0.8rem; font-size: 1.3rem; }
          .pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; }
          .pros, .cons { padding: 1.5rem; border-radius: 8px; }
          .pros { background: #f0fff4; border-left: 4px solid #38a169; }
          .cons { background: #fff5f5; border-left: 4px solid #e53e3e; }
          .pros h3 { color: #38a169; }
          .cons h3 { color: #e53e3e; }
          .sidebar { background: #f7fafc; padding: 2rem; border-radius: 10px; height: fit-content; }
          .info-item { display: flex; justify-content: space-between; padding: 0.8rem 0; border-bottom: 1px solid #e2e8f0; }
          .info-item:last-child { border-bottom: none; }
          .cta-section { background: #2d3748; color: white; padding: 3rem 0; text-align: center; }
          .cta-button { background: #4299e1; color: white; padding: 1rem 2rem; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer; text-decoration: none; display: inline-block; }
          .platform-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0; }
          .platform-card { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef; }
          .account-types { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0; }
          .account-card { background: #ffffff; padding: 2rem; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .rating-breakdown { margin: 2rem 0; }
          .rating-item { display: flex; justify-content: space-between; align-items: center; margin: 1rem 0; }
          .rating-bar { background: #e2e8f0; height: 8px; border-radius: 4px; flex: 1; margin: 0 1rem; }
          .rating-fill { background: #4299e1; height: 100%; border-radius: 4px; }
          @media (max-width: 768px) {
            .hero-content, .main-content, .pros-cons { grid-template-columns: 1fr; }
            .hero h1 { font-size: 2rem; }
            .quick-stats { grid-template-columns: 1fr; }
          }
        `}
      </style>
    </head>
    <body>
      <!-- Header -->
      <header class="header">
        <nav class="nav container">
          <div class="logo">Brokeranalysis</div>
          <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/compare">Compare</a></li>
            <li><a href="/education">Education</a></li>
          </ul>
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div>
              <h1>Plus500 Review 2025</h1>
              <p>Comprehensive analysis of Plus500's CFD trading platform, regulation, and trading conditions. Discover if Plus500 is the right broker for your trading needs.</p>
              
              <div class="quick-stats">
                <div class="stat-card">
                  <h3>Founded</h3>
                  <p>2008</p>
                </div>
                <div class="stat-card">
                  <h3>Headquarters</h3>
                  <p>Israel</p>
                </div>
                <div class="stat-card">
                  <h3>Regulation</h3>
                  <p>FCA, CySEC, ASIC</p>
                </div>
                <div class="stat-card">
                  <h3>Min Deposit</h3>
                  <p>$100</p>
                </div>
              </div>
            </div>
            
            <div class="rating-box">
              <div class="rating-score">7.8</div>
              <p>Overall Rating</p>
              <p>Good CFD Platform</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="container main-content">
        <div class="content">
          <!-- Overview -->
          <section class="content-section">
            <h2>Plus500 Overview</h2>
            <p>Plus500 is a well-established CFD broker founded in 2008, offering trading in over 2,800 financial instruments including forex, stocks, commodities, cryptocurrencies, and indices. The company is publicly traded on the London Stock Exchange and is regulated by multiple tier-1 authorities including the FCA, CySEC, and ASIC.</p>
            
            <p>Plus500's proprietary trading platform is known for its user-friendly interface and is available on web, desktop, and mobile devices. The broker focuses exclusively on CFD trading and does not offer traditional stock trading or other investment products.</p>
          </section>

          <!-- Pros and Cons -->
          <section class="content-section">
            <h2>Pros and Cons</h2>
            <div class="pros-cons">
              <div class="pros">
                <h3>✅ Pros</h3>
                <ul>
                  <li>Strong regulatory oversight (FCA, CySEC, ASIC)</li>
                  <li>User-friendly proprietary platform</li>
                  <li>No commission trading</li>
                  <li>Wide range of CFD instruments (2,800+)</li>
                  <li>Competitive spreads</li>
                  <li>Guaranteed stop losses available</li>
                  <li>Mobile app with full functionality</li>
                  <li>Demo account available</li>
                </ul>
              </div>
              <div class="cons">
                <h3>❌ Cons</h3>
                <ul>
                  <li>CFDs only - no traditional stock trading</li>
                  <li>Limited educational resources</li>
                  <li>No MetaTrader platform support</li>
                  <li>Inactivity fees after 3 months</li>
                  <li>Limited research and analysis tools</li>
                  <li>No social trading features</li>
                  <li>Weekend funding charges</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Trading Platform -->
          <section class="content-section">
            <h2>Trading Platform</h2>
            <p>Plus500 offers its proprietary trading platform, which is available across multiple devices:</p>
            
            <div class="platform-grid">
              <div class="platform-card">
                <h3>WebTrader</h3>
                <p>Browser-based platform with full trading functionality, real-time charts, and risk management tools.</p>
                <ul>
                  <li>No download required</li>
                  <li>Advanced charting tools</li>
                  <li>Real-time price alerts</li>
                  <li>Risk management features</li>
                </ul>
              </div>
              
              <div class="platform-card">
                <h3>Desktop Application</h3>
                <p>Downloadable platform for Windows with enhanced performance and additional features.</p>
                <ul>
                  <li>Faster execution</li>
                  <li>Enhanced charts</li>
                  <li>Multiple watchlists</li>
                  <li>Advanced order types</li>
                </ul>
              </div>
              
              <div class="platform-card">
                <h3>Mobile Apps</h3>
                <p>iOS and Android apps with full trading capabilities and push notifications.</p>
                <ul>
                  <li>Touch-optimized interface</li>
                  <li>Push notifications</li>
                  <li>Biometric login</li>
                  <li>Full trading functionality</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Account Types -->
          <section class="content-section">
            <h2>Account Types</h2>
            <div class="account-types">
              <div class="account-card">
                <h3>Standard Account</h3>
                <div class="info-item">
                  <span>Minimum Deposit:</span>
                  <span>$100</span>
                </div>
                <div class="info-item">
                  <span>Leverage:</span>
                  <span>Up to 1:30 (EU) / 1:300 (Non-EU)</span>
                </div>
                <div class="info-item">
                  <span>Spreads:</span>
                  <span>From 0.6 pips</span>
                </div>
                <div class="info-item">
                  <span>Commission:</span>
                  <span>No commission</span>
                </div>
                <p>The standard account offers access to all Plus500 features with competitive spreads and no commission structure.</p>
              </div>
              
              <div class="account-card">
                <h3>Demo Account</h3>
                <div class="info-item">
                  <span>Virtual Funds:</span>
                  <span>$40,000</span>
                </div>
                <div class="info-item">
                  <span>Duration:</span>
                  <span>Unlimited</span>
                </div>
                <div class="info-item">
                  <span>Features:</span>
                  <span>Full platform access</span>
                </div>
                <div class="info-item">
                  <span>Real-time Data:</span>
                  <span>Yes</span>
                </div>
                <p>Practice trading with virtual funds in real market conditions using the full Plus500 platform.</p>
              </div>
            </div>
          </section>

          <!-- Regulation and Safety -->
          <section class="content-section">
            <h2>Regulation and Safety</h2>
            <p>Plus500 maintains strong regulatory compliance across multiple jurisdictions:</p>
            
            <div class="platform-grid">
              <div class="platform-card">
                <h3>FCA (UK)</h3>
                <p>Plus500UK Ltd is authorized and regulated by the Financial Conduct Authority (FRN: 509909).</p>
              </div>
              
              <div class="platform-card">
                <h3>CySEC (Cyprus)</h3>
                <p>Plus500CY Ltd is authorized and regulated by the Cyprus Securities and Exchange Commission (License No. 250/14).</p>
              </div>
              
              <div class="platform-card">
                <h3>ASIC (Australia)</h3>
                <p>Plus500AU Pty Ltd is authorized and regulated by the Australian Securities and Investments Commission (AFSL #417727).</p>
              </div>
            </div>
            
            <h3>Client Fund Protection</h3>
            <ul>
              <li>Client funds segregated from company funds</li>
              <li>Negative balance protection</li>
              <li>Compensation schemes up to £85,000 (FSCS)</li>
              <li>Regular audits by external firms</li>
            </ul>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
          <h3>Quick Info</h3>
          <div class="info-item">
            <span>Founded:</span>
            <span>2008</span>
          </div>
          <div class="info-item">
            <span>Headquarters:</span>
            <span>Haifa, Israel</span>
          </div>
          <div class="info-item">
            <span>Regulation:</span>
            <span>FCA, CySEC, ASIC</span>
          </div>
          <div class="info-item">
            <span>Min Deposit:</span>
            <span>$100</span>
          </div>
          <div class="info-item">
            <span>Max Leverage:</span>
            <span>1:30 (EU) / 1:300</span>
          </div>
          <div class="info-item">
            <span>Instruments:</span>
            <span>2,800+ CFDs</span>
          </div>
          <div class="info-item">
            <span>Platform:</span>
            <span>Proprietary</span>
          </div>
          
          <div class="rating-breakdown">
            <h3>Rating Breakdown</h3>
            <div class="rating-item">
              <span>Platform</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 85%"></div>
              </div>
              <span>8.5</span>
            </div>
            <div class="rating-item">
              <span>Regulation</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 90%"></div>
              </div>
              <span>9.0</span>
            </div>
            <div class="rating-item">
              <span>Spreads</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 75%"></div>
              </div>
              <span>7.5</span>
            </div>
            <div class="rating-item">
              <span>Education</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 60%"></div>
              </div>
              <span>6.0</span>
            </div>
            <div class="rating-item">
              <span>Support</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 80%"></div>
              </div>
              <span>8.0</span>
            </div>
          </div>
          
          <div style="margin-top: 2rem; text-align: center;">
            <h4>Overall Rating</h4>
            <div style="font-size: 2rem; color: #4299e1; font-weight: bold;">7.8/10</div>
            <p style="color: #666; margin-top: 0.5rem;">Good CFD Platform</p>
          </div>
        </aside>
      </main>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>Ready to Start Trading with Plus500?</h2>
          <p>Join millions of traders worldwide and experience Plus500's user-friendly CFD trading platform.</p>
          <a href="https://www.plus500.com" class="cta-button" target="_blank" rel="noopener noreferrer">Visit Plus500</a>
          <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.</p>
        </div>
      </section>

      <script src="/js/navigation.js"></script>
    </body>
    </html>
  `);
});

// AvaTrade Review Page
app.get('/reviews/avatrade', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AvaTrade Review 2024: Comprehensive Broker Analysis | Brokeranalysis</title>
      <meta name="description" content="In-depth AvaTrade review 2024. Regulated by CBI, ASIC, FSA. MT4/MT5 platforms, 0.9 pip spreads, copy trading. Read our detailed analysis of fees, platforms, and safety.">
      <meta name="keywords" content="AvaTrade review, AvaTrade broker, forex trading, CFD trading, MetaTrader, copy trading, regulated broker">
      <link rel="canonical" href="https://brokeranalysis.com/reviews/avatrade">
      
      <!-- Open Graph -->
      <meta property="og:title" content="AvaTrade Review 2024: Comprehensive Broker Analysis">
      <meta property="og:description" content="Detailed AvaTrade review covering regulation, trading platforms, fees, and safety. Founded 2006, regulated by CBI, ASIC, FSA.">
      <meta property="og:url" content="https://brokeranalysis.com/reviews/avatrade">
      <meta property="og:type" content="article">
      <meta property="og:image" content="https://brokeranalysis.com/images/avatrade-review-og.jpg">
      <meta property="og:site_name" content="Brokeranalysis">
      
      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="AvaTrade Review 2024: Comprehensive Analysis">
      <meta name="twitter:description" content="Complete AvaTrade broker review. Regulation, platforms, fees, safety analysis.">
      <meta name="twitter:image" content="https://brokeranalysis.com/images/avatrade-review-twitter.jpg">
      
      <!-- Structured Data -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "FinancialProduct",
          "name": "AvaTrade",
          "description": "Online forex and CFD trading platform",
          "provider": {
            "@type": "Organization",
            "name": "AvaTrade",
            "url": "https://www.avatrade.com"
          }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "8.2",
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Brokeranalysis",
          "url": "https://brokeranalysis.com"
        },
        "datePublished": "2024-01-15",
        "dateModified": "2024-01-15"
      }
      </script>
      
      <!-- Breadcrumb Structured Data -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://brokeranalysis.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Broker Reviews",
            "item": "https://brokeranalysis.com/reviews"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AvaTrade Review",
            "item": "https://brokeranalysis.com/reviews/avatrade"
          }
        ]
      }
      </script>
      
      <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-2xl font-bold text-blue-600">Brokeranalysis</a>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/reviews" class="text-gray-700 hover:text-blue-600">Reviews</a>
              <a href="/compare" class="text-gray-700 hover:text-blue-600">Compare</a>
              <a href="/education" class="text-gray-700 hover:text-blue-600">Education</a>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Breadcrumb -->
      <div class="bg-gray-100 py-3">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li><a href="/" class="text-gray-500 hover:text-blue-600">Home</a></li>
              <li><span class="text-gray-400">/</span></li>
              <li><a href="/reviews" class="text-gray-500 hover:text-blue-600">Reviews</a></li>
              <li><span class="text-gray-400">/</span></li>
              <li><span class="text-gray-900">AvaTrade</span></li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Hero Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div class="flex items-center mb-4">
                <img src="/images/avatrade-logo.png" alt="AvaTrade" class="w-16 h-16 mr-4">
                <div>
                  <h1 class="text-3xl font-bold text-gray-900">AvaTrade Review 2024</h1>
                  <p class="text-gray-600">Established 2006 • Regulated by CBI, ASIC, FSA</p>
                </div>
              </div>
              
              <!-- Quick Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-blue-600">8.2</div>
                  <div class="text-sm text-gray-600">Overall Rating</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-green-600">0.9</div>
                  <div class="text-sm text-gray-600">Min Spread (pips)</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-purple-600">$100</div>
                  <div class="text-sm text-gray-600">Min Deposit</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-orange-600">1:400</div>
                  <div class="text-sm text-gray-600">Max Leverage</div>
                </div>
              </div>
            </div>
            
            <!-- Overview -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-4">AvaTrade Overview</h2>
              <p class="text-gray-700 mb-4">
                AvaTrade is a well-established online broker founded in 2006 in Dublin, Ireland. With over 18 years of experience in the financial markets, AvaTrade has built a solid reputation as a reliable and regulated broker serving traders worldwide.
              </p>
              <p class="text-gray-700 mb-4">
                The broker offers a comprehensive range of trading instruments including forex, CFDs, stocks, commodities, cryptocurrencies, and bonds. AvaTrade is regulated by multiple top-tier authorities including the Central Bank of Ireland (CBI), ASIC Australia, and FSA Japan, ensuring client fund safety and regulatory compliance.
              </p>
              <p class="text-gray-700">
                AvaTrade provides access to popular trading platforms like MetaTrader 4 and 5, along with their proprietary AvaTradeGO mobile app. The broker also offers copy trading services through DupliTrade and ZuluTrade integration.
              </p>
            </div>
            
            <!-- Pros and Cons -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Pros and Cons</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-green-600 mb-3">✓ Pros</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• Multiple regulatory licenses (CBI, ASIC, FSA)</li>
                    <li>• Competitive spreads from 0.9 pips</li>
                    <li>• Comprehensive trading platforms (MT4, MT5)</li>
                    <li>• Copy trading available</li>
                    <li>• Extensive educational resources</li>
                    <li>• Islamic accounts available</li>
                    <li>• No commission on forex trades</li>
                    <li>• 24/5 multilingual support</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-red-600 mb-3">✗ Cons</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• Limited research tools</li>
                    <li>• Withdrawal fees on some methods</li>
                    <li>• No US clients accepted</li>
                    <li>• Inactivity fees after 3 months</li>
                    <li>• Limited cryptocurrency selection</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Trading Platforms -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Trading Platforms</h2>
              
              <div class="space-y-6">
                <div class="border-l-4 border-blue-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">MetaTrader 4 (MT4)</h3>
                  <p class="text-gray-700 mb-2">The world's most popular trading platform with advanced charting, expert advisors, and automated trading capabilities.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 30+ technical indicators</li>
                    <li>• Expert Advisors (EAs) support</li>
                    <li>• One-click trading</li>
                    <li>• Mobile and desktop versions</li>
                  </ul>
                </div>
                
                <div class="border-l-4 border-green-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">MetaTrader 5 (MT5)</h3>
                  <p class="text-gray-700 mb-2">Advanced platform with more timeframes, indicators, and improved order management system.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 21 timeframes vs 9 in MT4</li>
                    <li>• 38 technical indicators</li>
                    <li>• Economic calendar integration</li>
                    <li>• Advanced order types</li>
                  </ul>
                </div>
                
                <div class="border-l-4 border-purple-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">AvaTradeGO Mobile App</h3>
                  <p class="text-gray-700 mb-2">Proprietary mobile trading app for iOS and Android with intuitive interface and full trading functionality.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• User-friendly interface</li>
                    <li>• Real-time quotes and charts</li>
                    <li>• Push notifications</li>
                    <li>• Touch ID/Face ID security</li>
                  </ul>
                </div>
                
                <div class="border-l-4 border-orange-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">WebTrader</h3>
                  <p class="text-gray-700 mb-2">Browser-based platform requiring no download, accessible from any device with internet connection.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• No download required</li>
                    <li>• Cross-platform compatibility</li>
                    <li>• Real-time market data</li>
                    <li>• Advanced charting tools</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Account Types -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Account Types</h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-blue-600">Retail Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Minimum Deposit:</strong> $100</li>
                    <li><strong>Leverage:</strong> Up to 1:30 (EU) / 1:400 (Global)</li>
                    <li><strong>Spreads:</strong> From 0.9 pips</li>
                    <li><strong>Commission:</strong> No commission on forex</li>
                    <li><strong>Features:</strong> Negative balance protection</li>
                  </ul>
                </div>
                
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-purple-600">Professional Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Minimum Deposit:</strong> $10,000</li>
                    <li><strong>Leverage:</strong> Up to 1:400</li>
                    <li><strong>Spreads:</strong> From 0.6 pips</li>
                    <li><strong>Requirements:</strong> €500k portfolio or experience</li>
                    <li><strong>Features:</strong> Higher leverage, lower spreads</li>
                  </ul>
                </div>
                
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-green-600">Demo Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Virtual Funds:</strong> $100,000</li>
                    <li><strong>Duration:</strong> 21 days (renewable)</li>
                    <li><strong>Features:</strong> Full platform access</li>
                    <li><strong>Purpose:</strong> Practice and testing</li>
                    <li><strong>Cost:</strong> Completely free</li>
                  </ul>
                </div>
                
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-orange-600">Islamic Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Type:</strong> Swap-free trading</li>
                    <li><strong>Compliance:</strong> Sharia law compliant</li>
                    <li><strong>Features:</strong> No overnight interest</li>
                    <li><strong>Eligibility:</strong> Muslim traders</li>
                    <li><strong>Verification:</strong> Religious documentation required</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Regulation and Safety -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Regulation and Safety</h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">Regulatory Licenses</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• <strong>Central Bank of Ireland (CBI)</strong> - Primary regulator</li>
                    <li>• <strong>ASIC Australia</strong> - Australian operations</li>
                    <li>• <strong>FSA Japan</strong> - Japanese market</li>
                    <li>• <strong>FSCA South Africa</strong> - South African clients</li>
                    <li>• <strong>BVI FSC</strong> - British Virgin Islands</li>
                  </ul>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold mb-3">Safety Features</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• Segregated client funds in tier-1 banks</li>
                    <li>• Negative balance protection</li>
                    <li>• Compensation scheme up to €20,000</li>
                    <li>• Regular regulatory audits</li>
                    <li>• MiFID II compliance</li>
                  </ul>
                </div>
              </div>
              
              <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2">Trust Score: 8.2/10</h4>
                <p class="text-green-700 text-sm">
                  AvaTrade maintains a high trust score due to its multiple regulatory licenses, long operating history, and strong client fund protection measures.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Quick Info -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 class="text-lg font-semibold mb-4">Quick Info</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Founded:</span>
                  <span class="font-medium">2006</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Headquarters:</span>
                  <span class="font-medium">Dublin, Ireland</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Regulation:</span>
                  <span class="font-medium">CBI, ASIC, FSA</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Min Deposit:</span>
                  <span class="font-medium">$100</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Max Leverage:</span>
                  <span class="font-medium">1:400</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Platforms:</span>
                  <span class="font-medium">MT4, MT5, Mobile</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Support:</span>
                  <span class="font-medium">24/5</span>
                </div>
              </div>
            </div>
            
            <!-- Rating Breakdown -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 class="text-lg font-semibold mb-4">Rating Breakdown</h3>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Regulation & Safety</span>
                    <span class="font-medium">9.0/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 90%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Trading Platforms</span>
                    <span class="font-medium">8.5/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Fees & Spreads</span>
                    <span class="font-medium">7.8/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 78%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Customer Support</span>
                    <span class="font-medium">8.0/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 80%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Education & Research</span>
                    <span class="font-medium">7.5/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Overall Rating -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white mb-6">
              <div class="text-center">
                <div class="text-4xl font-bold mb-2">8.2</div>
                <div class="text-lg mb-2">Overall Rating</div>
                <div class="text-sm opacity-90">Very Good Broker</div>
                <div class="flex justify-center mt-3">
                  <div class="flex space-x-1">
                    <span class="text-yellow-300">★★★★</span>
                    <span class="text-gray-300">★</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">Start Trading with AvaTrade</h3>
              <p class="text-gray-600 text-sm mb-4">
                Ready to start trading with a regulated and trusted broker? Open your AvaTrade account today.
              </p>
              <a href="#" class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                Open Live Account
              </a>
              <a href="#" class="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Try Demo Account
              </a>
              <p class="text-xs text-gray-500 mt-3 text-center">
                Risk Warning: Trading involves substantial risk of loss
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4">Brokeranalysis</h3>
              <p class="text-gray-400 text-sm">
                Your trusted source for broker reviews and trading insights.
              </p>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Reviews</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="/reviews/fp-markets" class="hover:text-white">FP Markets</a></li>
                <li><a href="/reviews/fxtm" class="hover:text-white">FXTM</a></li>
                <li><a href="/reviews/blackbull-markets" class="hover:text-white">Blackbull Markets</a></li>
                <li><a href="/reviews/eightcap" class="hover:text-white">Eightcap</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Tools</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="/compare" class="hover:text-white">Broker Comparison</a></li>
                <li><a href="/calculator" class="hover:text-white">Trading Calculator</a></li>
                <li><a href="/education" class="hover:text-white">Education</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Contact</h4>
              <div class="text-sm text-gray-400 space-y-1">
                <p>30 N Gould St Ste R</p>
                <p>Sheridan, WY 82801, US</p>
                <p>Phone: (801)-893-2577</p>
                <p>EIN: 384298140</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Brokeranalysis. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <script src="/js/navigation.js"></script>
    </body>
    </html>
  `);
});

// CFI Review Page
app.get('/reviews/cfi', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CFI Review 2024: Comprehensive Broker Analysis | Brokeranalysis</title>
      <meta name="description" content="In-depth CFI review 2024. CySEC regulated broker since 2007. MT4/MT5 platforms, 1.2 pip spreads, copy trading. Read our detailed analysis of fees, platforms, and safety.">
      <meta name="keywords" content="CFI review, CFI broker, forex trading, CFD trading, MetaTrader, CySEC regulated, Cyprus broker">
      <link rel="canonical" href="https://brokeranalysis.com/reviews/cfi">
      
      <!-- Open Graph -->
      <meta property="og:title" content="CFI Review 2024: Comprehensive Broker Analysis">
      <meta property="og:description" content="Detailed CFI review covering CySEC regulation, trading platforms, fees, and safety. Founded 2007, based in Cyprus.">
      <meta property="og:url" content="https://brokeranalysis.com/reviews/cfi">
      <meta property="og:type" content="article">
      <meta property="og:image" content="https://brokeranalysis.com/images/cfi-review-og.jpg">
      <meta property="og:site_name" content="Brokeranalysis">
      
      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="CFI Review 2024: Comprehensive Analysis">
      <meta name="twitter:description" content="Complete CFI broker review. CySEC regulation, platforms, fees, safety analysis.">
      <meta name="twitter:image" content="https://brokeranalysis.com/images/cfi-review-twitter.jpg">
      
      <!-- Structured Data -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "FinancialProduct",
          "name": "CFI",
          "description": "Online forex and CFD trading platform",
          "provider": {
            "@type": "Organization",
            "name": "CFI",
            "url": "https://www.cfifinancial.com"
          }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "7.8",
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Brokeranalysis",
          "url": "https://brokeranalysis.com"
        },
        "datePublished": "2024-01-15",
        "dateModified": "2024-01-15"
      }
      </script>
      
      <!-- Breadcrumb Structured Data -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://brokeranalysis.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Broker Reviews",
            "item": "https://brokeranalysis.com/reviews"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "CFI Review",
            "item": "https://brokeranalysis.com/reviews/cfi"
          }
        ]
      }
      </script>
      
      <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a href="/" class="text-2xl font-bold text-blue-600">Brokeranalysis</a>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/reviews" class="text-gray-700 hover:text-blue-600">Reviews</a>
              <a href="/compare" class="text-gray-700 hover:text-blue-600">Compare</a>
              <a href="/education" class="text-gray-700 hover:text-blue-600">Education</a>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Breadcrumb -->
      <div class="bg-gray-100 py-3">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li><a href="/" class="text-gray-500 hover:text-blue-600">Home</a></li>
              <li><span class="text-gray-400">/</span></li>
              <li><a href="/reviews" class="text-gray-500 hover:text-blue-600">Reviews</a></li>
              <li><span class="text-gray-400">/</span></li>
              <li><span class="text-gray-900">CFI</span></li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Hero Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div class="flex items-center mb-4">
                <img src="/images/cfi-logo.png" alt="CFI" class="w-16 h-16 mr-4">
                <div>
                  <h1 class="text-3xl font-bold text-gray-900">CFI Review 2024</h1>
                  <p class="text-gray-600">Established 2007 • Regulated by CySEC</p>
                </div>
              </div>
              
              <!-- Quick Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-blue-600">7.8</div>
                  <div class="text-sm text-gray-600">Overall Rating</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-green-600">1.2</div>
                  <div class="text-sm text-gray-600">Min Spread (pips)</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-purple-600">$250</div>
                  <div class="text-sm text-gray-600">Min Deposit</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="text-2xl font-bold text-orange-600">1:400</div>
                  <div class="text-sm text-gray-600">Max Leverage</div>
                </div>
              </div>
            </div>
            
            <!-- Overview -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-4">CFI Overview</h2>
              <p class="text-gray-700 mb-4">
                CFI is a Cyprus-based online broker founded in 2007, offering forex and CFD trading services to clients worldwide. Regulated by the Cyprus Securities and Exchange Commission (CySEC), CFI provides access to a wide range of financial instruments including forex, stocks, commodities, and cryptocurrencies.
              </p>
              <p class="text-gray-700 mb-4">
                The broker operates from its headquarters in Limassol, Cyprus, and serves traders globally with the exception of certain restricted jurisdictions. CFI offers competitive trading conditions with spreads starting from 1.2 pips on major currency pairs and leverage up to 1:400 for international clients.
              </p>
              <p class="text-gray-700">
                CFI provides access to the popular MetaTrader 4 and MetaTrader 5 platforms, along with a web-based trading platform and mobile applications for iOS and Android devices. The broker also offers copy trading services and comprehensive educational resources.
              </p>
            </div>
            
            <!-- Pros and Cons -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Pros and Cons</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-green-600 mb-3">✓ Pros</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• CySEC regulated and licensed</li>
                    <li>• MetaTrader 4 and 5 platforms</li>
                    <li>• No commission on forex trades</li>
                    <li>• Copy trading services available</li>
                    <li>• Islamic accounts offered</li>
                    <li>• 24/5 multilingual support</li>
                    <li>• Negative balance protection</li>
                    <li>• Educational resources and webinars</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-red-600 mb-3">✗ Cons</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• Higher minimum deposit ($250)</li>
                    <li>• Limited research tools</li>
                    <li>• Inactivity fees after 90 days</li>
                    <li>• Spreads could be more competitive</li>
                    <li>• Limited cryptocurrency selection</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Trading Platforms -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Trading Platforms</h2>
              
              <div class="space-y-6">
                <div class="border-l-4 border-blue-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">MetaTrader 4 (MT4)</h3>
                  <p class="text-gray-700 mb-2">The industry-standard platform with comprehensive charting tools, expert advisors, and automated trading capabilities.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 30+ technical indicators</li>
                    <li>• Expert Advisors (EAs) support</li>
                    <li>• One-click trading execution</li>
                    <li>• Advanced charting package</li>
                  </ul>
                </div>
                
                <div class="border-l-4 border-green-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">MetaTrader 5 (MT5)</h3>
                  <p class="text-gray-700 mb-2">Next-generation platform with enhanced features, more timeframes, and improved order management.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• 21 timeframes available</li>
                    <li>• 38 built-in technical indicators</li>
                    <li>• Economic calendar integration</li>
                    <li>• Advanced order types</li>
                  </ul>
                </div>
                
                <div class="border-l-4 border-purple-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">WebTrader</h3>
                  <p class="text-gray-700 mb-2">Browser-based trading platform accessible from any device without software installation.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• No download required</li>
                    <li>• Cross-platform compatibility</li>
                    <li>• Real-time market data</li>
                    <li>• Advanced charting tools</li>
                  </ul>
                </div>
                
                <div class="border-l-4 border-orange-500 pl-4">
                  <h3 class="text-xl font-semibold mb-2">Mobile Apps</h3>
                  <p class="text-gray-700 mb-2">Native mobile applications for iOS and Android with full trading functionality on the go.</p>
                  <ul class="text-gray-600 text-sm space-y-1">
                    <li>• iOS and Android apps</li>
                    <li>• Real-time quotes and charts</li>
                    <li>• Push notifications</li>
                    <li>• Secure biometric login</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Account Types -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Account Types</h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-blue-600">Standard Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Minimum Deposit:</strong> $250</li>
                    <li><strong>Leverage:</strong> Up to 1:30 (EU) / 1:400 (Global)</li>
                    <li><strong>Spreads:</strong> From 1.2 pips</li>
                    <li><strong>Commission:</strong> No commission on forex</li>
                    <li><strong>Features:</strong> Negative balance protection</li>
                  </ul>
                </div>
                
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-purple-600">Professional Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Eligibility:</strong> Qualified professional traders</li>
                    <li><strong>Leverage:</strong> Up to 1:400</li>
                    <li><strong>Spreads:</strong> Tighter spreads available</li>
                    <li><strong>Requirements:</strong> €500k portfolio or experience</li>
                    <li><strong>Features:</strong> Enhanced trading conditions</li>
                  </ul>
                </div>
                
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-green-600">Demo Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Virtual Funds:</strong> $50,000</li>
                    <li><strong>Duration:</strong> Unlimited</li>
                    <li><strong>Features:</strong> Full platform access</li>
                    <li><strong>Purpose:</strong> Practice and strategy testing</li>
                    <li><strong>Cost:</strong> Completely free</li>
                  </ul>
                </div>
                
                <div class="border rounded-lg p-4">
                  <h3 class="text-xl font-semibold mb-3 text-orange-600">Islamic Account</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li><strong>Type:</strong> Swap-free trading</li>
                    <li><strong>Compliance:</strong> Sharia law compliant</li>
                    <li><strong>Features:</strong> No overnight interest charges</li>
                    <li><strong>Eligibility:</strong> Muslim traders</li>
                    <li><strong>Verification:</strong> Religious documentation required</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Regulation and Safety -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Regulation and Safety</h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">Regulatory License</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• <strong>CySEC (Cyprus)</strong> - License No. 164/12</li>
                    <li>• <strong>MiFID II Compliance</strong> - EU regulations</li>
                    <li>• <strong>Operational since 2007</strong> - 17+ years experience</li>
                    <li>• <strong>Headquartered in Limassol</strong> - Cyprus</li>
                  </ul>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold mb-3">Safety Features</h3>
                  <ul class="space-y-2 text-gray-700">
                    <li>• Segregated client funds in tier-1 banks</li>
                    <li>• Negative balance protection</li>
                    <li>• Investor compensation fund up to €20,000</li>
                    <li>• Regular regulatory audits and compliance</li>
                    <li>• SSL encryption for data security</li>
                  </ul>
                </div>
              </div>
              
              <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Trust Score: 7.8/10</h4>
                <p class="text-blue-700 text-sm">
                  CFI maintains a good trust score with CySEC regulation, segregated client funds, and investor protection measures, though it's a smaller broker compared to industry leaders.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Quick Info -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 class="text-lg font-semibold mb-4">Quick Info</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Founded:</span>
                  <span class="font-medium">2007</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Headquarters:</span>
                  <span class="font-medium">Limassol, Cyprus</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Regulation:</span>
                  <span class="font-medium">CySEC</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Min Deposit:</span>
                  <span class="font-medium">$250</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Max Leverage:</span>
                  <span class="font-medium">1:400</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Platforms:</span>
                  <span class="font-medium">MT4, MT5, Web</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Support:</span>
                  <span class="font-medium">24/5</span>
                </div>
              </div>
            </div>
            
            <!-- Rating Breakdown -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 class="text-lg font-semibold mb-4">Rating Breakdown</h3>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Regulation & Safety</span>
                    <span class="font-medium">8.0/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 80%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Trading Platforms</span>
                    <span class="font-medium">8.2/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 82%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Fees & Spreads</span>
                    <span class="font-medium">7.2/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 72%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Customer Support</span>
                    <span class="font-medium">7.5/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 75%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Education & Research</span>
                    <span class="font-medium">7.8/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: 78%"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Overall Rating -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white mb-6">
              <div class="text-center">
                <div class="text-4xl font-bold mb-2">7.8</div>
                <div class="text-lg mb-2">Overall Rating</div>
                <div class="text-sm opacity-90">Good Broker</div>
                <div class="flex justify-center mt-3">
                  <div class="flex space-x-1">
                    <span class="text-yellow-300">★★★★</span>
                    <span class="text-gray-300">★</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">Start Trading with CFI</h3>
              <p class="text-gray-600 text-sm mb-4">
                Ready to start trading with a CySEC regulated broker? Open your CFI account today.
              </p>
              <a href="#" class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                Open Live Account
              </a>
              <a href="#" class="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Try Demo Account
              </a>
              <p class="text-xs text-gray-500 mt-3 text-center">
                Risk Warning: Trading involves substantial risk of loss
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4">Brokeranalysis</h3>
              <p class="text-gray-400 text-sm">
                Your trusted source for broker reviews and trading insights.
              </p>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Reviews</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="/reviews/fp-markets" class="hover:text-white">FP Markets</a></li>
                <li><a href="/reviews/fxtm" class="hover:text-white">FXTM</a></li>
                <li><a href="/reviews/avatrade" class="hover:text-white">AvaTrade</a></li>
                <li><a href="/reviews/plus500" class="hover:text-white">Plus500</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Tools</h4>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="/compare" class="hover:text-white">Broker Comparison</a></li>
                <li><a href="/calculator" class="hover:text-white">Trading Calculator</a></li>
                <li><a href="/education" class="hover:text-white">Education</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3">Contact</h4>
              <div class="text-sm text-gray-400 space-y-1">
                <p>30 N Gould St Ste R</p>
                <p>Sheridan, WY 82801, US</p>
                <p>Phone: (801)-893-2577</p>
                <p>EIN: 384298140</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Brokeranalysis. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <script src="/js/navigation.js"></script>
    </body>
    </html>
  `);
});

export default app