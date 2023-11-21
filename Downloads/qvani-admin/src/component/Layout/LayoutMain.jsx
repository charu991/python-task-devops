import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
import { useAuthContextHook } from "../../context/AuthContext";
import Error from '../NotFound/NotFound'
const LayoutMain = () => {
  const navigate = useNavigate();
  let { IsLogedIn, setIsLogedIn } = useAuthContextHook();

  const [userDetails, setUserDetails] = useState({});

  const userDetailsApi = () => {
    axios
      .get(API_URLs.getUser, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        setIsLogedIn(true);
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLogedIn(false);
        navigate(-1);
      });
  };

  useEffect(() => {
    userDetailsApi();
  }, []);

  return <div>{IsLogedIn && <Outlet />}</div>;
};

export default LayoutMain;
