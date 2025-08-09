
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      const fetchUsers = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get('/api/users', config);
          setUsers(data);
        } catch (error) {
          setMessage(error.response.data.message);
        }
      };
      fetchUsers();
    } else {
      navigate('/login'); // Admin değilse giriş sayfasına yönlendir
    }
  }, [userInfo, navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/users/${id}`, config);
        setMessage('User deleted successfully');
        setUsers(users.filter((user) => user._id !== id)); // Kullanıcıyı listeden kaldır
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className='container'>
      <h1>Users</h1>
      {message && <div className='alert alert-info'>{message}</div>}
      <table className='table table-striped table-bordered table-hover table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.role === 'admin' ? (
                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                <Link to={`/admin/user/${user._id}/edit`}>
                  <button className='btn btn-light btn-sm'>
                    <i className='fas fa-edit'></i>
                  </button>
                </Link>
                <button
                  className='btn btn-danger btn-sm ms-2'
                  onClick={() => deleteHandler(user._id)}
                >
                  <i className='fas fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListScreen;
