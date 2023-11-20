import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";

const TransactionDetail = () => {
  const [transaction, setTransaction] = useState([{}]);
  //! For Datatable
  const columns = [
    {
      name: "S. NO.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Currency",
      selector: (row) => row?.address,
      hide: "md",
    },
    {
      name: "Transaction Date",
      selector: (row) => row?.currency,
    },
    {
      name: "Payable Amount",
      selector: (row) => row?.balance,
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) =>
        row.isBlocked ? (
          <span className="text-danger">Pending</span>
        ) : (
          <span className="text-success">Pending</span>
        ),
      hide: "sm",
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
      <div
        className="card p-2 "
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        <h5 className="p-2 text-decoration-underline">TRANSACTION DETAIL</h5>
        <DataTable
          columns={columns}
          data={transaction}
          pagination
          selectableRowsHighlight
          fixedHeader
          customStyles={customStyles}
          highlightOnHover
        />
      </div>
    </>
  );
};

export default TransactionDetail;
