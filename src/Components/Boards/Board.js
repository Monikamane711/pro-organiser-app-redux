import React, { useEffect, Fragment, lazy, Suspense } from "react";
import { Card, CardTitle, Button } from "reactstrap";
import styles from "./Board.module.css";

import { AiOutlinePlusCircle } from "react-icons/ai";
import AddColumnForm from "../addColumnForm/AddColumnForm";

import firebase from "firebase/app";
import NavBar from "../../Layout/NavBar/NavBar";
import { connect } from "react-redux";
import {
  getColumnData,
  setColumn,
  deleteBoard,
  deleteModal,
} from "../../Redux/Index";
import DeleteModal from "../DelelteModal/DeleteModal";
const Columns = lazy(() => import("../Columns/Columns"));

const Board = ({
  selectedBoardValue,
  selectedBoardKey,
  boardColumnsData,
  setColumn,
  getColumnData,
  deleteModal,
  deleteBoard,
}) => {
  const setModal = () => {
    setColumn(true);
  };

  useEffect(() => {
    firebase
      .database()
      .ref(`/boards/${selectedBoardKey}/columns/`)
      .on("value", (snapshot) => {
        getColumnData(snapshot.val());
      });
  }, [getColumnData, selectedBoardKey]);

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteModal(true);
    deleteBoard();
  };
  console.log(boardColumnsData);
  return (
    <Fragment className={styles.container}>
      <NavBar className={styles.NavBar}></NavBar>

      <div className={styles.board}>
        {selectedBoardValue !== null ? (
          <>
            <div className={styles.boardHead}>
              <p className={styles.boardName}>
                {selectedBoardValue.nameofBoard}
              </p>
              <Button
                onClick={(e) => deleteHandler(e)}
                color="danger"
                className={styles.Button}
              >
                Delele Board
              </Button>
            </div>

            <div className={styles.container}>
              <div className={styles.columnContainer}>
                {boardColumnsData !== null
                  ? Object.entries(boardColumnsData).map(([key, value]) => (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Columns
                          key={key}
                          columnKey={key}
                          value={value}
                        ></Columns>
                      </Suspense>
                    ))
                  : null}
              </div>

              <div>
                <Card
                  className={styles.Card}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                  onClick={() => setModal()}
                >
                  <CardTitle
                    className={styles.AddcardTitle}
                    style={{ textAlign: "center" }}
                  >
                    Add a column
                  </CardTitle>
                  <div className={styles.icon}>
                    <AiOutlinePlusCircle size={30} color="grey" />
                  </div>
                </Card>
              </div>
            </div>
            <AddColumnForm></AddColumnForm>
          </>
        ) : null}
      </div>
      <DeleteModal></DeleteModal>
    </Fragment>
  );
};

const matchStateToProps = (state) => {
  return {
    selectedBoardKey: state.board.selectedBoardKey,
    selectedBoardValue: state.board.selectedBoardValue,
    boardColumnsData: state.column.boardColumnsData,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    setColumn: (value) => dispatch(setColumn(value)),
    getColumnData: (value) => dispatch(getColumnData(value)),
    deleteModal: (value) => dispatch(deleteModal(value)),
    deleteBoard: () => dispatch(deleteBoard()),
  };
};
export default connect(matchStateToProps, matchDispatchToprops)(Board);
