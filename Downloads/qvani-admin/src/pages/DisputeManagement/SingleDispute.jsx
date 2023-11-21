import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsEyeFill, BsFillChatDotsFill } from "react-icons/bs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageLoader from "../../component/Loader/PageLoader";
import Select from "react-select";
import SingleDisputeGlobal from "./SingleDisputeGlobal";
import SingleDisputeTrade from "./SingleDisputeTrade";

const option = [
  {
    label: 'Pending',
    value: 'Pending'
  },
  {
    label: 'In-Progress',
    value: 'In-Progress'
  },
  {
    label: 'Resolved',
    value: 'Resolved'
  },
]
const Textarea = styled.textarea`
border-radius: 10px;
box-shadow: 0px 0px 8px #E9EAF3;
border: 1px solid #E9EAF3;
outline: none;
height: 6rem;
`
const UploadLabel = styled.label`
padding: 1px 6px;
border-radius: 10px;
background: #1476FF;
color: white;
font-weight: 600;
:hover:not(:disabled){
    opacity: 0.9;
}
:active{
    transform: scale(0.9);
}
`
const ImgDiv = styled.div`
  border: 1px solid grey;
  display: flex;
  border-radius: 23px;
  padding: 7px 1px;
  justify-content: space-around;
  margin-top: 10px;
`
const SubmitButton = styled.button`
border: none;
background: #1476FF;
font-family: 'Inter';
color: white;
padding: 7px;
width: 9rem;
border-radius: 20px;
`
const TextSpan = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #6F7182;
`
const SingleDispute = () => {

  const [btnloader, setBtnLoader] = useState(false)
  const [remount, setRemount] = useState(false);
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isTabSelected = location.hash.includes('trade-dispute') || location.hash.includes('global-dispute')

  return (
    <>
      <div className="p-3">

        {
          location.hash.includes('trade-dispute') ?
            <SingleDisputeTrade /> : <SingleDisputeGlobal />
        }
      </div>
    </>
  );
};

export default SingleDispute;
