import React, { useState } from "react";
import { Card, CardTitle, Button } from "reactstrap";
import styles from "./BoardCards.module.css";
import ViewCard from "../ViewCard/ViewCard";
import AddCardForm from "../AddCardForm/AddCardForm";
import { MdViewList, MdEdit, MdDelete } from "react-icons/md";

import {
  viewCard,
  setCard,
  dragDrop,
  editCard,
  deleteCard,
  deleteModal,
} from "../../Redux/Index";
import { connect } from "react-redux";

const BoardCards = ({
  cards,
  columnKey,
  viewCard,
  setCard,
  editCard,
  dragDrop,
  viewCardValue,
  deleteModal,
  setdeleteCard,
}) => {
  const [visible, setVisible] = useState(false);

  const splitNames = (member) => {
    let split = member.split(":");
    return split[0];
  };

  const viewCardClick = (key, value, colKey) => {
    console.log(key);

    viewCard(key, value, colKey);
  };

  const setEditCard = (key, value, colKey) => {
    setVisible(true);

    editCard(key, value, colKey);
  };

  const addCardClick = (colKey) => {
    setCard(colKey);

    setVisible(true);
  };

  const deleteCard = (key) => {
    console.log(columnKey, key);
    setdeleteCard(columnKey, key);
    deleteModal(true);
  };

  // if (deleteCardState === true) {
  //   // firebase
  //   //   .database()
  //   //   .ref(
  //   //     `/boards/${selectedBoardKey}/columns/${columnKey}/cards/${delteCardKey}`
  //   //   )
  //   //   .remove();
  //   // deleteCardDispatch(false);
  // }

  const onDragStart = (e, cardKey, cardValue, colKey) => {
    console.log(e, cardKey, cardValue);
    e.dataTransfer.setData("text/plain", cardKey);
    dragDrop(colKey, cardValue);
  };
  return (
    <div key={columnKey}>
      <div>
        <div className={styles.container}>
          {cards !== undefined
            ? Object.entries(cards).map(([key, value]) => (
                <Card
                  className={styles.card}
                  key={key}
                  value={value}
                  id={key}
                  draggable
                  onDragStart={(e) => onDragStart(e, key, value, columnKey)}
                >
                  <div className={styles.header}>
                    <div>
                      <CardTitle className={styles.title}>
                        {value.taskTitle}
                      </CardTitle>
                    </div>
                    <div className={styles.empty}></div>
                    <div
                      style={{ marginLeft: "6px", color: "rgb(70, 69, 69)" }}
                    >
                      <MdDelete
                        className={styles.icon}
                        onClick={() => deleteCard(key)}
                        size={20}
                      ></MdDelete>
                    </div>
                  </div>
                  <div className={styles.footer}>
                    <span className={styles.icons}>
                      <span className={styles.icon}>
                        <MdEdit
                          onClick={() => setEditCard(key, value, columnKey)}
                          size={20}
                        ></MdEdit>
                      </span>
                      <span className={styles.icon}>
                        <MdViewList
                          onClick={() => viewCardClick(key, value, columnKey)}
                          size={25}
                        ></MdViewList>
                      </span>
                    </span>
                    {value.members
                      ? value.members.map((member) => (
                          <span className={styles.circle}>
                            <span className={styles.name}>
                              {splitNames(member)}
                            </span>
                          </span>
                        ))
                      : null}
                  </div>
                </Card>
              ))
            : null}
        </div>
        <Button
          className={styles.button}
          onClick={() => addCardClick(columnKey)}
        >
          Add Card
        </Button>
      </div>
      {viewCardValue === true ? <ViewCard></ViewCard> : null}
      {visible && <AddCardForm></AddCardForm>}
    </div>
  );
};

const matchStateToProps = (state) => {
  return {
    selectedBoardKey: state.board.selectedBoardKey,
    viewCardValue: state.card.viewCard,
    deleteCardState: state.card.deleteCard,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    viewCard: (key, value, colKey) => dispatch(viewCard(key, value, colKey)),
    setCard: (colKey) => dispatch(setCard(colKey)),
    editCard: (key, value, colKey) => dispatch(editCard(key, value, colKey)),
    dragDrop: (colKey, cardValue) => dispatch(dragDrop(colKey, cardValue)),
    setdeleteCard: (colKey, cardKey) => dispatch(deleteCard(colKey, cardKey)),
    deleteModal: (value) => dispatch(deleteModal(value)),
  };
};
export default connect(matchStateToProps, matchDispatchToprops)(BoardCards);
