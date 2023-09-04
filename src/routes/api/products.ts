import express from 'express';

import productsController from '../../controllers/products';

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/new', productsController.getNew);
router.get('/discount', productsController.getDiscount);

router.get('/:id', productsController.getById);
router.get('/:id/recommended', productsController.getRecommended);

router.get('/images/:imagePath', productsController.getImg);

export default router;
