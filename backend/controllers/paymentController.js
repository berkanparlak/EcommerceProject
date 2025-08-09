
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Process Stripe payment
// @route   POST /api/payment
// @access  Private
const processPayment = async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'E-Commerce App Payment',
      payment_method: id,
      confirm: true,
    });

    res.json({
      success: true,
      client_secret: payment.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { processPayment };
