
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardSummary } from '../actions/dashboardActions';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dashboardSummary = useSelector((state) => state.dashboardSummary);
  const { loading, error, summary } = dashboardSummary;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(getDashboardSummary());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className='container'>
      <h1>Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : (
        <div className='row'>
          <div className='col-md-4'>
            <div className='card text-center p-3'>
              <h3>Users</h3>
              <h2>{summary.users}</h2>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card text-center p-3'>
              <h3>Products</h3>
              <h2>{summary.products}</h2>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card text-center p-3'>
              <h3>Orders</h3>
              <h2>{summary.orders}</h2>
            </div>
          </div>
          <div className='col-md-4 mt-3'>
            <div className='card text-center p-3'>
              <h3>Total Sales</h3>
              <h2>${summary.totalSales ? summary.totalSales.toFixed(2) : '0.00'}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
