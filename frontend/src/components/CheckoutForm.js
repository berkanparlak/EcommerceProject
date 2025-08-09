
import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { payOrder } from '../actions/orderActions';
import AuthContext from '../context/AuthContext';

const CheckoutForm = ({ order, orderId }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { userInfo } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      setError(null);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data: clientSecretData } = await axios.post(
          '/api/payment',
          {
            amount: Math.round(order.totalPrice * 100), // Amount in cents
            id: result.paymentMethod.id,
          },
          config
        );

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecretData.client_secret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          }
        );

        if (confirmError) {
          setError(confirmError.message);
          setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
          dispatch(
            payOrder(orderId, {
              id: paymentIntent.id,
              status: paymentIntent.status,
              update_time: paymentIntent.created,
              email_address: userInfo.email,
            })
          );
          setProcessing(false);
        } else {
          setError('Payment failed or was not successful.');
          setProcessing(false);
        }
      } catch (apiError) {
        setError(apiError.response ? apiError.response.data.message : apiError.message);
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type='submit' disabled={!stripe || processing} className='btn btn-primary w-100 mt-3'>
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className='alert alert-danger mt-3'>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
