import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { API_URLs } from "../../utils/ApiUrls";
import { CSVLink } from "react-csv";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import { BiSearchAlt2 } from 'react-icons/bi'

const Button = styled.button`
border: none;
outline: none;
background: #e21d1d;
color: white;
width: 60px;
border-radius: 20px;
padding: 3px 1px;

&:disabled{
  opacity: 0.5;
}
`
const Div = styled.div`
border: 1px solid lightgrey;
box-shadow: 0px 0px 10px lightgrey;
padding: 5px 10px;
display: flex;
border-radius: 20px;
align-items: center;
`
const SeachInput = styled.input`
border: none;
outline: none;
`
const CountryManagement = () => {
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [blockLoader, setBlockLoader] = useState(false);
  const [ID, setID] = useState('')

  // for input search field 
  const [searchData, setSearchData] = useState('')
  const handleSearch = (e) => {
    setSearchData(e.target.value);
  }

  // function handleBlock(id) {
  const handleBlock = (id) => {
    setBlockLoader(true)
    setID(id);
    axios.post(API_URLs.blockCountry(id), {
      status: 'block'
    }, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        setBlockLoader(false)
        console.log(res);
        handleGetCountry()
      })
      .catch((error) => {
        setBlockLoader(false)
        console.log(error)
      })
  }

  //! For Datatable
  const columns = [
    {
      name: "S.No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Flag",
      selector: (row) => <img src={row?.flag} height="20px" alt="" />,
      hide: "sm",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sorting: true,
    },
    {
      name: "Code (iso2)",
      selector: (row) => row?.iso2,
      hide: "sm",
    },
    {
      name: "Code (iso3)",
      selector: (row) => row?.iso3,
      hide: "sm",
    },
    {
      name: "Phone Code",
      selector: (row) => row?.phone_code,
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => (
        <Button disabled={row._id === ID && blockLoader} onClick={() => handleBlock(row._id)}>
          {
            row._id === ID && blockLoader ?
              <Oval
                height={10}
                width={10}
                color="white"
              /> : 'Block'
          }
        </Button>
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
  const handleGetCountry = () => {
    axios
      .get(API_URLs.getCountry, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCountryData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    handleGetCountry()
  }, []);

  const filterData = countryData.filter((data) => {
    return data.name.toLowerCase().includes(searchData.toLowerCase()) || data.phone_code.includes(searchData) || data.iso2.toLowerCase().includes(searchData.toLowerCase())
  })

  // console.log('filterData  filterData', filterData)
  console.log('countryData countryData countryData', countryData)
  return (
    <>
      <div className="p-3">
        <div
          className="card p-2 mt-3"
          style={{
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
          }}
        >
          <>
            <div className="d-flex justify-content-between px-2 align-items-center py-3">
              <h5 className="text-decoration-underline">COUNTRY LIST</h5>
              <Div>
                <SeachInput
                  value={searchData}
                  onChange={handleSearch}
                  placeholder="Search Here"
                />
                <BiSearchAlt2 size={20} />
              </Div>
            </div>
            <DataTable
              columns={columns}
              data={filterData}
              customStyles={customStyles}
              progressPending={loading}
              progressComponent={<div className='d-flex justify-content-center py-5'>
                <Oval
                  height={50}
                  width={50}
                  color='black'
                  secondaryColor='black'
                />
              </div>}
              pagination
              fixedHeader
              highlightOnHover
              responsive={true}
            />
            {
              filterData.length > 0 && <div className=" my-3 mx-5  d-flex justify-content-end">
                <CSVLink
                  className="bg-primary ouline-none border-0 text-white p-2 rounded-3 text-decoration-none"
                  data={countryData} >
                  Download CSV
                </CSVLink>
              </div>
            }
          </>
        </div>
      </div>
    </>
  );
};

export default CountryManagement;
