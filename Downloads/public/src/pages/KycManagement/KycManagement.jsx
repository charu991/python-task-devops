import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
import SingleUserKyc from "./SingleUserKyc";
import { Oval } from "react-loader-spinner";
import PageLoader from "../../component/Loader/PageLoader";
import { AiOutlineSearch } from 'react-icons/ai'
import { CSVLink } from "react-csv";
import styled from "styled-components";
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
const KycManagement = () => {
  const [importData, setImportData] = useState([]); // Here data from API get stored which is in form of nested object
  const kycData = Object.keys(importData); // Getting Keys from Nested object
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('')
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }


  // TODO : Convert Nested Object into Array of Object
  let arr = [];
  for (let i = 0; i < kycData.length; i++) {
    let obj = importData[kycData[i]];
    arr.push({ ...obj, id: kycData[i] });
  }

  const filteredData = arr.filter((row) =>
    row?.status?.toLowerCase().includes(searchText?.toLowerCase()) || row?.name?.toLowerCase().includes(searchText?.toLowerCase()) || row?.email?.toLowerCase().includes(searchText?.toLowerCase())
  );
  console.log('////////////', arr)
  //! For Datatable
  const columns = [
    {
      name: "Name",
      selector: (row) => <span>{row?.name ? row?.name.substring(0, 20) : '..'}</span>,
    },
    {
      name: "Email",
      selector: (row) => row?.email ? row?.email : '..',
    },
    {
      name: "Status",
      selector: (row) => {
        if (row?.kycStatus === "VERIFIED") {
          return <div className="fw-bold text-success">VERIFIED</div>
        } else if (row?.kycStatus === "REJECTED") {
          return <div className="fw-bold text-warning">REJECTED</div>
        } else {
          return <div className="fw-bold text-danger">PENDING</div>
        }
      },
    },
    {
      name: "Level",
      selector: (row) => <div>
        Level 1
      </div>
    },
    {
      name: "Action",
      cell: (row) => <div role="button" onClick={() => handleShow(row)}>
        View <BsEyeFill />,
      </div>
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

  //! Api Call for Kyc List for all user
  useEffect(() => {
    axios
      .get(API_URLs.allApplicant, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setImportData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //! For Single User
  const [singleUserKyc, setSingleUserKyc] = useState({});
  const handleClose = () => setSingleUserKyc({});
  const handleShow = (value) => setSingleUserKyc(value);

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
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          {!Object.keys(singleUserKyc).length ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="p-2 pb-4 text-decoration-underline">KYC LIST</h5>
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
              />
              {filteredData.length > 0 && <div className=" my-3 mx-5 d-flex justify-content-end ">
                <CSVLink
                  className="bg-primary text-white p-1 text-decoration-none"
                  data={filteredData} > Download CSV </CSVLink>
              </div>}
            </>
          ) : (
            <SingleUserKyc
              singleUserKyc={singleUserKyc}
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default KycManagement;
