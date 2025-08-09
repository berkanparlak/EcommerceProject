import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthContext from '../context/AuthContext';
import { USER_LOGOUT } from '../constants/userConstants';
import { listProductSuggestions, resetProductSuggestions } from '../actions/productActions';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productSuggestions = useSelector((state) => state.productSuggestions);
  const { loading, error, products } = productSuggestions;

  useEffect(() => {
    if (keyword.trim() === '') {
      dispatch(resetProductSuggestions());
      setShowSuggestions(false);
    } else {
      dispatch(listProductSuggestions(keyword));
      setShowSuggestions(true);
    }
  }, [dispatch, keyword]);

  const logoutHandler = () => {
    dispatch({ type: USER_LOGOUT });
    logout(); // AuthContext'teki logout fonksiyonunu çağır
    navigate('/login');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setShowSuggestions(false);
    }
  };

  const suggestionClickHandler = (id) => {
    navigate(`/product/${id}`);
    setKeyword('');
    setShowSuggestions(false);
  };

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            E-Commerce App
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <form className='d-flex me-auto position-relative' onSubmit={submitHandler}>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search Products...'
                aria-label='Search'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
              {showSuggestions && products.length > 0 && (
                <ul className='list-group position-absolute top-100 start-0 w-100'>
                  {products.map((product) => (
                    <li
                      key={product._id}
                      className='list-group-item list-group-item-action'
                      onClick={() => suggestionClickHandler(product._id)}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/cart'>
                  <i className='fas fa-shopping-cart'></i> Cart
                  {cartItems.length > 0 && (
                    <span className='badge bg-light text-dark ms-1'>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </Link>
              </li>
              {userInfo ? (
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {userInfo.name}
                  </a>
                  <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <li>
                      <Link className='dropdown-item' to='/profile'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/myorders'>
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button className='dropdown-item' onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    <i className='fas fa-user'></i> Sign In
                  </Link>
                </li>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='adminDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Admin
                  </a>
                  <ul className='dropdown-menu' aria-labelledby='adminDropdown'>
                    <li>
                      <Link className='dropdown-item' to='/admin/userlist'>
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/productlist'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/orderlist'>
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/dashboard'>
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;