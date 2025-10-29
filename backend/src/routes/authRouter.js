import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const { registerUser, loginUser, updateCheckOut, getUserInfo } = authController;

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update', protect, updateCheckOut);
router.get('/getUser', protect, getUserInfo);

export default router;
