import express from 'express';

import phoneController from '../../controllers/phones';

const router = express.Router();

router.get('/', phoneController.getAll);
router.get('/:id', phoneController.getById);
router.get('/images/:imagePath', phoneController.getImg);

export default router;
