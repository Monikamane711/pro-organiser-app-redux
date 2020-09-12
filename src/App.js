import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBoardForm from "./Pages/CreateBoardPage/CreateBoardForm";
import HomePage from "./Pages/BoardsHomePage/HomePage";
import Board from "./Components/Boards/Board";
import { store, persistor } from "./Redux/store";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig/firebaseConfig";
import { PersistGate } from "redux-persist/integration/react";

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />

          <Switch>
            <Route exact path={`/`} component={HomePage} />

            <Route exact path={`/boards`} component={HomePage} />

            <Route exact path="/createBoard" component={CreateBoardForm} />

            <Route
              exact
              path="/board/:boardKey/:boardName"
              component={Board}
            ></Route>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
