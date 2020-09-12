import React, { useState, useEffect } from "react";
import styles from "./AddColumnForm.module.css";
import Modal from "react-modal";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import { unsetColumn } from "../../Redux/Index";
import firebase from "firebase/app";
import { v4 } from "uuid";
import { connect } from "react-redux";
import { deleteColumn } from "../../Redux/Column/ColumnActions";

const AddColumnForm = ({
  setColumnState,
  unsetColumn,
  selectedBoardKey,
  deleteColumnDispatch,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const closeModal = () => {
    unsetColumn();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref(`/boards/${selectedBoardKey}/columns/${v4()}/`)
      .set({ taskTitle }, function (error) {
        if (error) {
          console.log(error);
        } else {
          setTaskTitle("");
        }
      });
  };

  useEffect(() => {
    deleteColumnDispatch(false);
  }, [deleteColumnDispatch]);
  return (
    <Modal
      isOpen={setColumnState}
      onRequestClose={() => closeModal()}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.close}>
        <FaTimesCircle
          size={25}
          color="grey"
          onClick={() => closeModal()}
        ></FaTimesCircle>
      </div>

      <p className={styles.head}> Add Column</p>
      <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label className={styles.label}>Enter a column name:</Label>
          <Input
            type="text"
            id="column_name"
            value={taskTitle}
            placeholder=""
            onChange={(e) => setTaskTitle(e.target.value)}
          ></Input>
        </FormGroup>
        <Button
          type="submit"
          id="CreateColumn"
          size="md"
          className={styles.createButton}
        >
          Add Column
        </Button>
      </Form>
    </Modal>
  );
};
const matchStateToProps = (state) => {
  return {
    selectedBoardKey: state.board.selectedBoardKey,
    setColumnState: state.column.setColumn,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    unsetColumn: () => dispatch(unsetColumn()),
    deleteColumnDispatch: (value) => dispatch(deleteColumn(value)),
  };
};
export default connect(matchStateToProps, matchDispatchToprops)(AddColumnForm);
