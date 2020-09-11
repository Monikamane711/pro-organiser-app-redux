import React, { Fragment, useState } from "react";
import styles from "./Login.module.css";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import NavBar from "../../Layout/NavBar/NavBar";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/Index";
import * as yup from "yup";
import {
  userDetails,
  loginError,
  isAuthenticated,
} from "../../Redux/Authentication/AuthActions";
import { useFormik } from "formik";

const Login = () => {
  // const [showpassword] = useState(false);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.board.loader);
  const error = useSelector((state) => state.auth.logInError);
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    handleSubmit(values);
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email Required")
      .email("Invalid Email Format"),
    password: yup.string().required("Password Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleSubmit = (values) => {
    console.log("submitted");
    dispatch(setLoader(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        console.log(res);
        dispatch(
          userDetails(res.user.email, res.user.uid, res.user.displayName)
        );
        dispatch(loginError(""));
        dispatch(setLoader(false));
        dispatch(isAuthenticated(true));
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(loginError(err.message));
        dispatch(setLoader(false));
        clearError();
      });
  };

  function clearError() {
    setTimeout(() => {
      dispatch(loginError(""));
    }, 10000);
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      {loader === true ? (
        <div className={styles.loaderContainer}>
          <Loader></Loader>
        </div>
      ) : null}
      <div className={styles.container}>
        <div className={styles.signupPage}>
          <div className={styles.formContainer}>
            <div>
              <p className={styles.text}> Log In </p>
            </div>
            {error ? (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : null}
            <Form onSubmit={formik.handleSubmit} className={styles.formGroup}>
              <FormGroup className={styles.Emailform}>
                <Label for="name" className="mr-sm-2">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </FormGroup>

              <FormGroup className={styles.RewritePasswordForm}>
                <Label for="password" className="mr-sm-2">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </FormGroup>
              <Button
                disabled={!formik.isValid}
                type="submit"
                className={styles.button}
              >
                Log In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
