import React, { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
import { BsEyeFill } from "react-icons/bs";
import FiatSingle from "./FiatSingle";
import PageLoader from "../../component/Loader/PageLoader";
import { CSVLink } from "react-csv";
import { useAuthContextHook } from "../../context/AuthContext";
import styled from "styled-components";
const Input = styled.input`

`
const TransactionManagement = () => {
  let { user, userDetails } = useAuthContextHook();
  console.log(user, "user from tran")
  console.log(userDetails, "user from tran")

  const [loading, setLoading] = useState(true);
  const [cryptoTransaction, setCryptoTransaction] = useState([]);
  const [downloadedData, setDownloadedData] = useState([])
  const [search, setSearch] = useState('')

  // ! For Datatable
  const handleClickView = (row) => {
    setFiatSingle(row);
  }

  const cryptoColumn = [
    {
      name: "Currency",
      selector: (row) => <div>
        {row?.currency}
        <input
          placeholder="Enter Currency"
        />
      </div>,

    },
    {
      name: "Sender Name",
      selector: (row) => row?.fromUserId?.name,
      hide: "sm",
    },
    {
      name: "Reciever Name",
      selector: (row) => row?.toUserId?.name,
      // hide: "sm",
    },
    {
      name: "Sender Debited",
      selector: (row) => row.transactionAmount,
    },
    {
      name: "Reciever Credited",
      selector: (row) => row.receivedAmount,
      hide: "md",
    },
    {
      name: "Admin Received",
      selector: (row) => row.adminFee,
      // hide: "sm",
    },
    {
      name: "Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
      id: 'createdAt',
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => <div role="button" title='View' onClick={() => handleClickView(row)}>View <BsEyeFill size={15} onClick={() => handleShow(row)} /></div>,
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

  //! Fiat Transaction for single user
  const [fiatSingle, setFiatSingle] = useState({});
  const handleClose = () => setFiatSingle({});
  const handleShow = (value) => setFiatSingle(value);

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
        setCryptoTransaction(res.data.transactions2);
        var data = res.data.transactions2;
        var downloadedTxn = [];
        for (var key in data) {
          var rowData = data[key];
          let coinData = {
            adminFee: rowData.adminFee,
            createdAt: rowData.createdAt,
            currency: rowData.currency,
            escrowAmount: rowData.escrowAmount,
            gasfee: rowData.gasfee,
            realTransactionFromTo: rowData.realTransactionFromTo,
            receivedAmount: rowData.receivedAmount,
            transactionAmount: rowData.transactionAmount,
            transactionId: rowData.transactionId,
            transactionType: rowData.transactionType,
            updatedAt: rowData.updatedAt,
            __v: rowData.__v,
            _id: rowData._id,
          }
          downloadedTxn.push(coinData)
        }
        setDownloadedData(downloadedTxn)
        setLoading(false)
        console.log("Crypto Transaxction List 1", res.data.transactions2);
      })
      .catch((err) => {
        console.log("crypto", err);
        setLoading(false)
      });
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  }
  console.log(search)
  // console.log("Crypto Transaxction List", downloadedData);

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
          {!Object.keys(fiatSingle).length ? <>
            <div className="d-flex justify-content-between my-2 align-items-center">
              <h5 className="p-2text-decoration-underline">
                TRANSACTION LIST
              </h5>
              <Input
                placeholder='Search'
                onChange={handleChange}
                value={search}
              />
            </div>
            <DataTable
              columns={cryptoColumn}
              data={cryptoTransaction}
              customStyles={customStyles}
              pagination
              fixedHeader
              responsive={true}
            />
            <div className=" my-3 mx-5  d-flex justify-content-end">
              <CSVLink
                className="bg-primary text-white p-1 text-decoration-none"
                data={downloadedData} > Download CSV </CSVLink>
            </div>
          </> :
            <FiatSingle fiatSingle={fiatSingle} handleClose={handleClose} />
          }
        </div>
      </div>
    </>
  );
};

export default TransactionManagement;