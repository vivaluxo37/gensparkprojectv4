// Authentication and user management routes
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import type { Bindings } from '../types';
import { validateEmail, validatePassword } from '../utils';

const authRoutes = new Hono<{ Bindings: Bindings }>();

// Configuration API endpoint
authRoutes.get('/api/config', (c) => {
  return c.json({
    google_client_id: c.env.GOOGLE_CLIENT_ID || '1041234567890-abc123def456ghi789jkl012mno345pqr.apps.googleusercontent.com'
  });
});

// Check authentication status
authRoutes.get('/api/auth/me', async (c) => {
  const sessionId = getCookie(c, 'sessionId');
  
  if (!sessionId) {
    return c.json({ authenticated: false, user: null });
  }

  try {
    const { DB } = c.env;
    
    // Check if session exists and is valid
    const session = await DB.prepare(`
      SELECT us.user_id, us.expires_at
      FROM user_sessions us
      WHERE us.id = ? AND us.expires_at > datetime('now')
    `).bind(sessionId).first();
    
    if (!session) {
      return c.json({ authenticated: false, user: null });
    }
    
    // Get user data with saved matches count
    const user = await DB.prepare(`
      SELECT u.id, u.email, u.first_name, u.last_name, u.avatar_url, u.created_at,
             COUNT(ubm.id) as saved_matches
      FROM users u
      LEFT JOIN user_broker_matches ubm ON u.id = ubm.user_id
      WHERE u.id = ?
      GROUP BY u.id
    `).bind(session.user_id).first();

    if (!user) {
      return c.json({ authenticated: false, user: null });
    }

    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

    return c.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: fullName,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
        saved_matches: user.saved_matches || 0
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return c.json({ authenticated: false, user: null }, 500);
  }
});

// User registration
authRoutes.post('/api/auth/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password || !name) {
      return c.json({ success: false, error: 'All fields are required' }, 400);
    }

    if (!validateEmail(email)) {
      return c.json({ success: false, error: 'Invalid email format' }, 400);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return c.json({ 
        success: false, 
        error: 'Password requirements not met',
        details: passwordValidation.errors 
      }, 400);
    }

    const { DB } = c.env;
    
    // Check if user already exists
    const existingUser = await DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existingUser) {
      return c.json({ success: false, error: 'Email already registered' }, 409);
    }

    // Create user (split name into first_name and last_name)
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    const result = await DB.prepare(`
      INSERT INTO users (email, password_hash, first_name, last_name, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(email, password, firstName, lastName).run(); // Note: In production, hash the password!

    if (result.success) {
      const userId = result.meta.last_row_id;
      
      // Create session
      const sessionId = crypto.randomUUID();
      const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      
      await DB.prepare(`
        INSERT INTO user_sessions (id, user_id, expires_at, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `).bind(sessionId, userId, sessionExpiry.toISOString()).run();
      
      setCookie(c, 'sessionId', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });

      return c.json({
        success: true,
        user: {
          id: userId,
          email,
          name: `${firstName} ${lastName}`.trim(),
          sessionId
        }
      });
    } else {
      return c.json({ success: false, error: 'Failed to create user' }, 500);
    }
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// User login
authRoutes.post('/api/auth/signin', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ success: false, error: 'Email and password are required' }, 400);
    }

    const { DB } = c.env;
    
    // Find user and verify password
    const user = await DB.prepare(`
      SELECT id, email, first_name, last_name, password_hash, avatar_url, created_at
      FROM users
      WHERE email = ?
    `).bind(email).first();

    if (!user || user.password_hash !== password) { // Note: In production, use proper password hashing!
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }

    // Generate new session
    const sessionId = crypto.randomUUID();
    const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    // Insert into user_sessions table
    await DB.prepare(`
      INSERT INTO user_sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `).bind(sessionId, user.id, sessionExpiry.toISOString()).run();
    
    // Update last login
    await DB.prepare('UPDATE users SET last_login_at = datetime(\'now\') WHERE id = ?')
      .bind(user.id).run();

    setCookie(c, 'sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: fullName,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
        sessionId
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

// Google OAuth
authRoutes.post('/api/auth/google', async (c) => {
  try {
    const body = await c.req.json();
    const { credential, client_id } = body;

    if (!credential) {
      return c.json({ success: false, error: 'Google credential required' }, 400);
    }

    // Note: In production, verify the JWT token with Google's public keys
    // For this demo, we'll extract the payload directly (INSECURE!)
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    const { email, name, picture, sub: google_id } = payload;

    const { DB } = c.env;
    
    // Check if user exists
    let user = await DB.prepare('SELECT * FROM users WHERE email = ? OR google_id = ?')
      .bind(email, google_id).first();

    const sessionId = crypto.randomUUID();

    if (user) {
      // Update existing user
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      await DB.prepare(`
        UPDATE users 
        SET google_id = ?, first_name = ?, last_name = ?, avatar_url = ?, last_login_at = datetime('now')
        WHERE id = ?
      `).bind(google_id, firstName, lastName, picture, user.id).run();
      
      // Create new session
      const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      await DB.prepare(`
        INSERT INTO user_sessions (id, user_id, expires_at, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `).bind(sessionId, user.id, sessionExpiry.toISOString()).run();
      
    } else {
      // Create new user
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const result = await DB.prepare(`
        INSERT INTO users (email, first_name, last_name, avatar_url, google_id, created_at, last_login_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).bind(email, firstName, lastName, picture, google_id).run();

      if (result.success) {
        const userId = result.meta.last_row_id;
        
        // Create session for new user
        const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await DB.prepare(`
          INSERT INTO user_sessions (id, user_id, expires_at, created_at)
          VALUES (?, ?, ?, datetime('now'))
        `).bind(sessionId, userId, sessionExpiry.toISOString()).run();
        
        user = {
          id: userId,
          email,
          first_name: firstName,
          last_name: lastName,
          avatar_url: picture,
          google_id
        };
      } else {
        return c.json({ success: false, error: 'Failed to create user' }, 500);
      }
    }

    setCookie(c, 'sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
    
    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: fullName,
        avatar_url: user.avatar_url,
        sessionId
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return c.json({ success: false, error: 'Google authentication failed' }, 500);
  }
});

