import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";
import axios from "axios";

const TradeDetail = () => {
  const [trade, setTrade] = useState([{}]);
  const param = useParams();
  const [loading, setLoading] = useState(true);

  console.log(param.id);

  useEffect(() => {
    axios
      .get(API_URLs.getSingleUserTrade(param.id), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log("Single Trade", res.data);
        setTrade(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  console.log('.....................................', trade)
  //! For Datatable
  const columns = [
    {
      name: "S. NO.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Trade Id",
      selector: (row) => row?.offer_id,
      hide: "md",
    },
    {
      name: "Trade Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
    },
    {
      name: "User",
      selector: (row) => row?.user ? "Default" : "Default",
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) => <div>{
        row?.status === 'REJECT' ?
          <p className="mb-0 text-danger fw-bold">REJECT</p>
          : row?.status === 'PENDING' ?
            <p className="mb-0 text-warning fw-bold">PENDING</p> :
            <p className="mb-0 text-success fw-bold">COMPLETE</p>
      }</div>,
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
        <h5 className="p-2 text-decoration-underline">TRADE DETAIL</h5>
        {
          trade?.length > 0 ?
            <DataTable
              columns={columns}
              data={trade}
              pagination
              selectableRowsHighlight
              fixedHeader
              customStyles={customStyles}
              highlightOnHover
            /> : ''
        }
      </div>
    </>
  );
};

export default TradeDetail;
