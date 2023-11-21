import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsArrow90DegRight, BsSend } from "react-icons/bs";
import { MdCallReceived } from "react-icons/md";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import Modal from "react-bootstrap/Modal";
import { BsEyeFill } from 'react-icons/bs'
import { useForm } from "react-hook-form";
import QRCode from "qrcode";
import FiatSingle from "../TransactionManagement/FiatSingle";
// import SingleTxn from './SingleTransaction'
import axios from "axios";
import useClipboard from "react-use-clipboard";
import { API_URLs } from "../../utils/ApiUrls";
import PageLoader from "../../component/Loader/PageLoader";
import { useLocation, useNavigate } from 'react-router-dom'
const WalletManagement = () => {
  const [loading, setLoading] = useState(true);
  const [allWalletData, setAllWalletData] = useState([]);
  const [balanceData, setBalanceData] = useState('');
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const location = useLocation();
  const navigate = useNavigate();
  const isTabSelected = location.hash.includes('adminwallet')
    || location.hash.includes('userswallet')
  let [singleSend, setSingleSend] = useState([]);
  const [transaction, setTransaction] = useState([{}]); // Crypto transaction data stored form API
  const [fiatSingle, setFiatSingle] = useState({});
  const handleCloseSingle = () => setFiatSingle({});
  const handleShowSingle = (value) => setFiatSingle(value);

  // new
  const [walletManagementData, setWalletManagementData] = useState([]);
  const [cummulativeWallet, setCummulativeWallet] = useState([]);
  // admin wallet api
  const getAdminWallet = () => {
    axios.get(API_URLs.getCryptoWallet, {
      headers: {
        'accept': "application/json",
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('response fron new api of admin wallet', res)
        let cryptoDetails = res.data
        let walletdata = [];
        for (var key in cryptoDetails) {
          let rowData = cryptoDetails[key];
          let coinData = {
            address: rowData.address,
            balance: rowData.balance,
            createdAt: rowData.createdAt,
            currency: rowData.currency,
            isAdminDisable: rowData.isAdminDisable,
            updatedAt: rowData.updatedAt,
            __v: rowData.__v,
            _id: rowData._id
          }
          walletdata.push(coinData)
        }
        setWalletManagementData(walletdata)
        setLoading(false);
      })
      .catch((error) => {
        // console.log('error from new api for admin wallet', error)
        setLoading(false);
      })
  }

  const getCummulativeWallet = () => {
    axios.get(API_URLs.getAllWallet, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('new api res for cummulative wallet', res)
        let cummData = res.data;
        var cummulative = [];
        for (var key in cummData) {
          var rowData = cummData[key]
          cummulative.push(rowData)
        }
        setCummulativeWallet(cummulative)
      })
      .catch((error) => {
        console.log('new api error for cummulative wallet', error)
      })
  }

  // run api while loading page
  useEffect(() => {
    getAdminWallet();
    getCummulativeWallet();
  }, [])

  const [showReceive, setShowReceive] = useState(false);
  const handleReceiveClose = () => {
    setShowReceive(false);
    setCopyClip(false);
  };
  const handleReceiveShow = (value) => {
    setShowReceive(true);
    setSingleSend(value);
  };

  const [isCopied, setCopied] = useClipboard(`${singleSend._id}`);
  const [copyClip, setCopyClip] = useState(false);
  const [para, showPara] = useState(false);

  // TODO :  Qr Code Generate
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(`${singleSend._id}`);
        setQRCodeDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [singleSend]);

  //! For Modal : Send
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setShow(true);
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  // for admin data
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      hide: "sm",
    },
    {
      name: "CURRENCY",
      selector: (row) => row.currency,
    },
    {
      name: "BALANCE",
      selector: (row) => row.balance,
    },
    {
      name: "CREATED DATE",
      selector: (row) => new Date(row?.createdAt).toDateString(),
      hide: "md",
    },
    {
      name: "ACTION",
      cell: (row) => (
        <div className="d-flex gap-4">
          <BsSend size={15} onClick={() => handleShow(row)} role="button" title={`Send ${row.currency}`} />
          <MdCallReceived size={15} onClick={() => handleReceiveShow(row)} role="button" title={`Recieve ${row.currency}`} />
        </div>
      ),
    },
  ];

  // for cumulative data
  const columns1 = [
    {
      name: "Id",
      selector: (row, index) => index + 1,
      hide: "sm",
    },
    {
      name: "Currency",
      selector: (row) => row.name,
    },
    {
      name: "Available Balance",
      selector: (row) => row?.balance?.sum?.$numberDecimal,
      // selector: (row) => row.name,
    },
  ];

  // costom styles
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
    <>
      <div className="p-3">
        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <h5 className="p-2 pb-4 text-decoration-underline">
            WALLET MANAGEMENT
          </h5>

          <div>
            <ul className="nav nav-tabs myoffer-tabs gap-3 border-0" id="myTab" role="tablist">
              <div className="nav-item text-decoration-none" role="presentation">
                <button
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('adminwallet') ? 'active' : '' : 'active'}`}
                  id="adminwallet-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#adminwallet"
                  type="button"
                  role="tab"
                  aria-controls="adminwallet"
                  onClick={() => navigate('#adminwallet')}
                  aria-selected="true">
                  {/* <BsArrowDownLeft /> */}
                  Admin Wallet
                </button>
              </div>
              <div className="nav-item text-decoration-none" role="presentation">
                <button
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('userswallet') ? 'active' : '' : ''}`} id="userswallet-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#userswallet"
                  type="button"
                  role="tab"
                  aria-controls="userswallet"
                  onClick={() => navigate('#userswallet')}
                  aria-selected="true">
                  {/* <BsArrowUpRight /> */}
                  Cummulative Wallet
                </button>
              </div>
            </ul>
          </div>

          <div className="tab-content" id="myTabContent">
            <div
              className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('adminwallet') ? 'show active' : '' : 'show active'}`}
              id="adminwallet"
              role="tabpanel"
              aria-labelledby="adminwallet-tab">
              <DataTable
                columns={columns}
                data={walletManagementData}
                customStyles={customStyles}
                pagination
                fixedHeader
                highlightOnHover
                responsive={true}
              />
            </div>
            <div
              className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('userswallet') ? 'show active' : '' : ''}`}
              id='userswallet'
              role='tabpanel'
              aria-labelledby='userswallet-tab'>
              <DataTable
                columns={columns1}
                data={cummulativeWallet}
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

      {/* {/ Send Modal Start /} */}
      <Modal
        size="md"
        show={show}
        dialogClassName="modal-90w"
        onHide={handleClose}
      >
        <Modal.Body
          className="p-4 rounded-1"
          style={{ backgroundColor: "#e3e6e9" }}
        >
          <form
            className="d-flex flex-column gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex align-items-center justify-content-between ">
              <span className="fw-bold">Currency</span>
              <span
                onClick={handleClose}
                className="bg-primary border-none text-white rounded-2 px-2"
              >
                X
              </span>
            </div>

            <div
              className="card d-flex flex-row align-items-center justify-content-between "
              style={{
                padding: "10px 30px",
              }}
            >
              <span className="fw-bold">Sending</span>
              <select
                className="fw-bold border-0 p-3"
                name="currenctType"
                id="currenctType"
                {...register("bitcoin")}
              >
                <option value="">Bitcoin</option>
                <option value="BTC">BTC</option>
                <option value="Ether">Ether</option>
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
              </select>
            </div>

            <div className="card gap-4 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Send to</span>
                <span className="p-2 bg-primary text-white fw-bold rounded-3">
                  Address
                </span>
              </div>
              <div>
                <input
                  className="border-0 w-100"
                  placeholder="Paste or enter wallet address here"
                  type="text"
                  {...register("wallet")}
                  style={{
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div
              className="card"
              style={{
                padding: "15px 30px",
              }}
            >
              <input
                className=" fw-bold w-100 border-0"
                placeholder="Amount to send"
                {...register("amount")}
                type="text"
                style={{
                  outline: "none",
                }}
              />
            </div>

            <button
              className="bg-primary border-none text-white p-3 "
              style={{
                border: "none",
                borderRadius: "5px",
              }}
            >
              Continue <BsArrow90DegRight />
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Receive Modal Start*/}
      <Modal
        size="md"
        show={showReceive}
        dialogClassName="modal-90w"
        onHide={handleClose}
      >
        <Modal.Body className="p-4 rounded-1">
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-center justify-content-between ">
              <span className="fw-bold">Receive Currency</span>
              <span
                onClick={handleReceiveClose}
                className="bg-primary border-none text-white rounded-2 px-2"
              >
                X
              </span>
            </div>
            <div className="p-1">
              <img
                style={{ border: "1px solid black" }}
                src={qrCodeDataUrl}
                alt="QR Code"
              // className="border-primary border-1"
              />
            </div>

            <div className="h2 fw-bold text-muted">Your {singleSend?.currency} address</div>

            <div>
              <p>Use this address to deposit {singleSend?.currency}</p>
              <p className="fw-bold">{singleSend?.address}</p>
            </div>
          </div>

          <div
            style={{ marginBottom: "15px" }}
            onClick={() => setCopyClip(true)}
          >
            <button
              onClick={setCopied}
              className="bg-primary ouline-none border-0 text-white p-2 rounded-3"
            // className={`${
            //   isCopied ? "bg-success" : "bg-primary text-white"
            // } ouline-none border-0 text-white p-2 rounded-3`}
            >
              {/* {/ {isCopied ? "copied" : "Copy Address"} /} */}
              Copy Address {""}
            </button>
            <span className="text-success">
              {copyClip ? " Copied !!!!!!" : ""}
            </span>
          </div>

          <div>
            <p>
              Deposit to this address at least once to be able to generate a new
              one.
              <span
                onClick={() => {
                  showPara(!para);
                }}
                className="text-primary cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                {""} Privacy tip {""}
                {!para ? <TfiAngleDown /> : <TfiAngleUp />}
              </span>
            </p>
            {para ? (
              <p style={{ fontSize: "14px" }}>
                To maximize privacy, use a new {singleSend?.currency} address each time you
                receive a deposit. Once you’ve received {singleSend?.currency} from an external
                wallet to the address above, you can request a new address to be
                generated. Your older {singleSend?.currency} addresses will still work, you can
                find them on Addresses tab.
              </p>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletManagement;
