import React, { useEffect, useState } from "react";
import Line from "../../component/Line/Line";
import { useParams, useNavigate } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "../../component/Loader/PageLoader";
import SubmitLoader from "../../component/Loader/SubmitLoader";

const SingleFee = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const form = useForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const navigate = useNavigate();
  const param = useParams();
  const [singleFee, setSingleFee] = useState({});
  const [remount, setRemount] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setBtnLoader(false);
  };
  const handleShow = (value) => {
    setShow(true);
    // // console.log(value);
    // // console.log(singleFee._id);
  };

  const onSubmit = (data) => {
    // console.log(data);
    setBtnLoader(true);
    axios
      .put(
        API_URLs.updateFee(param.id),
        { fee: data.fee },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        // console.log("Update");
        setRemount(!remount);
        toast.success("Fee Updated successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        setBtnLoader(true);
        handleClose();
      })
      .catch(() => {
        // console.log("Failed");
        setRemount(!remount);
        setBtnLoader(false);
        toast.error("Fee Updation Failed", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  const fee = watch("fee");
  const maxLength = 2;

  useEffect(() => {
    if (fee && fee.toString().length > maxLength) {
      setValue("fee", fee.toString().slice(0, maxLength));
      register("fee").disabled = true;
    } else {
      register("fee").disabled = false;
    }
  }, [fee, maxLength, register, setValue]);

  //! Api Call for get Fee for single id
  useEffect(() => {
    axios
      .get(API_URLs.getFeeId(param.id), {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // // console.log(res);
        setSingleFee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, [remount]);

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
          className="mx-1 mt-2 border-0 fw-bold"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
        </div>
        <div
          className="card p-3 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5
              className="text-decoration-underline mb-4"
              style={{ textTransform: "uppercase" }}
            >
              FEE DETAIL
            </h5>
          </div>

          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-2">
              <div className="w-25">Id : </div>
              <div className="text-secondary">{singleFee._id}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Name : </div>
              <div className="text-secondary">{singleFee.name}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Fee : </div>
              <div className="d-flex gap-5 align-items-center">
                <div className="text-secondary">{singleFee.fee} %</div>
                <button
                  onClick={() => handleShow(`${singleFee._id}`)}
                  className="bg-primary ouline-none border-0 text-white px-2 py-1 rounded-3"
                >
                  Update Fee
                </button>
              </div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Status: </div>
              <div className="text-secondary">
                {singleFee.isActive ? (
                  <div className="fw-bold text-success">Active</div>
                ) : (
                  <div className="fw-bold text-danger">Not Active</div>
                )}
              </div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Created Date : </div>
              <div className="text-secondary">{new Date(singleFee?.createdAt).toDateString()}</div>
            </div>
            <Line />
            <div className="d-flex gap-2">
              <div className="w-25">Updated Date : </div>
              <div className="text-secondary">{new Date(singleFee?.updatedAt).toDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={false} />

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
              <h5 className="text-decoration-underline">UPDATE FEE</h5>
              <span
                onClick={handleClose}
                className="bg-primary border-none text-white rounded-2 px-2"
              >
                X
              </span>
            </div>

            <div className="d-flex flex-column gap-3">
              <label htmlFor="role">Fees (in %) :</label>
              <div className="d-flex flex-column">
                <input
                  id="role"
                  className="border border-muted px-3 py-1 rounded-3 "
                  placeholder="Fee"
                  {...register("fee", {
                    min: {
                      value: 1,
                      message: "Enter the value greater than 0",
                    },
                    max: {
                      value: 99,
                      message: "Enter the value less than 100",
                    },
                    required: {
                      value: true,
                      message: "Fee is required",
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
                {btnLoader ? <SubmitLoader /> : "Update"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleFee;
