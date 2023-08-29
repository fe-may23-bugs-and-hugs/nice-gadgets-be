/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import phonesRouter from './routes/api/phones';
import ResponseError from './types/Error';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use('/api/phones', phonesRouter);

// @ts-ignore
app.use((err: ResponseError, _req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
