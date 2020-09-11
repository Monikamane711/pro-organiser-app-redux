import {
  IS_AUTHENTICATED,
  USER,
  SIGNIN_ERROR,
  LOGIN_ERROR,
} from "./AuthActionsTypes";

export const isAuthenticated = (value) => {
  return {
    type: IS_AUTHENTICATED,
    payload: value,
  };
};

export const userDetails = (email, uid, username) => {
  return {
    type: USER,
    payload: { email, uid, username },
  };
};

export const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    payload: err,
  };
};

export const signinError = (err) => {
  return {
    type: SIGNIN_ERROR,
    payload: err,
  };
};
