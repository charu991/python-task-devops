import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URLs } from "../utils/ApiUrls";
import { ToastContainer, toast } from "react-toastify";

export const AuthContextHook = createContext();

export const useAuthContextHook = () => {
  return useContext(AuthContextHook);
};

export default function AuthContext({ children }) {
  const [IsLogedIn, setIsLogedIn] = useState(false);
  const [loading, setLoading] = useState(false); // for button loading
  const [loadingOtp, setLoadingOtp] = useState(false); // for Otp button loading
  const [user, setuser] = useState([]);
  const navigate = useNavigate();

  const loadinghandle = (data) => {
    setLoading(data);
  };

  const loadingOtpHandle = (data) => {
    setLoadingOtp(data);
  };

  //! Login Api
  const loginApi = (email, password) => {
    axios.post(API_URLs.logIn, {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("otpToken", res.data.tokens);
        setIsLogedIn(true);
        navigate('/login/otp')
        toast.success(res.data.msg ? res.data.msg : "OTP sent successfully", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Some Error Occured', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  //! Login Otp Api
  const loginOtpApi = (otp) => {
    axios
      .post(API_URLs.loginVerify, {
        otp: otp,
        token: localStorage.getItem("otpToken"),
      })
      .then((res) => {
        if (res.data.user.role === 'admin') {
          navigate("/dashboard");
          toast.success(res.data.msg ? res.data.msg : "Login Successfully", {
            position: toast.POSITION.TOP_CENTER
          });
          console.log(res.data, "login OTP");
          setuser(res.data.user);
          localStorage.setItem("userToken", res.data.token);
        }
        else {
          navigate('/')
          toast.error("You're not Admin!!", {
            position: toast.POSITION.TOP_CENTER
          })
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingOtp(false);
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Some Error Occured', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  //! Forget Api
  const forgotApi = async (email) => {
    try {
      let res = await axios.post(API_URLs.forgetPassword, {
        email: email,
      });
      console.log(res);
      toast.success(res.data.msg ? res.data.msg : "Link Send, Please Check Your Email", {
        position: toast.POSITION.TOP_CENTER
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Some Error Occured', {
        position: toast.POSITION.TOP_CENTER
      });

    }
  };

  //! Reset Api
  const handleResetPassword = async (password, token) => {
    try {
      console.log(token);
      let res = await axios.post(API_URLs.reset + "?token=" + token, {
        password: password,
      });
      console.log(res);
      toast.success(res.data.msg ? res.data.msg : "Password Changed Successfully!!", {
        position: toast.POSITION.TOP_CENTER
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ? error.response.data.message : "Some Error Occured", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const data = {
    IsLogedIn,
    setIsLogedIn,
    loginApi,
    user,
    loading,
    loadinghandle,
    loginOtpApi,
    loadingOtp,
    loadingOtpHandle,
    forgotApi,
    handleResetPassword,
  };

  return (
    <AuthContextHook.Provider value={{ ...data }}>
      {children}
    </AuthContextHook.Provider>
  );
}
