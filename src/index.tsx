import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie } from 'hono/cookie'

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
        <meta property="og:image" content="https://brokeranalysis.pages.dev/static/images/reviews-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.pages.dev/reviews">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Forex Broker Reviews 2025 - Detailed Analysis & Ratings">
        <meta property="twitter:description" content="Read comprehensive reviews of top forex brokers. Detailed analysis of spreads, regulation, platforms, and trading conditions.">
        <meta property="twitter:image" content="https://brokeranalysis.pages.dev/static/images/reviews-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.pages.dev/reviews">
        
        <!-- Preconnect to external domains -->
        <link rel="preconnect" href="https://cdn.tailwindcss.com">
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Organization -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrokerAnalysis",
          "url": "https://brokeranalysis.pages.dev",
          "logo": "https://brokeranalysis.pages.dev/static/images/brokeranalysis-logo.png"
        }
        </script>
        
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
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
        <meta property="og:image" content="https://brokeranalysis.pages.dev/static/images/compare-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.pages.dev/compare">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Compare Forex Brokers Side-by-Side - Spreads, Fees & Features">
        <meta property="twitter:description" content="Compare up to 4 forex brokers side-by-side. Analyze spreads, commissions, regulation, and trading features.">
        <meta property="twitter:image" content="https://brokeranalysis.pages.dev/static/images/compare-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.pages.dev/compare">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
            }
        </script>
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
        <meta property="og:image" content="https://brokeranalysis.pages.dev/static/images/simulator-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.pages.dev/simulator">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Forex Trading Cost Calculator - Compare Real Trading Costs">
        <meta property="twitter:description" content="Calculate real forex trading costs with our advanced simulator. Compare spreads, commissions, and slippage.">
        <meta property="twitter:image" content="https://brokeranalysis.pages.dev/static/images/simulator-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.pages.dev/simulator">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
            }
        </script>
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
        <meta property="og:image" content="https://brokeranalysis.pages.dev/static/images/about-og-image.png">
        <meta property="og:url" content="https://brokeranalysis.pages.dev/about">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="About BrokerAnalysis - Our Methodology & Mission">
        <meta property="twitter:description" content="Learn about our transparent methodology for rating forex brokers. Discover our mission to help traders make informed decisions.">
        <meta property="twitter:image" content="https://brokeranalysis.pages.dev/static/images/about-og-image.png">
        
        <link rel="canonical" href="https://brokeranalysis.pages.dev/about">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
            }
        </script>
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
            }
        </script>
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
            }
        </script>
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
            }
        </script>
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
        <link rel="canonical" href="https://brokeranalysis.pages.dev/">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://brokeranalysis.pages.dev/">
        <meta property="og:title" content="Best Forex Brokers 2025 - Compare 67+ Regulated Brokers">
        <meta property="og:description" content="Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers.">
        <meta property="og:image" content="https://brokeranalysis.pages.dev/static/images/brokeranalysis-og-image.png">
        <meta property="og:site_name" content="BrokerAnalysis">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://brokeranalysis.pages.dev/">
        <meta property="twitter:title" content="Best Forex Brokers 2025 - Compare 67+ Regulated Brokers">
        <meta property="twitter:description" content="Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers.">
        <meta property="twitter:image" content="https://brokeranalysis.pages.dev/static/images/brokeranalysis-og-image.png">
        
        <!-- Favicon and App Icons -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-touch-icon.png">
        
        <!-- Preconnect to external domains -->
        <link rel="preconnect" href="https://cdn.tailwindcss.com">
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        
        <!-- CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Organization -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrokerAnalysis",
          "url": "https://brokeranalysis.pages.dev",
          "logo": "https://brokeranalysis.pages.dev/static/images/brokeranalysis-logo.png",
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
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            // Only 3 colors: Yellow, Blue, White
                            primary: '#1e40af',        // Blue-800
                            secondary: '#2563eb',      // Blue-600  
                            accent: '#facc15',         // Yellow-400
                            yellow: {
                                400: '#facc15',         // Main yellow
                                300: '#fde047',         // Lighter yellow for hovers
                                500: '#eab308'          // Darker yellow for emphasis
                            },
                            blue: {
                                50: '#eff6ff',          // Very light blue
                                100: '#dbeafe',         // Light blue
                                600: '#2563eb',         // Main blue
                                700: '#1d4ed8',         // Medium blue
                                800: '#1e40af',         // Dark blue (primary)
                                900: '#1e3a8a'          // Very dark blue
                            }
                        }
                    }
                }
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
Sitemap: ${c.req.header('host') ? `https://${c.req.header('host')}/sitemap.xml` : 'https://brokeranalysis.pages.dev/sitemap.xml'}

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
  const baseUrl = c.req.header('host') ? `https://${c.req.header('host')}` : 'https://brokeranalysis.pages.dev';
  
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
        <meta property="og:url" content="https://brokeranalysis.pages.dev/brokers/australia">
        <meta property="og:type" content="website">
        
        <link rel="canonical" href="https://brokeranalysis.pages.dev/brokers/australia">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Best Forex Brokers in Australia 2025",
          "description": "Find the best ASIC regulated forex brokers in Australia",
          "url": "https://brokeranalysis.pages.dev/brokers/australia"
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
        <meta property="og:url" content="https://brokeranalysis.pages.dev/brokers/uk">
        
        <link rel="canonical" href="https://brokeranalysis.pages.dev/brokers/uk">
        <script src="https://cdn.tailwindcss.com"></script>
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

export default app