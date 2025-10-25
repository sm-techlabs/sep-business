import express from 'express';
import Client from '../models/Client.js';
import { Op } from 'sequelize';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';

const router = express.Router();

/**
 * 👥 Get all clients
 * Allows querying existing clients in the system.
 * Supports optional query params like ?limit=10&offset=0 or ?name=John
 */
router.get('/',
  authorize,
  createHandlerWrapper(
  async (req) => {
    const { limit, offset, name, email } = req.query;

    // Build a flexible where clause
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };

    const clients = await Client.findAll({
      where,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      order: [['id', 'DESC']],
    });
    return clients;
}));

export default router;
