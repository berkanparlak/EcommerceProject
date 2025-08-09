
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const { data } = await axios.post(
          '/api/users/register',
          { name, email, password },
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
        navigate('/'); // Kayıt başarılı olursa ana sayfaya yönlendir
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '400px' }}>
        <h1 className='text-center mb-4'>Sign Up</h1>
        {message && <div className='alert alert-danger'>{message}</div>}
        <form onSubmit={submitHandler}>
          <div className='mb-3'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              className='form-control'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>

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

          <div className='mb-3'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              className='form-control'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></input>
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Register
          </button>
        </form>

        <div className='row py-3'>
          <div className='col'>
            Have an Account? <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
