import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";
import PageLoader from "../../component/Loader/PageLoader";
import { AiOutlineSearch } from 'react-icons/ai'
import styled from "styled-components";
import { CSVLink } from "react-csv"
const Div = styled.div`
display: flex;
align-items: center;
box-shadow: 0px 0px 10px #E9EAF3;
border: 2px solid #E9EAF3;
padding: 3px 11px;
border-radius: 20px;
overflow: hidden;
`
const Input = styled.input`
border: none;
outline: none;
`
const TradeManagement = () => {
  const [tradeData, setTradeData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Trade Id",
      selector: (row) => row?._id,
    },
    {
      name: "Status",
      selector: (row) => <div>
        {
          row?.status === 'REJECT' ?
            <p className="mb-0 text-danger fw-bold">REJECT</p>
            : row?.status === 'PENDING' ?
              <p className="mb-0 text-warning fw-bold">PENDING</p> :
              <p className="mb-0 text-success fw-bold">COMPLETE</p>
        }
      </div>
    },
    {
      name: "Created Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
    },
    {
      name: "Action",
      cell: (row) => (
        <Link
          className="text-dark text-decoration-none"
          to={`/trademanagement/${row?.offer_id}`}
        >
          View <BsEyeFill />
        </Link>
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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const filteredData = tradeData.filter((row) =>
    row?._id?.toLowerCase().includes(searchText?.toLowerCase()) || row?.status?.toLowerCase().includes(searchText?.toLowerCase())
  );

  const getTrade = () => {
    axios
      .get(API_URLs.getTrade, {
        headers: {
          'accept': "application/json",
          'authorization': `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.trade);
        setTradeData(res.data.trade);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getTrade()
  }, []);

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="p-3">
      <div
        className="card p-2 mt-3"
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="p-2 pb-4 text-decoration-underline">TRADE LIST</h5>
          <Div>
            <Input type="text" placeholder="Search Here" value={searchText} onChange={handleSearch} />
            <AiOutlineSearch size={18} />
          </Div>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          fixedHeader
          highlightOnHover
          responsive={true}
        />
      </div>
    </div>
  );
};

export default TradeManagement;
