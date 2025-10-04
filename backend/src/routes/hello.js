import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "The backend greets you!", time: new Date().toISOString() });
});

export default router;
