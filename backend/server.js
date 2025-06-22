const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Initialize database with users table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or file://)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:5678', // n8n
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5678'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For development: allow file:// protocol (null origin)
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Session configuration
app.use(session({
  secret: 'your-secret-key-change-this-in-production',
  resave: true, // Force session save for development
  saveUninitialized: true, // Save uninitialized sessions
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: false, // Allow JavaScript access for file:// protocol testing
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax' // Less restrictive for development
  }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ error: 'Authentication required' });
  }
};

// Simple in-memory token store for development testing (file:// protocol)
const devTokens = new Map();

// Routes

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Set session
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userName = user.name;

      console.log('✅ Login successful, session set:', {
        sessionId: req.session.id,
        userId: req.session.userId,
        userEmail: req.session.userEmail
      });

      // Also create a simple token for file:// protocol testing
      const devToken = `dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      devTokens.set(devToken, {
        id: user.id,
        email: user.email,
        name: user.name,
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        devToken: devToken // For file:// protocol testing
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
  console.log('🔍 Auth status check:', {
    hasSession: !!req.session,
    sessionId: req.session?.id,
    userId: req.session?.userId,
    userEmail: req.session?.userEmail,
    devToken: req.query.token || req.headers.authorization
  });
  
  // First try session-based auth (for proper web apps)
  if (req.session && req.session.userId) {
    return res.json({
      authenticated: true,
      user: {
        id: req.session.userId,
        email: req.session.userEmail,
        name: req.session.userName
      }
    });
  }
  
  // Fallback to token-based auth (for file:// protocol testing)
  const token = req.query.token || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
  if (token && devTokens.has(token)) {
    const userData = devTokens.get(token);
    if (userData.expires > Date.now()) {
      return res.json({
        authenticated: true,
        user: userData
      });
    } else {
      devTokens.delete(token); // Clean up expired token
    }
  }
  
  res.json({ authenticated: false });
});

// Protected route example (for testing)
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ 
    message: 'This is a protected route',
    user: {
      id: req.session.userId,
      email: req.session.userEmail,
      name: req.session.userName
    }
  });
});

// Create initial admin user (run this once)
app.post('/api/setup/admin', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    // Check if admin already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.run('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', 
        [email, hashedPassword, name], 
        function(err) {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Could not create user' });
          }

          res.json({
            success: true,
            message: 'Admin user created successfully',
            userId: this.lastID
          });
        }
      );
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Setup admin user: POST http://localhost:${PORT}/api/setup/admin`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('📊 Database connection closed.');
    }
    process.exit(0);
  });
}); 