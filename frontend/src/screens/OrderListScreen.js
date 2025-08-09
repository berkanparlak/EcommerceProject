
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders, deliverOrder } from '../actions/orderActions';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDeliver]);

  const deliverHandler = (orderId) => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      dispatch(deliverOrder(orderId));
    }
  };

  return (
    <div className='container'>
      <h1>Orders</h1>
      {loadingOrders ? (
        <div>Loading...</div>
      ) : errorOrders ? (
        <div className='alert alert-danger'>{errorOrders}</div>
      ) : (
        <table className='table table-striped table-bordered table-hover table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className='btn btn-light btn-sm'>Details</button>
                  </Link>
                  {!order.isDelivered && (
                    <button
                      className='btn btn-success btn-sm ms-2'
                      onClick={() => deliverHandler(order._id)}
                    >
                      Mark As Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListScreen;
