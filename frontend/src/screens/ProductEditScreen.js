
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    } else if (productId) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/api/products/${productId}`);
          setName(data.name);
          setPrice(data.price);
          setImage(data.image);
          setBrand(data.brand);
          setCategory(data.category);
          setCountInStock(data.countInStock);
          setDescription(data.description);
        } catch (error) {
          setMessage(error.response.data.message);
        }
      };
      fetchProduct();
    }
  }, [userInfo, navigate, productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (productId) {
        // Update product
        const { data } = await axios.put(
          `/api/products/${productId}`,
          {
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
          },
          config
        );
        setMessage('Product Updated');
        navigate('/admin/productlist');
      } else {
        // Create product
        const { data } = await axios.post(
          '/api/products',
          {
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
          },
          config
        );
        setMessage('Product Created');
        navigate('/admin/productlist');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card p-4' style={{ width: '600px' }}>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <h1 className='text-center mb-4'>{productId ? 'Edit Product' : 'Create Product'}</h1>
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
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              className='form-control'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='image'>Image URL</label>
            <input
              type='text'
              id='image'
              className='form-control'
              placeholder='Enter image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='brand'>Brand</label>
            <input
              type='text'
              id='brand'
              className='form-control'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='countInStock'>Count In Stock</label>
            <input
              type='number'
              id='countInStock'
              className='form-control'
              placeholder='Enter count in stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              id='category'
              className='form-control'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            ></input>
          </div>

          <div className='mb-3'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              className='form-control'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows='3'
              required
            ></textarea>
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            {productId ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditScreen;
