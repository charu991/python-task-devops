import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { API_URLs } from "../../utils/ApiUrls";

const Limitmanagement = () => {
  const navigate = useNavigate();
  const [limitsData, setLimitsData] = useState([]);

  useEffect(() => {
    axios.get(API_URLs.limitLevel, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('limit', res)
        setLimitsData(res?.data)
      })
      .catch((error) => {
        console.log('limit error', error)
      })
  }, [])
  const columns = [
    {
      name: "Level",
      selector: (row) => row?.level,
    },
    {
      name: "Created At",
      selector: (row) => row?.createdAt?.split('T')[0],
    },
    {
      name: "Type",
      selector: (row) => row?.type,
    },
    {
      name: "Minimum Limit",
      selector: (row) => row?.minLimit,
    },
    {
      name: "Maximum Limit",
      selector: (row) => row?.maxLimit,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-4">
          <div onClick={() => navigate(`/addlimit/${row._id}`)}>
            <MdEdit size={15} role="button" />
          </div>
        </div>
      ),
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

  return (
    <>
      <div className="p-3">
        <div
          className="p-2 mt-3"
          style={{
            textShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <Link
            className="bg-primary text-decoration-none ouline-none border-0 text-white p-2 rounded-3"
            to={{ pathname: `/addlimit`, state: { value: "addd" } }}
          >
            <span className="fw-bold h5">+</span> Add Limits
          </Link>
        </div>

        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <h5 className="p-2 pb-4 text-decoration-underline">LIMITS LIST</h5>
          <DataTable
            columns={columns}
            data={limitsData}
            customStyles={customStyles}
            pagination
            fixedHeader
            highlightOnHover
            responsive={true}
          />
        </div>
      </div>
    </>
  );
};

export default Limitmanagement;
