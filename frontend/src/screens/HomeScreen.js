
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import CategoryFilter from '../components/CategoryFilter';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

const HomeScreen = () => {
  const { keyword } = useParams();
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, minPrice, maxPrice, minRating));
  }, [dispatch, keyword, category, minPrice, maxPrice, minRating]);

  const handleSelectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleFilterChange = () => {
    dispatch(listProducts(keyword, category, minPrice, maxPrice, minRating));
  };

  return (
    <>
      <h1>Latest Products</h1>
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter onSelectCategory={handleSelectCategory} />

          <div className='card p-3 mt-3'>
            <h5>Price Range</h5>
            <div className='mb-3'>
              <label htmlFor='minPrice' className='form-label'>Min Price</label>
              <input
                type='number'
                className='form-control'
                id='minPrice'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='maxPrice' className='form-label'>Max Price</label>
              <input
                type='number'
                className='form-control'
                id='maxPrice'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button className='btn btn-primary w-100' onClick={handleFilterChange}>Apply Price Filter</button>
          </div>

          <div className='card p-3 mt-3'>
            <h5>Minimum Rating</h5>
            <div className='mb-3'>
              <select
                className='form-select'
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value=''>All Ratings</option>
                <option value='1'>1 Star & Up</option>
                <option value='2'>2 Stars & Up</option>
                <option value='3'>3 Stars & Up</option>
                <option value='4'>4 Stars & Up</option>
                <option value='5'>5 Stars</option>
              </select>
            </div>
            <button className='btn btn-primary w-100' onClick={handleFilterChange}>Apply Rating Filter</button>
          </div>
        </div>
        <div className='col-md-9'>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='alert alert-danger'>{error}</div>
          ) : (
            <div className='row'>
              {products.map((product) => (
                <div key={product._id} className='col-sm-12 col-md-6 col-lg-4 col-xl-4'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
