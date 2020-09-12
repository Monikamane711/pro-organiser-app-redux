import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "./EditDeleteIcons.module.css";
import AddCardForm from "../AddCardForm/AddCardForm";
import { editCard, closeViewCard } from "../../Redux/Index";
import firebase from "firebase/app";
import { connect } from "react-redux";

const EditDeleteIcons = ({
  cardKey,
  columnKey,
  cardValue,
  selectedBoardKey,
  editCard,
  closeViewCard,
}) => {
  const [visible, setVisible] = useState(false);

  const setEditCard = () => {
    setVisible(true);

    editCard(cardKey, cardValue, columnKey);
  };

  const deleteCard = () => {
    console.log("click");
    firebase
      .database()
      .ref(`/boards/${selectedBoardKey}/columns/${columnKey}/cards/${cardKey}`)
      .remove();

    closeViewCard();
  };
  return (
    <>
      <span className={styles.icons} key={cardKey}>
        <span className={styles.icon}>
          <MdEdit size={20} onClick={() => setEditCard()}></MdEdit>
        </span>
        <span className={styles.icon}>
          <MdDelete size={20} onClick={() => deleteCard()}></MdDelete>
        </span>
      </span>
      {visible === true ? (
        <AddCardForm columnKey={columnKey}></AddCardForm>
      ) : null}
    </>
  );
};
const matchStateToProps = (state) => {
  return {
    selectedBoardKey: state.board.selectedBoardKey,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    editCard: (key, value, columnKey) =>
      dispatch(editCard(key, value, columnKey)),
    closeViewCard: () => dispatch(closeViewCard()),
  };
};
export default connect(
  matchStateToProps,
  matchDispatchToprops
)(EditDeleteIcons);
