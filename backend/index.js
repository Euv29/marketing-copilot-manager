const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const Facebook = require('facebook-node-sdk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { authenticate, authorize } = require('./middleware/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Database connected:', result.rows);
  });
});

const facebook = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  secret: process.env.FACEBOOK_APP_SECRET,
});

// Passport middleware
app.use(passport.initialize());
require('./passport')(passport);

// Rota para a raiz
app.get('/api', (req, res) => {
  res.send('Bem-vindo ao Marketing Copilot Manager API');
});

// Rota de teste de conexão com o banco de dados
app.get('/api/db-test', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    res.send('Database connection is working');
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

// Rota de registro
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
    await pool.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', [name, email, hashedPassword, role]);
    res.status(201).send('User registered');
  } catch (err) {
    console.error('Error during registration:', err);
    console.error('Request body:', req.body);
    res.status(500).send('Server error');
  }
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', email);
    const resUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (resUser.rows.length === 0) {
      console.log('User not found:', email);
      return res.status(400).send('User not found');
    }
    const user = resUser.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials for user:', email);
      return res.status(400).send('Invalid credentials');
    }
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated for user:', email);
    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    console.error('Error during login:', err);
    console.error('Request body:', req.body);
    res.status(500).send('Server error');
  }
});

// Rota de logout
app.post('/api/logout', (req, res) => {
  res.status(200).send('Logout successful');
});

// Rota protegida para usuários
app.get('/api/user-dashboard', authenticate, authorize(['user', 'admin']), (req, res) => {
  res.send('This is a user dashboard');
});

// Rota protegida para administradores
app.get('/api/admin-dashboard', authenticate, authorize(['admin']), (req, res) => {
  res.send('This is an admin dashboard');
});

// Serve os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Rota para servir o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});