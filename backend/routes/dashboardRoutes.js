
import express from 'express';
const router = express.Router();
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').get(protect, admin, getDashboardSummary);

export default router;
