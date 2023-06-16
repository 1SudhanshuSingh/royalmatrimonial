import classes from "./Form.module.scss";
import { Form, Button, Row, Col, Image, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginType } from "../../ducks/auth/types";
import Errors from "../Errors/Errors";
import HomeForm from "./Form";
import { SignUpType } from "../../types/authentication";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { callingCodes } from "../../utils/countryCodesList";
import ResetPasswordModal from "./ResetPasswordModal";


type ModalLoginProps = {
  onCloseModal: (val: boolean) => void;
  loginSpiner: boolean;
  setloginSpiner: (val: boolean) => void;
  errors: string;
  onSubmitForm: (values: LoginType) => void;
  onSubmitFormSignUp: (values: SignUpType) => void;
};

const ModalForm: React.FC<ModalLoginProps> = ({
  onCloseModal,
  onSubmitForm,
  onSubmitFormSignUp,
  loginSpiner,
  setloginSpiner,
  errors,
}) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setPasswordShow(false);
    }, 2000);
  }, [passwordShow]);

  const formik = useFormik({
    initialValues: {
      emailid: "",
      mobile: "",
      password: "",
      isdCode: "+91",
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      onSubmitForm({ ...values, from: loginWithEmail ? "email" : "mobile" });
    },
  });

  // const handleRegisterLoginModal = () => {

  // }

  return (
    <>
      (
      <div className={classes.modal_form}>

        {
          !resetPassword ?
            <>
              <Form onSubmit={formik.handleSubmit}>
                <h4>Welcome to <span>Royal Matrimonial</span></h4>
                <Form.Check
                  type="switch"
                  id="login_with"
                  label="Login with Email"
                  className={
                    loginWithEmail
                      ? classes.Form_Login_check
                      : classes.Form_Login_checkDis
                  }
                  checked={loginWithEmail}
                  onChange={() => setLoginWithEmail(!loginWithEmail)}
                />
                <Form.Group
                  className={`${classes.modal_input}`}
                  controlId="formBasicEmail"
                >
                  {loginWithEmail ? (
                    <Form.Control
                      type="email"
                      name="emailid"
                      placeholder="Enter Email Address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  ) : (
                    <Form.Group>
                      <Row>
                        <Col xs={4} className="mx-0 pe-0">
                          <Form.Select
                            className={classes.MobileCode}
                            name="isdCode"
                            defaultValue="+91"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          >
                            {callingCodes.map(
                              (codes: { countryName: any; callingCode: any }) => {
                                return (
                                  <option
                                    value={codes.callingCode}
                                    key={codes.countryName}
                                  >
                                    {codes.callingCode}
                                  </option>
                                );
                              }
                            )}
                          </Form.Select>
                        </Col>
                        <Col xs={8} className="mx-0 ps-0">
                          <Form.Control
                            type="tel"
                            name="mobile"
                            placeholder="Enter Number"
                            className={`${classes.Form_input} ${classes.mobileInput}`}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  )}
                </Form.Group>
                <Form.Group
                  className={`${classes.modal_input} mb-2`}
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    type={!passwordShow ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {!passwordShow ? (
                    <AiOutlineEye
                      className={classes.passwordShowHide}
                      onClick={() => setPasswordShow(true)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible className={classes.passwordShowHide} />
                  )}
                </Form.Group>
                {formik.values.mobile && errors && <Errors error={errors} />}
                <h5
                  className={`${classes.modal_links} d-flex mb-3`}
                  onClick={() => setResetPassword(true)}
                >
                  Forgot Password
                </h5>
                <Button
                  type="submit"
                  className={`${classes.Form_btn} ${classes.FromBtnlogin} p-3 mb-3 w-100`}
                  onClick={() => setloginSpiner(true)}
                // disabled={loginSpiner}
                >
                  {loginSpiner && (
                    <Spinner
                      className={classes.loginSpiner}
                      animation="border"
                      variant="light"
                    />
                  )}
                  Login
                </Button>
                <div className={classes.loginRegister_section}>
                  New On Royal Matrimonial?
                  <h6
                    className={`${classes.RegisterButton}`}
                    onClick={() => {
                      onCloseModal(false);
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Register Free
                  </h6>
                </div>
              </Form>
            </>
            :
            <>
              <ResetPasswordModal setState={setResetPassword} />
            </>
        }
        <Button className={classes.modal_closeBtn} onClick={(e) => {onCloseModal(false) }}>
          <RxCross1 />
        </Button>
      </div>
      )
    </>
  );
};

export default ModalForm;
