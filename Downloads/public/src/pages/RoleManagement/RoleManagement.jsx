import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const RoleManagement = () => {
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState([
    { roleName: "Role Name", description: "Description" },
  ]);
  const [del, setDel] = useState(false);

  useEffect(() => {}, [del]);

  const apiDelete = (userId) => {
    console.log(userId);
  };

  const columns = [
    {
      name: "Role Name",
      selector: (row) => row.roleName,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-4">
          <Link className="text-dark" state={"edit"}>
            <MdEdit size={15} />
          </Link>
          <MdDelete
            size={15}
            onClick={() => {
              apiDelete(row.id);
              setDel(!del);
            }}
          />
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
            to={{ pathname: `/addrole`, state: { value: "addd" } }}
          >
            <span className="fw-bold h5">+</span> Add Role
          </Link>
        </div>

        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <h5 className="p-2 pb-4 text-decoration-underline">ROLE LIST</h5>
          <DataTable
            columns={columns}
            data={roleData}
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

export default RoleManagement;
