import express from 'express';
import cors from 'cors';
import helloRouter from './routes/hello.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/hello', helloRouter);

const server = app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

export { app, server };
