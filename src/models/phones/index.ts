import fs from 'fs/promises';
import path from 'path';

import Phone from '../../types/Phone';
import HttpError from '../../helpers/HttpError';

const phonesPath = path.join(__dirname, 'data', 'phones.json');

const getAll = async(page: number, limit: number): Promise<Phone[]> => {
  const data = await fs.readFile(phonesPath);
  const phones = JSON.parse(data.toString());

  const totalItems = phones.length;
  const totalPages = Math.ceil(totalItems / limit);

  if (page < 1 || page > totalPages) {
    throw HttpError(400, 'Invalid page number');
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const phonesOnPage = phones.slice(startIndex, endIndex);

  return phonesOnPage;
};

const getById = async(id: string) => {
  const data = await fs.readFile(phonesPath);
  const phones: Phone[] = JSON.parse(data.toString());

  const result = phones.find((phone) => phone._id === id);

  return result || null;
};

export default { getAll, getById };
