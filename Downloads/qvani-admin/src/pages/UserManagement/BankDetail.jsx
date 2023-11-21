import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { BsEyeFill } from "react-icons/bs";

export default function BankDetail({ bankData }) {
  // console.log('bankData',bankData)
  const [singleBank, setSingleBank] = useState([]);
  const columns = [
    {
      name: 'S. No',
      selector: (row, index) => index + 1,
    },
    {
      name: "Bank Name",
      selector: (row) => row?.BankName,
    },
    {
      name: "Account Holder",
      selector: (row) => row?.holderName,
    },
    {
      name: "IFSC",
      selector: (row) => row?.IFSC,
      hide: "sm",
    },
    {
      name: "Postcode",
      selector: (row) => row?.zipCode,
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => <div role="button" onClick={() => handleShow(row)}>
        View <BsEyeFill size={13} />,
      </div>
    },
  ];

  const handleShow = (value) => {
    setSingleBank(value);
    console.log(value);
  };

  const handleClose = () => {
    setSingleBank({});
  };

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
      <div
        className="card p-2 mt-3"
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        {!Object.keys(singleBank).length ? (
          <>
            <h5 className="p-2 text-decoration-underline">BANK DETAIL</h5>
            <DataTable
              // title="Bank Detail"
              data={bankData}
              columns={columns}
              pagination
              selectableRowsHighlight
              fixedHeader
              customStyles={customStyles}
              highlightOnHover
              responsive={true}
            />
          </>
        ) : (
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-decoration-underline pb-4">BANK DETAIL</h5>
              <button
                className="bg-primary border-0 text-white rounded-2 px-2  mb-4"
                onClick={handleClose}
              >
                X
              </button>
            </div>

            <div className="d-flex flex-column flex-md-row flex-wrap fw-normal">
              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Bank Name :</div>
                <p className="my-2 text-secondary">{singleBank?.BankName}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Account Holder :</div>
                <p className="my-2 text-secondary">{singleBank?.holderName}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Account Number :</div>
                <p className="my-2 text-secondary">{singleBank?.accountNo}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Account Type :</div>
                <p className="my-2 text-secondary">{singleBank?.accountType}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Currency :</div>
                <p className="my-2 text-secondary">{singleBank?.currency?.name}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Status :</div>
                <div className="my-2 text-secondary">{singleBank?.isActive ? 'Active' : 'In-Active'}</div>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Custom Bank Details :</div>
                <p className="my-2 text-secondary">
                  {singleBank?.customBankDetails}
                </p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">IFSC :</div>
                <p className="my-2 text-secondary">{singleBank?.IFSC}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Swift/Bic Code :</div>
                <p className="my-2 text-secondary">{singleBank?.bicCode}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Residency :</div>
                <p className="my-2 text-secondary">{singleBank?.CountryResidency?.name}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">State :</div>
                <p className="my-2 text-secondary">{singleBank?.state}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">City :</div>
                <p className="my-2 text-secondary">{singleBank?.city}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Postcode :</div>
                <p className="my-2 text-secondary">{singleBank?.zipCode}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Country :</div>
                <p className="my-2 text-secondary">{singleBank?.Bankcountry?.name}</p>
              </div>

              <div className="d-flex flex-sm-column col-md-4 border-bottom">
                <div className="w-50">Address :</div>
                <p className="my-2 text-secondary">{singleBank?.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
