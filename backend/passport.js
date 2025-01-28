const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);
        const user = res.rows[0];
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error('Error during authentication:', err);
        return done(err, false);
      }
    })
  );
};