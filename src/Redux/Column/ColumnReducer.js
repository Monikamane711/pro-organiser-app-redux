import {
  COLUMN_KEY,
  DELETE_COLUMN,
  GET_BOARD_COLUMN_DATA,
  SET_COLUMN,
  UNSET_COLUMN,
} from "./ColumnActionTypes";

const initialState = {
  setColumnKey: null,
  setColumn: null,
  dragggedColumnKey: null,
  boardColumnsData: null,
  setDeleteColumn: false,
};

export const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLUMN_KEY:
      return {
        ...state,
        setColumnKey: action.payload.value,
      };

    case SET_COLUMN:
      return {
        ...state,
        setColumn: action.payload,
      };
    case UNSET_COLUMN:
      return {
        ...state,
        setColumn: false,
      };

    case DELETE_COLUMN:
      return {
        ...state,
        setDeleteColumn: action.payload,
      };

    case GET_BOARD_COLUMN_DATA:
      return {
        ...state,
        boardColumnsData: action.payload,
      };

    default:
      return state;
  }
};
