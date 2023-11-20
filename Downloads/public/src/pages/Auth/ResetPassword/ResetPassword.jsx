import React, { useState } from "react";
import { useLocation } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Icon from "../../../images/qvaniLogo.png";
import { useAuthContextHook } from "../../../context/AuthContext";
import { Oval } from "react-loader-spinner";
const Input = styled.input`
outline: none;
`
const Heading = styled.h3`
  font-size: 2rem;
  text-align: center;
  font-weight: bolder;
`;

const Span = styled.span`
  margin-left: -35px;
`;

const initialValues = {
  password: "",
  cpassword: "",
};

const Container = styled.div`
  background: ${({ theme }) => theme.body};
  border-radius: 14px;
  max-width: 500px;
`;

export default function ResetPassword() {
  const { handleResetPassword } = useAuthContextHook();
  const [loader, setLoader] = useState(false);
  const [seePassword, SetseePassword] = useState(false);
  const [seeCPassword, SetseeCPassword] = useState(false);

  const location = useLocation();
  let token = location.search?.split("?")[1]?.split("=")[1];
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is Required")
        .min(8)
        .matches(/[A-Z]/, "atleast 1 uppercase letter required")
        .matches(/[a-z]/, "atleast 1 lowercase letter required")
        .matches(/[1-9]/, "atleast 1 number required")
        .matches(/[!@#$%^&*]/, "atleast 1 special character required"),
      cpassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm password should be same as New  password"
        )
        .required("Confirm Passwird is Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoader(true);
        await handleResetPassword(values.password, token);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    },
  });

  const innerStyle = {
    input: {
      boxShadow: "0px 0px 10px #e9eaf3",
      border: "1px solid #e9eaf3",
      width: "100%",
      padding: "5px",
      borderRadius: "30px",
    },
    button: {
      border: "none",
      backgroundColor: "#1476ff",
      color: "white",
      textAlign: "center",
      width: "100%",
      padding: "8px",
      borderRadius: "30px",
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f9fc",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card login-card px-4 py-3 col-lg-4">
          <div className="card-heading text-center">
            <img src={Icon} alt="" width="50px" className="align-self-center" />

            <p className="card-heading text-center pt-3 mb-1 fs-2 fw-bolder">
              Reset Password
            </p>
            <p
              className="text-center px-1"
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit sedol do
              eiusmod tempor consectur.
            </p>
          </div>

          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex m-0 mt-3 flex-column">
                <div className="FormDiv">
                  <Input
                    placeholder="Enter New Password"
                    name="password"
                    id="password"
                    className="p-2"
                    type={seePassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    style={innerStyle.input}
                  />
                  {seePassword ? (
                    <Span type="button" onClick={() => SetseePassword(false)}>
                      <FaEyeSlash />
                    </Span>
                  ) : (
                    <Span type="button" onClick={() => SetseePassword(true)}>
                      <FaEye />
                    </Span>
                  )}
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-danger auth-error text-start">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="d-flex m-0 mt-3 flex-column">
                {/* <Label className='mb-0' htmlFor='cpassword'>Re-Enter New Password<span className='text-danger'> *</span></Label> */}
                <div className="FormDiv">
                  <input
                    placeholder="Re Enter New Password"
                    name="cpassword"
                    id="cpassword"
                    type={seeCPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cpassword}
                    className={
                      formik.errors.cpassword && formik.touched.cpassword
                        ? "text-input p-2 error"
                        : "text-input p-2"
                    }
                    style={innerStyle.input}
                  />
                  {seeCPassword ? (
                    <Span type="button" onClick={() => SetseeCPassword(false)}>
                      <FaEyeSlash />
                    </Span>
                  ) : (
                    <Span type="button" onClick={() => SetseeCPassword(true)}>
                      <FaEye />
                    </Span>
                  )}
                </div>

                {formik.errors.cpassword && formik.touched.cpassword ? (
                  <div className="text-danger text-start auth-error">
                    {formik.errors.cpassword}
                  </div>
                ) : null}
              </div>

              <div className="d-flex justify-content-center mt-2">
                <button
                  className="d-flex justify-content-center"
                  type="submit"
                  disabled={loader}
                  style={innerStyle.button}
                >
                  {loader ? (
                    <Oval
                      height={20}
                      width={20}
                      color="blue"
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