// Sign out
authRoutes.post('/api/auth/signout', async (c) => {
  try {
    const sessionId = getCookie(c, 'session_id');
    
    if (sessionId) {
      const { DB } = c.env;
      await DB.prepare('UPDATE users SET session_id = NULL WHERE session_id = ?')
        .bind(sessionId).run();
    }

    setCookie(c, 'session_id', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 0 // Delete cookie
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Signout error:', error);
    return c.json({ success: false, error: 'Signout failed' }, 500);
  }
});

// Save broker match
authRoutes.post('/api/auth/save-broker-match', async (c) => {
  try {
    const sessionId = getCookie(c, 'session_id');
    if (!sessionId) {
      return c.json({ success: false, error: 'Authentication required' }, 401);
    }

    const body = await c.req.json();
    const { broker_id, match_score, user_preferences } = body;

    const { DB } = c.env;
    
    // Get user
    const user = await DB.prepare('SELECT id FROM users WHERE session_id = ?').bind(sessionId).first();
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    // Save match
    const result = await DB.prepare(`
      INSERT OR REPLACE INTO broker_matches (user_id, broker_id, match_score, user_preferences, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(user.id, broker_id, match_score, JSON.stringify(user_preferences)).run();

    return c.json({ success: result.success });
  } catch (error) {
    console.error('Save match error:', error);
    return c.json({ success: false, error: 'Failed to save match' }, 500);
  }
});

// Get saved broker matches
authRoutes.get('/api/auth/broker-matches', async (c) => {
  try {
    const sessionId = getCookie(c, 'session_id');
    if (!sessionId) {
      return c.json({ success: false, error: 'Authentication required' }, 401);
    }

    const { DB } = c.env;
    
    // Get user
    const user = await DB.prepare('SELECT id FROM users WHERE session_id = ?').bind(sessionId).first();
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    // Get matches with broker details
    const matches = await DB.prepare(`
      SELECT 
        bm.*,
        b.name, b.slug, b.rating, b.logo_url, b.website_url, b.min_deposit_usd
      FROM broker_matches bm
      JOIN brokers b ON bm.broker_id = b.id
      WHERE bm.user_id = ?
      ORDER BY bm.created_at DESC
    `).bind(user.id).all();

    return c.json({
      success: true,
      matches: matches.results.map((match: any) => ({
        ...match,
        user_preferences: JSON.parse(match.user_preferences || '{}')
      }))
    });
  } catch (error) {
    console.error('Get matches error:', error);
    return c.json({ success: false, error: 'Failed to get matches' }, 500);
  }
});

export { authRoutes };