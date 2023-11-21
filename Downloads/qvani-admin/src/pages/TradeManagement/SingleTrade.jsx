import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Line from "../../component/Line/Line";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
import { useEffect } from "react";
import PageLoader from "../../component/Loader/PageLoader";

const SingleTrade = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleData, setSingleData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URLs.getTradeId(id), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        res.data.map((value) => {
          setSingleData(value);
          console.log(value);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
      <div className="p-3">
        <div
          className="mx-1 mt-2 border-0 fw-bold"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
        </div>
        <div
          className="card p-4 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <h5 className="mb-4 text-decoration-underline">Trade Info.</h5>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-2">
              <div className="w-25">Currency : </div>
              <div>{singleData?.cryptoCurrency}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Created Date : </div>
              <div>{new Date(singleData?.createdAt).toDateString()}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Update Date : </div>
              <div>{new Date(singleData?.updatedAt).toDateString()}</div>
            </div>
            <Line />
            {/* <div className="d-flex gap-2">
              <div className="w-25">Trade Status : </div>
              <div>
                {singleData?.isCOmpleted ? "Completed" : "Not Completed"}
              </div>
            </div>
            <Line /> */}

            <div className="d-flex gap-2">
              <div className="w-25">Type : </div>
              <div>{singleData?.offer_type}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Payment Method : </div>
              <div>{singleData?.payment_method}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Preferred Currency : </div>
              <div>{singleData?.preffered_currency}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Bank Account : </div>
              <div>{singleData?.bank_account}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Trade Pricing Type : </div>
              <div className="text-capitalize">
                {singleData?.trade_pricing_type}
              </div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Max Limit : </div>
              <div>{singleData?.trade_limit?.max}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Min Limit : </div>
              <div>{singleData?.trade_limit?.min}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Offer Margin : </div>
              <div>{singleData?.offer_margin} %</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Offer Time : </div>
              <div>{singleData?.offer_time_limit} min</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Offer Tags : </div>
              <div>
                {
                  singleData?.offer_tags.map((val) => {
                    return <p className="mb-0">{val} </p>
                  })
                }
              </div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Offer Label : </div>
              <div>{singleData?.offer_label}</div>
            </div>
            <Line />
            {/* <div className="d-flex gap-2">
              <div className="w-25">Offer Terms : </div>
              <div>{singleData?.offer_terms}</div>
            </div>
            <Line /> */}
            <div className="d-flex gap-2">
              <div className="w-25">Trade Instruction : </div>
              <div>{singleData?.trade_instruction}</div>
            </div>
            <Line />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTrade;
