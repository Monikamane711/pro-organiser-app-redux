import React from "react";
import { Card, CardTitle } from "reactstrap";
import styles from "./Columns.module.css";
import BoardCards from "../BoardCard/BoardCards";
import { MdDelete } from "react-icons/md";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { deleteColumn, deleteModal } from "../../Redux/Index";

const Columns = ({
  columnKey,
  value,
  dragggedColumnKey,
  draggesCardData,
  selectedBoardKey,
  setdeleteColumn,
  deleteModal,
}) => {
  const deleteColumn = (columnKey) => {
    // firebase
    //   .database()
    //   .ref(`/boards/${selectedBoardKey}/columns/${columnKey}`)
    //   .remove();
    deleteModal(true);
    setdeleteColumn(columnKey);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    console.log("Dragged over column");
  };

  const onDrop = (e, columnKey) => {
    console.log(" Dropover column");

    let id = e.dataTransfer.getData("text");

    if (draggesCardData !== undefined) {
      console.log("success");
      firebase
        .database()
        .ref(
          `/boards/${selectedBoardKey}/columns/${dragggedColumnKey}/cards/${id}`
        )
        .remove();

      firebase
        .database()
        .ref(`/boards/${selectedBoardKey}/columns/${columnKey}/cards/${id}`)
        .set(draggesCardData);
    }
  };

  return (
    <div key={columnKey} className={styles.container}>
      <Card
        key={columnKey}
        className={styles.Card}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, columnKey)}
      >
        <CardTitle className={styles.cardTitle}>
          {value.taskTitle}
          <span style={{ float: "right" }}>
            <MdDelete
              onClick={(e) => deleteColumn(columnKey)}
              size={20}
            ></MdDelete>
          </span>
        </CardTitle>
        <BoardCards cards={value.cards} columnKey={columnKey}></BoardCards>
      </Card>
    </div>
  );
};

const matchStateToProps = (state) => {
  return {
    dragggedColumnKey: state.card.dragggedColumnKey,
    draggesCardData: state.card.draggesCardData,
    selectedBoardKey: state.board.selectedBoardKey,
    deleteColumnState: state.column.setDeleteColumn,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    setdeleteColumn: (value) => dispatch(deleteColumn(value)),
    deleteModal: (value) => dispatch(deleteModal(value)),
  };
};
export default connect(matchStateToProps, matchDispatchToprops)(Columns);
