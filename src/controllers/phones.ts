import HttpError from '../helpers/HttpError';
import phones from '../models/phones/phone';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNext,
} from 'express';

const getAll = async(
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const page = req.query.page ? String(req.query.page) : '1';
    const limit = req.query.limit ? String(req.query.limit) : '16';

    const result = await phones.getAll(req, parseInt(page), parseInt(limit));

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getById = async(
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const { id } = req.params;
    const result = await phones.getById(req, id);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getNew = async(
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const result = await phones.getNew(req);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getDiscount = async(
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const result = await phones.getDiscount(req);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getRecommended = async(
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const result = await phones.getRecommended(req);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getImg = async(
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNext,
) => {
  try {
    const imagePath = req.params.imagePath;

    res.sendFile(imagePath, { root: 'public' });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll, getById, getImg, getNew, getDiscount, getRecommended,
};
