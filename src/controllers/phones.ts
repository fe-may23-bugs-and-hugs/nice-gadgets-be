import HttpError from '../helpers/HttpError';
import phones from '../models/phones';

// @ts-ignore
const getAll = async(req, res, next) => {
  try {
    const { page = 1, limit = 16 } = req.query;

    const result = await phones.getAll(req, parseInt(page), parseInt(limit));

    res.send(result);
  } catch (error) {
    next(error);
  }
};

// @ts-ignore
const getById = async(req, res, next) => {
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

// @ts-ignore
const getImg = async(req, res, next) => {
  try {
    const imagePath = req.params.imagePath;

    res.sendFile(imagePath, { root: 'public' });
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, getImg };
