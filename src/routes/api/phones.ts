import express from 'express';

import phoneController from '../../controllers/phones';

const router = express.Router();

router.get('/', phoneController.getAll);
router.get('/new', phoneController.getNew);
router.get('/discount', phoneController.getDiscount);

router.get('/:id', phoneController.getById);
router.get('/:id/recommended', phoneController.getRecommended);

router.get('/images/:imagePath', phoneController.getImg);

export default router;
