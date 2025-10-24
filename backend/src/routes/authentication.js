// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import { Employee } from '../models/index.js';
import { setAuthCookie, verifyToken, clearAuthCookie } from '../utils/jwt.js';

const router = express.Router();
router.use(cookieParser());

/**
 * 🧩 Login route
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid request; Username and password are required' });
  }

  const user = await Employee.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = { name: user.name, jobTitle: user.jobTitle };
  setAuthCookie(res, payload);

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

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  res.json({ name: decoded.name, jobTitle: decoded.jobTitle });
});

/**
 * 🧩 Logout route
 */
router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ message: 'Logged out successfully' });
});

export default router;
