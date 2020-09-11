import React, { useEffect } from "react";
import styles from "./Relogin.module.css";
import NavBar from "../../Layout/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { setLoader } from "../../Redux/Index";
import { isAuthenticated } from "../../Redux/Authentication/AuthActions";
import { useHistory } from "react-router";

const Relogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoader(true));
    setTimeout(() => {
      dispatch(isAuthenticated(false));
    }, 2000);
    dispatch(setLoader(false));
    history.replace("/home");
  });

  return <></>;
};

export default Relogin;
