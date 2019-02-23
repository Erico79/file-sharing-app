import axios from 'axios';

import { API_KEY } from '../../config';
import { updateObject } from '../../utils';

// actions
const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';

// constants
const signInUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`

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
      })
    default:
      return state;
  }
}

// action creators
export const handleLogin = credentials => {
  return async dispatch => {
    dispatch({ type: AUTH_START });

    try {
      const response = await axios.post(signInUrl, credentials);
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          idToken: response.data.idToken,
          userId: response.data.localId,
        }
      })
    } catch(e) {
      dispatch({ type: AUTH_FAIL, payload: { errorMessage: e.response.data.error.message }})
    }
  }
}

export default authReducer;