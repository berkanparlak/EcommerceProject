
import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const login = (data) => {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  };

  const logout = () => {
    dispatch({
      type: USER_LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
