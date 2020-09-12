import React, { Fragment } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { v4 } from "uuid";
import styles from "./CreateBoardForm.module.css";
import firebase from "firebase/app";
import NavBar from "../../Layout/NavBar/NavBar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBoardForm = () => {
  let history = useHistory();
  const initialValues = {
    nameofBoard: "",
    teamMembers: [],
    typeOfBoard: "",
  };
  const onSubmit = (values) => {
    handleSubmit(values);
  };
  const validationSchema = yup.object({
    nameofBoard: yup.string().required("Required"),
    teamMembers: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const handleSubmit = (values) => {
    setData(values);
    formik.resetForm();
    toast("Board Created!!", {
      type: "success",
      autoClose: false,
      onClose: () => history.push("/boards"),
    });
  };
  const setData = async ({ nameofBoard, teamMembers, typeOfBoard }) => {
    await firebase
      .database()
      .ref(`/boards/${v4()}/`)
      .set({ nameofBoard, teamMembers, typeOfBoard }, function (error) {
        if (error) {
          console.log(error);
        } else {
          return "success";
        }
      });
  };
  return (
    <Fragment>
      <NavBar></NavBar>
      <div>
        <p className={styles.head}> Create Your Board</p>
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="name" className={styles.label}>
              Name of Board
            </Label>
            <Input
              type="text"
              name="nameofBoard"
              id="name"
              placeholder=""
              onBlur={formik.handleBlur}
              value={formik.values.nameofBoard}
              onChange={formik.handleChange}
            ></Input>
            {formik.errors.nameofBoard && formik.touched.nameofBoard ? (
              <div className={styles.error}>{formik.errors.nameofBoard}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>
              Team Members{" "}
              <p
                style={{
                  fontSize: "12px",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                }}
              >
                (Add multiple if needed. e.g: "NN : Nikhil Nair , BS: Bhushan
                Shewale")
              </p>
            </Label>
            <Input
              type="text"
              name="teamMembers"
              id="team"
              placeholder="NN : Nikhil Nair"
              onBlur={formik.handleBlur}
              value={formik.values.teamMembers}
              onChange={formik.handleChange}
              className={styles.members}
            ></Input>
            {formik.errors.teamMembers && formik.touched.teamMembers ? (
              <div className={styles.error}>{formik.errors.teamMembers}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Type of Board (optional)</Label>
            <Input
              type="text"
              name="typeOfBoard"
              id="type"
              placeholder="e.g. Design board, Testing board, etc."
              onBlur={formik.handleBlur}
              value={formik.values.typeOfBoard}
              onChange={formik.handleChange}
            ></Input>
          </FormGroup>
          <Button
            size="md"
            id="CreateBoard"
            type="submit"
            className={styles.createButton}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Create Board
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default CreateBoardForm;
