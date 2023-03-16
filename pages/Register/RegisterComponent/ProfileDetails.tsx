import { Container, Row, Col, Form, Button } from "react-bootstrap";
import classes from "./Component.module.scss";
import { useFormik } from "formik";
import {
  MotherTongue,
  ProfileFor,
  MaritalStatus,
  Religion,
  ChildrenStatus,
  Challenged,
  isHiv,
  Manglik,
} from "../../../types/enums";
import {
  AvatarPicker,
  DropdownGridSingleSelect,
  GenderRadioButtons,
} from "../../../components";
import RightSection from "./RightSection/RightSection";
import { useEffect, useState } from "react";
import { useHeightConverter } from "../../../hooks/utils/useHeightConvert";
import { CastList } from "../../../constants/CastList";
import CastDataList from "../../../components/CastDataList/CastDataList";
import { STEP_1 } from "../../../ducks/regiserUser/step1/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectStep1Success } from "../../../ducks/regiserUser/step1/selectors";
import axios from "axios";
import { selectSignUpSuccess } from "../../../ducks/signUp/selectors";
import { selectSignInSuccess } from "../../../ducks/signIn/selectors";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ nextPage }) => {
  const dispatch = useDispatch();
  const stepOneDefaultValues = useSelector(selectStep1Success);
  const userIdSignUp = useSelector(selectSignUpSuccess)?.output;
  const userIdSignIn = useSelector(selectSignInSuccess)?.jsonResponse?.userid;

  const jsonData = stepOneDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  useEffect(() => {
    if (isReduxEmpty === undefined) {
      dispatch({
        type: STEP_1,
        payload: { actionType: "V", userId: userIdSignUp ?? userIdSignIn },
      });
    }
    setGender(jsonData?.gender === "M" ? "1" : "2");
  }, []);

  const { feet, cm, handleFeetChange, handleCmChange } = useHeightConverter();
  const [selectedProfileFor, setSelectedProfileFor] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.profile_for), val: "" });
  const [selectedChallenged, setSelectedChallenged] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.challenged), val: "" });
  const [selectedIsHiv, setSelectedIsHiv] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.hiv), val: "" });
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.mother_tongue), val: "" });
  const [selectedReligion, setSelectedReligion] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.religion), val: "" });
  const [selectedManglik, setSelectedManglik] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.manglik), val: "" });
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.marital_status), val: "" });
  const [selectedChildrenStatus, setSelectedChildrenStatus] = useState<{
    id: string;
    val: string;
  }>({ id: String(jsonData?.children_status), val: "" });
  const [gender, setGender] = useState<string>("");
  const formik = useFormik({
    initialValues: {
      userId: userIdSignUp ?? userIdSignIn,
      profilefor: String(jsonData?.profile_for),
      profileHandlerName: jsonData?.profile_handlername,
      dob: jsonData?.dob,
      selectgender: jsonData?.gender,
      fullname: jsonData?.fullname,
      cast: String(jsonData?.caste),
      challenged: String(jsonData?.challenged),
      isHiv: String(jsonData?.hiv),
      mothertongue: String(jsonData?.mother_tongue),
      religion: String(jsonData?.religion),
      isManglik: String(jsonData?.manglik),
      maritalstatus: String(jsonData?.marital_status),
      childrenstatus: String(jsonData?.children_status),
      height: String(jsonData?.height_cm),
      profilepic: jsonData?.photo,
    },
    onSubmit: async (values) => {
      console.log(values);
      let response;
      if (isReduxEmpty === undefined) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
          { ...values, actionType: "C" }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
          { ...values, actionType: "U" }
        );
      }
      response.data.output === 1 && nextPage(1);
    },
  });
  const onChangeGender = (gender: string) => {
    setGender(gender);
    if (gender === "1") {
      formik.values.selectgender = "M";
    } else {
      formik.values.selectgender = "F";
    }
  };

  useEffect(() => {
    formik.values.profilefor = selectedProfileFor.id;
    formik.values.challenged = selectedChallenged.id;
    formik.values.isHiv = selectedIsHiv.id;
    formik.values.mothertongue = selectedMotherTongue.id;
    formik.values.religion = selectedReligion.id;
    formik.values.isManglik = selectedManglik.id;
    formik.values.maritalstatus = selectedMaritalStatus.id;
    formik.values.height = cm;
  }, [
    selectedProfileFor.id,
    selectedChallenged.id,
    selectedIsHiv.id,
    selectedMotherTongue.id,
    selectedReligion.id,
    selectedManglik.id,
    selectedMaritalStatus.id,
    selectedChildrenStatus.id,
    formik.values,
    cm,
  ]);

  useEffect(() => {
    if (selectedMaritalStatus.id <= "2") {
      formik.values.childrenstatus = "1";
    } else {
      formik.values.childrenstatus = selectedChildrenStatus.id;
    }
  }, [formik.values, selectedChildrenStatus.id, selectedMaritalStatus.id]);

  useEffect(() => {
    if (selectedProfileFor.id === "1") {
      formik.values.profileHandlerName = formik.values.fullname;
    }
  }, [formik.values, formik.values.fullname, selectedProfileFor.id]);

  const selectedCast = (string: string) => {
    const id = string.split("-")[0];
    formik.values.cast = id;
  };
  const profilePicture = ({ name, image }: { name: string; image: string }) => {
    formik.values.profilepic = name;
  };
  return (
    <>
      <div className={classes.profile_Container}>
        <Container>
          <Row className="justify-content-center">
            <Col sm={12} md={5}>
              <h1>Hi! You are joining the Best Matchmaking Experience.</h1>
              <small>mandatory</small>
              <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
                <DropdownGridSingleSelect
                  title="Profile For"
                  data={ProfileFor}
                  nameid="profilefor"
                  selectedDataFn={setSelectedProfileFor}
                  defaultValue={jsonData?.profile_for}
                />
                {selectedProfileFor?.id !== "1" && (
                  <div className={classes.singleBox}>
                    <Form.Label>Profile Handler</Form.Label>
                    <div className={classes.inputBox}>
                      <li className={classes.blankInput}>
                        <Form.Control
                          name="profileHandlerName"
                          type="text"
                          placeholder="Enter your name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          defaultValue={jsonData?.profile_handlername}
                        />
                      </li>
                    </div>
                  </div>
                )}
                <GenderRadioButtons
                  selectedGender={gender}
                  onChangeGender={onChangeGender}
                />
                <div className={classes.singleBox}>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    max="2001-01-02"
                    placeholder="DateRange"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    defaultValue={jsonData?.dob.split(" ")[0]}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>
                    {gender === "1" ? "Groom" : "Bride"} Name
                  </Form.Label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <Form.Control
                        name="fullname"
                        type="text"
                        placeholder="Select Some Options"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        defaultValue={jsonData?.fullname}
                      />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <div className={classes.inputBox}>
                    <li className={classes.blankInput}>
                      <AvatarPicker onGetAvatar={profilePicture} />
                    </li>
                  </div>
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Cast</Form.Label>
                  <CastDataList
                    options={CastList}
                    selectedOption={selectedCast}
                    defaultValue={jsonData?.caste}
                  />
                </div>
                <div className={classes.singleBox}>
                  <Form.Label>Height</Form.Label>
                  <div className={classes.inputBox}>
                    <li className={`${classes.blankInput} d-flex`}>
                      <Form.Control
                        name="height"
                        type="text"
                        placeholder={`${cm} in cms`}
                        onBlur={formik.handleBlur}
                        onChange={handleCmChange}
                        defaultValue={jsonData?.height_cm}
                      />
                      <Form.Control
                        name="height"
                        type="text"
                        placeholder={`${feet} in ft.`}
                        onBlur={formik.handleBlur}
                        onChange={handleFeetChange}
                      />
                    </li>
                  </div>
                </div>
                <DropdownGridSingleSelect
                  title="Challenged"
                  data={Challenged}
                  nameid="challenged"
                  selectedDataFn={setSelectedChallenged}
                  defaultValue={jsonData?.challenged}
                />
                <DropdownGridSingleSelect
                  title="HIV"
                  data={isHiv}
                  nameid="hiv"
                  selectedDataFn={setSelectedIsHiv}
                  defaultValue={jsonData?.hiv}
                />
                <DropdownGridSingleSelect
                  title="Mother Tongue"
                  data={MotherTongue}
                  nameid="mothertongue"
                  selectedDataFn={setSelectedMotherTongue}
                  defaultValue={jsonData?.mother_tongue}
                />
                <DropdownGridSingleSelect
                  title="Religion"
                  data={Religion}
                  nameid="religion"
                  selectedDataFn={setSelectedReligion}
                  defaultValue={jsonData?.religion}
                />
                <DropdownGridSingleSelect
                  title="Add Manglik"
                  data={Manglik}
                  nameid="addmanglik"
                  selectedDataFn={setSelectedManglik}
                  defaultValue={jsonData?.manglik}
                />
                <DropdownGridSingleSelect
                  title="Marital Status"
                  data={MaritalStatus}
                  nameid="maritalstatus"
                  selectedDataFn={setSelectedMaritalStatus}
                  defaultValue={jsonData?.marital_status}
                />
                {selectedMaritalStatus.id >= "2" && (
                  <DropdownGridSingleSelect
                    title="Children Status"
                    data={ChildrenStatus}
                    nameid="childrenstatus"
                    selectedDataFn={setSelectedChildrenStatus}
                    defaultValue={jsonData?.children_status}
                  />
                )}
                <Button
                  variant="danger"
                  type="submit"
                  className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
                >
                  Next
                </Button>
              </Form>
            </Col>
            <RightSection />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfileDetails;
