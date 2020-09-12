import React from "react";
import styles from "./DeleteModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { deleteModal } from "../../Redux/DeleteModal/deleteModal.actions";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

function DeleteModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.deleteModal.modal);
  const type = useSelector((state) => state.deleteModal.type);
  const cardKey = useSelector((state) => state.deleteModal.cardKey);
  const columnKey = useSelector((state) => state.deleteModal.columnKey);
  const selectedBoardKey = useSelector((state) => state.board.selectedBoardKey);

  const handleDelete = (e) => {
    e.preventDefault();
    if (type === "Card") {
      firebase
        .database()
        .ref(
          `/boards/${selectedBoardKey}/columns/${columnKey}/cards/${cardKey}`
        )
        .remove();
      console.log("card");
      dispatch(deleteModal(false));
    } else if (type === "Column") {
      firebase
        .database()
        .ref(`/boards/${selectedBoardKey}/columns/${columnKey}`)
        .remove();
      console.log("column");

      dispatch(deleteModal(false));
    } else if (type === "Board") {
      firebase
        .database()
        .ref(`/boards/${selectedBoardKey}/`)
        .remove()
        .then(() => {
          console.log("deleted");
          history.replace("/boards");
        });
      console.log("board");

      dispatch(deleteModal(false));
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(deleteModal(false));
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        onRequestClose={() => dispatch(deleteModal(false))}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.text}>
          <h4>Delete {type} ?</h4>
          <p>Are you sure you want to delete ?</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.delete} onClick={(e) => handleDelete(e)}>
            Delete
          </button>
          <button className={styles.cancel} onClick={(e) => handleCancel(e)}>
            cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
