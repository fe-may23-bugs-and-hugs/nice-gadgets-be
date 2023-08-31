import Phone from './phone';
import HttpError from '../../helpers/HttpError';
import path from 'path';
import fs from 'fs/promises';

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

// @ts-ignore
const getFullPhoneInfo = async(req, phoneId: string) => {
  const filePath = path.join(__dirname, `/data/phones/${phoneId}.json`);

  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    const phone = JSON.parse(jsonData);

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const phoneWithImageUrl = {
      ...phone,
      images: [...phone.images].map(image => `${baseUrl}/${image}`),
    };

    return phoneWithImageUrl;
  } catch (error) {
    throw HttpError(500, 'Error reading JSON file');
  }
};

export default { getAll, getFullPhoneInfo };
