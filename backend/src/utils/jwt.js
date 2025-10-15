// utils/jwt.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default-dev-key';
const isProduction = process.env.NODE_ENV === 'production';

if (!SECRET_KEY) {
  console.warn('⚠️ JWT_SECRET not set — using default (for dev only)');
}

/**
 * Generate a signed JWT
 */
export function generateToken(payload, options = {}) {
  const defaultOptions = { expiresIn: '1h' };
  return jwt.sign(payload, SECRET_KEY, { ...defaultOptions, ...options });
}

/**
 * Verify and decode a JWT
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

/**
 * Attach an auth token as a cookie on the response
 */
export function setAuthCookie(res, payload) {
  const token = generateToken(payload);
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Clear the authentication cookie
 */
export function clearAuthCookie(res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
}
