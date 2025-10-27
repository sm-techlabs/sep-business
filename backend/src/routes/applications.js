import express from 'express';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import Application from '../models/Application.js';

const router = express.Router();

router.get('/',
  authorize,
  createHandlerWrapper(async () => (await Application.findAll()).map(a => a.id))
);

export default router;
