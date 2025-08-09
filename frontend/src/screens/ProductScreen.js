
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../actions/cartActions';
import { createProductReview, getProductDetails } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import AuthContext from '../context/AuthContext';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (!product._id || product._id !== id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, successProductReview, product]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : (
        <div className='row'>
          <div className='col-md-6'>
            <img src={product.image} alt={product.name} className='img-fluid' />
          </div>
          <div className='col-md-3'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <h3>{product.name}</h3>
              </li>
              <li className='list-group-item'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </li>
              <li className='list-group-item'>Price: ${product.price}</li>
              <li className='list-group-item'>Description: {product.description}</li>
            </ul>
          </div>
          <div className='col-md-3'>
            <div className='card'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <div className='row'>
                    <div className='col'>Price:</div>
                    <div className='col'>
                      <strong>${product.price}</strong>
                    </div>
                  </div>
                </li>
                <li className='list-group-item'>
                  <div className='row'>
                    <div className='col'>Status:</div>
                    <div className='col'>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </div>
                  </div>
                </li>

                {product.countInStock > 0 && (
                  <li className='list-group-item'>
                    <div className='row'>
                      <div className='col'>Qty</div>
                      <div className='col'>
                        <select
                          className='form-select'
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                )}

                <li className='list-group-item'>
                  <button
                    className='btn btn-dark w-100'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className='row mt-5'>
        <div className='col-md-6'>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <div className='alert alert-info'>No Reviews</div>}
          <ul className='list-group list-group-flush'>
            {product.reviews.map((review) => (
              <li key={review._id} className='list-group-item'>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
          <h2 className='mt-4'>Write a Customer Review</h2>
          {errorProductReview && <div className='alert alert-danger'>{errorProductReview}</div>}
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className='mb-3'>
                <label htmlFor='rating'>Rating</label>
                <select
                  id='rating'
                  className='form-select'
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </select>
              </div>
              <div className='mb-3'>
                <label htmlFor='comment'>Comment</label>
                <textarea
                  id='comment'
                  className='form-control'
                  rows='3'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          ) : (
            <div className='alert alert-info'>
              Please <Link to='/login'>sign in</Link> to write a review
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
