import React, { Fragment } from "react";
import styles from "./SignUp.module.css";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import NavBar from "../../Layout/NavBar/NavBar";
import { useFormik } from "formik";
import * as yup from "yup";
import { setLoader } from "../../Redux/Index";
import { useDispatch, useSelector } from "react-redux";
import {
  userDetails,
  signinError,
  isAuthenticated,
} from "../../Redux/Authentication/AuthActions";


const SignUp = () => {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    reEnterPassword: "",
  };

  const history = useHistory();
  const error = useSelector((state) => state.auth.signInError);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    handleSubmit(values);
  };

  const validationSchema = yup.object({
    name: yup.string().required("required"),
    email: yup.string().email("Invalid email format").required("required"),
    password: yup.string().required("required"),
    reEnterPassword: yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  console.log("Visited Fields", formik.touched);

  const handleSubmit = ({ email, password, name }) => {
    console.log("submitted");
    dispatch(setLoader(true));

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        res.user.updateProfile({
          displayName: name,
        });
        dispatch(
          userDetails(res.user.email, res.user.uid, res.user.displayName)
        );
        dispatch(signinError(""));
        dispatch(setLoader(false));
        dispatch(isAuthenticated(true));
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        dispatch(signinError(err.message));
        clearError();
      });
  };

  function clearError() {
    setTimeout(() => {
      dispatch(signinError(""));
    }, 10000);
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.signupPage}>
          <div className={styles.formContainer}>
            <div className={styles.headContainer}>
              <p className={styles.text}> Sign Up </p>
            </div>
            {error ? (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : null}
            <Form onSubmit={formik.handleSubmit} className={styles.formGroup}>
              <FormGroup className={styles.Emailform}>
                <Label for="email" className="mr-sm-2">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="emaill"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </FormGroup>
              <FormGroup className={styles.Usernameform}>
                <Label for="name" className="mr-sm-2">
                  Username
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="namee"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  style={{ backgroundColor: "#d1d1d1" }}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </FormGroup>
              <FormGroup className={styles.PasswordForm}>
                <Label for="password" className="mr-sm-2">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="passwordd"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  style={{ backgroundColor: "#d1d1d1" }}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </FormGroup>
              <FormGroup className={styles.RewritePasswordForm}>
                <Label for="reEnterPassword" className="mr-sm-2">
                  Re-enter Password
                </Label>
                <Input
                  type="password"
                  name="reEnterPassword"
                  id="reEnterPasswordd"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={formik.handleChange}
                  value={formik.values.reEnterPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.reEnterPassword &&
                formik.touched.reEnterPassword ? (
                  <div>{formik.errors.reEnterPassword}</div>
                ) : null}
              </FormGroup>
              <Button
                disabled={!formik.isValid}
                type="submit"
                className={styles.button}
              >
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
