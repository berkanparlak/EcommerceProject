
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment'); // Ödeme sayfasına yönlendir
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '500px' }}>
        <h1 className='text-center mb-4'>Shipping</h1>
        <form onSubmit={submitHandler}>
          <div className='mb-3'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              className='form-control'
              placeholder='Enter address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              className='form-control'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='postalCode'>Postal Code</label>
            <input
              type='text'
              id='postalCode'
              className='form-control'
              placeholder='Enter postal code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              id='country'
              className='form-control'
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
