
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className='card my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>

      <div className='card-body'>
        <Link to={`/product/${product._id}`}>
          <h5 className='card-title'>
            <strong>{product.name}</strong>
          </h5>
        </Link>

        <div className='card-text my-3'>
          {/* Rating component will go here */}
          {product.rating} from {product.numReviews} reviews
        </div>

        <h3 className='card-text'>${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
