import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNext,
} from 'express';

import { validationResult } from 'express-validator';
import HttpError from '../helpers/HttpError';
import UserModel from '../models/User/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async(
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw HttpError(400, 'Bad request');
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    // @ts-ignore

    const { passwordHash, ...userData } = user._doc;

    resp.json({ ...userData, token });
  } catch (error) {
    next(error);
  }
};

const login = async(
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      throw HttpError(404, 'Not found');
    }

    const isValidPassord = await bcrypt.compare(
      req.body.password,
      // @ts-ignore

      user._doc.passwordHash,
    );

    if (!isValidPassord) {
      throw HttpError(404, 'Invalid login or password');
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    // @ts-ignore

    const { passwordHash, ...userData } = user._doc;

    resp.json({ ...userData, token });
  } catch (error) {
    next(error);
  }
};

const getMe = async(
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    // @ts-ignore
    const user = await UserModel.findById(req.userId);

    if (!user) {
      throw HttpError(404, 'Not found');
    }
    // @ts-ignore

    const { passwordHash, ...userData } = user._doc;

    resp.json({ ...userData });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
};
