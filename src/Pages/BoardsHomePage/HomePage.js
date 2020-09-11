import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./HomePage.module.css";
import { Button } from "reactstrap";
import NavBar from "../../Layout/NavBar/NavBar";
import Loader from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { selectedBoardKey, getData, setLoader } from "../../Redux/Index";
import firebase from "firebase/app";

const HomePage = ({
  boards,
  loader,
  selectedBoardKey,
  getData,
  setLoader,
  uid,
}) => {
  console.log(loader, boards);
  const history = useHistory();
  console.log(boards);
  const handleClick = (key, value) => {
    selectedBoardKey(key, value);
    history.push(`/board/${key}/${value.nameofBoard}`);
  };
  const openCreateBoard = () => {
    history.replace(`/createBoard`);
  };

  useEffect(() => {
    setLoader(true);
    const boardsRef = firebase.database().ref(`/users/${uid}/boards/`);
    boardsRef.on("value", (snapshot) => {
      getData(snapshot.val());
      setLoader(false);
    });
  }, [setLoader, getData, uid]);

  if (loader === true) {
    return (
      <>
        <NavBar></NavBar>

        <Loader></Loader>
      </>
    );
  }
  return (
    <Fragment>
      <NavBar></NavBar>
      <div className={styles.HomePage}>
        <div className={styles.head}>Boards</div>
        {boards !== null && loader === false ? (
          <div className={styles.boardsContainer}>
            {Object.entries(boards).map(([key, value]) => (
              <div key={key} onClick={() => handleClick(key, value)}>
                <div className={styles.boardCard}>
                  <p className={styles.boardName}>{value.nameofBoard}</p>
                </div>
              </div>
            ))}{" "}
          </div>
        ) : null}
        {boards === null && loader === false ? (
          <>
            <p>
              You haven't created any boards. Kindly click on the 'Create Board'
              button in the navigation bar to create a board.
            </p>
          </>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
    loader: state.board.loader,
    uid: state.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectedBoardKey: (key, value) => dispatch(selectedBoardKey(key, value)),
    getData: (value) => dispatch(getData(value)),
    setLoader: (value) => dispatch(setLoader(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
