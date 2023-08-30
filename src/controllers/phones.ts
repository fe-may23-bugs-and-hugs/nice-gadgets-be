import HttpError from '../helpers/HttpError';
import phones from '../models/phones';

// @ts-ignore
const getAll = async(req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;

    const result = await phones.getAll(page, limit);

    res.send(result);
  } catch (error) {
    next(error);
  }
};

// @ts-ignore
const getById = async(req, res, next) => {
  try {
    const { id } = req.params;
    const result = await phones.getById(id);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById };
