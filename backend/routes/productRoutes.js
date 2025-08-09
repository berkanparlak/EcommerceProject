
import express from 'express';
const router = express.Router();
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getProductCategories } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/categories', getProductCategories);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
