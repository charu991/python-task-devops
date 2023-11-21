import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { BsArrowLeft, BsEyeFill } from "react-icons/bs";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ReferralTransactionHistory = () => {
  const navigate = useNavigate();
  const [referralTransactionHistoryData, setReferralTransactionHistoryData] =
    useState([{ userName: "Monty", amount: 50, idd: 1, date: "20-05-2023" }]);

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "View User Earning",
      cell: (row) => (
        <div className="d-flex justify-content-center ms-3">
          <Link
            className="text-dark text-decoration-none"
            // state={{ id: row.idd }}
            to={`/referralTransactionHistory/${row.idd}`}
          >
            View <BsEyeFill size={13} role="button" />
          </Link>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#f1f9fc",
        fontSize: "13.5px",
      },
    },
  };

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
          <h5 className="pb-4 text-decoration-underline">
            REFERRAL TRANSACTION HISTORY
          </h5>
          <div className="d-flex justify-content-around my-5 flex-wrap gap-3">
            <div
              className="card py-3 px-4 text-center"
              style={{
                boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
              }}
            >
              <p>1135 EDU</p>
              <p className="fw-bold">Total Earning</p>
            </div>
            <div
              className="card py-3 px-4 text-center"
              style={{
                boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
              }}
            >
              <p>28.145 EDU</p>
              <p className="fw-bold">Total Commission</p>
            </div>
          </div>
          <div className="card">
            <DataTable
              columns={columns}
              data={referralTransactionHistoryData}
              customStyles={customStyles}
              pagination
              fixedHeader
              highlightOnHover
              responsive={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferralTransactionHistory;
