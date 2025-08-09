
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, role }));
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '500px' }}>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <h1 className='text-center mb-4'>Edit User</h1>
        {message && <div className='alert alert-info'>{message}</div>}
        {loadingUpdate && <div>Loading...</div>}
        {errorUpdate && <div className='alert alert-danger'>{errorUpdate}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='alert alert-danger'>{error}</div>
        ) : (
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
              <label htmlFor='role'>Role</label>
              <select
                id='role'
                className='form-select'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
            </div>

            <button type='submit' className='btn btn-primary w-100'>
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;
