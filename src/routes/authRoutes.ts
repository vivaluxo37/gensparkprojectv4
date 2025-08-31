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
  const sessionId = getCookie(c, 'session_id');
  
  if (!sessionId) {
    return c.json({ authenticated: false, user: null });
  }

  try {
    const { DB } = c.env;
    const user = await DB.prepare(`
      SELECT u.id, u.email, u.name, u.profile_picture, u.created_at,
             COUNT(bm.id) as saved_matches
      FROM users u
      LEFT JOIN broker_matches bm ON u.id = bm.user_id
      WHERE u.session_id = ?
      GROUP BY u.id
    `).bind(sessionId).first();

    if (!user) {
      return c.json({ authenticated: false, user: null });
    }

    return c.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_picture: user.profile_picture,
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

    // Create user
    const sessionId = crypto.randomUUID();
    const result = await DB.prepare(`
      INSERT INTO users (email, password_hash, name, session_id, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(email, password, name, sessionId).run(); // Note: In production, hash the password!

    if (result.success) {
      setCookie(c, 'session_id', sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });

      return c.json({
        success: true,
        user: {
          id: result.meta.last_row_id,
          email,
          name,
          session_id: sessionId
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
      SELECT id, email, name, password_hash, profile_picture, created_at
      FROM users
      WHERE email = ?
    `).bind(email).first();

    if (!user || user.password_hash !== password) { // Note: In production, use proper password hashing!
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }

    // Generate new session
    const sessionId = crypto.randomUUID();
    await DB.prepare('UPDATE users SET session_id = ? WHERE id = ?')
      .bind(sessionId, user.id).run();

    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_picture: user.profile_picture,
        created_at: user.created_at,
        session_id: sessionId
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
      await DB.prepare(`
        UPDATE users 
        SET google_id = ?, name = ?, profile_picture = ?, session_id = ?, last_login = datetime('now')
        WHERE id = ?
      `).bind(google_id, name, picture, sessionId, user.id).run();
      
      user.session_id = sessionId;
    } else {
      // Create new user
      const result = await DB.prepare(`
        INSERT INTO users (email, name, profile_picture, google_id, session_id, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).bind(email, name, picture, google_id, sessionId).run();

      if (result.success) {
        user = {
          id: result.meta.last_row_id,
          email,
          name,
          profile_picture: picture,
          google_id,
          session_id: sessionId
        };
      } else {
        return c.json({ success: false, error: 'Failed to create user' }, 500);
      }
    }

    setCookie(c, 'session_id', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_picture: user.profile_picture,
        session_id: sessionId
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