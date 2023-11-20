import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsEyeFill } from "react-icons/bs";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
import PageLoader from "../../component/Loader/PageLoader";
import Modal from "react-bootstrap/Modal";

const SingleBlackList = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();
  const [singleData, setsingleData] = useState([]);
  const [modalData, setModalData] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (data) => {
    console.log(data);
    setModalData(data);
    setShow(true);
  };

  //! For Datatable
  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => (
        <span>
          {row?.targetUserId?.name.length ? row?.targetUserId?.name : "Default"}
        </span>
      ),
    },
    {
      name: "Id",
      selector: (row) => row?.targetUserId?._id,
      hide: "md",
    },
    {
      name: "Created Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
      hide: "md",
    },
    {
      name: "Updated Date",
      selector: (row) => new Date(row?.updatedAt).toDateString(),
      hide: "md",
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    // {
    //   name: "Action",
    //   cell: (row) => <BsEyeFill size={15} onClick={() => handleShow(row)} />,
    // },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#f1f9fc",
        fontSize: "13.5px",
      },
    },
  };

  //! API Call for getting trusted and untrusted data
  useEffect(() => {
    axios
      .post(
        API_URLs.trustUntrust,
        {
          userId: `${param.id}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setsingleData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
          <h5
            className="text-decoration-underline mb-4"
            style={{ textTransform: "uppercase" }}
          >
            DETAIL OF TRUSTED/UNTRUSTED USER
          </h5>
          <DataTable
            columns={columns}
            data={singleData}
            customStyles={customStyles}
            pagination
            fixedHeader
            highlightOnHover
            responsive={true}
          />
        </div>
      </div>

      <Modal show={show}>
        <Modal.Body>
          <div>
            {modalData.targetUserId?.name?.length
              ? modalData?.targetUserId?.name
              : "Default"}
          </div>
          <button onClick={handleClose}>Close</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleBlackList;
