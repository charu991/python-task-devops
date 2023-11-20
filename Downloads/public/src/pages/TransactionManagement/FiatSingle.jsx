import moment from 'moment'
import React from "react";
import Line from "../../component/Line/Line";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { API_URLs } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import styled from 'styled-components';
const Button = styled.p`
margin-bottom: 0px;
font-size: 10px;
`
const VeiwButton = styled.button`
border: 1px solid #1476FF;
background-color: #1476FF;
outline: 0px;
color: white;
border-radius: 10px;
font-size: 12px;
`
const FiatSingle = ({ handleClose, fiatSingle }) => {
  const navigate = useNavigate()
  const [adminFeeInUSD, setAdminFeeInUSD] = useState('')
  const [gasFeeInUSD, setGasFeeInUSD] = useState('')
  const [btnLoader, setBtnLoader] = useState(false);
  const form = useForm(); // useForm Hook return an object containing property and method
  const { register, handleSubmit } = form;
  console.log('cccccccccccccccccccccc', fiatSingle)

  const handleViewInfo = (id) => {
    navigate(`/usermanagement/${id}`)
  }

  const handleConvert = (from, amount, to, usefor) => {
    axios.get(API_URLs.convertcryptoToFiat(from, amount, to), {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('response after converting crypto to fiat', res);
        if (usefor === 'admin') {
          setAdminFeeInUSD(res?.data?.convertedRate)
        } else {
          setGasFeeInUSD(res?.data?.convertedRate)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    handleConvert(fiatSingle?.currency, fiatSingle?.adminFee, 'USD', 'admin')
    handleConvert(fiatSingle?.currency, fiatSingle?.gasfee, 'USD', 'gasfee')
  }, [])
  return (
    <div className="p-4 pt-2">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-decoration-underline mb-4">DETAIL</h5>
        <button
          className="bg-primary border-0 text-white rounded-2 px-2 mb-4"
          onClick={handleClose}
        >
          X
        </button>
      </div>
      <form
        className="d-flex flex-column gap-3"
      >
        <div className="d-flex gap-2">
          <div className="w-25">Transaction ID : </div>
          <div className="text-secondary">{fiatSingle?.transactionId}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Sender Name : </div>
          <div className="text-secondary">{fiatSingle?.fromUserId?.name}</div>
          <VeiwButton className='mb-0' role='button' title={`View ${fiatSingle?.fromUserId?.name} View`} onClick={() => { handleViewInfo(fiatSingle?.fromUserId?._id) }}>View</VeiwButton>
        </div>
        <Line />
        {/* <div className="d-flex gap-2">
          <div className="w-25">Seller Wallet : </div>
          <div className="text-secondary">{fiatSingle?.fromWalletId?.address}</div>
        </div> 
        <Line />*/}
        {fiatSingle?.toUserId?.name && <><div className="d-flex gap-2">
          <div className="w-25">Receiver Name : </div>
          <div className="text-secondary">{fiatSingle?.toUserId?.name}</div>
          <VeiwButton className='mb-0' role='button' title={`View ${fiatSingle?.toUserId?.name} Info`} onClick={() => { handleViewInfo(fiatSingle?.toUserId?._id) }}>View</VeiwButton>
        </div>
          {/* <Line />
        <div className="d-flex gap-2">
        <div className="w-25">Buyer Wallet : </div>
        <div className="text-secondary">{fiatSingle?.toWalletId?.address}</div>
      </div> */}
          <Line /></>}
        <div className="d-flex gap-2">
          <div className="w-25">Currency : </div>
          <div className="text-secondary">{fiatSingle?.currency}</div>
        </div>
        {/* <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Seller Wallet : </div>
          <div className="text-secondary">{fiatSingle?.fromWalletId?.address}</div>
        </div> */}
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Sender Debited : </div>
          <div className="text-secondary">{fiatSingle.transactionAmount} {fiatSingle?.currency}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Receiver Credited : </div>
          <div className="text-secondary">{fiatSingle.receivedAmount} {fiatSingle?.currency}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Gas Fee : </div>
          <div className="text-secondary"> {gasFeeInUSD} USD</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Admin Received : </div>
          <div className="text-secondary">{adminFeeInUSD} USD</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Transaction Type : </div>
          <div className="text-secondary">{fiatSingle?.realTransactionFromTo}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Trade Date : </div>
          <div className="text-secondary">{new Date(fiatSingle.updatedAt).toDateString()}</div>
        </div>
        <Line />
        {/*
        <div className="d-flex justify-content-center mt-3">
          <button className="bg-primary border-0 text-white rounded-2 py-1 px-2">
            {btnLoader ? <SubmitLoader /> : "Update Status"}
          </button>
        </div>
       */}
      </form>
    </div>
  );
};

export default FiatSingle;