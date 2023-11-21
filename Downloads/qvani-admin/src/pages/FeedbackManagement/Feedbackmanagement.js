import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { API_URLs } from '../../utils/ApiUrls';
import axios from 'axios';
import SingleFeed from './SingleFeed'
import { AiFillEye, AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify';
export default function Feedbackmanagement() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [singlefeedbackData, setSingleFeedbackData] = useState([]);
  const [showSingleFeed, setShowSingleFeed] = useState(false)
  const handleShow = (data) => {
    setShowSingleFeed(true)
    setSingleFeedbackData(data)
  }
  const handleClose = () => { setShowSingleFeed(false) }

  const getfeed = () => {
    axios.get(API_URLs.feedback, {
      headers: {
        'accept': 'aplication/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('feed respo',res)
        setFeedbackData(res.data)
      })
      .catch((error) => {
        console.log('feed error', error)
      })
  }

  useEffect(() => {
    getfeed();
  }, [])
  console.log('feed respo', feedbackData)

  const handleDelete = (row) => {
    axios.delete(API_URLs.deletefeedback(row._id), {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('delete feedback api response', res)
        getfeed()
        toast.success(res?.data?.msg ? res?.data?.msg : 'Feedback Delete Successfully!!', {
          position: toast.POSITION.TOP_CENTER
        })
      })
      .catch((error) => {
        console.log('delete feedback api error', error)
        toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : 'Some Error Occured', {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }
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
  const columns = [
    {
      name: "Id",
      selector: (row, index) => index + 1,
      hide: "sm",
    },
    {
      name: "Feedback By",
      selector: (row) => row.feedbackBy.name,
    },
    {
      name: "Feedback For",
      selector: (row) => row.feedbackFor.name,
    },
    {
      name: "Created Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
      hide: "sm",
    },
    {
      name: "Message",
      selector: (row) => row?.feedback ? row?.feedback : '..',
      hide: "lg",
    },
    {
      name: "Ratings",
      selector: (row) => row?.rating ? row?.rating + ' stars' : '..',
      hide: "lg",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2" >
          <p className='mb-0' role='button' onClick={() => handleShow(row)}>View <AiFillEye size={15} /></p>
          <p className='mb-0' role='button' onClick={() => handleDelete(row)}>Delete <AiFillDelete size={15} /></p>
        </div>
      ),
    }
  ];
  return (
    <div className='p-3'>
      <div className="card p-2 mt-3" style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.25)", }}>
        {
          showSingleFeed ?
            <SingleFeed singlefeedbackData={singlefeedbackData} handleClose={handleClose} /> :
            <>
              <h5 className="p-2 pb-4 text-decoration-underline">
                FEEDBACK MANAGEMENT LIST
              </h5>
              <DataTable
                columns={columns}
                data={feedbackData}
                customStyles={customStyles}
                pagination
                fixedHeader
                highlightOnHover
                responsive={true}
              />
            </>
        }
      </div>
    </div>
  );
}