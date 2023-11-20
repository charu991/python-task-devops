import React, { useCallback, useState, useRef, useEffect } from 'react'
import { BlueText, Card, CardFooterText, HorizontalLine, Input, MyChat, PersonChat, SendButton, Text } from './StyledComponent'
import { RxDotFilled } from 'react-icons/rx'
import { useParams, useNavigate } from 'react-router-dom'
import { MdThumbDown, MdThumbUp } from 'react-icons/md'
import { FiInfo } from 'react-icons/fi'
import { BiArrowBack } from 'react-icons/bi'
import { GrAttachment } from 'react-icons/gr'
import { TbSend } from 'react-icons/tb'
import IconProfile from '../../assets/IconProfile.jpg'
import Flag from '../../assets/Flag.webp'
import axios from 'axios'
import { API_URLs } from '../../utils/ApiUrls'

export default function Chat() {
    const params = useParams();
    const ref = useRef();
    const fileRef = useRef();
    const navigate = useNavigate();

    const [sendLoader, setSendLoader] = useState(false)
    const [chatData, setChatData] = useState([])
    const [message, setMessage] = useState('')
    const { offerId, tradeId } = params;
    const [chatId, setChatId] = useState('')
    const [reload, setReload] = useState(false);

    const handleSendButton = (e) => {
        e.preventDefault()
        setSendLoader(false)
        axios.post(API_URLs.adminAddChat, {
            sender: '64b66f5a21b06400272b0e27',
            message: message,
            chatid: chatId,
            tradeId: offerId,
            initiateId: tradeId
        }, {
            headers: {
                accept: '/',
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((res) => {
                console.log('send chat response', res)
                setMessage("")
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleChangeFile = () => {

    }
    // console.log('this are extracted from params', offerId, tradeId)

    const getchat = useCallback(async () => {
        try {
            let res = await axios.post(API_URLs.getChat, {
                tradeId: offerId,
                initiateId: tradeId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    Accept: 'application/json'
                }
            })
            setChatData(res.data.chats)
            setChatId(res.data.id)
        } catch (error) {
            console.log(error);
        }
    }, [offerId, tradeId, chatData])
    console.log('-------------------------------------------------------------', chatData)

    useEffect(() => {
        const chatInterval = setInterval(() => {
            getchat()
        }, 1000);

        return () => {
            clearInterval(chatInterval)
        }

        // getchat()
    }, [getchat, reload])
    return (
        <div className='mt-3 mx-2 p-2'>
            <BiArrowBack size={18} role='button' title='Go Back' onClick={() => navigate(-1)} />
            <Card style={{ position: 'initial', width: '100%' }}>
                <div className='d-flex flex-column flex-sm-row p-3 justify-content-between gap-3 gap-sm-0'>
                    <div className='d-flex gap-5'>
                        <div className='d-flex align-items-center gap-2'>
                            <img src={IconProfile} alt="icon" height='48px' width='48px' style={{ borderRadius: '50%' }} />
                            <div className='d-flex flex-column gap-2'>
                                <Text className='m-0 fw-bold'>Gaurav</Text>
                                <CardFooterText className='m-0 text-success'>
                                    <RxDotFilled size={20} color='green' /> Online
                                </CardFooterText>
                            </div>
                            <img style={{ maxWidth: '35px', maxHeight: '35px' }} src={Flag} alt="flag" />
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <img src={IconProfile} alt="icon" height='48px' width='48px' style={{ borderRadius: '50%' }} />
                            <div className='d-flex flex-column gap-2'>
                                <Text className='m-0 fw-bold'>S Kay</Text>
                                <CardFooterText className='m-0 text-success'>
                                    <RxDotFilled size={20} color='green' /> Online
                                </CardFooterText>
                            </div>
                            <img style={{ maxWidth: '35px', maxHeight: '35px' }} src={Flag} alt="flag" />
                        </div>
                    </div>


                    <div className='d-flex gap-3 align-items-start justify-content-end'>
                        <div className='d-flex flex-column'>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='d-flex align-items-center gap-2'>
                                    <MdThumbUp color='#14CA74' />
                                    <CardFooterText className='m-0'>12345</CardFooterText>
                                </div>

                                <div className='d-flex align-items-center gap-2'>
                                    <MdThumbDown color='#FF5A65' />
                                    <CardFooterText className='m-0'>12345</CardFooterText>
                                </div>
                            </div>

                            <div className='d-flex align-items-center gap-2'>
                                <FiInfo color='#1476FF' size={15} />
                                <BlueText className='m-0'>Partner details</BlueText>
                            </div>
                        </div>
                    </div>

                </div>

                <HorizontalLine />
                <div ref={ref} className='d-flex flex-column' style={{ maxHeight: '50vh', overflow: 'auto' }}>

                    <div className='d-flex gap-2 p-2 align-items-start w-75'>
                        <div>
                            <img src={IconProfile} alt="icon" height='44px' width='44px' style={{ borderRadius: '50%' }} />
                        </div>
                        <div className='d-flex flex-column'>
                            <PersonChat className='p-3'>
                                You’re buying 0.00021357 BTC (448.18 INR) via Google Pay. BTC is now in escrow and it’s safe to make your payment. 1. Your trade partner will share their name and ID 2. Make your payment of 500 INR 3. Send the receipt confirmation number to your trade partner and mark the trade as "Paid" 4. Wait for your trade partner to confirm your payment 5. Your trade partner will release the BTC to you
                            </PersonChat>
                            <CardFooterText>June 16, 2023 at 01.03 PM</CardFooterText>
                        </div>
                    </div>

                    <div className='d-flex gap-2 p-2 align-items-start w-75'>
                        <div>
                            <img src={IconProfile} alt="icon" height='44px' width='44px' style={{ borderRadius: '50%' }} />
                        </div>
                        <div className='d-flex flex-column'>
                            <MyChat className='p-3'>
                                You’re buying 0.00021357 BTC (448.18 INR) via Google Pay. BTC is now in escrow and it’s safe to make your payment. 1. Your trade partner will share their name and ID 2. Make your payment of 500 INR 3. Send the receipt confirmation number to your trade partner and mark the trade as "Paid" 4. Wait for your trade partner to confirm your payment 5. Your trade partner will release the BTC to you
                            </MyChat>
                            <CardFooterText>June 16, 2023 at 01.03 PM</CardFooterText>
                        </div>
                    </div>

                    {
                        chatData?.length > 0 && chatData?.map((chat, index) => {
                            if (chat.sender.role === 'user') {
                                return (
                                    <div key={index} className='d-flex gap-2 p-2 align-items-start w-75'>
                                        <div>
                                            <img src={chat.sender.avatar} title={`${chat.sender.name}`} alt="icon" height='48px' width='48px' style={{ borderRadius: '50%' }} />
                                        </div>
                                        <div className='d-flex flex-column'>
                                            {
                                                chat?.type === "image" ?
                                                    <img src={chat?.message} alt="" className='w-50' /> :
                                                    <MyChat className='p-3'>
                                                        {chat?.message}
                                                    </MyChat>
                                            }
                                            <CardFooterText>{chat?.time ? <>{new Date(chat?.time).toDateString()} {new Date(chat?.time).toLocaleTimeString()} </> : ''}</CardFooterText>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className='d-flex gap-2 p-2 align-items-start w-75 align-self-end justify-content-end'>
                                        <div className='d-flex flex-column'>
                                            {
                                                chat?.type === "image" ?
                                                    <img src={chat?.message} alt="" className='w-50' /> :
                                                    <MyChat className='p-3'>
                                                        {chat?.message}
                                                    </MyChat>
                                            }
                                            <CardFooterText>{chat?.time ? <>{new Date(chat?.time).toDateString()} {new Date(chat?.time).toLocaleTimeString()} </> : ''}</CardFooterText>
                                        </div>
                                        <div>
                                            <img src={chat.sender.avatar} title={`${chat.sender.name}`} alt="icon" height='48px' width='48px' style={{ borderRadius: '50%' }} />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }

                    {/* {
                        sendLoader && <div className='d-flex justify-content-center'><DataLoader /></div>
                    } */}
                </div>

                <HorizontalLine />

                <form onSubmit={handleSendButton} className='d-flex p-3 gap-3 align-items-center mb-3'>
                    <div>
                        <GrAttachment onClick={() => {
                            fileRef.current.click()
                        }} size={20} role='button' />
                        <input ref={fileRef} onChange={(e) => {
                            handleChangeFile(e)
                        }} type="file" className='d-none' />
                    </div>
                    <Input value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='flex-grow-1 py-2 px-3'
                        type="text" placeholder='Type a message' />
                    <SendButton disabled={sendLoader} type='submit'><TbSend size={25} /></SendButton>
                </form>
            </Card>
        </div>
    );
}