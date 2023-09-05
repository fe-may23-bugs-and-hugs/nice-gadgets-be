import express from 'express';

import userController from '../controllers/userController';
import { registerValidation } from '../helpers/validation';
import checkAuth from '../helpers/checkAuth';

const router = express.Router();

router.post('/register', registerValidation, userController.register);

router.post('/login', userController.login);

router.get('/me', checkAuth, userController.getMe);

export default router;
