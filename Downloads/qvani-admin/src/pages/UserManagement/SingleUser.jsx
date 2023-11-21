import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "./UserManagement.css";
import { API_URLs } from "../../utils/ApiUrls";
import Profile from "./Profile";
import WalletDetail from "./WalletDetail";
import BankDetail from "./BankDetail";
import PageLoader from "../../component/Loader/PageLoader";
import TransactionDetail from "./TransactionDetail";
import TradeDetail from "./TradeDetail";

const SingleUser = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [kycData, setKycData] = useState([]);

  // console.log(kycData.map((value) => console.log(value.status)));

  const getUserDetail = async () => {
    try {
      let response = await axios.get(API_URLs.getSingleUser(params?.id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("Single", response);
      setKycData(response.data.kyc);
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <div className=" mx-3 mt-2 border-0 fw-bold" onClick={() => navigate(-1)}>
        <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
      </div>

      <div className="p-3 d-flex  gap-4 align-items-start flex-column justify-content-between">
        <div
          className=" card card1 col-md-8 flex-grow-1"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <div className="d-flex gap-4 px-2 flex-wrap align-items-end">
            <img
              src={userData.user?.avatar}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "100%",
                border: "2px solid black",
              }}
            />
            <div>
              <h1 className="text-white">{userData.user?.name}</h1>
              <p className="fw-normal text-white">
                {kycData.map((value) => value.status)}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3">
          <Profile userData={userData} getUserDetail={getUserDetail} kycData={kycData} />
          <WalletDetail />
        </div>
      </div>

      <div className="p-3 ">
        <BankDetail bankData={userData?.bank} />
      </div>

      {/* <div className="p-3">
        <WalletDetail />
      </div> */}

      {/* <div className="p-3">
        <TransactionDetail />
      </div> */}

      <div className="p-3">
        <TradeDetail />
      </div>
    </>
  );
};

export default SingleUser;
