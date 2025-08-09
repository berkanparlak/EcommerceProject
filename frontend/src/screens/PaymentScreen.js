
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder'); // Sipariş özet sayfasına yönlendir
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '500px' }}>
        <h1 className='text-center mb-4'>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className='mb-3'>
            <label className='form-label'>Select Method</label>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label className='form-check-label' htmlFor='PayPal'>
                PayPal or Credit Card
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label className='form-check-label' htmlFor='Stripe'>
                Stripe
              </label>
            </div>
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
