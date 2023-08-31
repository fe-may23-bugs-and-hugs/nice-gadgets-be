import Phone from './phone';
import HttpError from '../../helpers/HttpError';

// @ts-ignore
const getAll = async(req, page: number, limit: number) => {
  const totalItems = await Phone.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);

  if (page < 1 || page > totalPages) {
    throw HttpError(400, 'Invalid page number');
  }

  const phonesOnPage = await Phone.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const phonesWithImageUrls = phonesOnPage.map(phone => ({
    ...phone.toObject(),
    image: `${baseUrl}/${phone.image}`,
  }));

  return {
    data: phonesWithImageUrls,
    totalItems,
    totalPages,
    currentPage: page,
  };
};

const getById = async(id: string) => {
  const result = await Phone.findById(id);

  if (result) {
    const phoneWithImageUrl = {
      ...result.toObject(),
      image: `/${result.image}`,
    };

    return phoneWithImageUrl;
  }

  return null;
};

export default { getAll, getById };
