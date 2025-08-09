
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get dashboard summary
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardSummary = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    res.json({
      users,
      products,
      orders,
      totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDashboardSummary };
