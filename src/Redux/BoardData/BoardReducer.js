import {
  GET_DATA,
  SELECTED_BOARD_KEY,
  SELECTED_BOARD_VALUES,
  LOADER,
  DELETE_BOARD,
} from "./BooardActionTypes";

const initialState = {
  boards: null,
  selectedBoardKey: null,
  selectedBoardValue: null,
  loader: false,
  deleteBoard: false,
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        boards: action.payload,
        loader: false,
      };

    case SELECTED_BOARD_VALUES:
      return {
        ...state,
        boardValues: action.payload,
      };

    case DELETE_BOARD:
      return {
        ...state,
        deleteBoard: true,
      };
    case SELECTED_BOARD_KEY:
      return {
        ...state,
        selectedBoardKey: action.payload.key,
        selectedBoardValue: action.payload.value,
      };

    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    default:
      return state;
  }
};
