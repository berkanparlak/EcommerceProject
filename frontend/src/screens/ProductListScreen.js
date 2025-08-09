
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      const fetchProducts = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get('/api/products', config);
          setProducts(data);
        } catch (error) {
          setMessage(error.response.data.message);
        }
      };
      fetchProducts();
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
        await axios.delete(`/api/products/${id}`, config);
        setMessage('Product removed successfully');
        setProducts(products.filter((product) => product._id !== id)); // Ürünü listeden kaldır
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Products</h1>
        <Link to='/admin/product/create' className='btn btn-primary'>
          <i className='fas fa-plus'></i> Create Product
        </Link>
      </div>
      {message && <div className='alert alert-info'>{message}</div>}
      <table className='table table-striped table-bordered table-hover table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <button className='btn btn-light btn-sm'>
                    <i className='fas fa-edit'></i>
                  </button>
                </Link>
                <button
                  className='btn btn-danger btn-sm ms-2'
                  onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
