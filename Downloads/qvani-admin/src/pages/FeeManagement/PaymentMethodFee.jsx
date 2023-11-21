import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";
import axios from 'axios';
import { Label, Input, Button } from './FeeManagement'
import { BsPencil } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'
import * as Yup from 'yup'
import { Oval } from 'react-loader-spinner';
import { API_URLs } from '../../utils/ApiUrls';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import SubmitLoader from '../../component/Loader/SubmitLoader';

export default function PaymentMethodFee() {
    const [paymentMethod, setPaymentMethod] = useState([])
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    // for update modal
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (type, fee) => {
        formik.setValues({
            type,
            fee
        })
        setShowModal(true)
    }
    const handleCloseModal = () => { setShowModal(false) }

    // api for getting the fees
    const getPaymentMethodFee = () => {
        setLoading(true);
        axios.get(API_URLs.paymentMethodFeeList, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((res) => {
                // console.log('payment method fee list api resonse', res)
                setPaymentMethod(res.data)
                setLoading(false)
            })
            .catch((error) => {
                // console.log('payment method api error', error)
                setLoading(false)
            })
    }

    // api for updating the fee
    const formik = useFormik({
        initialValues: { fee: '', type: '' },
        validationSchema: Yup.object().shape({
            fee: Yup.string().required('Fee is Required'),
            type: Yup.string().required('Method Name is Required')
        }),
        onSubmit: (values) => {
            // console.log(values);
            setLoader(true)
            axios.patch(API_URLs.paymentMethodFeeList, {
                fee: values.fee,
                type: values.type
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
                .then((res) => {
                    // console.log('update response', res)
                    setLoader(false)
                    getPaymentMethodFee();
                    handleCloseModal()
                    toast.success('Update Successfully!!', {
                        position: toast.POSITION.TOP_CENTER
                    })
                })
                .catch((error) => {
                    // console.log('update error', error)
                    setLoader(false);
                    getPaymentMethodFee();
                    handleCloseModal();
                    toast.error(error?.response?.data?.message ? error.response?.data?.message : "Some Error occured", {
                        position: toast.POSITION.TOP_CENTER
                    })
                })
        }
    })

    useEffect(() => {
        getPaymentMethodFee();
    }, [])

    const columns = [
        {
            name: 'S. No',
            selector: (row, index) => <div>
                {index + 1}
            </div>
        },
        {
            name: 'Payment Method',
            selector: (row) => <div>
                {row.name}
            </div>
        },
        {
            name: "Status",
            selector: (row) => <div>
                {
                    row?.isActive ? <p className='mb-0 fw-bold text-success'>Active</p> : <p className='mb-0 fw-bold text-danger'>In-Active</p>
                }
            </div>
        },
        {
            name: 'Fee (%)',
            selector: (row) => <div>
                {row.fee} %
            </div>
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
            name: 'Action',
            cell: (row) => <div className='d-flex gap-3'>
                <div className='d-flex align-items-center gap-1' role='button' title='Edit' onClick={() => handleShowModal(row.name, row.fee)}>
                    <span className='fw-bold'>Edit</span> <BsPencil size={13} />
                </div>
                <div className='d-flex align-items-center gap-1' role='button' title='Edit' onClick={() => handleShowModal(row.name, row.fee)}>
                    <span className='fw-bold'>Edit</span> <BsPencil size={13} />
                </div>
            </div>
        }
    ]

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
        <>
            <div className="p-3">
                <div
                    className="card p-2 mt-3"
                    style={{
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.25",
                    }}
                >
                    <h5 className="p-2 pb-4 text-decoration-underline">
                        TRADING FEE
                    </h5>
                    <div>
                        <DataTable
                            columns={columns}
                            data={paymentMethod}
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
                    <div className="my-3 mx-5 d-flex justify-content-end">
                        <CSVLink
                            className="bg-primary text-white p-1 text-decoration-none"
                            data={paymentMethod} > Download CSV </CSVLink>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header className='d-flex justify-content-between'>
                    <Modal.Title>
                        Update Your Fee
                    </Modal.Title>
                    <RxCrossCircled size={22} onClick={handleCloseModal} />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Label htmlFor='type'>Method Name</Label>
                            <Input
                                id='type'
                                name='type'
                                disabled={true}
                                value={formik.values.type}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor='fee'>Fee(%)</Label>
                            <Input
                                id='fee'
                                name='fee'
                                placeholder='Enter Fee in Percentage'
                                value={formik.values.fee}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <Button type='submit' disabled={loader}> {loader ? <SubmitLoader /> : 'Update'} </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}