import { combineReducers } from 'redux';

import authReducer from './modules/auth';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;