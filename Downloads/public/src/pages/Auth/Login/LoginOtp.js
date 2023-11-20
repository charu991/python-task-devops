import React, { useEffect, useRef, useState } from 'react'
import { useAuthContextHook } from "../../../context/AuthContext";
import OTPInput from "otp-input-react";
import "./LocalStyle.css";
import Icon from "../../../images/qvaniLogo.png";
import SubmitLoader from "../../../component/Loader/SubmitLoader";
import { toast } from 'react-toastify'
import styled from 'styled-components';
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
const innerStyle = {
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

export default function Otp({ email, password }) {
  // console.log(email, password);
  const { loginOtpApi, loginApi, loadingOtp, loadingOtpHandle } =
    useAuthContextHook();
  const [otpLoader, setOtpLoader] = useState(false)
  const [sendBtnClick, setSendBtnClick] = useState(false);
  const [otpValue, setotpValue] = useState("");
  const Ref = useRef(null);

  const [timer, setTimer] = useState('00:00');
  const onSubmit = (e) => {
    e.preventDefault();
    setSendBtnClick(true);
    loadingOtpHandle(true);
    loginOtpApi(otpValue);
  };

  const handleReSend = async (e) => {
    e.preventDefault();
    if (timer === '00:00' && otpLoader === false) {
      setTimer('02:00');
      try {
        setOtpLoader(true)
        await loginApi(email, password)
        onClickReset()
        setOtpLoader(false)
      } catch (error) {
        setOtpLoader(false)
      }
    } else {
      toast.warn(`You can resend OTP after ${timer}`)
    }
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }
  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }
  const clearTimer = (e) => {
    setTimer('02:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  }
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const onClickReset = () => {
    clearTimer(getDeadTime());
  }
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
            <form className="">
              <div className="FormDiv d-flex flex-column">
                <div className="d-flex flex-column gap-2">
                  <div className="log-otp d-flex flex-column gap-2 align-items-center justify-content-center">
                    <OTPInput
                      value={otpValue}
                      onChange={setotpValue}
                      inputStyle={{ borderRadius: "20px" }}
                      inputType="number"
                      autoFocus
                      OTPLength={4}
                      disabled={false}
                      secure
                      className="OtpInputBox"
                    />
                  </div>
                  {timer === '00:00' ?
                    <p className='text-center pt-3 mb-1'>OTP has been expired.</p> :
                    <p className='text-center pt-3 mb-1'>OTP will expire in {timer} minutes</p>
                  }
                  <p className="text-secondary text-center mt-2">
                    Didn’t Get OTP ?{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={handleReSend}
                    >
                      Re-send
                    </span>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <Button
                  className="Button"
                  onClick={onSubmit}
                  type="submit"
                  style={innerStyle.button}
                >
                  {loadingOtp ? <span className='d-flex justify-content-center align-items-center'><SubmitLoader /></span> : "Sumbit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
}
