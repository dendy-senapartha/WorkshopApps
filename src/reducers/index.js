import { combineReducers } from 'redux';
import uiReducer from './ui-reducer.js';
import authReducer from './auth-reducer';
import firebaseReducer from './firebase-reducer';

export default combineReducers({
  uiReducer,
  authReducer,
  firebaseReducer
});
