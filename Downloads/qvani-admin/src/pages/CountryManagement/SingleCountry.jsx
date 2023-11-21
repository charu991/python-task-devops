import React, { useEffect, useState } from "react";
import Line from "../../component/Line/Line";
import { useParams, useNavigate } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import PageLoader from "../../component/Loader/PageLoader";

const SingleCountry = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  const [singleCountry, setSingleCountry] = useState([]);

  useEffect(() => {
    axios
      .get(API_URLs.getCountryId(param.id), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setSingleCountry(res.data);
        setLoading(false);
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
  console.log(singleCountry)
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
          className="card p-3 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5
              className="text-decoration-underline mb-4"
              style={{ textTransform: "uppercase" }}
            >
              SINGLE COUNTRY DETAIL
            </h5>
          </div>

          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-2">
              <div className="w-25">Id : </div>
              <div className="text-secondary">{singleCountry?._id}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Name : </div>
              <div className="text-secondary">{singleCountry?.name}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Flag : </div>
              <div className="text-secondary">
                <img src={singleCountry.flag} height="30px" alt="" />
              </div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Code : </div>
              <div className="text-secondary">{singleCountry?.iso2}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Postal Code : </div>
              <div className="text-secondary">{singleCountry?.phone_code}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCountry;
