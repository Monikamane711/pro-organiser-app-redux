import {
  CARD_KEY,
  DELETE_CARD,
  EDIT_CARD,
  SET_CARD,
  VIEW_CARD,
  DRAG_DROP,
  CLOSE_VIEW_CARD,
  UNSET_CARD,
  CLOSE_EDIT_CARD,
} from "./CardActionTypes";

const initialState = {
  viewCard: false,
  setCardKey: null,
  setCardValue: null,
  editCard: false,
  setCard: false,
  draggesCardData: null,
  dragggedColumnKey: "",
  columnKey: "",
  deleteCard: false,
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARD:
      console.log(action.payload);

      return {
        ...state,
        columnKey: action.payload,
        setCard: true,
      };

    case EDIT_CARD:
      console.log(action.payload);

      return {
        ...state,
        setCardKey: action.payload.key,
        setCardValue: action.payload.value,
        columnKey: action.payload.colKey,
        editCard: true,
      };

    case VIEW_CARD:
      return {
        ...state,
        setCardKey: action.payload.key,
        setCardValue: action.payload.value,
        columnKey: action.payload.colKey,
        viewCard: true,
      };
    case CLOSE_VIEW_CARD:
      return {
        ...state,

        viewCard: false,
      };

    case UNSET_CARD:
      return {
        ...state,
        setCard: false,
      };

    case CLOSE_EDIT_CARD:
      return {
        ...state,
        editCard: false,
      };

    case DRAG_DROP:
      return {
        ...state,
        draggesCardData: action.payload.cardValue,
        dragggedColumnKey: action.payload.colKey,
      };

    case DELETE_CARD:
      return {
        ...state,
        deleteCard: action.payload,
      };

    case CARD_KEY:
      return {
        ...state,
        setCardKey: action.payload,
      };

    default:
      return state;
  }
};
