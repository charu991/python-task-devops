import React from "react";
import Line from "../../component/Line/Line";
import moment from "moment";
const SingleUserKyc = ({ singleUserKyc, handleClose }) => {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h5
          className="text-decoration-underline mb-4"
          style={{ textTransform: "uppercase" }}
        >
          KYC DETAIL
        </h5>
        <button
          className="bg-primary border-0 text-white rounded-2 px-2 mb-4"
          onClick={handleClose}
        >
          X
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        <div className="d-flex gap-2">
          <div className="w-25">Id : </div>
          <div className="text-secondary">{singleUserKyc?._id}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Name : </div>
          <div className="text-secondary">{singleUserKyc?.name}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">ROLE : </div>
          <div className="text-secondary">{singleUserKyc?.role}</div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Email : </div>
          <div className="text-secondary d-flex gap-3">{singleUserKyc?.email}
            <span>
              {
                singleUserKyc?.isEmailVerified ? <small className="mb-0 fw-bold text-success">Verified</small> : <small className="mb-0 fw-bold text-danger">Not-Verified</small>
              }
            </span>
          </div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Mobile : </div>
          <div className="text-secondary d-flex gap-3">{singleUserKyc?.mobile}
            <span>
              {
                singleUserKyc?.isMobileVerified ? <small className="mb-0 fw-bold text-success">Verified</small> : <small className="mb-0 fw-bold text-danger">Not-Verified</small>
              }
            </span>

          </div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Status : </div>
          <div className="text-secondary">{
            singleUserKyc?.kycStatus === "VERIFIED" ? <div className="fw-bold text-success">Verified</div> :
              singleUserKyc?.kycStatus === "REJECTED" ? <div className="fw-bold text-warning">Rejected</div> :
                <div className="fw-bold text-danger">Pending</div>
          }
          </div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Level : </div>
          <div className="text-secondary"> {singleUserKyc?.level} </div>
        </div>
        <Line />
        <div className="d-flex gap-2">
          <div className="w-25">Date : </div>
          <div className="text-secondary"> {moment(singleUserKyc?.updatedAt).format('DD-MM-YYYY HH:MM:SS')} </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserKyc;
