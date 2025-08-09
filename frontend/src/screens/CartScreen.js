
import React, { useEffect, useContext } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import AuthContext from '../context/AuthContext';

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const { userInfo } = useContext(AuthContext);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className='alert alert-info'>
              Your cart is empty <Link to='/'>Go Back</Link>
            </div>
          ) : (
            <ul className='list-group list-group-flush'>
              {cartItems.map((item) => (
                <li key={item.product} className='list-group-item'>
                  <div className='row align-items-center'>
                    <div className='col-md-2'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded'
                      />
                    </div>
                    <div className='col-md-3'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className='col-md-2'>${item.price}</div>
                    <div className='col-md-2'>
                      <select
                        className='form-select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-md-2'>
                      <button
                        type='button'
                        className='btn btn-light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                ${cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </li>
              <li className='list-group-item'>
                <button
                  type='button'
                  className='btn btn-primary w-100'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
