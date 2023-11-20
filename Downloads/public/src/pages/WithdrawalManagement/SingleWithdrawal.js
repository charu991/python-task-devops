import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import Line from '../../component/Line/Line'
import styled from 'styled-components'
import { API_URLs } from '../../utils/ApiUrls'
import { Oval } from 'react-loader-spinner'
const Button = styled.button`
border: none;
background: rgb(20, 118, 255);
color: white;
font-weight: 500;
padding: 5px;
border-radius: 20px;
width: 8rem;
`
export default function SingleWithdrawal({ singleWithdrawal, handleClose }) {
    // console.log('ddfdfdf', singleWithdrawal)

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

    return (
        <>
            <BiArrowBack size={25} onClick={handleClose} />
            <div className="card p-2 mt-3" style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.25 " }}>
                <h5 className="p-2 pb-4 text-decoration-underline">WITHDRAWAL INFO</h5>
                <Line />
                <div className="d-flex gap-2 p-2">
                    <div className="w-25">User : </div>
                    <div className="text-secondary">{singleWithdrawal?.user}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 p-2">
                    <div className="w-25">Currency : </div>
                    <div className="text-secondary">{singleWithdrawal?.currency}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 p-2">
                    <div className="w-25">Amount : </div>
                    <div className="text-secondary">{singleWithdrawal?.amount}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 p-2">
                    <div className="w-25">Send From : </div>
                    <div className="text-secondary">{singleWithdrawal?.senderWalletAdress}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 p-2">
                    <div className="w-25">Receive To : </div>
                    <div className="text-secondary">{singleWithdrawal?.receiverWalletAdress}</div>
                </div>
                <Line />
                <div className="d-flex gap-2 p-2">
                    <div className="w-25">Status : </div>
                    <div className="text-secondary">{singleWithdrawal?.adminVerifyStatus}</div>
                </div>
                <Line />
                <div className='d-flex flex-wrap gap-2 p-2'>
                    <Button onClick={() => handleApproved(singleWithdrawal?.id)}>{loader ? <span className='d-flex justify-content-center align-items-center'><Oval height={15}
                        width={15} />Approved</span> : 'Approved'}</Button>
                    <Button onClick={() => handleDisApproved(singleWithdrawal?.id)}>{loader1 ? <span className='d-flex justify-content-center align-items-center'><Oval height={15}
                        width={15} />Approved</span> : 'Disapproved'}</Button>
                </div>
            </div>
        </>
    );
}