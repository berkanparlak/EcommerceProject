
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const { userInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.put(
          '/api/users/profile',
          { name, email, password },
          config
        );

        login(data); // Update user info in context and localStorage
        setMessage('Profile Updated');
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '400px' }}>
        <h1 className='text-center mb-4'>User Profile</h1>
        {message && <div className='alert alert-info'>{message}</div>}
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
            ></input>
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
