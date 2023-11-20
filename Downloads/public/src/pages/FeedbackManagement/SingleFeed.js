import React,{useState} from "react";
import {MdArrowDropDown, MdArrowDropUp} from 'react-icons/md'
import Line from "../../component/Line/Line";
export default function SingleFeed({ singlefeedbackData, handleClose }){
    const[seeTradeDetail,setSeeTradeDetail]=useState(false)
    const handleCloseTradedetails =()=>{setSeeTradeDetail(false)}
    const handleShowTradedetails =()=>{setSeeTradeDetail(true)}
    console.log('.................................',singlefeedbackData)
  return (
    <div className="p-4 pt-2">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-decoration-underline mb-4">DETAILS</h5>
        <button type="button"
          className="bg-primary border-0 text-white rounded-2 px-2 mb-4" onClick={handleClose} >
          X
        </button>
      </div>
      <form
        className="d-flex flex-column gap-3"
      >
        <div className="d-flex gap-2">
          <div className="w-25">Feedback By : </div>
          <div className="text-secondary">{singlefeedbackData?.feedbackBy?.name}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Feedback For : </div>
          <div className="text-secondary">{singlefeedbackData?.feedbackFor?.name}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Message : </div>
          <div className="text-secondary">{singlefeedbackData?.feedback}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Rating : </div>
          <div className="text-secondary">{singlefeedbackData?.rating} stars</div>
        </div>
        <Line />
        <div className="d-flex gap-2 align-items-center">
          <div className="w-25">Created Date : </div>
          <div className="text-secondary">{new Date(singlefeedbackData?.createdAt).toDateString()}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
            <div className="w-25">About Trade : </div>
            <div className="text-secondary">
            {
                seeTradeDetail ?
                <div className="gap-5" type='button' onClick={handleCloseTradedetails}>
                    {singlefeedbackData?.tradeId?._id}
                    <MdArrowDropUp size={22}/>
                </div>
                :<div className="gap-5" type='button' onClick={handleShowTradedetails}>
                    {singlefeedbackData?.tradeId?._id}
                    <MdArrowDropDown size={22}/>
                </div>
            }
            </div>
        </div>
        <Line />
        {
            seeTradeDetail ?
            <>
                <div className="d-flex gap-2">
                    <div className="w-25">Trade Type : </div>
                    <div className="text-secondary">{singlefeedbackData?.tradeId?.offer_type}</div>
                </div>
                <Line />
                <div className="d-flex gap-2">
                    <div className="w-25">Payment Method : </div>
                    <div className="text-secondary">{singlefeedbackData?.tradeId?.payment_method}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 align-items-center">
                    <div className="w-25">Trade Created On : </div>
                    <div className="text-secondary">{new Date(singlefeedbackData?.tradeId?.createdAt).toDateString()}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 align-items-center">
                    <div className="w-25">Trade Status : </div>
                    <div className="text-secondary">{singlefeedbackData?.tradeId?.isBlocked ? "Blocked":"Active"}</div>
                </div>
            </>
            :''
        }
      </form>
    </div>
  );
};