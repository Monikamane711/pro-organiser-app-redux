import React, { Fragment } from "react";
import styles from "./LandingPage.module.css";
import { useHistory } from "react-router-dom";
import NavBar from "../../Layout/NavBar/NavBar";


const LandingPage = () => {
  let history = useHistory();

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className={styles.Container}>
        <div className={styles.landingPage}>
            <div>
              <p className={styles.mainText}>
               Welcome to Pro-Organiser-App
              </p>
            </div>
          </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
