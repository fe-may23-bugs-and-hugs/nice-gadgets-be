import Phone from './phone';
import HttpError from '../../helpers/HttpError';

// @ts-ignore
const getAll = async(req, page: number, limit: number) => {
  const totalItems = await Phone.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);

  const { sort, order } = req.query;
  const sortField = sort || 'name';
  const sortOrder = order === 'desc' ? -1 : 1;

  if (page < 1 || page > totalPages) {
    throw HttpError(400, 'Invalid page number');
  }

  const phonesOnPage = await Phone.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortField]: sortOrder })
    .lean();

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const phonesWithImageUrls = phonesOnPage.map(phone => ({
    ...phone,
    images: phone.images.map(image => `${baseUrl}/${image}`),
  }));

  return {
    data: phonesWithImageUrls,
    totalItems,
    totalPages,
    currentPage: page,
  };
};

// @ts-ignore
const getById = async(req, phoneId: string) => {
  try {
    const product = await Phone.findById(phoneId).lean();

    if (!product) {
      throw HttpError(404, 'Product not found');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const productWithImageUrl = {
      ...product,
      images: product.images.map(image => `${baseUrl}/${image}`),
    };

    return productWithImageUrl;
  } catch (error) {
    throw HttpError(500, 'Error reading JSON file');
  }
};

export default { getAll, getById };
