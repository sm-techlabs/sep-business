import express from 'express';
import { authorize } from '../services/authorization.js';

const router = express.Router();

const startTime = Date.now();

router.get('/', authorize, (req, res) => {
  const uptimeSeconds = Math.round((Date.now() - startTime) / 1000);

  res.json({
    status: 'ok',
    message: 'Backend is healthy 🚀',
    time: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`
  });
});

export default router;
