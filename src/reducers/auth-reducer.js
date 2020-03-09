import {
  AUTH_SET_USER,
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT,
  AUTH_RESET_FIELDS,
  AUTH_USER_CHANGE_EMAIL,
  AUTH_USER_LOGIN_FAILURE,
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_USER_CHANGE_PASSWORD,
  AUTH_USER_CHANGE_NAME
} from '../actions/auth-actions/types';

import {
  CANCEL_UPDATE_PROFILE_USER
} from '../actions/profile-actions/types';

import auth from '@react-native-firebase/auth';

const INITIAL_STATE = {
  email: '',
  user: null,
  password: '',
  loading: false,
  errorMessage: '',
};

const currentUser = auth().currentUser;

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_USER_LOGIN:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case AUTH_USER_LOGIN_SUCCESS:
      return {
        ...INITIAL_STATE,
        user: payload,
        loading: false,
      };
    case AUTH_USER_LOGIN_FAILURE:
      return {
        ...state,
        password: '',
        loading: false,
        errorMessage: payload,
      };
    case AUTH_USER_LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    case AUTH_USER_CHANGE_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case AUTH_USER_CHANGE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    case AUTH_RESET_FIELDS:
      return {
        ...state,
        user: state.user,
      };
    case CANCEL_UPDATE_PROFILE_USER:
    case AUTH_USER_CHANGE_NAME:
    case AUTH_SET_USER:
      return {
        ...INITIAL_STATE,
        user: payload,
      };
    default:
      return state;
  }
};
