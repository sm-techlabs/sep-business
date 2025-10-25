import express from 'express';
import Client from '../models/Client.js';
import { Op } from 'sequelize';
import { authorize } from '../services/authorization.js';

const router = express.Router();

/**
 * 👥 Get all clients
 * Allows querying existing clients in the system.
 * Supports optional query params like ?limit=10&offset=0 or ?name=John
 */
router.get('/',
  authorize,
  async (req, res) => {
  try {
    const { limit, offset, name, email } = req.query;

    // Build a flexible where clause
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };

    const clients = await Client.findAll({
      where,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
