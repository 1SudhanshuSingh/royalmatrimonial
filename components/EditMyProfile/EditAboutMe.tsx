import { FC } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { DiscribeYourself } from "../../types/enums";
import DropdownGridSingleSelect from "../DropdownGrid/DropdownGrid";
import classes from "./EditDetails.module.scss";
import EditCustomButton from "../Button/EditCustomButton";

interface MyComponentProps {
  setAboutMeDetails: (details: boolean) => void;
  step5Response: any;
}
const EditAboutMe: FC<MyComponentProps> = ({ setAboutMeDetails, step5Response }) => {
  const [typeInHindi, setTypeInHindi] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      intro: "",
      DiscribeYourself: "",
      Aboutmyfamily: "",
      aboutmyeducation: "",
      aboutmycareer: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 1));
      setAboutMeDetails(false);
    },
  });

  
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id?: string;
    val: string;
  }>({ id: "", val: "" });

  return (
    <>
      <div className={classes.content}>
        <div className={classes.DetailsTypeSec}>
          <div className={classes.DetailsTypeLeft}>
            <FiUser />
            About Me
          </div>
        </div>
        <div className={classes.typeInHindiSec}>
          <Form.Check
            type="switch"
            id="login_with"
            label="हिंदी में लिखें"
            className={
              typeInHindi
                ? classes.Form_Login_check
                : classes.Form_Login_checkDis
            }
            checked={typeInHindi}
            onChange={() => setTypeInHindi(!typeInHindi)}
          />
          <p>Need help writing?</p>
        </div>
        <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
          <div className={classes.EditsingleBox}>
            <Form.Control
              as="textarea"
              name="intro"
              rows={6}
              placeholder="I come from a middle-class family. The most important thing in my life is religious beliefs, moral values & respect for elders. I'm an easy-going, sincere,  caring person with a strong work ethic. I'm a modern thinker and follow good values given by our ancestors. I like Painting, love traveling with friends, writing, listening to classical music & watching the latest movies!"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              defaultValue={step5Response?.basic_intro}
            />
            <p>Character Count : 122</p>
            <div className={classes.TextareaDiscrip}>
              <span>
                Introduse Yourself. Write about your values , beliefs/goals and
                aspirations.
              </span>
              <span>
                How do you describe yourself ? Your Interests and hobbies.
              </span>
            </div>
          </div>
          {/* <div className={classes.EditsingleBox}>
            <DropdownGridSingleSelect
              title="Discribe Yourself in 5 words"
              data={DiscribeYourself}
              nameid="DiscribeYourself"
              selectedDataFn={setSelectedMotherTongue}
            />
          </div> */}
          <div className={classes.EditsingleBox}>
            <Form.Label>About My Family</Form.Label>
            <Form.Control
              as="textarea"
              name="Aboutmyfamily"
              rows={5}
              placeholder="Write about your parents and brothers or sisters. Where do they live? What are they doing?"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              defaultValue={step5Response?.about_family}
            />
          </div>
          <div className={classes.EditsingleBox}>
            <Form.Label>About My Educations</Form.Label>
            <Form.Control
              as="textarea"
              name="aboutmyeducation"
              rows={5}
              placeholder="Which institutions have you attended? What course/specializations have you studied?"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              defaultValue={step5Response?.about_education}

            />
          </div>
          <div className={classes.EditsingleBox}>
            <Form.Label>About My Career</Form.Label>
            <Form.Control
              as="textarea"
              name="aboutmycareer"
              rows={5}
              placeholder="Where are you working currently? You may mention your current job and future career aspirations."
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              defaultValue={step5Response?.about_career}
            />
          </div>

          <div className={classes.EditbuttonGroup}>
            <EditCustomButton
              title="Save"
              setEditDetails={setAboutMeDetails}
              buttonType={1}
            />
            <EditCustomButton
              title="Cancel"
              setEditDetails={setAboutMeDetails}
              buttonType={0}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditAboutMe;
