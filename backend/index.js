
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const Facebook = require('facebook-node-sdk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('./middleware/auth');

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Error acquiring client', err);
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const resUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (resUser.rows.length === 0) {
      return res.status(400).send('User not found');
    }
    const user = resUser.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Server error');
  }
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

module.exports = {
  query: (text, params) => pool.query(text, params),
};
// Rota de registro
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // 1. Verifica se o usuário já existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).send('User already exists');
    }

    // 2. Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insere o usuário no banco de dados
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role]
    );

    // 4. Retorna resposta
    res.status(201).json({ user: newUser.rows[0] });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Server error');
  }
});