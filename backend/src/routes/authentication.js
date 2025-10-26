// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import { Employee } from '../models/index.js';
import { setAuthCookie, verifyToken, clearAuthCookie } from '../utils/jwt.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import { BadRequestError, UnauthorizedError } from '../utils/errors.js';

const router = express.Router();

/**
 * 🧩 Login route
 */
router.post('/login', 
  createHandlerWrapper(
  async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Invalid request; Username and password are required')
  }

  const user = await Employee.findOne({ where: { username } });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const payload = { id: user.id, name: user.name, jobTitle: user.jobTitle };
  setAuthCookie(res, payload);

  return {message: "Login successful"}
}));

/**
 * 🧩 Validate route (for frontend to check session)
 */
router.get('/validate', 
  createHandlerWrapper((req) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthorizedError('Missing authentication token. Please log in again.');
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new UnauthorizedError('Invalid or expired token.');
  }

  return {id: decoded.id, name: decoded.name, jobTitle: decoded.jobTitle};
}));

/**
 * 🧩 Self route — returns the authenticated user's info
 */
router.get(
  '/self',
  createHandlerWrapper((req) => {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthorizedError('Missing authentication token.');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedError('Invalid or expired token.');
    }

    return {
      id: decoded.id,
      name: decoded.name,
      jobTitle: decoded.jobTitle,
    };
  })
);

/**
 * 🧩 Logout route
 */
router.post('/logout', 
  createHandlerWrapper((req, res) => {
  clearAuthCookie(res);
  return {message: 'Logged out successfully'}
}));

export default router;
