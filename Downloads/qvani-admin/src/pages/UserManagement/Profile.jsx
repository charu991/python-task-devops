import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoUnverified, GoVerified } from "react-icons/go";
import { TbStatusChange } from "react-icons/tb";
import { FaAddressBook } from "react-icons/fa";
import { CgUnblock } from 'react-icons/cg'
import { useLocation, useParams } from "react-router-dom";
import { BiBlock } from 'react-icons/bi'
import { API_URLs } from "../../utils/ApiUrls";
import axios from "axios";
import { MdDateRange } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import Line from "../../component/Line/Line";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
// import PageLoader from "../../component/Loader/PageLoader";
const Button = styled.button`
border: none;
outline: none;
color: white;
width: 6rem;
display: flex;
align-items: center;
justify-content: center;
gap: 5px;
border-radius: 15px;
`
const Profile = ({ userData, getUserDetail, kycData }) => {
  const [loader, setLoader] = useState(false)
  // const [pageloader, setpageloader] = useState(false)
  const location = useLocation();
  // const { id } = useParams();
  // const { id } = param;

  console.log("Kyc Data", kycData)
  const handleBlock = (id, status) => {
    setLoader(true)
    axios.patch(API_URLs.blockUser(id, status), {}, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        setLoader(false)
        // window.location.reload()
        getUserDetail()
        toast.success(res?.data?.msg ? res?.data?.msg : 'User Blocked Successfully')
      })
      .catch((error) => {
        console.log(error)
        setLoader(false)
        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : 'Some Error Occured')
      })
  }
  return (
    <div
      className="card card2 p-4 px-4 gap-3"
      style={{
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
      }}
    >
      <h5 className="text-decoration-underline">PROFILE DETAIL</h5>

      <div className="d-flex gap-2 align-items-center fw-normal">
        <HiOutlineMail color="blue" />
        <span>{userData?.user?.email}</span>
        {userData?.user.isEmailVerified ? (
          <GoVerified color="green" />
        ) : (
          <GoUnverified color="red" />
        )}
      </div>

      <Line />

      <div className="d-flex gap-2 align-items-center fw-normal">
        <BsPhone color="blue" />
        <span>{userData?.user?.mobile}</span>
        {userData?.user?.isMobileVerified ? (
          <GoVerified color="green" />
        ) : (
          <GoUnverified color="red" />
        )}
      </div>
      <Line />

      <div>
        <div className="d-flex gap-2 align-items-center fw-normal" id="address">
          <TbStatusChange color="blue" />
          <span>{kycData.length ? kycData.map((value) => <div className="fw-bold text-success">{value.status}</div>) : <div className="fw-bold text-warning">PENDING</div>}</span>
        </div>
      </div>
      <Line />

      <div>
        <div className="d-flex gap-2 align-items-center fw-normal" id="address">
          <FaAddressBook color="blue" />
          <span>
            {userData?.user?.address} {userData?.user?.city}{" "}
            {userData?.user?.state} {userData?.user?.country?.name}
          </span>
        </div>
      </div>
      <Line />

      <div>
        <div className="d-flex gap-2 align-items-center fw-normal" id="address">
          <MdDateRange color="blue" />
          <span>{new Date(userData?.user?.createdAt).toDateString()}</span>
        </div>
      </div>
      <Line />
      {
        userData?.user?.isBocked ?
          <Button role='button' disabled={loader} className="mb-0 bg-success" onClick={() => handleBlock(userData?.user._id, 'active')}>
            {loader ?
              <Oval
                height={14}
                width={14}
                color="black"
              /> : <>Unblock <CgUnblock size={14} /></>}</Button> :
          <Button role='button' disabled={loader} className="mb-0 bg-danger" onClick={() => handleBlock(userData?.user._id, 'block')}>{
            loader ?
              <Oval
                height={14}
                width={14}
                color="black"
              /> : <> Block <BiBlock size={14} /></>}</Button>
      }
    </div>
  );
};

export default Profile;
