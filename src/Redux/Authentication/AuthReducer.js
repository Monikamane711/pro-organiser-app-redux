import {
  IS_AUTHENTICATED,
  USER,
  LOGIN_ERROR,
  SIGNIN_ERROR,
} from "./AuthActionsTypes";

const initialState = {
  authenticated: false,
  email: null,
  uid: null,
  username: null,
  signInError: null,
  logInError: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload,
      };

    case USER:
      return {
        ...state,
        email: action.payload.email,
        uid: action.payload.uid,
        username: action.payload.username,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        logInError: action.payload,
      };

    case SIGNIN_ERROR:
      return {
        ...state,
        signInError: action.payload,
      };
    default:
      return state;
  }
};
