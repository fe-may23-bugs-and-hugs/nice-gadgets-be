/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productsRouter from './routes/api/products';
import userRouter from './routes/auth';
import ResponseError from './types/Error';

dotenv.config();

const { DB_HOST, PORT = 5000 } = process.env;

if (!DB_HOST) {
  console.error('DB_HOST is not defined in the environment variables.');
  process.exit(1);
}

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }))
  .catch((error) => {
    console.log('Database connection error:', error);
    process.exit(1);
  });

app.use('/api/products', productsRouter);
app.use('/auth', userRouter);

// @ts-ignore
app.use((err: ResponseError, _req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).send({ message });
});
