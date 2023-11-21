import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";
import PageLoader from "../../component/Loader/PageLoader";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
const Button = styled.button`
border: none;
outline: none;
background: green;
color: white;
width: 60px;
border-radius: 20px;
padding: 3px 1px;
`
const BlackList = () => {
  const [loading, setLoading] = useState(true);
  const [blacklistData, setblacklistData] = useState([]);
  const [blockLoader, setBlockLoader] = useState(false);
  const [ID, setID] = useState('')
  const [blockCountry, setBlockCountry] = useState([])
  const location = useLocation()
  const navigate = useNavigate();
  const isTabSelected = location.hash.includes('blockeduser')
    || location.hash.includes('blockedcountry')

  // api for unblock the country 
  const handleUnblock = (id) => {
    setBlockLoader(true)
    setID(id);
    axios.post(API_URLs.blockCountry(id), {
      status: 'active'
    }, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        setBlockLoader(false)
        console.log(res);
        getBlockCountry()
      })
      .catch((error) => {
        setBlockLoader(false)
        console.log(error)
      })
  }
  //! For Datatable
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
  const columns1 = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Flag",
      selector: (row) => <img src={row?.flag} height="20px" alt="" />,
      hide: "sm",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sorting: true,
    },
    {
      name: "Code",
      selector: (row) => row?.iso2,
      hide: "sm",
    },
    {
      name: "Phone Code",
      selector: (row) => row?.phone_code,
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => (
        <Button disabled={blockLoader} onClick={() => handleUnblock(row._id)}>
          {
            row._id === ID && blockLoader ?
              <Oval
                height={10}
                width={10}
                color="black"
              /> : 'Unblock'
          }

        </Button>
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

  //! API call for all user
  const getBlockUser = () => {
    axios.get(API_URLs.getBlockUserList, {
      headers: {
        'accept': '/',
        'authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log(res);
        setblacklistData(res.data.users)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const getBlockCountry = () => {
    axios.get(API_URLs.getBlockedCountry, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('blocked bank response', res)
        setBlockCountry(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getBlockUser();
    getBlockCountry()
  }, [])

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
          <div className='mt-3'>
            <ul className="nav nav-tabs myoffer-tabs gap-3 border-0" id="myTab" role="tablist">
              <div className="nav-item text-decoration-none" role="presentation">
                <button
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('blockeduser') ? 'active' : '' : 'active'}`}
                  id="blockeduser-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#blockeduser"
                  type="button"
                  role="tab"
                  aria-controls="blockeduser"
                  onClick={() => navigate('#blockeduser')}
                  aria-selected="true">
                  BLOCKED USER-LIST
                  {/* <Span active={isTabSelected ? location.hash.includes('blockeduser') ? true : false : true}>{blockeduserdata?.length}</Span> */}
                </button>
              </div>
              <div className="nav-item text-decoration-none" role="presentation">
                <button
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('blockedcountry') ? 'active' : '' : ''}`} id="blockedcountry-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#blockedcountry"
                  type="button"
                  role="tab"
                  aria-controls="blockedcountry"
                  onClick={() => navigate('#blockedcountry')}
                  aria-selected="true">
                  BLOCKED COUNTRY-LIST
                  {/* <Span active={isTabSelected ? location.hash.includes('selloffer') ? true : false : false}>{sellofferdata?.length}</Span> */}
                </button>
              </div>
            </ul>
          </div>
          <div className="tab-content" id="myTabContent">
            <div
              className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('blockeduser') ? 'show active' : '' : 'show active'}`}
              id="blockeduser"
              role="tabpanel"
              aria-labelledby="blockeduser-tab">
              <DataTable
                columns={columns}
                data={blacklistData}
                customStyles={customStyles}
                pagination
                fixedHeader
                highlightOnHover
                responsive={true}
              />
            </div>
            <div
              className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('blockedcountry') ? 'show active' : '' : ''}`}
              id='blockedcountry'
              role='tabpanel'
              aria-labelledby='blockedcountry-tab'>
              <DataTable
                columns={columns1}
                data={blockCountry}
                customStyles={customStyles}
                pagination
                fixedHeader
                highlightOnHover
                responsive={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackList;
