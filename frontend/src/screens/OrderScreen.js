
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: 'ORDER_PAY_RESET' });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, order]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className='alert alert-danger'>{error}</div>
  ) : (
    <div className='container'>
      <h1>Order {order._id}</h1>
      <div className='row'>
        <div className='col-md-8'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div className='alert alert-success'>
                  Delivered on {order.deliveredAt}
                </div>
              ) : (
                <div className='alert alert-danger'>Not Delivered</div>
              )}
            </li>

            <li className='list-group-item'>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div className='alert alert-success'>Paid on {order.paidAt}</div>
              ) : (
                <div className='alert alert-danger'>Not Paid</div>
              )}
            </li>

            <li className='list-group-item'>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <div className='alert alert-info'>Order is empty</div>
              ) : (
                <ul className='list-group list-group-flush'>
                  {order.orderItems.map((item, index) => (
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
                  <div className='col'>${order.itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Shipping</div>
                  <div className='col'>${order.shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Tax</div>
                  <div className='col'>${order.taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Total</div>
                  <div className='col'>${order.totalPrice}</div>
                </div>
              </li>
              {!order.isPaid && (
                <li className='list-group-item'>
                  {loadingPay && <div>Loading...</div>}
                  {order.paymentMethod === 'PayPal' ? (
                    <button
                      type='button'
                      className='btn btn-primary w-100'
                      onClick={() =>
                        dispatch(
                          payOrder(orderId, {
                            id: 'test_paypal_id',
                            status: 'COMPLETED',
                            update_time: new Date().toISOString(),
                            email_address: order.user.email,
                          })
                        )
                      }
                    >
                      Pay with PayPal (Test)
                    </button>
                  ) : (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm order={order} orderId={orderId} />
                    </Elements>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
