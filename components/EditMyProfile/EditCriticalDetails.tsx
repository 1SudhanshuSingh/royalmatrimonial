import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { FiUserX } from "react-icons/fi";
import { MaritalStatus } from "../../types/enums";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";

interface MyComponentProps {
  setCriticalDetails: (details: boolean) => void;
}
const EditCriticalDetials: FC<MyComponentProps> = ({ setCriticalDetails }) => {
  const formik = useFormik({
    initialValues: {
      dob: "",
      maritalstatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<{
    id: string;
    val: string;
  }>({ id: "", val: "" });
  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUserX />
            Critical Fields
            <span className={classes.DetailsTypeLeft_subHeading}>
              - Can be edit only once in lifetime
            </span>
          </div>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.singleDropdownContainer}>
            <DropdownGridSingleSelect
              title="Marital Status"
              data={MaritalStatus}
              nameid="maritalstatus"
              selectedDataFn={setSelectedMaritalStatus}
            />
          </div>
          <div className={classes.singleBox}>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              max="2001-01-02"
              placeholder="DateRange"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>

          <div className={classes.editDiscriptions}>
            <p>
              We will not allow any change in date of Birth and marital status
              after you submit this form. So please reconfirm the details
              carefully before submiting.
            </p>
            <p>
              Chagning Date of Birth will invalidate the previously bought
              premium Janampatri or Kundli Milan reports(if any)
            </p>
          </div>
          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              children="Save"
              setEditDetails={setCriticalDetails}
              buttonType={1}
            />
            <EditCustomButton
              children="Save"
              setEditDetails={setCriticalDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditCriticalDetials;