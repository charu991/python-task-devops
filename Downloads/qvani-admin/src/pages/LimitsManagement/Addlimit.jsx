import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Select from 'react-select'
import React, { useEffect, useState } from "react";
import { BsArrow90DegRight, BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { API_URLs } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
const Input = styled.input`
border: 1px solid lightgrey;
outline: none;
height: 100%;
border-radius: 6px;
`

const levelnum = [
  {
    label: 0,
    value: 0
  },
  {
    label: 1,
    value: 1
  },
  {
    label: 2,
    value: 2
  },
  {
    label: 3,
    value: 3
  },
]
const levelType = [
  {
    label: 'Not Verified',
    value: 'NOT VERIFIED'
  },
  {
    label: 'E-Mail/Mobile Number Verified',
    value: 'EMAIL OR NUMBER VERIFIED'
  },
  {
    label: 'Document Verified',
    value: 'DOCUMENT VERIFIED'
  },
  {
    label: 'Address Verified',
    value: 'ADDRESS VERIFIED'
  },
]
const AddRole = () => {
  const params = useParams();
  const { id } = params;
  const [limitsData, setLimitsData] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  useEffect(() => {
    if (id) {
      setIsEdit(true)
    }
  }, [])
  useEffect(() => {
    axios.get(API_URLs.limitLevel, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        console.log('limit', res.data)
        let filter = res?.data?.filter((option) => {
          return id === option?._id
        })
        setLimitsData(filter)
        console.log(filter)
        let level = levelnum.filter((option) => {
          return option.value === filter[0]?.level;
        })
        let levelTypes = levelType.filter((option) => {
          return option.value === filter[0]?.type
        })
        formik.setValues({
          ...formik.values,
          level: level[0],
          levelType: levelTypes[0],
          minLimit: filter[0].minLimit,
          maxLimit: filter[0].maxLimit
        })
      })
      .catch((error) => {
        console.log('limit error', error)
      })
  }, [id])
  // console.log(';gfgfgfgfgbdgnbgnmbdk', limitsData)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { level: '', levelType: '', minLimit: '', maxLimit: '' },
    validationSchema: Yup.object({
      level: Yup.object({
        value: Yup.string().required("Level is Required")
      }),
      levelType: Yup.object({
        value: Yup.string().required("Level is Required")
      }),
      // levelType: Yup.object().required('Level Type is Required'),
      minLimit: Yup.string().required('Minimum Limit is Required'),
      maxLimit: Yup.string().required('Maximum Limit is Required'),
    }),
    onSubmit: values => {
      console.log('values', values)

      axios.post(API_URLs.limitLevel, {
        level: values.level.value,
        type: values.levelType.value,
        minLimit: values.minLimit,
        maxLimit: values.maxLimit
      }, {
        headers: {
          'accept': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      })
        .then((res) => {
          console.log(res)
          isEdit ? toast.success('Limit Update Successfully!!', {
            position: toast.POSITION.TOP_CENTER
          }) :
            toast.success(res?.data?.msg ? res?.data?.msg : 'Limits Added Successfully!!', {
              position: toast.POSITION.TOP_CENTER
            })
          navigate('/limits')
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : "Some Error Occured")
        })
    }
  })

  return (
    <div className="p-3">
      <div className="mx-1 mt-2 border-0 fw-bold" onClick={() => navigate(-1)}>
        <BsArrowLeft size="25px" style={{ cursor: "pointer" }} />
      </div>
      <div
        className="card p-2 mt-3"
        style={{
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25 ",
        }}
      >
        <h5 className="p-2 pb-4 text-decoration-underline">{isEdit ? 'EDIT LIMIT' : 'ADD LIMIT'}</h5>
        <form
          className="d-flex flex-column gap-4 p-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="d-flex justify-content-around flex-wrap">

            <div className="d-flex flex-column ">
              <label htmlFor="level">Level Number:</label>
              <Select
                id="level"
                name="level"
                options={levelnum}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    outline: 'none',
                    border: '1px solid #E9EAF3',
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
                  menu: (styles) => ({
                    ...styles, background: 'white',
                    color: 'black'
                  }),
                  input: (styles) => ({
                    ...styles,
                    color: 'black',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px'
                  }),
                  singleValue: (styles) => ({
                    ...styles,
                    color: 'black',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                  }),
                  option: (styles) => ({
                    ...styles, color: 'black',
                    background: 'white', ":hover": {
                      background: 'blue',
                      color: 'white'
                    }
                  })
                }}
                onChange={(selectedValue) => {
                  let event = { target: { name: 'level', value: selectedValue } }
                  formik.handleChange(event)
                }}
                onBlur={(selectedValue) => {
                  let event = { target: { name: 'level', value: selectedValue } }
                  formik.handleBlur(event);
                }}
                value={formik.values.level}
              />
              {formik.touched.level && formik.errors.level ? (
                <div className='text-danger text-danger-error user-validation'>{formik.errors.level?.value}</div>
              ) : null}
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="levelType">Level Type :</label>
              <Select
                id="levelType"
                name="levelType"
                options={levelType}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    outline: 'none',
                    border: '1px solid #E9EAF3',
                    color: 'black',
                    width: '13rem'
                  }),
                  indicatorSeparator: () => ({
                    all: 'unset'
                  }),
                  indicatorsContainer: (styles) => ({
                    ...styles, color: 'black', 'div:nth-child(2)': {
                      color: 'black'
                    }
                  }),
                  menu: (styles) => ({
                    ...styles, background: 'white',
                    color: 'black'
                  }),
                  input: (styles) => ({
                    ...styles,
                    color: 'black',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px'
                  }),
                  singleValue: (styles) => ({
                    ...styles,
                    color: 'black',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                  }),
                  option: (styles) => ({
                    ...styles, color: 'black',
                    background: 'white', ":hover": {
                      background: 'blue',
                      color: 'white'
                    }
                  })
                }}
                onChange={(selectedValue) => {
                  let event = { target: { name: 'levelType', value: selectedValue } }
                  formik.handleChange(event)
                }}
                onBlur={(selectedValue) => {
                  let event = { target: { name: 'levelType', value: selectedValue } }
                  formik.handleBlur(event);
                }}
                value={formik.values.levelType}
              />
              {formik.touched.levelType && formik.errors.levelType ? (
                <div className='text-danger text-danger-error user-validation'>{formik.errors.levelType?.value}</div>
              ) : null}
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="minLimit">Minimum Limit:</label>
              <Input
                id='minLimit'
                name="minLimit"
                value={formik.values.minLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.minLimit && formik.errors.minLimit ? (
                <div className='text-danger text-danger-error user-validation'>{formik.errors.minLimit}</div>
              ) : null}
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="maxLimit">Minimum Limit:</label>
              <Input
                id='maxLimit'
                name="maxLimit"
                value={formik.values.maxLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.maxLimit && formik.errors.maxLimit ? (
                <div className='text-danger text-danger-error user-validation'>{formik.errors.maxLimit}</div>
              ) : null}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type='submit' className=" border-0 px-2 py-1 rounded-3 bg-primary text-white">
              {
                isEdit ? 'Update' : 'Submit'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
