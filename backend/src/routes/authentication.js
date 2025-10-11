import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import { Employee } from '../models/index.js';

const router = express.Router();
router.use(cookieParser()); // ✅ enables req.cookies access

const SECRET_KEY = process.env.JWT_SECRET || 'default-dev-key';
if (!SECRET_KEY) {
  console.warn('⚠️ JWT_SECRET not set — using default (for dev only)');
}

/**
 * 🧩 Helper to generate and send a signed JWT cookie
 */
function setAuthCookie(res, payload) {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,       // ❌ not accessible by JavaScript
    secure: true,         // ✅ only sent over HTTPS
    sameSite: 'strict',   // prevents CSRF
    maxAge: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * 🧩 Login route
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 1️⃣ Find user
  const user = await Employee.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 2️⃣ Verify password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 3️⃣ Set JWT cookie
  const payload = { name: user.name, jobTitle: user.jobTitle };
  setAuthCookie(res, payload);

  // 4️⃣ Send confirmation
  res.json({ message: 'Login successful' });
});

/**
 * 🧩 Validate route (for frontend to check session)
 */
router.get('/validate', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ name: decoded.name, jobTitle: decoded.jobTitle });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

/**
 * 🧩 Logout route
 * Clears the cookie by setting it to expire immediately.
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully' });
});

export default router;
