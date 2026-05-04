require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const knex = require('knex');
const knexfile = require('./knexfile');

const app = express();
const PORT = process.env.PORT || 5000;

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];
const db = knex(config);

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.post('/api/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], validateRequest, async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [userId] = await db('users').insert({
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], validateRequest, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/templates', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = db('templates');

    if (category) {
      query = query.where('category', category);
    }

    if (search) {
      query = query.where(function() {
        this.where('name', 'like', `%${search}%`)
            .orWhere('description', 'like', `%${search}%`);
      });
    }

    const templates = await query.orderBy('created_at', 'desc');
    
    res.json(templates);
  } catch (error) {
    console.error('Templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/templates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const template = await db('templates').where({ id }).first();

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Template details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db('templates')
      .select('category')
      .distinct()
      .orderBy('category');
    
    res.json(categories.map(cat => cat.category));
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/favorites/:templateId', authenticateToken, async (req, res) => {
  try {
    const { templateId } = req.params;
    const userId = req.user.userId;

    const template = await db('templates').where({ id: templateId }).first();
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const existingFavorite = await db('favorites')
      .where({ user_id: userId, template_id: templateId })
      .first();

    if (existingFavorite) {
      await db('favorites')
        .where({ user_id: userId, template_id: templateId })
        .del();
      
      res.json({ message: 'Template removed from favorites', isFavorited: false });
    } else {
      await db('favorites').insert({
        user_id: userId,
        template_id: templateId
      });
      
      res.json({ message: 'Template added to favorites', isFavorited: true });
    }
  } catch (error) {
    console.error('Favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', 'templates.id')
      .select(
        'templates.*',
        'favorites.created_at as favorited_at'
      )
      .where('favorites.user_id', userId)
      .orderBy('favorites.created_at', 'desc');

    res.json(favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/favorites/check/:templateId', authenticateToken, async (req, res) => {
  try {
    const { templateId } = req.params;
    const userId = req.user.userId;

    const favorite = await db('favorites')
      .where({ user_id: userId, template_id: templateId })
      .first();

    res.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
