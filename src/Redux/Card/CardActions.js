import {
  CARD_KEY,
  EDIT_CARD,
  SET_CARD,
  VIEW_CARD,
  DRAG_DROP,
  CLOSE_VIEW_CARD,
  UNSET_CARD,
  CLOSE_EDIT_CARD,
  DELETE_CARD,
} from "./CardActionTypes";

export const cardKey = (key) => {
  return {
    type: CARD_KEY,
    payload: key,
  };
};

export const deleteCard = (value) => {
  return {
    type: DELETE_CARD,
    payload: value,
  };
};

export const editCard = (key, value, colKey) => {
  console.log(key, value, colKey);
  return {
    type: EDIT_CARD,
    payload: { key, value, colKey },
  };
};

export const setCard = (colKey) => {
  return {
    type: SET_CARD,
    payload: colKey,
  };
};

export const unsetCard = () => {
  return {
    type: UNSET_CARD,
  };
};
export const closeEditCard = () => {
  return {
    type: CLOSE_EDIT_CARD,
  };
};
export const viewCard = (key, value, colKey) => {
  return {
    type: VIEW_CARD,
    payload: { key, value, colKey },
  };
};

export const closeViewCard = () => {
  return {
    type: CLOSE_VIEW_CARD,
  };
};

export const dragDrop = (colKey, cardValue) => {
  return {
    type: DRAG_DROP,
    payload: { colKey, cardValue },
  };
};
