import express from 'express';
import cors from 'cors';
import health from './routes/health.js';
import authentication from './routes/authentication.js';
import { sequelize, initSampleData } from './models/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/health', health);
app.use('/api/authentication', authentication);

// 🧩 Reusable async initializer
export async function initServer() {
  try {
    await sequelize.sync();
    console.log('✅ DB synced');

    await initSampleData();
    console.log('✅ Sample data initialized');

    const server = app.listen(port, () => {
      console.log(`🚀 Backend server listening at http://localhost:${port}`);
    });

    return server;
  } catch (err) {
    console.error('❌ Database sync error:', err);
    throw err;
  }
}

// ✅ Only auto-start if not running tests
if (process.env.NODE_ENV !== 'test') {
  initServer();
}

export { app };
