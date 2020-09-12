import {
  DELETE_MODAL,
  DELETE_COLUMN,
  DELETE_BOARD,
  DELETE_CARD,
} from "./DeleteModal.actionTypes";

const initialState = {
  modal: false,
  type: "",
  delete: "",
  columnKey: "",
  cardKey: "",
};

export const DeleteModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case DELETE_CARD:
      return {
        ...state,
        type: "Card",
        delete: true,
        columnKey: action.payload.columnKey,
        cardKey: action.payload.cardKey,
      };
    case DELETE_COLUMN:
      return {
        ...state,
        type: "Column",
        delete: true,
        columnKey: action.payload,
      };
    case DELETE_BOARD:
      return {
        ...state,
        type: "Board",
        delete: true,
      };
    default:
      return state;
  }
};
