import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { API_URLs } from "../../utils/ApiUrls"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { BsEyeFill, BsPencil } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { RxCross2 } from 'react-icons/rx'
import { MdCallReceived, MdDelete } from "react-icons/md"
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from "react-bootstrap/Modal"
import { useForm } from "react-hook-form"
import { Oval } from "react-loader-spinner"
import { ToastContainer, toast } from "react-toastify"
import PageLoader from "../../component/Loader/PageLoader"
import SubmitLoader from "../../component/Loader/SubmitLoader"
import styled from "styled-components"
import PaymentMethodFee from "./PaymentMethodFee"
import MinTradeLim from "./MinTradeLim"
export const Label = styled.label`
font-size: 16px;
margin-top: 10px; 
font-weight: 600;
`
export const Input = styled.input`
border: 1px solid rgb(233, 234, 243);
outline: none;
width: 100%;
padding: 4px 10px;
border-radius: 20px;
box-shadow: rgb(233, 234, 243) 0px 0px 10px;
`
export const Button = styled.button`
width: 100%;
margin-top: 9px;
border: none;
background: #1476FF;
color: white;
border-radius: 20px;
padding: 2px 24px;
`
const FeeManagement = () => {
  const [loading, setLoading] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const location = useLocation();
  const navigate = useNavigate()
  //for fee modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setShow(true);
    setBtnLoader(false);
  };

  const [extLoader, setExtLoader] = useState(false);
  const [extWithLoader, setExtWithLoader] = useState(false)
  const [editexternaldata, setEditexternaldata] = useState()
  const [showEditExternal, setShowEditExternal] = useState(false)
  const handleShowEditExternal = (row) => {
    setEditexternaldata(row)
    setShowEditExternal(true)
  }
  const handleCloseEditExternal = () => { setShowEditExternal(false) }

  const formik = useFormik({
    initialValues: { amount: '', percentage: '', usdtForFee: '' },
    validationSchema: Yup.object().shape({
      amount: Yup.string().required(' Amount is Required'),
      percentage: Yup.string().required('Percent is Required'),
      usdtForFee: Yup.string().required('USDT Fee is Required')
    }),
    onSubmit: values => {
      // // console.log(values)
      updateInternalFee('Internal fee', values.amount, values.percentage, values.usdtForFee)
    }
  })

  const formik1 = useFormik({
    initialValues: { externalAmount: '' },
    validationSchema: Yup.object().shape({
      externalAmount: Yup.string().required('Amount is Required')
    }),
    onSubmit: (values) => {
      // // console.log(values);
      updateExternalWithFee(editexternaldata.currency, values.externalAmount)
    }
  })
  const form = useForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const [feeData, setFeeData] = useState([]);
  const [amountData, setAmountData] = useState([])
  const [remount, setRemount] = useState(false);
  const fee = watch("fee");
  const maxLength = 2;

  const [internalFee, setInternalFee] = useState([])
  const [externalFeeList, setExternalFeeList] = useState([]);

  //set fee api 
  const onSubmit = (data) => {
    // // console.log("name", data.name);
    // // console.log("fee", data.fee);
    setBtnLoader(true);
    axios.post(
      API_URLs.postFee,
      { name: data.name, fee: data.fee },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        toast.success("Fee Added Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        setRemount(!remount);
        setBtnLoader(true);
        handleClose();
      })
      .catch(() => {
        toast.error("Fee Addition Failed", {
          position: toast.POSITION.TOP_CENTER
        });
        setRemount(!remount);
        setBtnLoader(false);
      });
  };

  // delete fee api
  // const apiDelete = (id) => {
  //   // console.log(id);

  //   fetch(API_URLs.deleteGetFeeId(id), {
  //     method: "DELETE",
  //     headers: {
  //       accept: "application/json",
  //       authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //     },
  //   })
  //     .then((response) => {
  //       // if (!response.ok) {
  //       //   throw new Error("Error deleting user");
  //       // }
  //       // console.log("User deleted successfully");
  //       setRemount(!remount);
  //       toast.success("SuccessFully deleted");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting user:", error);
  //       setRemount(!remount);
  //       toast.error("User deletion Failed");
  //     });
  // };

  // const getExternalFee = () => {
  //   axios
  //     .get(API_URLs.getFee, {
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       // // console.log(res.data);
  //       // setFeeData(res.data);
  //       var data = res.data;
  //       var dataone = []
  //       for (var key in data) {
  //         var rowData = data[key];
  //         if (rowData.name === "qvani") {
  //           dataone.push(rowData)
  //         }
  //       }
  //       setFeeData(dataone);

  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       setLoading(false);
  //     });
  // }
  // // console.log(feeData)

  const getInternalFee = () => {
    setLoading(true)
    axios.get(API_URLs.internalFeeList, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // // console.log('get internal fee list response', res);
        setInternalFee(res.data)
        setLoading(false);
      })
      .catch((error) => {
        // // console.log('get internal fee list error ', error);
        setLoading(false);
      })
  }
  const getExternalFeeList = () => {
    setLoading(true)
    axios.get(API_URLs.externalFeeList, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // // console.log('get external fee list response', res);
        setExternalFeeList(res.data)
        setLoading(false);
      })
      .catch((error) => {
        // // console.log('get internal fee list error ', error);
        setLoading(false);
      })
  }

  // // console.log('get internal fee list', internalFee);

  useEffect(() => {
    // getExternalFee();
    getInternalFee();
    getExternalFeeList();
  }, [remount])

  const updateInternalFee = (currency, amount, percentage, usdtForFee) => {
    setExtLoader(true)
    axios.patch(API_URLs.internalFeeList, {
      currency,
      amount,
      percentage,
      usdtForFee
    }, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('update api respo', res)
        getInternalFee()
        setExtLoader(false)
        toast.success(res?.data?.msg && res?.data?.msg, {
          position: toast.POSITION.TOP_CENTER
        })
        handleCloseEditAmount();
      })
      .catch((error) => {
        setExtLoader(false)
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Some Error Occured!!', {
          position: toast.POSITION.TOP_CENTER
        })
        // console.log('update api error -- ', error);
      })
  }

  const updateExternalWithFee = (currency, amount) => {
    setExtWithLoader(true)
    axios.patch(API_URLs.externalFeeList, {
      currency: currency,
      feePercentage: amount,
    }, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('update api respo', res)
        getExternalFeeList()
        setExtWithLoader(false)
        toast.success(res?.data?.msg && res?.data?.msg, {
          position: toast.POSITION.TOP_CENTER
        })
        handleCloseEditExternal();
      })
      .catch((error) => {
        setExtWithLoader(false)
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Some Error Occured!!', {
          position: toast.POSITION.TOP_CENTER
        })
        // console.log('update api error -- ', error);
      })
  }

  // const handleUpdateAmmount = () => {
  //   setBtnLoader(true)
  //   axios.patch(API_URLs.editWithdrawalAmount, {
  //     currency: editCurrency,
  //     amount: updateAmount
  //   }, {
  //     headers: {
  //       accept: 'application/json',
  //       authorization: `Bearer ${localStorage.getItem('userToken')}`
  //     }
  //   })
  //     .then((res) => {
  //       // console.log('update api res', res);
  //       handleCloseEditAmount();
  //       getaAmountList()
  //       setBtnLoader(false)
  //       setUpdateAmount('')
  //     })
  //     .catch((error) => {
  //       setBtnLoader(false)
  //       // console.log('update api error', error)
  //     })
  // }
  // // for withdrawal amount modal
  // const [showWithdrawal, setShowWithdrawal] = useState(false)
  // const handleShowWithdrawal = () => { setShowWithdrawal(true) }
  // const handleCloseWithdrawal = () => { setShowWithdrawal(false) }

  // for edit amount modal

  const [showEditModal, setShowEditModal] = useState(false)
  const handleShowEditAmount = (row) => {
    formik.setValues({
      amount: row.amount,
      percentage: row.percentage,
      usdtForFee: row.usdtForFee
    })
    setShowEditModal(true)
  }
  const handleCloseEditAmount = () => { setShowEditModal(false) }

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

  // For Fee Datatable
  // const columns = [
  //   {
  //     name: "S.No.",
  //     selector: (row, index) => index + 1,
  //     hide: "sm",
  //   },
  //   {
  //     name: "Fee Name",
  //     selector: (row) => row?.name,
  //     hide: "sm",
  //   },
  //   {
  //     name: "Fee (%)",
  //     selector: (row) => <span>{row?.fee} %</span>,
  //   },
  //   {
  //     name: "Created Date",
  //     selector: (row) => new Date(row?.createdAt).toDateString(),
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <>
  //         <div className="d-flex align-items-center gap-4">
  //           <Link
  //             className="text-dark text-decoration-none"
  //             to={`/feemanagement/fee/${row._id}`}
  //           >
  //             <span>View </span><BsEyeFill />
  //           </Link>
  //           <span
  //             style={{ cursor: "pointer" }}
  //             onClick={() => {
  //               apiDelete(row._id);
  //             }}
  //           >
  //             <span>Delete</span>
  //             <MdDelete size={15} />
  //           </span>
  //         </div>
  //       </>
  //     ),
  //   },
  // ];

  // for internal fee data-table
  const columnsone = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      hide: "sm",
    },
    {
      name: "Currency",
      selector: (row) => <span>{row?.currency}</span>,
    },
    {
      name: "Max Limit",
      selector: (row) => <span>{row?.amount} USD</span>,
      hide: "sm",
    },
    {
      name: 'Fee(%)',
      selector: (row) => <span>{row?.percentage}%</span>
    },
    {
      name: 'USDT',
      selector: (row) => <span>{row?.usdtForFee} usdt</span>
    },
    {
      name: 'Create At',
      selector: (row) => <span>{new Date(row?.createdAt).toDateString()}</span>
    },
    {
      name: 'Update At',
      selector: (row) => <span>{new Date(row?.updatedAt).toDateString()}</span>
    },
    {
      name: "Action",
      cell: (row) =>
        <div className="d-flex align-items-center gap-1" role="button" title="edit"
          onClick={() => {
            handleShowEditAmount(row)
          }}>
          <p className="mb-0 fw-bold">Edit</p><BsPencil />
        </div>
    },
  ];
  const columnstwo = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      hide: "sm",
    },
    {
      name: "Currency",
      selector: (row) => <span>{row?.currency}</span>,
    },
    {
      name: 'Fee(%)',
      selector: (row) => <span>{row?.feePercentage}%</span>
    },
    {
      name: 'Create At',
      selector: (row) => <span>{new Date(row?.createdAt).toDateString()}</span>
    },
    {
      name: 'Update At',
      selector: (row) => <span>{new Date(row?.updatedAt).toDateString()}</span>
    },
    {
      name: "Action",
      cell: (row) =>
        <div className="d-flex align-items-center gap-1" role="button" title="edit"
          onClick={() => {
            handleShowEditExternal(row)
          }}>
          <p className="mb-0 fw-bold">Edit</p><BsPencil />
        </div>
    },
  ]

  const isTabSelected = location.hash.includes('internal')
    || location.hash.includes('external')

  return (
    <>
      {/* <div className="p-3">
        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <div className="d-flex align-items-center mb-3 justify-content-between">
            <h5 className="mb-0 text-decoration-underline">
              OFFER FEE
            </h5>
            <button
              onClick={handleShow}
              className="bg-primary ouline-none d-flex align-items-center justify-content-center border-0 text-white px-2 py-1 rounded-3"
            >
              <AiOutlinePlus size={17} /> Create Fee
            </button>
          </div>
          <DataTable
            columns={columns}
            data={feeData}
            customStyles={customStyles}
            pagination
            fixedHeader
            highlightOnHover
            responsive={true}
          />
        </div>
      </div> */}

      <div className="p-3">
        <div
          className="card p-2 mt-3 "
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <h5 className="p-2 pb-4 text-decoration-underline">
            SEND/RECEIVE FEE
          </h5>
          <div className='tabs-navigator'>
            <ul className="nav nav-tabs crypto-send d-flex gap-3" id="myTab" role="tablist">
              <li className="nav-item text-decoration-none" role="presentation">
                <div
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('internal') ? 'active' : '' : 'active'}`}
                  id="internal-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#internal"
                  type="button"
                  role="tab"
                  aria-controls="internal"
                  onClick={() => navigate('#internal')}
                  aria-selected="true">
                  INTERNAL FEE
                </div>
              </li>
              <li className="nav-item text-decoration-none" role="presentation">
                <div
                  className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('external') ? 'active' : '' : ''}`}
                  id="external-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#external"
                  type="button"
                  role="tab"
                  aria-controls="external"
                  onClick={() => navigate('#external')}
                  aria-selected="true">
                  EXTERNAL FEE
                </div>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane fade py-3 ${isTabSelected ? location.hash.includes('internal') ? 'show active' : '' : 'show active'}`}
                id="internal"
                role="tabpanel"
                aria-labelledby="internal-tab">
                <DataTable
                  columns={columnsone}
                  progressPending={loading}
                  progressComponent={<div className='d-flex justify-content-center py-5'>
                    <Oval
                      height={50}
                      width={50}
                      color='black'
                      secondaryColor='black'
                    />
                  </div>}
                  data={internalFee}
                  customStyles={customStyles}
                />
              </div>
              <div
                className={`tab-pane fade py-3 ${isTabSelected ? location.hash.includes('external') ? 'show active' : '' : ''}`}
                id="external"
                role="tabpanel"
                aria-labelledby="external-tab">
                <DataTable
                  data={externalFeeList}
                  columns={columnstwo}
                  progressPending={loading}
                  progressComponent={<div className='d-flex justify-content-center py-5'>
                    <Oval
                      height={50}
                      width={50}
                      color='black'
                      secondaryColor='black'
                    />
                  </div>}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <PaymentMethodFee />
      <MinTradeLim />
      <ToastContainer autoClose={false} />

      {/* set fee modal */}
      <Modal
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
              <span className="fw-bold">Add Fee</span>
              <span role="button"
                onClick={handleClose}
                className="bg-primary border-none text-white rounded-2 px-2"
              >
                X
              </span>
            </div>

            <div className="d-flex gap-4 flex-wrap">
              <div className="d-flex flex-column gap-3">
                <label htmlFor="role">Name: <span className="text-danger">*</span></label>
                <div className="d-flex flex-column">
                  <input
                    id="role"
                    className="border border-muted px-3 py-1 rounded-3 "
                    placeholder="Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is Required",
                      },
                    })}
                    type="text"
                    style={{
                      outline: "none",
                    }}
                  />
                  <small className="text-danger">
                    {errors.name?.message}
                  </small>
                </div>
              </div>

              <div className="d-flex flex-column gap-3">
                <label htmlFor="description">Fees (in %): <span className="text-danger">*</span></label>
                <div className="d-flex flex-column">
                  <input
                    name="fee"
                    id="description"
                    className="border border-muted px-3 py-1 rounded-3 "
                    placeholder="Fee"
                    {...register("fee", {
                      min: {
                        value: 1,
                        message: "Fees should be greater than 0",
                      },
                      max: {
                        value: 99,
                        message: "Fees should be less than 100",
                      },
                      required: {
                        value: true,
                        message: "Fees is Required",
                      },
                    })}
                    type="number"
                    style={{
                      outline: "none",
                    }}
                  />
                  <small className="text-danger">
                    {errors.fee?.message}
                  </small>
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={btnLoader}
                className="bg-primary border-none text-white py-1"
                style={{
                  border: "none",
                  width: '6rem',
                  borderRadius: "5px",
                }}
              >
                {btnLoader ? <SubmitLoader /> : "Submit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal >

      {/* update internal fee */}
      <Modal
        size="md"
        show={showEditExternal}
        onHide={handleCloseEditExternal}
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>Update External Fee</Modal.Title>
          <RxCross2 onClick={() => handleCloseEditExternal()} role="button" title="close" />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik1.handleSubmit}>
            <div>
              <Label htmlFor="externalAmount">Fee (in %)<span className="text-danger"> *</span></Label>
              <Input
                placeholder="Enter Fee in Percentage"
                name="externalAmount"
                id="externalAmount"
                value={formik1.values.externalAmount}
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
              />
            </div>
            <Button type="submit">{extWithLoader ? <SubmitLoader /> : 'Update'}</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* update external fee */}
      <Modal
        size="md"
        show={showEditModal}
        onHide={handleCloseEditAmount}
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>Update you Fee</Modal.Title>
          <RxCross2 onClick={() => handleCloseEditAmount()} role="button" title="close" />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Label htmlFor="amount">Transaction Fee Upto<span className="text-danger"> *</span></Label>
              <Input
                id="amount"
                placeholder="Enter Maximum Transaction Limit"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Label htmlFor="percentage">Fee (in %)<span className="text-danger"> *</span></Label>
              <Input
                id="percentage"
                name="percentage"
                placeholder="Enter Fee in Percentage"
                value={formik.values.percentage}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Label htmlFor="usdtForFee">Fee(in USDT)<span className="text-danger"> *</span></Label>
              <Input
                id="usdtForFee"
                name="usdtForFee"
                placeholder="Enter Fee in USDT"
                value={formik.values.percentage}
                onChange={formik.handleChange}
              />
            </div>
            <Button disabled={extLoader} type="submit">{extLoader ? <SubmitLoader /> : 'Update'}</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeeManagement;
