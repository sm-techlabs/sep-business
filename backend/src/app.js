import express from 'express';
import cors from 'cors';
import health from './routes/health.js';
import { sequelize, initSampleData } from './models/index.js';
import authentication from './routes/authentication.js';
// import authorization from './routes/authorization.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/health', health);
app.use('/api/authentication', authentication);
// app.use('/api/authorization', authorization);

const server = app.listen(port, async () => {
  try {
    await sequelize.sync();
		console.log('DB synced');
    await initSampleData();
		console.log('DB Sample data initialized');
	} catch (err) {
		console.error('Database sync error:', err);
	}
    console.log(`Backend server listening at http://localhost:${port}`);
});

export { app, server };
