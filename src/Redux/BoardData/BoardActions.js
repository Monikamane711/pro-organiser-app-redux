import {
  GET_DATA,
  SELECTED_BOARD_KEY,
  SELECTED_BOARD_VALUES,
  LOADER,
  DELETE_BOARD,
} from "./BooardActionTypes";

export const getData = (value) => {
  return {
    type: GET_DATA,
    payload: value,
  };
};
export const deleteBoard = () => {
  return {
    type: DELETE_BOARD,
  };
};
export const selectedBoardKey = (key, value) => {
  return {
    type: SELECTED_BOARD_KEY,
    payload: { key, value },
  };
};

export const selectedBoardValue = (value) => {
  return {
    type: SELECTED_BOARD_VALUES,
    payload: value,
  };
};

export const setLoader = (value) => {
  return {
    type: LOADER,
    payload: value,
  };
};
