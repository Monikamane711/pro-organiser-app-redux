import React, { useState, useEffect } from "react";
import styles from "./AddCardForm.module.css";
import Modal from "react-modal";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import { v4 } from "uuid";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { closeViewCard, unsetCard, closeEditCard } from "../../Redux/Index";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const AddCardForm = ({
  columnKey,
  editCard,
  setCardValue,
  setCardKey,
  setCard,
  closeViewCard,
  unsetCard,
  closeEditCard,
  selectedBoardValue,
  selectedBoardKey,
}) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [membersTouched, setMembersTouched] = useState(false);

  const initialValues = {
    taskTitle: "",
    description: "",
    dueDate: "",
  };

  let date;
  const onSubmit = (values) => {
    date = formatDate(formik.values.dueDate);
    handleSubmit(values);
  };
  const validationSchema = yup.object({
    taskTitle: yup.string().required("Required"),
    description: yup.string().required("Required"),
    dueDate: yup.string().required("Required"),
  });

  const formatDate = (dueDate) => {
    let newDate = dueDate.split("-");
    let months = [
      "None",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let month = months[parseInt(newDate[1])];
    let formattedDate = `${newDate[2]} ${month} ${newDate[0]}`;
    return formattedDate;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const createMembersArray = (members) => {
    let membersString = members;
    let membersArray = membersString.split(",");
    return membersArray;
  };

  const handleChangeMembers = (selectedOptions) => {
    setSelectedMembers([]);
    setSelectedMembers(selectedOptions);
    setMembers([]);
  };

  let newArray;
  const selectedMembersArray = (allTeamMembers) => {
    console.log(members);
    let teamMembers = createMembersArray(allTeamMembers);
    newArray = teamMembers.filter((member) => members.indexOf(member) === -1);
    console.log(newArray);
    for (let i = 0; i < members.length; i++) {
      newArray.unshift(members[i]);
    }

    return newArray;
  };

  const viewToast = () => {
    toast("Card Created!!", {
      type: "success",
      autoClose: false,
      // onClose: () => history.push("/boards"),
    });
  };
  const handleSubmit = ({ taskTitle, description }) => {
    for (let i = 0; i < selectedMembers.length; i++) {
      console.log(selectedMembers[i].value);
      members.push(selectedMembers[i].value);
    }

    closeEditCard();
    closeViewCard();

    console.log("submitted");
    if (editCard === true && setCard === false) {
      try {
        console.log("database");
        firebase
          .database()
          .ref(
            `/boards/${selectedBoardKey}/columns/${columnKey}/cards/${setCardKey}`
          )
          .set({ members }, (error) => {
            if (error) {
              console.log(error);
            } else {
              formik.resetForm();
              setSelectedMembers([]);
              setMembers([]);
              viewToast();
              console.log("success");
            }
          });
      } catch (err) {
        console.log(err);
      }
      try {
        firebase
          .database()
          .ref(
            `/boards/${selectedBoardKey}/columns/${columnKey}/cards/${setCardKey}`
          )
          .update({ taskTitle, description, date }, (error) => {
            if (error) {
              console.log(error);
            } else {
              formik.resetForm();
              setSelectedMembers([]);
              setMembers([]);
              viewToast();

              console.log("success");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        console.log("database");

        firebase
          .database()
          .ref(`/boards/${selectedBoardKey}/columns/${columnKey}/cards/${v4()}`)
          .set({ taskTitle, members, description, date }, (error) => {
            if (error) {
              console.log(error);
            } else {
              formik.resetForm();
              setSelectedMembers([]);
              setMembers([]);
              viewToast();

              console.log("success");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    console.log("editcardFalse");
  };

  useEffect(() => {
    if (editCard === true && setCard === false) {
      formik.values.taskTitle = setCardValue.taskTitle;
      formik.values.description = setCardValue.description;
      setMembers(setCardValue.members);
      formik.values.dueDate = setCardValue.dueDate;
    }
  }, [
    setCardValue,
    editCard,
    setCard,
    formik.values.taskTitle,
    formik.values.description,
    formik.values.dueDate,
  ]);

  const closeModal = () => {
    unsetCard();
    closeViewCard();
    closeEditCard();
  };
  return (
    <Modal
      isOpen={setCard || editCard}
      onRequestClose={() => closeModal()}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.close}>
        <FaTimesCircle
          size={30}
          color="grey"
          onClick={() => closeModal()}
        ></FaTimesCircle>
      </div>
      <p className={styles.head}> Add Task</p>
      <Form className={styles.form} onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label className={styles.label}>Title for Task</Label>
          <Input
            type="text"
            id="title"
            placeholder="e.g Add a new icon"
            name="taskTitle"
            onBlur={formik.handleBlur}
            value={formik.values.taskTitle}
            onChange={formik.handleChange}
          ></Input>
          {formik.errors.taskTitle && formik.touched.taskTitle ? (
            <div className={styles.error}>{formik.errors.taskTitle}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className={styles.label}>
            Choose members for this task(select, multiple if needed)
            <p
              style={{
                fontSize: "12px",
                paddingBottom: "0px",
                marginBottom: "0px",
              }}
            ></p>
          </Label>
          <Input
            type="select"
            id="exampleSelect"
            // onChange={(e) => handleChangeMembers(e.target.selectedOptions)}
            name="members"
            onChange={(e) => handleChangeMembers(e.target.selectedOptions)}
            onClick={(e) => setMembersTouched(true)}
            multiple
            required
          >
            {editCard === false && setCard === true
              ? createMembersArray(selectedBoardValue.teamMembers).map(
                  (value, index) => (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  )
                )
              : selectedMembersArray(selectedBoardValue.teamMembers).map(
                  (value, index) => {
                    if (index < members.length) {
                      return (
                        <option value={value} key={index} selected>
                          {value}
                        </option>
                      );
                    } else {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  }
                )}
          </Input>
          {selectedMembers.length === 0 && membersTouched ? (
            <div className={styles.error}>Please Select atlest 1 member</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className={styles.label}>Type of Board</Label>
          <Input
            type="text"
            id="description"
            placeholder="Add your description here"
            name="description"
            onBlur={formik.handleBlur}
            value={formik.values.description}
            onChange={formik.handleChange}
          ></Input>
          {formik.errors.description && formik.touched.description ? (
            <div className={styles.error}>{formik.errors.description}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label className={styles.label}>Due Date</Label>
          <Input
            type="date"
            id="due_date"
            name="dueDate"
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
            onChange={formik.handleChange}
          />
          {formik.errors.dueDate && formik.touched.dueDate ? (
            <div className={styles.error}>{formik.errors.dueDate}</div>
          ) : null}
        </FormGroup>
        <Button
          size="md"
          id="CreateCard"
          type="submit"
          className={styles.createButton}
          disabled={!(formik.isValid && selectedMembers.length !== 0)}
        >
          {editCard === true && setCard === false ? "Save Changes" : "Add Card"}
        </Button>
      </Form>
    </Modal>
  );
};

const matchStateToProps = (state) => {
  return {
    setCard: state.card.setCard,
    editCard: state.card.editCard,
    setCardValue: state.card.setCardValue,
    setCardKey: state.card.setCardKey,
    selectedBoardKey: state.board.selectedBoardKey,
    selectedBoardValue: state.board.selectedBoardValue,
    columnKey: state.card.columnKey,
  };
};
const matchDispatchToprops = (dispatch) => {
  return {
    closeViewCard: (key, value) => dispatch(closeViewCard(key, value)),
    unsetCard: () => dispatch(unsetCard()),
    closeEditCard: () => dispatch(closeEditCard()),
  };
};
export default connect(matchStateToProps, matchDispatchToprops)(AddCardForm);
