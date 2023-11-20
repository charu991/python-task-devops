import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthContextHook } from "../../../context/AuthContext";
import "../Login/LocalStyle.css";
import Icon from "../../../images/qvaniLogo.png";
import { Oval } from "react-loader-spinner";

const initialValues = {
  email: "",
};

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

export default function Forgot() {
  const { forgotApi } = useAuthContextHook();
  const [sendBtnClick, setSendBtnClick] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().required("Email is Required"),
    }),
    onSubmit: (values) => {
      console.log(values.email);
      setSendBtnClick(true);
      forgotApi(values.email);
    },
  });

  return (
    <div
      className=""
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
              Forgot Password
            </p>
            <p
              className="text-center text-secondary px-1"
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              We Will Send Verification Link on your Email
            </p>
          </div>

          <div className="card-body">
            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-4"
            >
              <div className="d-flex flex-column">
                <input
                  className="px-3 py-2"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  style={innerStyle.inputField}
                />
                <small className=" text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger px-2">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </small>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="Button d-flex justify-content-center"
                  type="submit"
                  style={innerStyle.button}
                >
                  {sendBtnClick ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Oval
                        height={20}
                        width={20}
                        color="blue"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
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
