import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { BsPencil } from 'react-icons/bs'
import { Label, Input, Button } from './FeeManagement'
import { RxCrossCircled } from 'react-icons/rx'
import { API_URLs } from '../../utils/ApiUrls';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
export default function MinTradeLim() {
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])

    //for update modal 
    const [show, setShow] = useState(false)
    const handleOpen = () => { setShow(true) }
    const handleClose = () => {
        setShow(false)
        formik.setValues({ amount: '' })
    }

    // column for datatable 
    const columns = [
        {
            name: 'S.NO',
            selector: (row, index) => <div>
                {index + 1}
            </div>
        },
        {
            name: 'ID',
            selector: (row) => <div>
                {row.id}
            </div>
        },
        {
            name: 'Amount',
            selector: (row) => <div>
                {row.amount} USD
            </div>
        },
        {
            name: 'Create Date',
            selector: (row) => <div>
                <span>12 Nov 2023</span>
            </div>
        },
        {
            name: 'Update Date',
            selector: (row) => <div>
                <span>13 Nov 2023</span>
            </div>
        },
        {
            name: 'Action',
            selector: (row) => <div role='button' onClick={() => handleOpen()}>
                <BsPencil /> <span className='fw-bold'>Edit</span>
            </div>
        }
    ]

    const getMinTradeLimit = () => {
        setLoader(true)
        axios.get(API_URLs.minTradeLimitGet, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((res) => {
                // console.log(res);
                let arr = []
                arr.push(res.data)
                setData(arr)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                // console.log(error);
            })
    }
    const updateMinTradeLimit = (amount) => {
        axios.patch(API_URLs.minTradeLim, {
            amount
        }, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((res) => {
                console.log(res)
                handleClose()
                toast.success(res.data.msg ? res.data.msg : 'Amount Update Successfully')
                getMinTradeLimit()
            })
            .catch((error) => {
                console.log(error)
                handleClose()
                toast.error(error.response.data.message ? error.response.data.message : 'Some Error Occured')
            })
    }
    // console.log(data)
    useEffect(() => {
        getMinTradeLimit();
    }, [])

    const amountRegEx = /^[0-9]$/
    const formik = useFormik({
        initialValues: { amount: '' },
        validationSchema: Yup.object().shape({
            amount: Yup.number().required('Amount is required')
        }),
        onSubmit: (values) => {
            // console.log(values);
            updateMinTradeLimit(values.amount)
        }
    })
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
    return (
        <div className="p-3">
            <div
                className="card p-2 mt-3"
                style={{
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.25",
                }}
            >
                <h5 className="p-2 pb-4 text-decoration-underline">
                    Minimum Trading Limit
                </h5>
                <div>
                    <DataTable
                        customStyles={customStyles}
                        columns={columns}
                        data={data}
                        progressPending={loader}
                        progressComponent={<div className='d-flex justify-content-center py-5'>
                            <Oval
                                height={50}
                                width={50}
                                color='black'
                                secondaryColor='black'
                            />
                        </div>}
                    />
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='d-flex justify-content-between'>
                    <span className='fw-bold'>Update Trade Minimum Limit</span>
                    <RxCrossCircled size={24} onClick={() => handleClose()} />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <Label>Amount</Label>
                        <Input
                            id='amount'
                            name='amount'
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Amount'
                        />
                        <small>{formik.errors.amount && formik.touched.amount && <span className='text-danger fw-bold'>{formik.errors.amount}</span>}</small>
                        <Button type='submit'>Update</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}