import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { API_URLs } from "../../utils/ApiUrls";
import PageLoader from "../../component/Loader/PageLoader";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { BiBlock } from 'react-icons/bi'
import { CgUnblock } from 'react-icons/cg'
import SubmitLoader from "../../component/Loader/SubmitLoader";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { CSVLink } from "react-csv";

const Button = styled.button`
ouline: none;
border: none;
color: white;
width: 4rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 6px;
`
const CurrencyManagement = () => {
  const [loading, setLoading] = useState(true);
  const [id, setid] = useState('')
  const [blockLoader, setBlockLoader] = useState(false)
  const [currencyData, setCurrencyData] = useState([
    { name: "Bitcoin", code: "BTC" },
  ]);
  const [currencyId, setCurrencyId] = useState("");
  const [status, setStatus] = useState("Active");

  const form = useForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const [show, setShow] = useState(false);

  const handleUnBlock = (name) => {
    setid(name)
    setBlockLoader(true)
    axios.patch(API_URLs.unBlockCrypto + '/' + name, {}, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('unblock crypto api response', res)
        toast.success(res.data.msg ? res.data.msg : "Offer Unblock Successfully!!", {
          position: toast.POSITION.TOP_CENTER
        })
        handleGetCurrency()
        setBlockLoader(false)
      })
      .catch((error) => {
        setBlockLoader(false)
        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : 'Some Error Occured', {
          position: toast.POSITION.TOP_CENTER
        })
        console.log('unblock crypto api error', error)
      })
  };
  const handleBlock = (name) => {
    setid(name)
    setBlockLoader(true)
    axios.patch(API_URLs.blockCrypto + '/' + name, {}, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        setBlockLoader(false)
        console.log('block crypto api response', res)
        toast.success(res?.data?.msg ? res?.data?.msg : "Offer Pause Successfully!!", {
          position: toast.POSITION.TOP_CENTER
        })
        handleGetCurrency()
      })
      .catch((error) => {
        setBlockLoader(false)
        console.log('block crypto api error', error)
        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : 'Some Error Occured', {
          position: toast.POSITION.TOP_CENTER
        })
      })
  };
  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    setStatus(data?.status);
    console.log(currencyId);
    handleClose();
  };

  //! For Datatable
  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Symbol",
      selector: (row) => <img src={row?.image} height="23px" alt="" />,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      hide: "sm",
    },
    {
      name: "Code",
      selector: (row) => row?.symbol,
      hide: "sm",
    },
    {
      name: "Status",
      selector: (row) => (row?.isBlocked ? <p className="mb-0 fw-bold text-danger">Blocked</p> : <p className="mb-0 fw-bold text-success">Active</p>),
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {
            row?.isBlocked ?
              <Button onClick={() => handleUnBlock(row?.symbol)} role="button" title="Active" className='py-1 bg-success'>
                {
                  blockLoader ?
                    id === row?.symbol ?
                      <Oval
                        height={15}
                        width={15}
                        color="black"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2} /> : <p className="mb-0">Active <CgUnblock /></p>
                    : <p className="mb-0">Active <CgUnblock /></p>
                }
              </Button> :
              <Button onClick={() => handleBlock(row?.symbol)} role="button" title="Block" className='py-1 bg-danger'>
                {
                  blockLoader ?
                    id === row?.symbol ?
                      <Oval
                        height={15}
                        width={15}
                        color="black"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2} /> : <p className="mb-0">Block <BiBlock /></p>
                    : <p className="mb-0">Block <BiBlock /></p>
                }

              </Button>
          }
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

  const handleGetCurrency = () => {
    axios
      .get(API_URLs.getCurrency, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setCurrencyData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    handleGetCurrency()
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
          <>
            <h5 className="p-2 pb-4 text-decoration-underline">
              CURRENCY LIST
            </h5>
            <DataTable
              columns={columns}
              data={currencyData}
              customStyles={customStyles}
              pagination
              fixedHeader
              highlightOnHover
              responsive={true}
            />
            <div className=" my-3 mx-5  d-flex justify-content-end">
              <CSVLink
                className="bg-primary ouline-none border-0 text-white p-2 rounded-3 text-decoration-none"
                data={currencyData}
              >
                Download CSV
              </CSVLink>
            </div>
          </>
        </div>
      </div>

      {/* <Modal
        size="md"
        show={show}
        dialogClassName="modal-90w"
        onHide={handleClose}
      >
        <Modal.Body>
          <form
            className="d-flex flex-column gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex align-items-center justify-content-between ">
              <h5 className="text-decoration-underline">UPDATE STATUS</h5>
              <span
                onClick={handleClose}
                className="bg-primary border-none text-white rounded-2 px-2"
              >
                X
              </span>
            </div>

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

            <div>
              <button
                className="bg-primary border-none text-white py-1"
                style={{
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {btnLoader ? <SubmitLoader /> : "Save"} 
      Save
    </button >
            </div >
          </form >
        </Modal.Body >
      </Modal > * /} */}
    </>
  );
};

export default CurrencyManagement;
