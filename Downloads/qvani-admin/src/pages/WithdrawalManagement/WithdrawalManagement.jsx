import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { AiFillEye } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import { BsPencil } from 'react-icons/bs'
import axios from 'axios';
import Modal from "react-bootstrap/Modal"
import { API_URLs } from '../../utils/ApiUrls';
import styled from 'styled-components';
import SubmitLoader from "../../component/Loader/SubmitLoader"
import SingleWithdrawal from './SingleWithdrawal';
import { Oval } from 'react-loader-spinner';

const Button = styled.button`
border: none;
outlineL none;
border-radius: 20px;
background: #1476FF;
color: white;
margin: 3px;
font-weight: 600;

&:disabled {
    opacity: 0.5;
}
`
const Button1 = styled.button`
border: none;
width: 100%;
outlineL none;
border-radius: 20px;
background: #1476FF;
color: white;
margin: 10px;
font-weight: 600;
`
const Input = styled.input`
border: 1px solid rgb(233, 234, 243);
outline: none;
width: 100%;
padding: 4px 10px;
border-radius: 20px;
box-shadow: rgb(233, 234, 243) 0px 0px 10px;
`
export default function WithdrawalManagement() {
  const [withdrawalList, setwithdrawalList] = useState([])
  const [singleWithdrawal, setSingleWithdrawal] = useState([]);
  const handleClose = () => setSingleWithdrawal([]);
  // const handleShow = (value) => setSingleWithdrawal(value);

  const [showEditModal, setShowEditModal] = useState(false)
  const handleShowEditAmount = () => { setShowEditModal(true) }
  const handleCloseEditAmount = () => { setShowEditModal(false) }
  const [updateAmount, setUpdateAmount] = useState('')
  const [editCurrency, setEditCurrency] = useState('')
  const [btnLoader, setBtnLoader] = useState(false);
  const [amountData, setAmountData] = useState([])
  const [remount, setRemount] = useState(false);

  const handlesetUpdateAmount = (e) => {
    setUpdateAmount(e.target.value);
  }
  // get amount api 
  const getaAmountList = () => {
    setLoader(true)
    axios.get(API_URLs.getWithdrawalAmount, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'accept': 'application/json'
      }
    })
      .then((res) => {
        console.log('get API res', res);
        setLoader(false)
        setAmountData(res.data.data);
      })
      .catch((error) => {
        setLoader(false)
        // console.log('get api error' 
      })
  }
  useEffect(() => {
    getaAmountList()
  }, [remount])

  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const handleApproved = (id) => {
    setLoader(true);
    axios.patch(API_URLs.approved(id), {
      status: 'Approved'
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('withdrawal approved api response', res)
        setLoader(false)
      })
      .catch((error) => {
        console.log('withdrawal approved api error', error)
        setLoader(false)
      })
    // console.log(id)
  }
  const handleDisApproved = (id) => {
    setLoader1(true);
    axios.patch(API_URLs.approved(id), {
      status: 'Rejected',
      rejectReason: 'too many requests, he do!!'
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('withdrawal approved api response', res)
        setLoader1(false);
      })
      .catch((error) => {
        console.log('withdrawal approved api error', error)
        setLoader1(false)
      })
    // console.log(id);
  }
  const handleUpdateAmmount = () => {
    setBtnLoader(true)
    axios.patch(API_URLs.editWithdrawalAmount, {
      currency: editCurrency,
      amount: updateAmount
    }, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('update api res', res);
        handleCloseEditAmount();
        getaAmountList()
        setBtnLoader(false)
        setUpdateAmount('')
      })
      .catch((error) => {
        setBtnLoader(false)
        console.log('update api error', error)
      })
  }
  const getWithdrawalList = () => {
    setLoader1(true)
    axios.get(API_URLs.getWithdrawalList, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'accept': 'application/json'
      }
    })
      .then((res) => {
        console.log('get all the withdrawak list api response ', res)
        setwithdrawalList(res.data)
        setLoader1(false)
      })
      .catch((error) => {
        console.log('get all withdrawal api error', error)
        setLoader1(false)
      })
  }
  const getWithdrawalListById = (id) => {
    axios.get(API_URLs.getWithdrawalList + `/${id}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('userToken')}`,
        'accept': 'application/json'
      }
    })
      .then((res) => {
        console.log('get all the withdrawak list using id api response ', res)
        setSingleWithdrawal(res.data);
      })
      .catch((error) => {
        console.log('get all withdrawal api error', error)
      })
  }

  const columns = [
    {
      name: 'S. No',
      selector: (row, index) => index + 1
    },
    {
      name: 'Status',
      selector: (row) => <span>{
        row.adminVerifyStatus === 'Approved' ?
          <p className='fw-bold text-success'>{row.adminVerifyStatus}</p> : <p className='fw-bold text-warning'>Pending</p>

      }</span>
    },
    {
      name: 'Name',
      selector: (row) => <div>{row.user.username ? row.user.username : '..'}</div>
    },
    {
      name: 'Currency',
      selector: (row) => row.currency
    },
    {
      name: 'Amount',
      selector: (row) => row.amount
    },
    {
      name: 'Action',
      cell: (row) => {
        return (
          <div className='d-flex flex-wrap align-items-center'>
            <AiFillEye onClick={() => getWithdrawalListById(row.id)} />
            {row.adminVerifyStatus === "Approved" ? '' : <TiTick size={18} color='green' onClick={() => handleApproved(row.id)} />}
            {row.adminVerifyStatus === "Approved" ? '' : <RxCross2 onClick={() => handleDisApproved(row.id)} />}
          </div>
        );
      }
    }
  ]
  // for withdrawal amount detail
  const columnsone = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
      hide: "sm",
    },
    {
      name: "Amount",
      selector: (row) => <span>{row?.amount}</span>,
    },
    {
      name: "Currency",
      selector: (row) => row?.currency,
      hide: "sm",
    },
    {
      name: 'Created At',
      selector: (row) => <span>{new Date(row.createdAt).toDateString()}</span>
    },
    {
      name: 'Updated At',
      selector: (row) => <span>{new Date(row.updatedAt).toDateString()}</span>
    },
    {
      name: "Action",
      cell: (row) =>
        <div className="d-flex align-items-center gap-1" role="button" title="edit"
          onClick={() => {
            setEditCurrency(row.currency)
            handleShowEditAmount()
          }}>
          <p className="mb-0 fw-bold">Edit</p><BsPencil />
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

  useEffect(() => {
    getWithdrawalList()
  }, [])
  return (
    <>
      <div className="p-3">
        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <div className="d-flex align-items-center mb-3 justify-content-between">
            <h5 className=" text-decoration-underline">
              AUTO-WITHDRAWAL-LIMIT
            </h5>
          </div>
          <DataTable
            columns={columnsone}
            data={amountData}
            customStyles={customStyles}
            pagination
            progressComponent={<div className='d-flex justify-content-center py-5'>
              <Oval
                height={50}
                width={50}
                color='black'
                secondaryColor='black'
              />
            </div>}
            progressPending={loader}
            fixedHeader
            highlightOnHover
            responsive={true}
          />
        </div>
      </div>
      <div className='p-3'>
        {
          !Object.keys(singleWithdrawal).length ?
            <div className="card p-2 mt-3" style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.25 " }}>
              <h5 className="p-2 pb-4 text-decoration-underline">WITHDRAWAL LIST</h5>
              <DataTable
                columns={columns}
                data={withdrawalList}
                customStyles={customStyles}
                pagination
                progressComponent={<div className='d-flex justify-content-center py-5'>
                  <Oval
                    height={50}
                    width={50}
                    color='black'
                    secondaryColor='black'
                  />
                </div>}
                progressPending={loader1}
                fixedHeader
                highlightOnHover
                responsive={true}
              />
            </div> :
            <SingleWithdrawal singleWithdrawal={singleWithdrawal} handleClose={handleClose} />
        }
      </div>
      {/* edit amount modal */}
      <Modal
        size="md"
        show={showEditModal}
        dialogClassName="modal-90w"
        onHide={handleCloseEditAmount}>
        <Modal.Header>
          <Modal.Title>Edit Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={updateAmount}
            onChange={handlesetUpdateAmount}
            placeholder="Enter amount"
          />
          <Button1 disabled={btnLoader} className="d-flex justify-content-center" onClick={() => handleUpdateAmmount()}>
            {
              btnLoader ? <><SubmitLoader /> Update</> : 'Update'
            }
          </Button1>
        </Modal.Body>
      </Modal>
    </>
  );
}