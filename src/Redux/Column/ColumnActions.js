import {
  COLUMN_KEY,
  GET_BOARD_COLUMN_DATA,
  SET_COLUMN,
  UNSET_COLUMN,
  DELETE_COLUMN,
} from "./ColumnActionTypes";

export const setColumn = (value) => {
  return {
    type: SET_COLUMN,
    payload: value,
  };
};
export const deleteColumn = (value) => {
  return {
    type: DELETE_COLUMN,
    payload: value,
  };
};
export const unsetColumn = () => {
  return {
    type: UNSET_COLUMN,
  };
};

export const columnKey = (key) => {
  return {
    type: COLUMN_KEY,
    payload: key,
  };
};

export const getColumnData = (value) => {
  return {
    type: GET_BOARD_COLUMN_DATA,
    payload: value,
  };
};
