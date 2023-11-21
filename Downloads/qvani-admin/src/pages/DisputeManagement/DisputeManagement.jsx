import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEyeFill, BsSend } from "react-icons/bs";
import { MdOutlineSyncProblem, MdOutlineReportProblem } from "react-icons/md";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
import { Oval } from "react-loader-spinner";
import PageLoader from "../../component/Loader/PageLoader";
import { CSVLink } from "react-csv";
import styled from "styled-components";
const TabNavigationButton = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`
const Div = styled.div`
// margin: 34px;
padding: 10px;
border-radius: 15px;
background: white;
border: 2px solid #E9EAF3;
box-shadow: 0px 0px 15px #E9EAF3;
`
const DisputeManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [disputeManagementData, setDisputeManagementData] = useState([{}]);
  const [disputeManagementData1, setDisputeManagementData1] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const isTabSelected = location.hash.includes('trade-dispute') || location.hash.includes('global-dispute')

  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Dispute Id",
      selector: (row) => row?.id,
      // hide: "sm",
    },
    {
      name: "Dispute Category",
      selector: (row) => row?.category?.disputeName,
      hide: "sm",
    },
    {
      name: "Dispute Description",
      selector: (row) => row?.query,
      hide: "sm",
    },
    {
      name: "Dispute Status",
      selector: (row) => row?.isAdminSolve ?
        <p className="mb-0 fw-bold text-success">Resolved</p> :
        <p className="mb-0 fw-bold text-warning">In-Progress</p>
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-4">
          <Link className="text-dark text-decoration-none" to={`/single-trade-dispute/${row.id}`}>
            <span>View</span> <BsEyeFill size={15} />
          </Link>
        </div>
      ),
    },
  ];
  const columns1 = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Dispute Category",
      selector: (row) => row?.category,
      hide: "sm",
    },
    // {
    //   name: "Created By",
    //   selector: (row) => row?.user.name ? row?.user.name : "..",
    //   // hide: "sm",
    // },
    {
      name: "Dispute Description",
      selector: (row) => row?.query,
      hide: "sm",
    },
    {
      name: "Dispute Status",
      selector: (row) => (row?.status === 'In-Progress' ?
        <p className="mb-0 fw-bold text-warning">In-Progress</p>
        : row?.status === 'Pending' ?
          <p className="mb-0 fw-bold text-warning">Pending</p>
          : <p className="mb-0 fw-bold text-success">Resolved</p>),
      hide: "md",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-4">
          <Link className="text-dark text-decoration-none" to={`/single-global-dispute/${row.id}`}>
            <span>View</span> <BsEyeFill size={15} />
          </Link>
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

  useEffect(() => {
    setLoading(true)
    axios
      .get(API_URLs.tradeDispute, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log('trade dispute api reponse', res);
        setDisputeManagementData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URLs.getDispute, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDisputeManagementData1(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
          <h5 className="p-2 text-decoration-underline">DISPUTE LIST</h5>
          {/* <div className='tabs-navigator mt-2'>
            <ul className="nav nav-tabs d-flex gap-3" id="myTab" role="tablist">
              <li className="nav-item text-decoration-none" role="presentation">
                <TabNavigationButton
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('trade-dispute') ? 'active' : '' : 'active'}`}
                  id="trade-dispute-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#trade-dispute"
                  type="button"
                  role="tab"
                  aria-controls="trade-dispute"
                  onClick={() => navigate('#trade-dispute')}
                  aria-selected="true">
                  <MdOutlineSyncProblem />
                  Trade Dispute
                </TabNavigationButton>
              </li>
              <li className="nav-item text-decoration-none" role="presentation">
                <TabNavigationButton
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('global-dispute') ? 'active' : '' : ''}`}
                  id="global-dispute-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#global-dispute"
                  type="button"
                  role="tab"
                  aria-controls="global-dispute"
                  onClick={() => navigate('#global-dispute')}
                  aria-selected="true">
                  <MdOutlineReportProblem />
                  Global Dispute
                </TabNavigationButton>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane fade py-3 ${isTabSelected ? location.hash.includes('trade-dispute') ? 'show active' : '' : 'show active'}`}
                id="trade-dispute"
                role="tabpanel"
                aria-labelledby="trade-dispute-tab">
                <DataTable
                  columns={columns}
                  data={disputeManagementData}
                  customStyles={customStyles}
                  progressComponent={<div className='d-flex justicy-content-center py-5'>
                    <Oval
                      height={45}
                      width={45}
                      color={'black'}
                      wrapperStyle={{}}
                      wrapperclassName=""
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor={'black'}
                      strokeWidth={3}
                      strokeWidthSecondary={2} />
                  </div>}
                  progressPending={loading}
                  pagination
                  fixedHeader
                  highlightOnHover
                  responsive={true}
                />
              </div>
              <div
                className={`tab-pane fade py-3 ${isTabSelected ? location.hash.includes('global-dispute') ? 'show active' : '' : ''}`}
                id="global-dispute"
                role="tabpanel"
                aria-labelledby="global-dispute-tab">
                <DataTable
                  columns={columns1}
                  data={disputeManagementData1}
                  progressComponent={<div className='d-flex justicy-content-center py-5'>
                    <Oval
                      height={45}
                      width={45}
                      color={'black'}
                      wrapperStyle={{}}
                      wrapperclassName=""
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor={'black'}
                      strokeWidth={3}
                      strokeWidthSecondary={2} />
                  </div>}
                  progressPending={loading}
                  customStyles={customStyles}
                  pagination
                />
              </div>
            </div>
          </div> */}
          <DataTable
            columns={columns}
            data={disputeManagementData}
            customStyles={customStyles}
            progressComponent={<div className='d-flex justicy-content-center py-5'>
              <Oval
                height={45}
                width={45}
                color={'black'}
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor={'black'}
                strokeWidth={3}
                strokeWidthSecondary={2} />
            </div>}
            progressPending={loading}
            pagination
            fixedHeader
            highlightOnHover
            responsive={true}
          />
          <div className=" my-3 mx-5  d-flex justify-content-end">
            <CSVLink
              className="bg-primary ouline-none border-0 text-white p-2 rounded-3 text-decoration-none"
              data={disputeManagementData}
            >
              Download CSV
            </CSVLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisputeManagement;
