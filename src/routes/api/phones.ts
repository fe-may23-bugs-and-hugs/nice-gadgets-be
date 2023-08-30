import express from 'express';

import ctrl from '../../controllers/phones';

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.get('/:imagePath', ctrl.getImg);

export default router;
