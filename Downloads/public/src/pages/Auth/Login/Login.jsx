import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import OTP from "./LoginOtp";
import { useAuthContextHook } from "../../../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Icon from "../../../images/qvaniLogo.png";
import "./LocalStyle.css";
import SubmitLoader from "../../../component/Loader/SubmitLoader";
import styled from "styled-components";
const Input = styled.input`
outline: none;
`
const innerStyle = {
  inputField: {
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
const Button = styled.button`
  border: none;
  background-color: #1476FF;
  color: white;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  padding: 7px 0px;
  border-radius: 45px;

  &:disabled{
    opacity: 0.5;
  }
`
export default function Login() {
  const { loginApi, loading, loadinghandle } = useAuthContextHook();
  const [seePassword, SetseePassword] = useState(true);

  const formik = useFormik({
    initialValues: { email: "", password: "", otp: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is Required"),
      password: Yup.string()
        .min(8)
        .matches(/[A-Z]/, 'atleast 1 uppercase letter required')
        .matches(/[a-z]/, 'atleast 1 lowercase letter required')
        .matches(/[1-9]/, 'atleast 1 number required')
        .matches(/[!@#$%^&*]/, 'atleast 1 special character required')
        .required('Password is Required'),
    }),
    onSubmit: (value) => {
      localStorage.setItem('email', value.email);
      localStorage.setItem('password', value.password);
      loadinghandle(true);
      loginApi(value.email, value.password);
    },
  });

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
        <div
          className="card px-4 py-3 col-lg-4 cardcss login-card"
        // style={{ width: "450px", borderRadius: "20px" }}
        >
          <div className="card-heading text-center">
            <img src={Icon} alt="" width="50px" className="align-self-center" />

            <p className="card-heading text-center pt-3 mb-1 fs-2 fw-bolder">
              Welcome Back
            </p>
            <p className="text-secondary text-center">We Will Send One Time Password for Verification</p>
          </div>
          <div className="card-body ">
            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-3"
            >
              <div>
                <div className="d-flex flex-column">
                  <Input
                    id="email"
                    placeholder="Email Address"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.email && formik.touched.email
                        ? "text-input error px-3"
                        : "text-input px-3"
                    }
                    style={innerStyle.inputField}
                  />
                  <small>
                    {formik.errors.email && formik.touched.email && (
                      <div className="input-feedback px-2 text-danger">
                        {formik.errors.email}
                      </div>
                    )}
                  </small>
                </div>
                <div className="d-flex m-0 mt-3 flex-column">
                  <div className="">
                    <Input
                      id="password"
                      placeholder="Password"
                      type={seePassword ? "password" : "text"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.password && formik.touched.password
                          ? "text-input error px-3"
                          : "text-input px-3"
                      }
                      style={innerStyle.inputField}
                    />
                    {seePassword ? (
                      <span
                        role="button"
                        className="text-muted"
                        onClick={() => SetseePassword(false)}
                        style={{ marginLeft: "-35px" }}
                      >
                        <FaEyeSlash />
                      </span>
                    ) : (
                      <span
                        type="button"
                        className="text-muted"
                        onClick={() => SetseePassword(true)}
                        style={{ marginLeft: "-35px" }}
                      >
                        <FaEye />
                      </span>
                    )}
                  </div>
                  <small>
                    {formik.errors.password && formik.touched.password && (
                      <div className="input-feedback px-2 text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </small>
                </div>
              </div>
              <div>
                <Button
                  className="Button"
                  disabled={loading}
                  type="submit"
                  style={innerStyle.button}
                >
                  {loading ? <span className="d-flex justify-content-center align-items-center"><SubmitLoader /> Sending...</span> : "Send OTP"}
                </Button>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      localStorage.setItem("email", formik.values.email);
                      localStorage.setItem("password", formik.values.password);
                    }}
                  />
                  <span>Remember me</span>
                </div>

                <Link className="text-decoration-none" to="/forgot">
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
