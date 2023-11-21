import axios from 'axios';
import React, { useEffect } from 'react'
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import { AiOutlineInfoCircle, AiOutlineWechat, AiOutlineSearch } from 'react-icons/ai'
import { API_URLs } from '../../utils/ApiUrls'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { MdPending } from 'react-icons/md'
import { FcCancel } from 'react-icons/fc'
import { GiCheckMark } from 'react-icons/gi'
import { Oval } from 'react-loader-spinner';
import SubmitLoader from '../../component/Loader/SubmitLoader';
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
export default function Index() {
    const [searchText, setSearchText] = useState("");
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [tradeList, setTradeList] = useState([])
    const [PendingtradeList, setPendingTradeList] = useState([])
    const [RejecttradeList, setRejectTradeList] = useState([])
    const [CompletetradeList, setCompleteTradeList] = useState([])

    const isTabSelected = location.hash.includes('pending-offers')
        || location.hash.includes('rejected-offers')
        || location.hash.includes('approved-offers')

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };
    let filteredData
    if (location.hash.includes('pending-offers')) {
        filteredData = PendingtradeList.filter((row) =>
            row?._id?.toLowerCase().includes(searchText?.toLowerCase()) || row?.status?.toLowerCase().includes(searchText?.toLowerCase())
        );
    }
    else if (location.hash.includes('rejected-offers')) {
        filteredData = RejecttradeList.filter((row) =>
            row?._id?.toLowerCase().includes(searchText?.toLowerCase()) || row?.status?.toLowerCase().includes(searchText?.toLowerCase())
        );
    }
    else {
        filteredData = CompletetradeList.filter((row) =>
            row?._id?.toLowerCase().includes(searchText?.toLowerCase()) || row?.status?.toLowerCase().includes(searchText?.toLowerCase())
        );
    }

    const handleGetTradeList = () => {
        setLoader(true)
        axios.get(API_URLs.active, {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((res) => {
                console.log('get all active offers response', res)
                setTradeList(res?.data?.trade)
                setLoader(false)
            })
            .catch((error) => {
                console.log('active all active offer error', error)
                setLoader(false)
            })
    }

    useEffect(() => {
        let reject = tradeList.filter((option) => {
            return option.status === 'REJECT'
        })
        setRejectTradeList(reject);

        let pending = tradeList.filter((option) => {
            return option.status === 'PENDING'
        })
        setPendingTradeList(pending);

        let complete = tradeList.filter((option) => {
            return option.status === 'APPROVE'
        })
        setCompleteTradeList(complete);
    }, [tradeList])

    useEffect(() => {
        handleGetTradeList();
    }, [])

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
            name: 'Name',
            selector: (row) => row?.user?.name,
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
            id: 'createdAt',
            name: "Created Date",
            selector: (row) => new Date(row?.createdAt).toDateString(),
            sortable: true
        },
        {
            name: 'Trade At',
            selector: (row) => new Date(row?.trade_time).toDateString(),
        },
        {
            name: "Action",
            cell: (row) => (
                <div className='d-flex gap-2'>
                    <p
                        className="mb-0      text-dark text-decoration-none" role='button' title='View Trade Info'
                        onClick={() => { navigate(`/trademanagement/${row?.offer_id?._id}`) }}
                    >
                        <AiOutlineInfoCircle size={19} /></p>
                    <p
                        className="mb-0 text-dark text-decoration-none" role='button' title='View Chats'
                        onClick={() => { navigate(`/chats/${row?.offer_id?._id}/${row?._id}`) }}
                    >
                        <AiOutlineWechat size={19} /></p>
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
    }
    return (
        <div className="p-3">
            <div className="card p-2 mt-3" style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.25 " }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="p-2 pb-4 text-decoration-underline">
                        ACTIVE TRADES
                    </h5>
                    <Div>
                        <Input type="text" placeholder="Search Here" value={searchText} onChange={handleSearch} />
                        <AiOutlineSearch size={18} />
                    </Div>
                </div>
                <div>
                    <ul className="nav nav-tabs myoffer-tabs gap-3 border-0" id="myTab" role="tablist">
                        <div className="nav-item text-decoration-none" role="presentation">
                            <button
                                className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('pending-offers') ? 'active' : '' : 'active'}`} id="pending-offers-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#pending-offers"
                                type="button"
                                role="tab"
                                aria-controls="pending-offers"
                                onClick={() => navigate('#pending-offers')}
                                aria-selected="true">
                                <MdPending />
                                Active Trades
                                {/* <Span active={isTabSelected ? location.hash.includes('pending-offers') ? true : false : true}>{pendingOffer?.length}</Span> */}
                            </button>
                        </div>
                        <div className="nav-item text-decoration-none" role="presentation">
                            <button
                                className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('rejected-offers') ? 'active' : '' : ''}`}
                                id="rejected-offers-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#rejected-offers"
                                type="button"
                                role="tab"
                                aria-controls="rejected-offers"
                                onClick={() => navigate('#rejected-offers')}
                                aria-selected="true">
                                <FcCancel />
                                Canceled Trades
                                {/* <Span active={isTabSelected ? location.hash.includes('rejected-offers') ? true : false : false}>{rejectOffer?.length}</Span> */}
                            </button>
                        </div>
                        <div className="nav-item text-decoration-none" role="presentation">
                            <button
                                className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('approved-offers') ? 'active' : '' : ''}`} id="approved-offers-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#approved-offers"
                                type="button"
                                role="tab"
                                aria-controls="approved-offers"
                                onClick={() => navigate('#approved-offers')}
                                aria-selected="true">
                                <GiCheckMark />
                                Completed Trades
                                {/* <Span active={isTabSelected ? location.hash.includes('approved-offers') ? true : false : false}>{completeeOffer?.length}</Span> */}
                            </button>
                        </div>
                    </ul>
                </div>
                <div className="tab-content offerlist mt-4" id="myTabContent">
                    <div
                        className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('pending-offers') ? 'show active' : '' : 'show active'}`}
                        id="pending-offers"
                        role="tabpanel"
                        aria-labelledby="pending-offers-tab">
                        {/* <Buyoffer buyofferdata={buyofferdata} getAllOffers={getAllOffers} /> */}

                        <DataTable
                            columns={columns}
                            data={filteredData}
                            progressComponent={<div className='d-flex justify-content-center py-5'>
                                <Oval
                                    height={50}
                                    width={50}
                                    color='black'
                                    secondaryColor='black'
                                />
                            </div>}
                            progressPending={loader}
                            customStyles={customStyles}
                            pagination
                            fixedHeader
                            responsive={true}
                        />
                    </div>
                    <div
                        className={`tab-pane  py-3 px-2 ${isTabSelected ? location.hash.includes('rejected-offers') ? 'show active' : '' : ''}`}
                        id="rejected-offers"
                        role="tabpanel"
                        aria-labelledby="rejected-offers-tab">
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            progressPending={loader}
                            progressComponent={<div className='d-flex justify-content-center py-5'>
                                <Oval
                                    height={50}
                                    width={50}
                                    color='black'
                                    secondaryColor='black'
                                />
                            </div>}
                            customStyles={customStyles}
                            pagination
                            fixedHeader
                            responsive={true}
                        />
                    </div>
                    <div
                        className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('approved-offers') ? 'show active' : '' : ''}`}
                        id='approved-offers'
                        role='tabpanel'
                        aria-labelledby='approved-offers-tab'>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            progressComponent={<div className='d-flex justify-content-center py-5'>
                                <Oval
                                    height={50}
                                    width={50}
                                    color='black'
                                    secondaryColor='black'
                                />
                            </div>}
                            progressPending={loader}
                            customStyles={customStyles}
                            pagination
                            fixedHeader
                            responsive={true}
                        />
                    </div>
                </div>
                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressComponent={<div className='d-flex justify-content-center py-5'>
                        <ThreeDots />
                    </div>}
                    defaultSortAsc={false}
                    customStyles={customStyles}
                    pagination
                    fixedHeader
                    responsive={true}
                    defaultSortFieldId="createdAt"
                /> */}
                <div className=" my-3 mx-5  d-flex justify-content-end">
                    <CSVLink className="bg-primary ouline-none text-white p-1 rounded text-decoration-none" data={tradeList}>
                        Download CSV
                    </CSVLink>
                </div>
            </div>
        </div>
    );
}