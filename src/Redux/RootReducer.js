import { combineReducers } from "redux";
import { cardReducer } from "./Card/CardReducer";
import { columnReducer } from "./Column/ColumnReducer";
import { boardReducer } from "./BoardData/BoardReducer";
import { DeleteModalReducer } from "./DeleteModal/DeleteModalReducer";

export const rootReducer = combineReducers({
  card: cardReducer,
  column: columnReducer,
  board: boardReducer,
  deleteModal: DeleteModalReducer,
});
