import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ReferralManagement = () => {
  const navigate = useNavigate();

  const [referralData, setReferralData] = useState([
    {
      startDate: "12-05-2023",
      endDate: "12-05-2023",
      createdOn: "12-05-2023",
      referralAmount: "100",
      amountType: "Bitcoin",
    },
    {
      startDate: "12-05-2023",
      endDate: "12-05-2023",
      createdOn: "12-05-2023",
      referralAmount: "100",
      amountType: "Bitcoin",
    },
  ]);

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      hide: "md",
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      hide: "md",
    },
    {
      name: "Created On",
      selector: (row) => row.createdOn,
    },
    {
      name: "Referral Amount",
      selector: (row) => row.referralAmount,
      hide: "md",
    },
    {
      name: "Referral Amount Type",
      selector: (row) => row.amountType,
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-4">
          <BsEyeFill role='button' title='View' size={15} />
          <MdEdit role='button' title='Edit' size={15} />
          <MdDelete role='button' title='Delete' size={15} />
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#7985f5",
        color: "white",
        fontSize: "13.5px",
      },
    },
  };

  return (
    <>
      <div className="p-3">
        <div
          className="d-flex gap-3 p-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <button
            className="bg-primary ouline-none border-0 text-white p-2 rounded-3"
            onClick={() => navigate("/addReferral")}
          >
            <span className="fw-bold h5">+</span> Create Referral Commission
          </button>
          <button
            className="bg-primary ouline-none border-0 text-white p-2 rounded-3"
            onClick={() => navigate("/referralTransactionHistory")}
          >
            Referral Transaction History
          </button>
        </div>

        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <h5 className="p-2 pb-4 text-decoration-underline">REFERRAL LIST</h5>
          <DataTable
            columns={columns}
            data={referralData}
            customStyles={customStyles}
            pagination
            fixedHeader
            highlightOnHover
            responsive={true}
          />
        </div>
      </div>
    </>
  );
};

export default ReferralManagement;
