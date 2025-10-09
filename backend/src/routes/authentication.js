import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

  // 1️⃣ Find user
  const user = await getUsername(username);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // 2️⃣ Verify password
  const hashedPassword = await getPassword(username);
  const match = bcrypt.compare(password, hashedPassword);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 3️⃣ Create JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  // 5️⃣ Send response
  res.json({ message: 'Login successful', token });
});

// --- Example protected route ---
router.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Hello ${decoded.username}, this is a protected route!` });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
