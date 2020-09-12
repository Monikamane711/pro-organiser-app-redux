import {
  DELETE_MODAL,
  DELETE_COLUMN,
  DELETE_BOARD,
  DELETE_CARD,
} from "./DeleteModal.actionTypes";

export const deleteModal = (value) => {
  return {
    type: DELETE_MODAL,
    payload: value,
  };
};

export const deleteCard = (columnKey, cardKey) => {
  return {
    type: DELETE_CARD,
    payload: { columnKey, cardKey },
  };
};

export const deleteColumn = (value) => {
  return {
    type: DELETE_COLUMN,
    payload: value,
  };
};

export const deleteBoard = () => {
  return {
    type: DELETE_BOARD,
  };
};
