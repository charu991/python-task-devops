import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";
import PageLoader from "../../component/Loader/PageLoader";
import moment from "moment/moment";
import { AiOutlineSearch } from 'react-icons/ai'
import { GiCheckMark } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
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

const innerStyle = {
  inputField: {
    boxShadow: "0px 0px 10px #f2f9fc",
    border: "1px solid #e2e9fa",
    width: "100%",
    padding: "5px 15px",
    borderRadius: "30px",
    outlineColor: "#f2f9fc",
  },
};

const UserManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const filteredData = userData.filter((row) =>
    row?.name?.toLowerCase().includes(searchText?.toLowerCase()) || row?.email?.toLowerCase().includes(searchText?.toLowerCase()) || row?.country?.name?.toLowerCase().includes(searchText?.toLowerCase())
  );

  const getUser = () => {
    axios.get(API_URLs.getUser, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUserData(res.data.users);
        console.log("User All", res.data)
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getUser()
  }, []);

  const customSort = (row, field, direction) => {
    const sortedRows = [...row];
    sortedRows.sort((a, b) => {
      const dateA = moment(a.createdAt);
      const dateB = moment(b.createdAt);
      return direction === "asc" ? dateB - dateA : dateA - dateB;
    });
    return sortedRows;
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => <span>{row?.name ? row?.name.substring(0, 20) : '--'}</span>,
    },
    {
      name: "E-Mail Status",
      selector: (row) => row.isEmailVerified ?
        <p className="mb-0 fw-bold text-success">Verified</p>
        : <p className="mb-0 fw-bold text-danger">Not-Verified</p>,
      hide: "sm",
    },
    {
      name: "KYC Status",
      selector: (row) => <div>
        {
          row?.kycStatus === 'APPROVED' ?
            <p className="mb-0 fw-bold text-success">APPROVED</p> :
            <p className="mb-0 fw-bold text-warning">PENDING</p>
        }
      </div>,
      hide: "md",
    },
    {
      name: 'createdAt',
      selector: (row) => new Date(row?.createdAt).toDateString(),
      sortable: true,
      hide: 'lg'
    },
    {
      name: "Country",
      selector: (row) => (
        <span className="text-capitalize">
          {row?.country?.name ? row?.country?.name : '..'}
        </span>
      ),
      hide: "lg",
    },
    {
      name: "Status",
      selector: (row) => (
        <span className="text-capitalize">
          {row?.isBocked ? <p className="mb-0 text-danger fw-bold">In-Active</p> : <p className="mb-0 text-success fw-bold ">Active</p>}
        </span>
      ),
      hide: "lg",
    },
    {
      name: "Action",
      cell: (row) => (
        <Link title="View User" role="button"
          className="text-dark text-decoration-none"
          to={`/usermanagement/${row._id}`}
        >
          <span className="">View</span> <BsEyeFill />
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
        <div className="d-flex justify-content-between mb-2 align-items-center">
          <h5 className="p-2 pb-0 text-decoration-underline">
            USER MANAGEMENT
          </h5>
          <Div>
            <Input
              type="text"
              placeholder="Search Here"
              value={searchText}
              onChange={handleSearch}
            />
            <AiOutlineSearch size={18} />
          </Div>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          responsive={true}
          pagination
          fixedHeader
          customStyles={customStyles}
          highlightOnHover
          sortFunction={customSort}
        />
        <div className=" my-3 mx-5  d-flex justify-content-end">
          <CSVLink
            className="bg-primary ouline-none border-0 text-white p-2 rounded-3 text-decoration-none"
            data={filteredData}
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
