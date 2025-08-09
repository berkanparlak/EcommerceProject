
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect); // Giriş başarılı olursa yönlendirme parametresine göre yönlendir
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message); // Hata mesajını kullanıcıya göster
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '400px' }}>
        <h1 className='text-center mb-4'>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className='mb-3'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              className='form-control'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='form-control'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Sign In
          </button>
        </form>

        <div className='row py-3'>
          <div className='col'>
            New Customer? <Link to='/register'>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
