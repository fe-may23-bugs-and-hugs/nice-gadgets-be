/*eslint-disable*/
import jwt from 'jsonwebtoken';
import HttpError from './HttpError';

// @ts-ignore

export default (req, resp, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');
      // @ts-ignore

      req.userId = decoded._id;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    throw HttpError(403, 'No permission');
  }
};
