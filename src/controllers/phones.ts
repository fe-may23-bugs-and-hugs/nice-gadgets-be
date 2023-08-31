import HttpError from '../helpers/HttpError';
import phones from '../models/phones';

// @ts-ignore
const getAll = async(req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;

    const result = await phones.getAll(req, page, limit);

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

// @ts-ignore
const getImg = async(req, res) => {
  const imagePath = req.params.imagePath;

  res.sendFile(imagePath, { root: 'public' });
};

export default { getAll, getById, getImg };
