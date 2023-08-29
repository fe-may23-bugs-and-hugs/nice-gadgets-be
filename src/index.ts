/* eslint-disable max-len */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import phonesRouter from './routes/api/phones';
import ResponseError from './types/Error';

const PORT = process.env.PORT || 5000;

const app = express();

const DB_HOST
  = 'mongodb+srv://admin:DAo8ysXE0pxSJjPh@cluster0.wyuhxhd.mongodb.net/nice_gadgets?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(cors());

app.use('/api/phones', phonesRouter);

// @ts-ignore
app.use((err: ResponseError, _req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).send({ message });
});
