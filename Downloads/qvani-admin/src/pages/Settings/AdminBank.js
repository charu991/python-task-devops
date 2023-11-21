import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import Edit from '../../assets/Images/ic-edit.png'
// import Delete from '../../assets/Images/ic-delete.png'
// import WalletIcon from '../../assets/Images/WalletIcon.png'
import axios from 'axios'
import { API_URLs } from '../../utils/ApiUrls'
import Modal from 'react-bootstrap/Modal';
// import ButtonLoader from '../../Component/Loader/ButtonLoader'
// import DataLoader from '../../Component/Loader/DataLoader'
import { CardContainer, ChangeButton, ProfileHeading, SecurityCard, SubHeading } from './StyledComponents'
import { Oval } from 'react-loader-spinner';
// import AddBank from './AddBank'

const Text = styled.p`
    color: ${({ theme }) => theme.heading};
`

const Para = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
`

const BoldPara = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
`

const BolderPara = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: capitalize;
`

const Span = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #7A7A7A;
    text-transform: capitalize;
`

const Button = styled.button`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 0.9rem;
    color: #FFFFFF;
    background: #3545EE;
    border: 2px solid #3545EE;
    border-radius: 20px;
`

const Currency = styled.p`
   font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 6px;
    background: rgb(167, 213, 252);
    background: -moz-linear-gradient(58deg, rgba(167, 213, 252, 1) 0%, rgba(203, 255, 252, 1) 59%, rgba(170, 251, 206, 1) 100%);
    background: -webkit-linear-gradient(58deg, rgba(167, 213, 252, 1) 0%, rgba(203, 255, 252, 1) 59%, rgba(170, 251, 206, 1) 100%);
    background: linear-gradient(58deg, rgba(167, 213, 252, 1) 0%, rgba(203, 255, 252, 1) 59%, rgba(170, 251, 206, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#a7d5fc", endColorstr="#aafbce", GradientType=1);
`

// const CardContainer = styled.div`
//     border: 1px solid ${({ theme }) => theme.text};
//     border-radius: 10px;
//     box-shadow: 2px 2px 10px rgba(95, 97, 97, 0.3);
// `

export default function AdminBank() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isBankEdit, setIsBankEdit] = useState(false);
    const [singleBankDetails, setSingleBankDetails] = useState({})

    const [bankDetails, setBankDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false);

    const [onDelete, setOnDelete] = useState({
        id: '',
        loading: false
    })

    const handleSetRefresh = () => setRefresh(!refresh)

    const getBankDetails = () => {
        setLoading(true)
        axios.get(API_URLs.bankPost, {
            headers: {
                'accept': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                console.log(res);
                setBankDetails(res.data.banks)
                console.log(res.data.banks)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
            })
    }

    const deleteBank = async (id) => {
        setOnDelete({
            id,
            loading: true
        })
        try {
            let res = await axios.delete(API_URLs.deleteBank(id), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            console.log(res.data);
            setOnDelete({
                id: "",
                loading: false
            })
        } catch (error) {
            console.log(error);
            setOnDelete({
                id: "",
                loading: false
            })
        }
    }
    useEffect(() => {
        if (!onDelete.loading) {
            getBankDetails()
        }
    }, [onDelete, refresh])

    return (
        <CardContainer className='container py-4 px-4'>
            <div className='d-flex flex-column flex-md-row justify-content-between'>
                <div className='d-flex flex-column w-100 w-md-50'>
                    <ProfileHeading className=''>Bank Accounts</ProfileHeading>
                </div>

                <div className='pt-2'>
                    <ChangeButton className='px-3 py-1' onClick={() => {
                        setSingleBankDetails({})
                        setIsBankEdit(false)
                        handleShow()
                    }}>Add Account</ChangeButton>
                </div>
            </div>
            <SubHeading>
                Add your bank account details below. You can share these details with your trade partner via trade chat, for bank transfer trades.
            </SubHeading>
            {
                bankDetails?.length > 0 ? bankDetails.map((details, index) => {
                    return (
                        <div className='pt-4' key={index}>

                            <SecurityCard className='p-3'>

                                <div className='d-flex gap-3'>
                                    <BoldPara className='w-25'>Bank Name</BoldPara>
                                    <Span>: {details?.BankName}</Span>
                                </div>

                                <div className='d-flex gap-3'>
                                    <BoldPara className='w-25'>Account Type</BoldPara>
                                    <Span>: {details?.accountType}</Span>
                                </div>

                                <div className='d-flex justify-content-between align-items-lg-center flex-column flex-lg-row gap-2 gap-lg-0'>

                                    <div className='d-flex gap-3 align-items-center justify-content-between justify-content-md-start'>
                                        <Currency className='px-4 py-2 m-0'>{details?.currency?.symbol}</Currency>
                                        {/* <ProfileHeading5 className='p-0 m-0'>$2000.00</ProfileHeading5> */}
                                    </div>

                                    <div className='d-flex gap-3'>

                                        <ChangeButton onClick={() => { deleteBank(details?.id) }} className='d-flex align-items-center gap-2 px-3 py-1'>

                                            {
                                                details?.id === onDelete?.id && onDelete?.loading ?
                                                    <div className='px-4'>
                                                        < Oval
                                                            height={14}
                                                            width={14}
                                                            color='black'
                                                        />
                                                    </div>
                                                    : <>
                                                        {/* <img src={Delete} alt="delete" /> */}
                                                        Delete
                                                    </>
                                            }
                                        </ChangeButton>
                                        <ChangeButton onClick={() => {
                                            setIsBankEdit(true)
                                            setSingleBankDetails(details)
                                            handleShow()
                                        }} className='d-flex align-items-center gap-2 px-3 py-1'>
                                            {/* <img src={Edit} alt="delete" /> */}
                                            Edit
                                        </ChangeButton>
                                    </div>
                                </div>
                            </SecurityCard>
                        </div>
                    )
                }) : <div className='pt-3'>
                    {
                        loading ?
                            <div className='px-4 d-flex justify-content-center align-items-center'>
                                {/* <DataLoader /> */}
                            </div> :
                            <CardContainer className='p-3 py-4 d-flex justify-content-center'>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    {/* <img src={WalletIcon} alt="wallet" /> */}
                                    <Span>No Bank Accounts added</Span>
                                </div>
                            </CardContainer>

                    }

                </div>
            }


            {/* <div className='d-flex flex-column flex-md-row justify-content-between pt-5'>
                <div className='d-flex flex-column w-100 w-md-50'>
                    <Text className='fs-2 fw-bold'>Online Wallets</Text>
                    <Para>
                        Add your online wallets below.
                    </Para>
                </div>

                <div className='py-2'>
                    <Button className='px-3 py-1'>Add Wallet</Button>
                </div>
            </div>

            <div className='pt-3'>
                <BolderPara>Amber Chen</BolderPara>

                <CardContainer className='p-3 py-4 d-flex justify-content-center'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <img src={WalletIcon} alt="wallet" />
                        <Span>No Online Wallets</Span>
                    </div>
                </CardContainer>
            </div> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <ProfileHeading className='m-0'>Add Bank</ProfileHeading>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <AddBank handleClose={handleClose} isBankEdit={isBankEdit} singleBankDetails={singleBankDetails} handleSetRefresh={handleSetRefresh} /> */}
                </Modal.Body>
            </Modal>
        </CardContainer>
    )
}
