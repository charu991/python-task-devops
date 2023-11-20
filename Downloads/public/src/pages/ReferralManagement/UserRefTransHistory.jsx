import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CSVLink } from "react-csv";

const UserRefTransHistory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState([]);
  //   console.log(user);

  const [referralTransactionHistoryData, setReferralTransactionHistoryData] =
    useState([{ userName: "Monty", amount: 50, idd: 1, date: "20-05-2023" }]);

  console.log(referralTransactionHistoryData);

  useEffect(() => {
    referralTransactionHistoryData.map((value) => {
      //   console.log(value);
      //   console.log("Params Id", params.id);
      //   console.log("Value Id", value.idd);
      if (value.idd === params.id) {
        console.log(value);
        setUser(value);
        console.log("Params Id", params.id);
        console.log("Value Id", value.idd);
      }
    });
  }, []);

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
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
    <div className="p-3">
      <div className="mx-1 mt-2 border-0 fw-bold" onClick={() => navigate(-1)}>
        <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
      </div>
      <div
        className="card p-3 mt-3"
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        <h5 className="pb-4 text-decoration-underline">
          USER REFERRAL HISTORY
        </h5>
        <div className="d-flex justify-content-around my-5 flex-wrap gap-3">
          <div
            className="card py-3 px-4 text-center"
            style={{
              boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
            }}
          >
            <p>1 EDU</p>
            <p className="fw-bold">Total Earning</p>
          </div>
          <div
            className="card py-3 px-4 text-center"
            style={{
              boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
            }}
          >
            <p>3</p>
            <p className="fw-bold">Total Referral</p>
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
        <div className=" my-3 mx-5  d-flex justify-content-end">
          <CSVLink
            className="bg-primary ouline-none border-0 text-white p-2 rounded-3 text-decoration-none"
            data={referralTransactionHistoryData}
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default UserRefTransHistory;
