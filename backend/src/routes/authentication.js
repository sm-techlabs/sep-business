import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Employee } from '../models/index.js';  

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'default-dev-key'; // ⚠️ Use environment variables in production!
if (!SECRET_KEY) {
  console.warn('⚠️ JWT_SECRET not set — using default (for dev only)');
}

// --- PSEUDOCODE: Database functions ---
async function getUsername(username) { /* ... */ }
async function getPassword(username) { /* ... */ }
async function validateToken(username, token) { /* ... */ }

// --- Login route ---
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // console.log('Login attempt:' + username + ' ' + password);
  // 1️⃣ Find user
  // const user = await Employee. getUsername(username);
  const user = await Employee.findOne({ where: { username } });

  // console.log('User:' + user);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 2️⃣ Verify password
  const storedPassword = user.password;
  const match = await bcrypt.compare(password, storedPassword);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const name = user.name;
  const jobTitle = user.jobTitle;
  // 3️⃣ Create JWT
  const token = jwt.sign({ name, jobTitle }, SECRET_KEY, { expiresIn: '1h' });

  // 5️⃣ Send response
  res.json({ message: 'Login successful', token });
});

// --- Example protected route ---
router.get('/validate', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header. You need to log in!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ name: decoded.name, jobTitle: decoded.jobTitle });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;
