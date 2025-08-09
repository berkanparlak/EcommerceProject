
import express from 'express';
const router = express.Router();
import { processPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, processPayment);

export default router;
