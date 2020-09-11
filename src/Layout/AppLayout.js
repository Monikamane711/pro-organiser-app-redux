import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBoardForm from "../Pages/CreateBoardPage/CreateBoardForm";
import HomePage from "../Pages/BoardsHomePage/HomePage";
import Board from "../Components/Boards/Board";
import Login from "../Pages/Login/Login";
import { store, persistor } from "../Redux/store";
import { Provider } from "react-redux";
import "firebase/database";
import "firebase/auth";
import { PersistGate } from "redux-persist/integration/react";

function AppLayout() {
  return (
    <div>
      return (
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer />

            <Switch>
              <Route exact path={`/`} component={HomePage} />

              <Route exact path={"/login"} component={Login} />

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
    </div>
  );
}

export default AppLayout;
