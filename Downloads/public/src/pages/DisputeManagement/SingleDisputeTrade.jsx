import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsEyeFill, BsFillChatDotsFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { API_URLs } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import PageLoader from "../../component/Loader/PageLoader";
import Select from "react-select";
const Textarea = styled.textarea`
border-radius: 10px;
box-shadow: 0px 0px 8px #E9EAF3;
border: 1px solid #E9EAF3;
outline: none;
height: 6rem;
`
const UploadLabel = styled.label`
padding: 1px 6px;
border-radius: 10px;
background: #1476FF;
color: white;
font-weight: 600;
:hover:not(:disabled){
    opacity: 0.9;
}
:active{
    transform: scale(0.9);
}
`
const ImgDiv = styled.div`
  border: 1px solid grey;
  display: flex;
  border-radius: 23px;
  padding: 7px 1px;
  justify-content: space-around;
  margin-top: 10px;
`
const SubmitButton = styled.button`
border: none;
background: #1476FF;
font-family: 'Inter';
color: white;
padding: 7px;
width: 9rem;
border-radius: 20px;
`
const TextSpan = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #6F7182;
`
export default function SingleDisputeTrade() {

    const [imgName, setImgName] = useState('Upload Image')
    const [imgElement, setImgElement] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [showFile, setShowFile] = useState(false);
    const handleShowFileClose = () => setShowFile(false);

    const [btnloader, setBtnLoader] = useState(false)
    const [remount, setRemount] = useState(false);
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            //  status: '', 
            solution: ''
        },
        validationSchema: Yup.object().shape({
            solution: Yup.string().required("Solution is Required")
        }),
        onSubmit: values => {
            // console.log(values);
            axios.patch(
                API_URLs.tradeDisputeResolve(param.id), {
                solution: values.solution,
                attachment: imgElement && imgElement,
            }, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(() => {
                    toast.success("Dispute Resolved Successfully", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setRemount(!remount);
                })
                .catch(() => {
                    toast.error("Dispute Not Resolved", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setRemount(!remount);
                });
        }
    })
    const [singleDisputeData, setSingleDisputeData] = useState([]);
    const getTradeDisputeById = () => {
        axios.get(API_URLs.tradeDisputeById(param.id), {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        })
            .then((res) => {
                console.log(res);
                setSingleDisputeData(res.data);
                console.log(res.data.id);
                console.log(res.data.image);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }
    useEffect(() => { getTradeDisputeById() }, [])
    if (loading) {
        return (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <PageLoader />
            </div>
        );
    }
    return (
        <div >
            <div
                className="mx-1 mt-2 border-0 fw-bold"
                onClick={() => navigate(-1)}
            >
                <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
            </div>
            <div className="p-2 d-flex flex-column justify-content-between gap-1 align-items-start flex-md-row">
                <div
                    className="card px-3 py-4 mt-3 mb-5 gap-3"
                    style={{
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
                        flex: 3,
                        width: "100%",
                    }}
                >
                    <h5 className="text-decoration-underline">DISPUTE INFO.</h5>

                    <div className="d-flex gap-2">
                        <div className="w-25">User ID : </div>
                        <div>{singleDisputeData.user}</div>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="w-25">Dispute ID : </div>
                        <div>{singleDisputeData.id}</div>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="w-25">Dispute ID : </div>
                        <div>{singleDisputeData.tradeId}</div>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <div className="w-25">Dispute Status : </div>
                        <div className="w-25">
                            {singleDisputeData?.isAdminSolve ? <p className="mb-0 fw-bold text-success">Resolved</p> : <p className="mb-0 fw-bold text-warning">In-Progress</p>}
                        </div>
                    </div>
                    {singleDisputeData?.solution &&
                        <div className="d-flex gap-2">
                            <div className="w-25">Solution by Admin : </div>
                            <div>{singleDisputeData?.category?.disputeName}</div>
                        </div>}
                    <div className="d-flex gap-2">
                        <div className="w-25">Dispute Category : </div>
                        <div>{singleDisputeData?.category?.disputeName}</div>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="w-25">Description : </div>
                        <div>{singleDisputeData.query}</div>
                    </div>

                    <div className="d-flex gap-2">
                        <div className="w-25">View File :</div>
                        {/* <p className="mb-0" onClick={() => setShowFile(true)} role="button" >
                            View <BsFillChatDotsFill />
                        </p> */}
                        <p className="mb-0" onClick={() => navigate(`/chats/${singleDisputeData.tradeId}/${singleDisputeData.initiateId}`)} role="button" >
                            View < BsEyeFill />
                        </p>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit}
                    className="card px-3 py-4 mt-3 mb-5 gap-3"
                    style={{
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.25",
                        flex: 2,
                        width: "100%",
                    }}
                >
                    <h5 className="text-decoration-underline">PROVIDE SOLUTION</h5>
                    <div>
                        <label className="fw-bol">Solution</label>
                        <Textarea
                            name="solution"
                            id="solution"
                            placeholder="Enter Solution Here"
                            rows="2"
                            className="w-100"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.solution}
                        />
                        <small>
                            {formik.errors.solution && formik.touched.solution && (
                                <div className="input-feedback text-danger text-start">{formik.errors.solution}</div>
                            )}
                        </small>
                    </div>

                    {/* <div>
              <label className="">Status</label>
              <Select
                id="status"
                name="status"
                options={option}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    // padding: '2px 0',
                    background: 'white',
                    borderRadius: '40px',
                    boxShadow: '0px 0px 8px #E9EAF3',
                    border: '1px solid #E9EAF3', "&:hover": {
                      border: '1px solid none',
                      outline: 'none'
                    },
                    color: 'black'
                  }),
                  indicatorSeparator: () => ({
                    all: 'unset'
                  }),
                  indicatorsContainer: (styles) => ({
                    ...styles, color: 'black', 'div:nth-child(2)': {
                      color: 'black'
                    }
                  }),
                  // menu: (styles) => ({
                  //   ...styles, background: 'white',
                  //   color: 'black'
                  // }),
                  // input: (styles) => ({
                  //   ...styles, color: 'black'
                  // }),
                  // singleValue: (styles) => ({
                  //   ...styles,
                  //   color: 'black'
                  // }),
                  option: (styles) => ({
                    ...styles, color: 'black'
                    , background: 'white', ":hover": {
                      background: '#1476FF',
                      color: 'white'
                    }
                  })
                }}
                onChange={(selectedValue) => {
                  let event = { target: { name: 'status', value: selectedValue } }
                  formik.handleChange(event)
                }}
                onBlur={(selectedValue) => {
                  let event = { target: { name: 'status', value: selectedValue } }
                  formik.handleBlur(event)
                }}
                value={formik.values.status}
              />
              </div> */}
                    <div className='mt-2'>
                        <ImgDiv>
                            <TextSpan className='d-flex justify-content-between align-items-center w-75 ps-3'>
                                {String(imgName).length > 20 ? String(imgName).slice(0, 20) + '...' : String(imgName)}
                            </TextSpan>
                            <UploadLabel className='label'>
                                <input
                                    className='d-none'
                                    onChange={(e) => {
                                        setImgName(e.target.files[0].name)
                                        setImgElement(e.target.files[0])
                                    }}
                                    name='image'
                                    type="file"
                                />
                                <span>Upload</span>
                            </UploadLabel>
                        </ImgDiv>
                    </div>
                    <div className="d-flex  justify-content-center">
                        <SubmitButton type="submit" disabled={btnloader}>
                            {
                                btnloader ?
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
                                        strokeWidthSecondary={2}
                                    /> :
                                    'Update Status'
                            }

                        </SubmitButton>
                    </div>
                </form>
            </div>
            <Modal
                show={showFile}
                // size="sm"
                dialogClassName="modal-90w"
                onHide={handleShowFileClose}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="p-4 rounded-1">
                    {
                        singleDisputeData.image ?
                            <img src={singleDisputeData.image} className="w-100" alt="" /> :
                            <p className="mb-0 text-center">No Image Uploaded</p>
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
}