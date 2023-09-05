import ProductModel from './productModel';
import HttpError from '../../helpers/HttpError';
import { Request as ExpressRequest } from 'express';

const getAll = async(req: ExpressRequest, page: number, limit: number) => {
  const { productType, sort, order } = req.query;

  const query = {};

  if (productType) {
    // @ts-ignore
    query.category = productType;
  }

  const totalItems = await ProductModel.countDocuments(query);
  const totalPages = Math.ceil(totalItems / limit);

  if (totalItems === 0) {
    return {
      data: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
    };
  }

  const sortField = sort || 'name';
  const sortOrder = order === 'desc' ? -1 : 1;

  if (page < 1 || page > totalPages) {
    throw HttpError(400, 'Invalid page number');
  }

  const productsOnPage = await ProductModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortField as string]: sortOrder })
    .lean();

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const productsWithImageUrls = productsOnPage.map((product) => ({
    ...product,
    images: product.images.map((image) => `${baseUrl}/${image}`),
  }));

  return {
    data: productsWithImageUrls,
    totalItems,
    totalPages,
    currentPage: page,
  };
};

const getById = async(req: ExpressRequest, productId: string) => {
  const product = await ProductModel.findById(productId).lean();

  if (!product) {
    throw HttpError(404, 'Product not found');
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const productWithImageUrl = {
    ...product,
    images: product.images.map((image) => `${baseUrl}/${image}`),
  };

  return productWithImageUrl;
};

const getNew = async(req: ExpressRequest) => {
  const newProducts = await ProductModel.find()
    .sort({ year: -1 })
    .limit(10)
    .lean();

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const newProductsWithImageUrls = newProducts.map((product) => ({
    ...product,
    images: product.images.map((image) => `${baseUrl}/${image}`),
  }));

  return newProductsWithImageUrls;
};

const getDiscount = async(req: ExpressRequest) => {
  const discountProducts = await ProductModel.aggregate([
    {
      $addFields: {
        priceDifference: { $subtract: ['$priceRegular', '$priceDiscount'] },
      },
    },
    {
      $sort: { priceDifference: -1 },
    },
    {
      $project: {
        priceDifference: 0,
      },
    },
    {
      $limit: 10,
    },
  ]).exec();

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const discountProductsWithImageUrls = discountProducts.map((product) => ({
    ...product,
    images: product.images.map((image: string) => `${baseUrl}/${image}`),
  }));

  return discountProductsWithImageUrls;
};

const getRecommended = async(req: ExpressRequest) => {
  const recommendedProducts = await ProductModel.aggregate([
    { $sample: { size: 10 } },
  ]).exec();

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const recommendedProductsWithImageUrls = recommendedProducts.map(
    (product) => ({
      ...product,
      images: product.images.map((image: string) => `${baseUrl}/${image}`),
    }),
  );

  return recommendedProductsWithImageUrls;
};

export default {
  getAll,
  getById,
  getNew,
  getDiscount,
  getRecommended,
};
