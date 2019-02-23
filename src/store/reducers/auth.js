import axios from 'axios';

import { API_KEY, AUTH_REST_BASE_URL } from '../../config';
import { updateObject } from '../../utils';

// actions
const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

// reducer function
const initialState = {
  token: null,
  userId: null,
  errorMessage: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_START: 
      return updateObject(state, { isLoading: true, error: null })
    case AUTH_SUCCESS: 
      return updateObject(state, { 
        isLoading: false, 
        token: action.payload.idToken, 
        userId: action.payload.userId,
        errorMessage: null
      });
    case AUTH_FAIL:
      return updateObject(state, {
        isLoading: false,
        errorMessage: action.payload.errorMessage
      });
    case AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null
      })
    default:
      return state;
  }
}

// action creators
export const authSuccess = (idToken, userId) => {
  return dispatch => {
    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        idToken,
        userId
      }
    });
  }
}

export const handleLogin = credentials => {
  return async dispatch => {
    dispatch({ type: AUTH_START });

    try {
      const response = await axios.post(`${AUTH_REST_BASE_URL}/verifyPassword?key=${API_KEY}`, credentials);
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);

      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch(e) {
      dispatch({ type: AUTH_FAIL, payload: { errorMessage: e.response.data.error.message }})
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return dispatch => dispatch({ type: AUTH_LOGOUT });
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

/**
 * Checks if user is still logged in and persist the session
 */
export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

export default authReducer;