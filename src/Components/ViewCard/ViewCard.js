import React from "react";
import styles from "./ViewCard.module.css";
import Modal from "react-modal";
import { Form, FormGroup, Label } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import EditDeleteIcons from "../EditDeleteIcons/EditDeleteIcons";
import { closeViewCard } from "../../Redux/Index";
import { connect } from "react-redux";

const ViewCard = ({
  columnKey,
  closeViewCard,
  setCardValue,
  viewCard,
  setCardKey,
}) => {
  const closeModal = () => {
    closeViewCard();
  };
  return (
    <Modal
      isOpen={viewCard}
      onRequestClose={() => closeModal()}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.close}>
        <EditDeleteIcons
          columnKey={columnKey}
          cardKey={setCardKey}
          cardValue={setCardValue}
        ></EditDeleteIcons>
        <FaTimesCircle
          size={25}
          color="grey"
          onClick={() => closeModal()}
        ></FaTimesCircle>
      </div>
      <div className={styles.headContainer}>
        <p className={styles.head}>Task</p>
        <p className={styles.date}>
          {" "}
          {setCardValue !== null ? setCardValue.date : null}
        </p>
      </div>
      {setCardValue !== null ? (
        <Form className={styles.form}>
          <FormGroup>
            <Label className={styles.label}>Title for Task</Label>
            <p>{setCardValue.taskTitle}</p>
            <p></p>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Team Members</Label>
            <p>{setCardValue.members}</p>

            <p></p>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Type of Board</Label>
            <p>{setCardValue.description}</p>

            <p></p>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Due Date</Label>
            <p>{setCardValue.date}</p>

            <p></p>
          </FormGroup>
        </Form>
      ) : null}
    </Modal>
  );
};
const matchStateToProps = (state) => {
  return {
    setCardValue: state.card.setCardValue,
    viewCard: state.card.viewCard,
    setCardKey: state.card.setCardKey,
    columnKey: state.card.columnKey,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    closeViewCard: () => dispatch(closeViewCard()),
  };
};
export default connect(matchStateToProps, matchDispatchToprops)(ViewCard);
