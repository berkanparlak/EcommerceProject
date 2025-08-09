
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthContext from '../context/AuthContext';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const { userInfo } = useContext(AuthContext);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }

    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: 'ORDER_CREATE_RESET' }); // Reset orderCreate state after successful order
    }
  }, [userInfo, navigate, shippingAddress, paymentMethod, success, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </li>

            <li className='list-group-item'>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </li>

            <li className='list-group-item'>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <div className='alert alert-info'>Your cart is empty</div>
              ) : (
                <ul className='list-group list-group-flush'>
                  {cartItems.map((item, index) => (
                    <li key={index} className='list-group-item'>
                      <div className='row'>
                        <div className='col-md-1'>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='img-fluid rounded'
                          />
                        </div>
                        <div className='col'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className='col-md-4'>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <h2>Order Summary</h2>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Items</div>
                  <div className='col'>${cart.itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Shipping</div>
                  <div className='col'>${cart.shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Tax</div>
                  <div className='col'>${cart.taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Total</div>
                  <div className='col'>${cart.totalPrice}</div>
                </div>
              </li>
              {error && <div className='alert alert-danger'>{error}</div>}
              <li className='list-group-item'>
                <button
                  type='button'
                  className='btn btn-primary w-100'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
