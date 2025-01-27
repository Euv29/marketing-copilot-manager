const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const authenticate = passport.authenticate('jwt', { session: false });

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send('Access denied.');
  }
  next();
};

module.exports = { authenticate, authorize };