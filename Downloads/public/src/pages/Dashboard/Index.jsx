import React from 'react'
import { Card, Heading, P } from './StyledComponents'
import { Button, Dropdown } from 'react-bootstrap'

import Chart from "react-apexcharts";
import { areaChartData, blueAreaGraphFR } from './ChartDataDummy';
import DataTable from 'react-data-table-component';
import { BsEyeFill } from 'react-icons/bs';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URLs } from '../../utils/ApiUrls';
import { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const cryptoColumn = [
    {
        name: "S.No.",
        selector: (row, index) => index + 1,
    },
    {
        name: "User",
        selector: (row) => row.user,
        hide: "sm",
    },
    {
        name: "Amount",
        selector: (row) => row.amount,
        hide: "sm",
    },
    {
        name: "Currency",
        selector: (row) => row.currency_type,
    },
    // {
    //     name: "Txn Hash",
    //     selector: (row) => row.txn_hash,
    //     hide: "sm",
    // },
    {
        name: "Action",
        cell: (row) => <BsEyeFill size={15}
        // onClick={() => handleShow(row)}
        />,
    },
];

export default function Dashboard() {

    const [cryptoTransaction, setCryptoTransaction] = useState([])

    //! Api Call for Crypto Transaction
    useEffect(() => {
        axios
            .get(API_URLs.cryptoTransaction, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            })
            .then((res) => {
                setCryptoTransaction(res.data.transaction);
                // console.log("crypto", res);
            })
            .catch((err) => {
                console.log("crypto", err);
            });
    }, []);

    return (
        <div className='container p-3'>
            <Heading>Dashboard</Heading>
            <div className='d-flex gap-3 flex-wrap'>
                <Card style={{ width: '248px' }} className='d-flex p-3 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <rect width={50} height={50} rx="15.7895" fill="#F4F7FF" />
                        <path d="M25.4088 25.2851C26.1005 24.6864 26.6553 23.9458 27.0356 23.1137C27.4159 22.2816 27.6127 21.3775 27.6127 20.4626C27.6127 18.7435 26.9297 17.0948 25.7142 15.8792C24.4986 14.6636 22.8499 13.9807 21.1308 13.9807C19.4117 13.9807 17.763 14.6636 16.5474 15.8792C15.3318 17.0948 14.6489 18.7435 14.6489 20.4626C14.6489 21.3775 14.8457 22.2816 15.2259 23.1137C15.6062 23.9458 16.161 24.6864 16.8527 25.2851C15.038 26.1069 13.4983 27.4339 12.4178 29.1075C11.3373 30.7812 10.7617 32.7306 10.7598 34.7227C10.7598 35.0666 10.8963 35.3963 11.1395 35.6394C11.3826 35.8825 11.7123 36.0191 12.0561 36.0191C12.4 36.0191 12.7297 35.8825 12.9728 35.6394C13.2159 35.3963 13.3525 35.0666 13.3525 34.7227C13.3525 32.6598 14.172 30.6814 15.6307 29.2227C17.0894 27.764 19.0679 26.9445 21.1308 26.9445C23.1937 26.9445 25.1721 27.764 26.6308 29.2227C28.0895 30.6814 28.909 32.6598 28.909 34.7227C28.909 35.0666 29.0456 35.3963 29.2887 35.6394C29.5319 35.8825 29.8616 36.0191 30.2054 36.0191C30.5492 36.0191 30.879 35.8825 31.1221 35.6394C31.3652 35.3963 31.5018 35.0666 31.5018 34.7227C31.4999 32.7306 30.9243 30.7812 29.8437 29.1075C28.7632 27.4339 27.2236 26.1069 25.4088 25.2851ZM21.1308 24.3517C20.3616 24.3517 19.6097 24.1236 18.9701 23.6963C18.3305 23.2689 17.832 22.6615 17.5377 21.9509C17.2433 21.2403 17.1663 20.4583 17.3164 19.7039C17.4664 18.9494 17.8368 18.2565 18.3807 17.7126C18.9247 17.1687 19.6176 16.7983 20.372 16.6482C21.1265 16.4981 21.9084 16.5751 22.6191 16.8695C23.3297 17.1639 23.9371 17.6623 24.3645 18.3019C24.7918 18.9415 25.0199 19.6934 25.0199 20.4626C25.0199 21.4941 24.6102 22.4833 23.8808 23.2126C23.1515 23.942 22.1622 24.3517 21.1308 24.3517ZM33.7575 24.7666C34.5871 23.8323 35.1291 22.6782 35.3181 21.4431C35.5071 20.208 35.3351 18.9446 34.8228 17.805C34.3105 16.6654 33.4798 15.6981 32.4306 15.0197C31.3814 14.3412 30.1585 13.9804 28.909 13.9807C28.5652 13.9807 28.2355 14.1173 27.9924 14.3604C27.7492 14.6035 27.6127 14.9333 27.6127 15.2771C27.6127 15.6209 27.7492 15.9506 27.9924 16.1938C28.2355 16.4369 28.5652 16.5735 28.909 16.5735C29.9405 16.5735 30.9297 16.9832 31.6591 17.7126C32.3884 18.4419 32.7982 19.4311 32.7982 20.4626C32.7963 21.1435 32.6158 21.812 32.2745 22.4012C31.9333 22.9904 31.4433 23.4798 30.8536 23.8202C30.6614 23.9311 30.5009 24.0894 30.3874 24.2801C30.2739 24.4708 30.2112 24.6874 30.2054 24.9092C30.2 25.1292 30.2507 25.3471 30.3528 25.5421C30.4548 25.7372 30.6049 25.903 30.7888 26.024L31.2944 26.3611L31.4629 26.4519C33.0255 27.193 34.3438 28.3653 35.2625 29.8306C36.1812 31.2959 36.6621 32.9933 36.6484 34.7227C36.6484 35.0666 36.785 35.3963 37.0281 35.6394C37.2712 35.8825 37.601 36.0191 37.9448 36.0191C38.2886 36.0191 38.6183 35.8825 38.8615 35.6394C39.1046 35.3963 39.2412 35.0666 39.2412 34.7227C39.2518 32.7334 38.7535 30.7743 37.7937 29.0317C36.8339 27.2891 35.4445 25.8209 33.7575 24.7666Z" fill="#1476FF" />
                    </svg>

                    <div>
                        <P className='m-0'>Users</P>
                        <Heading className='m-0'>23.6k</Heading>
                    </div>
                </Card>


                <Card style={{ width: '248px' }} className='d-flex p-3 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <rect width={50} height={50} rx="15.7895" fill="#F4F7FF" />
                        <path d="M25.4088 25.2851C26.1005 24.6864 26.6553 23.9458 27.0356 23.1137C27.4159 22.2816 27.6127 21.3775 27.6127 20.4626C27.6127 18.7435 26.9297 17.0948 25.7142 15.8792C24.4986 14.6636 22.8499 13.9807 21.1308 13.9807C19.4117 13.9807 17.763 14.6636 16.5474 15.8792C15.3318 17.0948 14.6489 18.7435 14.6489 20.4626C14.6489 21.3775 14.8457 22.2816 15.2259 23.1137C15.6062 23.9458 16.161 24.6864 16.8527 25.2851C15.038 26.1069 13.4983 27.4339 12.4178 29.1075C11.3373 30.7812 10.7617 32.7306 10.7598 34.7227C10.7598 35.0666 10.8963 35.3963 11.1395 35.6394C11.3826 35.8825 11.7123 36.0191 12.0561 36.0191C12.4 36.0191 12.7297 35.8825 12.9728 35.6394C13.2159 35.3963 13.3525 35.0666 13.3525 34.7227C13.3525 32.6598 14.172 30.6814 15.6307 29.2227C17.0894 27.764 19.0679 26.9445 21.1308 26.9445C23.1937 26.9445 25.1721 27.764 26.6308 29.2227C28.0895 30.6814 28.909 32.6598 28.909 34.7227C28.909 35.0666 29.0456 35.3963 29.2887 35.6394C29.5319 35.8825 29.8616 36.0191 30.2054 36.0191C30.5492 36.0191 30.879 35.8825 31.1221 35.6394C31.3652 35.3963 31.5018 35.0666 31.5018 34.7227C31.4999 32.7306 30.9243 30.7812 29.8437 29.1075C28.7632 27.4339 27.2236 26.1069 25.4088 25.2851ZM21.1308 24.3517C20.3616 24.3517 19.6097 24.1236 18.9701 23.6963C18.3305 23.2689 17.832 22.6615 17.5377 21.9509C17.2433 21.2403 17.1663 20.4583 17.3164 19.7039C17.4664 18.9494 17.8368 18.2565 18.3807 17.7126C18.9247 17.1687 19.6176 16.7983 20.372 16.6482C21.1265 16.4981 21.9084 16.5751 22.6191 16.8695C23.3297 17.1639 23.9371 17.6623 24.3645 18.3019C24.7918 18.9415 25.0199 19.6934 25.0199 20.4626C25.0199 21.4941 24.6102 22.4833 23.8808 23.2126C23.1515 23.942 22.1622 24.3517 21.1308 24.3517ZM33.7575 24.7666C34.5871 23.8323 35.1291 22.6782 35.3181 21.4431C35.5071 20.208 35.3351 18.9446 34.8228 17.805C34.3105 16.6654 33.4798 15.6981 32.4306 15.0197C31.3814 14.3412 30.1585 13.9804 28.909 13.9807C28.5652 13.9807 28.2355 14.1173 27.9924 14.3604C27.7492 14.6035 27.6127 14.9333 27.6127 15.2771C27.6127 15.6209 27.7492 15.9506 27.9924 16.1938C28.2355 16.4369 28.5652 16.5735 28.909 16.5735C29.9405 16.5735 30.9297 16.9832 31.6591 17.7126C32.3884 18.4419 32.7982 19.4311 32.7982 20.4626C32.7963 21.1435 32.6158 21.812 32.2745 22.4012C31.9333 22.9904 31.4433 23.4798 30.8536 23.8202C30.6614 23.9311 30.5009 24.0894 30.3874 24.2801C30.2739 24.4708 30.2112 24.6874 30.2054 24.9092C30.2 25.1292 30.2507 25.3471 30.3528 25.5421C30.4548 25.7372 30.6049 25.903 30.7888 26.024L31.2944 26.3611L31.4629 26.4519C33.0255 27.193 34.3438 28.3653 35.2625 29.8306C36.1812 31.2959 36.6621 32.9933 36.6484 34.7227C36.6484 35.0666 36.785 35.3963 37.0281 35.6394C37.2712 35.8825 37.601 36.0191 37.9448 36.0191C38.2886 36.0191 38.6183 35.8825 38.8615 35.6394C39.1046 35.3963 39.2412 35.0666 39.2412 34.7227C39.2518 32.7334 38.7535 30.7743 37.7937 29.0317C36.8339 27.2891 35.4445 25.8209 33.7575 24.7666Z" fill="#1476FF" />
                    </svg>

                    <div>
                        <P className='m-0'>BTC</P>
                        <Heading className='m-0'>10.0</Heading>
                    </div>
                </Card>

                <Card style={{ width: '248px' }} className='d-flex p-3 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <rect width={50} height={50} rx="15.7895" fill="#F4F7FF" />
                        <path d="M25.4088 25.2851C26.1005 24.6864 26.6553 23.9458 27.0356 23.1137C27.4159 22.2816 27.6127 21.3775 27.6127 20.4626C27.6127 18.7435 26.9297 17.0948 25.7142 15.8792C24.4986 14.6636 22.8499 13.9807 21.1308 13.9807C19.4117 13.9807 17.763 14.6636 16.5474 15.8792C15.3318 17.0948 14.6489 18.7435 14.6489 20.4626C14.6489 21.3775 14.8457 22.2816 15.2259 23.1137C15.6062 23.9458 16.161 24.6864 16.8527 25.2851C15.038 26.1069 13.4983 27.4339 12.4178 29.1075C11.3373 30.7812 10.7617 32.7306 10.7598 34.7227C10.7598 35.0666 10.8963 35.3963 11.1395 35.6394C11.3826 35.8825 11.7123 36.0191 12.0561 36.0191C12.4 36.0191 12.7297 35.8825 12.9728 35.6394C13.2159 35.3963 13.3525 35.0666 13.3525 34.7227C13.3525 32.6598 14.172 30.6814 15.6307 29.2227C17.0894 27.764 19.0679 26.9445 21.1308 26.9445C23.1937 26.9445 25.1721 27.764 26.6308 29.2227C28.0895 30.6814 28.909 32.6598 28.909 34.7227C28.909 35.0666 29.0456 35.3963 29.2887 35.6394C29.5319 35.8825 29.8616 36.0191 30.2054 36.0191C30.5492 36.0191 30.879 35.8825 31.1221 35.6394C31.3652 35.3963 31.5018 35.0666 31.5018 34.7227C31.4999 32.7306 30.9243 30.7812 29.8437 29.1075C28.7632 27.4339 27.2236 26.1069 25.4088 25.2851ZM21.1308 24.3517C20.3616 24.3517 19.6097 24.1236 18.9701 23.6963C18.3305 23.2689 17.832 22.6615 17.5377 21.9509C17.2433 21.2403 17.1663 20.4583 17.3164 19.7039C17.4664 18.9494 17.8368 18.2565 18.3807 17.7126C18.9247 17.1687 19.6176 16.7983 20.372 16.6482C21.1265 16.4981 21.9084 16.5751 22.6191 16.8695C23.3297 17.1639 23.9371 17.6623 24.3645 18.3019C24.7918 18.9415 25.0199 19.6934 25.0199 20.4626C25.0199 21.4941 24.6102 22.4833 23.8808 23.2126C23.1515 23.942 22.1622 24.3517 21.1308 24.3517ZM33.7575 24.7666C34.5871 23.8323 35.1291 22.6782 35.3181 21.4431C35.5071 20.208 35.3351 18.9446 34.8228 17.805C34.3105 16.6654 33.4798 15.6981 32.4306 15.0197C31.3814 14.3412 30.1585 13.9804 28.909 13.9807C28.5652 13.9807 28.2355 14.1173 27.9924 14.3604C27.7492 14.6035 27.6127 14.9333 27.6127 15.2771C27.6127 15.6209 27.7492 15.9506 27.9924 16.1938C28.2355 16.4369 28.5652 16.5735 28.909 16.5735C29.9405 16.5735 30.9297 16.9832 31.6591 17.7126C32.3884 18.4419 32.7982 19.4311 32.7982 20.4626C32.7963 21.1435 32.6158 21.812 32.2745 22.4012C31.9333 22.9904 31.4433 23.4798 30.8536 23.8202C30.6614 23.9311 30.5009 24.0894 30.3874 24.2801C30.2739 24.4708 30.2112 24.6874 30.2054 24.9092C30.2 25.1292 30.2507 25.3471 30.3528 25.5421C30.4548 25.7372 30.6049 25.903 30.7888 26.024L31.2944 26.3611L31.4629 26.4519C33.0255 27.193 34.3438 28.3653 35.2625 29.8306C36.1812 31.2959 36.6621 32.9933 36.6484 34.7227C36.6484 35.0666 36.785 35.3963 37.0281 35.6394C37.2712 35.8825 37.601 36.0191 37.9448 36.0191C38.2886 36.0191 38.6183 35.8825 38.8615 35.6394C39.1046 35.3963 39.2412 35.0666 39.2412 34.7227C39.2518 32.7334 38.7535 30.7743 37.7937 29.0317C36.8339 27.2891 35.4445 25.8209 33.7575 24.7666Z" fill="#1476FF" />
                    </svg>

                    <div>
                        <P className='m-0'>ETH</P>
                        <Heading className='m-0'>10.0</Heading>
                    </div>
                </Card>

                <Card style={{ width: '248px' }} className='d-flex p-3 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <rect width={50} height={50} rx="15.7895" fill="#F4F7FF" />
                        <path d="M25.4088 25.2851C26.1005 24.6864 26.6553 23.9458 27.0356 23.1137C27.4159 22.2816 27.6127 21.3775 27.6127 20.4626C27.6127 18.7435 26.9297 17.0948 25.7142 15.8792C24.4986 14.6636 22.8499 13.9807 21.1308 13.9807C19.4117 13.9807 17.763 14.6636 16.5474 15.8792C15.3318 17.0948 14.6489 18.7435 14.6489 20.4626C14.6489 21.3775 14.8457 22.2816 15.2259 23.1137C15.6062 23.9458 16.161 24.6864 16.8527 25.2851C15.038 26.1069 13.4983 27.4339 12.4178 29.1075C11.3373 30.7812 10.7617 32.7306 10.7598 34.7227C10.7598 35.0666 10.8963 35.3963 11.1395 35.6394C11.3826 35.8825 11.7123 36.0191 12.0561 36.0191C12.4 36.0191 12.7297 35.8825 12.9728 35.6394C13.2159 35.3963 13.3525 35.0666 13.3525 34.7227C13.3525 32.6598 14.172 30.6814 15.6307 29.2227C17.0894 27.764 19.0679 26.9445 21.1308 26.9445C23.1937 26.9445 25.1721 27.764 26.6308 29.2227C28.0895 30.6814 28.909 32.6598 28.909 34.7227C28.909 35.0666 29.0456 35.3963 29.2887 35.6394C29.5319 35.8825 29.8616 36.0191 30.2054 36.0191C30.5492 36.0191 30.879 35.8825 31.1221 35.6394C31.3652 35.3963 31.5018 35.0666 31.5018 34.7227C31.4999 32.7306 30.9243 30.7812 29.8437 29.1075C28.7632 27.4339 27.2236 26.1069 25.4088 25.2851ZM21.1308 24.3517C20.3616 24.3517 19.6097 24.1236 18.9701 23.6963C18.3305 23.2689 17.832 22.6615 17.5377 21.9509C17.2433 21.2403 17.1663 20.4583 17.3164 19.7039C17.4664 18.9494 17.8368 18.2565 18.3807 17.7126C18.9247 17.1687 19.6176 16.7983 20.372 16.6482C21.1265 16.4981 21.9084 16.5751 22.6191 16.8695C23.3297 17.1639 23.9371 17.6623 24.3645 18.3019C24.7918 18.9415 25.0199 19.6934 25.0199 20.4626C25.0199 21.4941 24.6102 22.4833 23.8808 23.2126C23.1515 23.942 22.1622 24.3517 21.1308 24.3517ZM33.7575 24.7666C34.5871 23.8323 35.1291 22.6782 35.3181 21.4431C35.5071 20.208 35.3351 18.9446 34.8228 17.805C34.3105 16.6654 33.4798 15.6981 32.4306 15.0197C31.3814 14.3412 30.1585 13.9804 28.909 13.9807C28.5652 13.9807 28.2355 14.1173 27.9924 14.3604C27.7492 14.6035 27.6127 14.9333 27.6127 15.2771C27.6127 15.6209 27.7492 15.9506 27.9924 16.1938C28.2355 16.4369 28.5652 16.5735 28.909 16.5735C29.9405 16.5735 30.9297 16.9832 31.6591 17.7126C32.3884 18.4419 32.7982 19.4311 32.7982 20.4626C32.7963 21.1435 32.6158 21.812 32.2745 22.4012C31.9333 22.9904 31.4433 23.4798 30.8536 23.8202C30.6614 23.9311 30.5009 24.0894 30.3874 24.2801C30.2739 24.4708 30.2112 24.6874 30.2054 24.9092C30.2 25.1292 30.2507 25.3471 30.3528 25.5421C30.4548 25.7372 30.6049 25.903 30.7888 26.024L31.2944 26.3611L31.4629 26.4519C33.0255 27.193 34.3438 28.3653 35.2625 29.8306C36.1812 31.2959 36.6621 32.9933 36.6484 34.7227C36.6484 35.0666 36.785 35.3963 37.0281 35.6394C37.2712 35.8825 37.601 36.0191 37.9448 36.0191C38.2886 36.0191 38.6183 35.8825 38.8615 35.6394C39.1046 35.3963 39.2412 35.0666 39.2412 34.7227C39.2518 32.7334 38.7535 30.7743 37.7937 29.0317C36.8339 27.2891 35.4445 25.8209 33.7575 24.7666Z" fill="#1476FF" />
                    </svg>

                    <div>
                        <P className='m-0'>LTC</P>
                        <Heading className='m-0'>10.0</Heading>
                    </div>
                </Card>

                <Card style={{ width: '248px' }} className='d-flex p-3 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <rect width={50} height={50} rx="15.7895" fill="#F4F7FF" />
                        <path d="M25.4088 25.2851C26.1005 24.6864 26.6553 23.9458 27.0356 23.1137C27.4159 22.2816 27.6127 21.3775 27.6127 20.4626C27.6127 18.7435 26.9297 17.0948 25.7142 15.8792C24.4986 14.6636 22.8499 13.9807 21.1308 13.9807C19.4117 13.9807 17.763 14.6636 16.5474 15.8792C15.3318 17.0948 14.6489 18.7435 14.6489 20.4626C14.6489 21.3775 14.8457 22.2816 15.2259 23.1137C15.6062 23.9458 16.161 24.6864 16.8527 25.2851C15.038 26.1069 13.4983 27.4339 12.4178 29.1075C11.3373 30.7812 10.7617 32.7306 10.7598 34.7227C10.7598 35.0666 10.8963 35.3963 11.1395 35.6394C11.3826 35.8825 11.7123 36.0191 12.0561 36.0191C12.4 36.0191 12.7297 35.8825 12.9728 35.6394C13.2159 35.3963 13.3525 35.0666 13.3525 34.7227C13.3525 32.6598 14.172 30.6814 15.6307 29.2227C17.0894 27.764 19.0679 26.9445 21.1308 26.9445C23.1937 26.9445 25.1721 27.764 26.6308 29.2227C28.0895 30.6814 28.909 32.6598 28.909 34.7227C28.909 35.0666 29.0456 35.3963 29.2887 35.6394C29.5319 35.8825 29.8616 36.0191 30.2054 36.0191C30.5492 36.0191 30.879 35.8825 31.1221 35.6394C31.3652 35.3963 31.5018 35.0666 31.5018 34.7227C31.4999 32.7306 30.9243 30.7812 29.8437 29.1075C28.7632 27.4339 27.2236 26.1069 25.4088 25.2851ZM21.1308 24.3517C20.3616 24.3517 19.6097 24.1236 18.9701 23.6963C18.3305 23.2689 17.832 22.6615 17.5377 21.9509C17.2433 21.2403 17.1663 20.4583 17.3164 19.7039C17.4664 18.9494 17.8368 18.2565 18.3807 17.7126C18.9247 17.1687 19.6176 16.7983 20.372 16.6482C21.1265 16.4981 21.9084 16.5751 22.6191 16.8695C23.3297 17.1639 23.9371 17.6623 24.3645 18.3019C24.7918 18.9415 25.0199 19.6934 25.0199 20.4626C25.0199 21.4941 24.6102 22.4833 23.8808 23.2126C23.1515 23.942 22.1622 24.3517 21.1308 24.3517ZM33.7575 24.7666C34.5871 23.8323 35.1291 22.6782 35.3181 21.4431C35.5071 20.208 35.3351 18.9446 34.8228 17.805C34.3105 16.6654 33.4798 15.6981 32.4306 15.0197C31.3814 14.3412 30.1585 13.9804 28.909 13.9807C28.5652 13.9807 28.2355 14.1173 27.9924 14.3604C27.7492 14.6035 27.6127 14.9333 27.6127 15.2771C27.6127 15.6209 27.7492 15.9506 27.9924 16.1938C28.2355 16.4369 28.5652 16.5735 28.909 16.5735C29.9405 16.5735 30.9297 16.9832 31.6591 17.7126C32.3884 18.4419 32.7982 19.4311 32.7982 20.4626C32.7963 21.1435 32.6158 21.812 32.2745 22.4012C31.9333 22.9904 31.4433 23.4798 30.8536 23.8202C30.6614 23.9311 30.5009 24.0894 30.3874 24.2801C30.2739 24.4708 30.2112 24.6874 30.2054 24.9092C30.2 25.1292 30.2507 25.3471 30.3528 25.5421C30.4548 25.7372 30.6049 25.903 30.7888 26.024L31.2944 26.3611L31.4629 26.4519C33.0255 27.193 34.3438 28.3653 35.2625 29.8306C36.1812 31.2959 36.6621 32.9933 36.6484 34.7227C36.6484 35.0666 36.785 35.3963 37.0281 35.6394C37.2712 35.8825 37.601 36.0191 37.9448 36.0191C38.2886 36.0191 38.6183 35.8825 38.8615 35.6394C39.1046 35.3963 39.2412 35.0666 39.2412 34.7227C39.2518 32.7334 38.7535 30.7743 37.7937 29.0317C36.8339 27.2891 35.4445 25.8209 33.7575 24.7666Z" fill="#1476FF" />
                    </svg>

                    <div>
                        <P className='m-0'>USDT</P>
                        <Heading className='m-0'>10.0</Heading>
                    </div>
                </Card>

                <Card style={{ width: '248px' }} className='d-flex p-3 gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                        <rect width={50} height={50} rx="15.7895" fill="#F4F7FF" />
                        <path d="M25.4088 25.2851C26.1005 24.6864 26.6553 23.9458 27.0356 23.1137C27.4159 22.2816 27.6127 21.3775 27.6127 20.4626C27.6127 18.7435 26.9297 17.0948 25.7142 15.8792C24.4986 14.6636 22.8499 13.9807 21.1308 13.9807C19.4117 13.9807 17.763 14.6636 16.5474 15.8792C15.3318 17.0948 14.6489 18.7435 14.6489 20.4626C14.6489 21.3775 14.8457 22.2816 15.2259 23.1137C15.6062 23.9458 16.161 24.6864 16.8527 25.2851C15.038 26.1069 13.4983 27.4339 12.4178 29.1075C11.3373 30.7812 10.7617 32.7306 10.7598 34.7227C10.7598 35.0666 10.8963 35.3963 11.1395 35.6394C11.3826 35.8825 11.7123 36.0191 12.0561 36.0191C12.4 36.0191 12.7297 35.8825 12.9728 35.6394C13.2159 35.3963 13.3525 35.0666 13.3525 34.7227C13.3525 32.6598 14.172 30.6814 15.6307 29.2227C17.0894 27.764 19.0679 26.9445 21.1308 26.9445C23.1937 26.9445 25.1721 27.764 26.6308 29.2227C28.0895 30.6814 28.909 32.6598 28.909 34.7227C28.909 35.0666 29.0456 35.3963 29.2887 35.6394C29.5319 35.8825 29.8616 36.0191 30.2054 36.0191C30.5492 36.0191 30.879 35.8825 31.1221 35.6394C31.3652 35.3963 31.5018 35.0666 31.5018 34.7227C31.4999 32.7306 30.9243 30.7812 29.8437 29.1075C28.7632 27.4339 27.2236 26.1069 25.4088 25.2851ZM21.1308 24.3517C20.3616 24.3517 19.6097 24.1236 18.9701 23.6963C18.3305 23.2689 17.832 22.6615 17.5377 21.9509C17.2433 21.2403 17.1663 20.4583 17.3164 19.7039C17.4664 18.9494 17.8368 18.2565 18.3807 17.7126C18.9247 17.1687 19.6176 16.7983 20.372 16.6482C21.1265 16.4981 21.9084 16.5751 22.6191 16.8695C23.3297 17.1639 23.9371 17.6623 24.3645 18.3019C24.7918 18.9415 25.0199 19.6934 25.0199 20.4626C25.0199 21.4941 24.6102 22.4833 23.8808 23.2126C23.1515 23.942 22.1622 24.3517 21.1308 24.3517ZM33.7575 24.7666C34.5871 23.8323 35.1291 22.6782 35.3181 21.4431C35.5071 20.208 35.3351 18.9446 34.8228 17.805C34.3105 16.6654 33.4798 15.6981 32.4306 15.0197C31.3814 14.3412 30.1585 13.9804 28.909 13.9807C28.5652 13.9807 28.2355 14.1173 27.9924 14.3604C27.7492 14.6035 27.6127 14.9333 27.6127 15.2771C27.6127 15.6209 27.7492 15.9506 27.9924 16.1938C28.2355 16.4369 28.5652 16.5735 28.909 16.5735C29.9405 16.5735 30.9297 16.9832 31.6591 17.7126C32.3884 18.4419 32.7982 19.4311 32.7982 20.4626C32.7963 21.1435 32.6158 21.812 32.2745 22.4012C31.9333 22.9904 31.4433 23.4798 30.8536 23.8202C30.6614 23.9311 30.5009 24.0894 30.3874 24.2801C30.2739 24.4708 30.2112 24.6874 30.2054 24.9092C30.2 25.1292 30.2507 25.3471 30.3528 25.5421C30.4548 25.7372 30.6049 25.903 30.7888 26.024L31.2944 26.3611L31.4629 26.4519C33.0255 27.193 34.3438 28.3653 35.2625 29.8306C36.1812 31.2959 36.6621 32.9933 36.6484 34.7227C36.6484 35.0666 36.785 35.3963 37.0281 35.6394C37.2712 35.8825 37.601 36.0191 37.9448 36.0191C38.2886 36.0191 38.6183 35.8825 38.8615 35.6394C39.1046 35.3963 39.2412 35.0666 39.2412 34.7227C39.2518 32.7334 38.7535 30.7743 37.7937 29.0317C36.8339 27.2891 35.4445 25.8209 33.7575 24.7666Z" fill="#1476FF" />
                    </svg>

                    <div>
                        <P className='m-0'>USDC</P>
                        <Heading className='m-0'>10.0</Heading>
                    </div>
                </Card>

            </div>
            <Card className='p-3 mt-4'>
                <div className='d-flex  justify-content-between'>
                    <div>
                        <Heading className='m-0'>Total Turnover</Heading>
                        {/* <P className='m-0'>10 BTC</P> */}
                    </div>
                    {/* <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Currency
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">ETH</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">BTC</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">USDT</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">USDC</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Leetcoin</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div> */}
                </div>
                <Chart
                    options={areaChartData.options}
                    series={areaChartData.series}
                    type="area"
                    width='95%'
                    height="100%"
                />
            </Card>
            <div className='d-flex mt-4 flex-wrap gap-3'>
                <Card className="d-flex flex-column" style={{ width: '332px' }}>
                    <div className='p-3'>
                        <Heading className='m-0'>Users</Heading>
                        <P className='m-0'>23.6k</P>
                    </div>
                    <div>
                        <Chart
                            options={blueAreaGraphFR}
                            series={blueAreaGraphFR.series}
                            type="area"
                            height={'80%'}
                        // width='100%'
                        />
                    </div>
                </Card>
                <Card className="d-flex flex-column" style={{ width: '332px' }}>
                    <div className='p-3'>
                        <Heading className='m-0'>BTC</Heading>
                        <P className='m-0'>23.6 BTC</P>
                    </div>
                    <div>
                        <Chart
                            options={blueAreaGraphFR}
                            series={blueAreaGraphFR.series}
                            type="area"
                            height={'80%'}
                        // width='100%'
                        />
                    </div>
                </Card>
                <Card className="d-flex flex-column" style={{ width: '332px' }}>
                    <div className='p-3'>
                        <Heading className='m-0'>ETH</Heading>
                        <P className='m-0'>23.6 ETH</P>
                    </div>
                    <div>
                        <Chart
                            options={blueAreaGraphFR}
                            series={blueAreaGraphFR.series}
                            type="area"
                            height={'80%'}
                        // width='100%'
                        />
                    </div>
                </Card>
                <Card className="d-flex flex-column" style={{ width: '332px' }}>
                    <div className='p-3'>
                        <Heading className='m-0'>USDT</Heading>
                        <P className='m-0'>23.6 USDT</P>
                    </div>
                    <div>
                        <Chart
                            options={blueAreaGraphFR}
                            series={blueAreaGraphFR.series}
                            type="area"
                            height={'80%'}
                        // width='100%'
                        />
                    </div>
                </Card>
                <Card className="d-flex flex-column" style={{ width: '332px' }}>
                    <div className='p-3'>
                        <Heading className='m-0'>USDC</Heading>
                        <P className='m-0'>23.6 USDC</P>
                    </div>
                    <div>
                        <Chart
                            options={blueAreaGraphFR}
                            series={blueAreaGraphFR.series}
                            type="area"
                            height={'80%'}
                        // width='100%'
                        />
                    </div>
                </Card>
                <Card className="d-flex flex-column" style={{ width: '332px' }}>
                    <div className='p-3'>
                        <Heading className='m-0'>MATIC</Heading>
                        <P className='m-0'>23.6 MATIC</P>
                    </div>
                    <div>
                        <Chart
                            options={blueAreaGraphFR}
                            series={blueAreaGraphFR.series}
                            type="area"
                            height={'80%'}
                        // width='100%'
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}