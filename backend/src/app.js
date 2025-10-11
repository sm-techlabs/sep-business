// src/app.js
import express from 'express';
import cors from 'cors';
import health from './routes/health.js';
import authentication from './routes/authentication.js';
import { sequelize, initSampleData } from './models/index.js';

const app = express();
const port = process.env.PORT || 3000;

// --- 🧩 Middleware ---
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// --- 🧩 Routes ---
app.use('/api/health', health);
app.use('/api/authentication', authentication);

// --- 🚀 Server startup (for local / prod only) ---
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');

    await initSampleData();
    console.log('✅ Sample data initialized');

    const server = app.listen(port, () => {
      console.log(`🚀 Backend server listening at http://localhost:${port}`);
    });

    // 🧹 Graceful shutdown (useful for CI/CD)
    const shutdown = () => {
      console.log('🛑 Server shutting down...');
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    return server;
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

// --- 🧪 Only start server outside of tests ---
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

// --- ✅ Export app and starter for CI tests ---
export { app, startServer };
