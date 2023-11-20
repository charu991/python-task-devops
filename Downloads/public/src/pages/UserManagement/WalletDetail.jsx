import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { API_URLs } from "../../utils/ApiUrls";
import Line from "../../component/Line/Line";
import styled from "styled-components";
const Button = styled.button`
width: 8rem;
display: flex;
align-items: center;
justify-content: center;
`
export default function WalletDetail() {
  const params = useParams();
  const form = useForm();
  const { register, handleSubmit } = form;

  const [userWallet, setUserWallet] = useState([]);
  const [singleWallet, setSingleWallet] = useState([]);
  const [btnClick, setBtnClick] = useState(false);

  //! For Datatable
  const columns = [
    {
      name: "S. NO.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Wallet Adress",
      selector: (row) => row?.address,
      hide: "md",
    },
    {
      name: "Currency Name",
      selector: (row) => row?.currency,
    },
    {
      name: "Balance",
      selector: (row) => row?.balance,
      hide: "md",
    },
    {
      name: "Status",
      selector: (row) =>
        row.isBlocked ? (
          <span className="fw-bold text-danger">Blocked</span>
        ) : (
          <span className="fw-bold text-success">Active</span>
        ),
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => <div onClick={() => handleShow(row)} role='button'>
        View <BsEyeFill size={13} />,
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

  //! particular Wallet of Single User
  const handleShow = (value) => setSingleWallet(value);
  const handleClose = () => setSingleWallet({});

  const onSubmit = (value) => {
    console.log(value);
    setBtnClick(true);
    // TODO : Api call for updating the Status of particular Wallet
    axios
      .put(
        API_URLs.getSingleUserParticularWallet(
          singleWallet.user,
          singleWallet._id,
          value.status
        ),
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        toast.success("Status change Successfull");
        console.log(res);
        handleClose();
        setBtnClick(false);
      })
      .catch((err) => {
        toast.error("Status not change");
        console.log(err);
        setBtnClick(false);
      });
  };

  //! Api Call for Wallet of single user
  useEffect(() => {
    axios
      .get(API_URLs.getSingleUserWallet(params?.id), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserWallet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [singleWallet]);

  console.log('userWallet', userWallet)
  return (
    <>
      <div
        className="card p-2 "
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        {!Object.keys(singleWallet).length ? (
          <>
            <h5 className="p-2 text-decoration-underline">WALLET DETAIL</h5>
            <DataTable
              columns={columns}
              data={userWallet}
              pagination
              selectableRowsHighlight
              fixedHeader
              customStyles={customStyles}
              highlightOnHover
            />
          </>
        ) : (
          <div className="p-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-decoration-underline mb-4">
                {singleWallet.currency} WALLET DETAIL
              </h5>
              <button
                className="bg-primary border-0 text-white rounded-2 px-2 mb-4"
                onClick={handleClose}
              >
                X
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-3 fw-normal"
            >
              <div className="d-flex gap-2">
                <div className="w-25">Id : </div>
                <div className="text-secondary">{singleWallet._id}</div>
              </div>
              <Line />

              <div className="d-flex gap-2">
                <div className="w-25">Balance : </div>
                <div className="text-secondary">{singleWallet.balance}</div>
              </div>
              <Line />

              <div className="d-flex gap-2">
                <div className="w-25">Currency : </div>
                <div className="text-secondary">{singleWallet.currency}</div>
              </div>
              <Line />

              <div className="d-flex gap-2">
                <div className="w-25">User : </div>
                <div className="text-secondary">{singleWallet.user}</div>
              </div>
              <Line />

              <div className="d-flex gap-2">
                <div className="w-25">Address : </div>
                <div
                  className="w-75 text-secondary"
                  style={{ overflowWrap: "break-word" }}
                >
                  {singleWallet.address}
                </div>
              </div>
              <Line />

              <div className="d-flex gap-2 align-items-center">
                <div className="w-25">Status : </div>
                <div>
                  <select
                    className="rounded-3 px-3 py-1 text-secondary"
                    style={{ outline: "none" }}
                    {...register("status")}
                  >
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="block">Block</option>
                  </select>
                </div>
              </div>
              <Line />

              <div className="d-flex justify-content-center mt-3">
                <Button disabled={btnClick} className="bg-primary border-0 text-white rounded-2 py-1 px-2">
                  {btnClick ? (
                    <Oval
                      height={20}
                      width={20}
                      color="blue"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
        <ToastContainer autoClose={false} />
      </div>
    </>
  );
}
