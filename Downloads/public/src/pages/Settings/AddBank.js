import React, { useState, useMemo, useEffect } from "react";

import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import Select from 'react-select'

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MdOutlineArrowBack } from 'react-icons/md'

import { API_URLs } from '../../utils/ApiUrls';
// import { useThemeContext } from '../../Context/ThemeContext';
// import { darkTheme, lightTheme } from "../../Theme/theme";
// import ButtonLoader from "../../Component/Loader/ButtonLoader";
import { Input, InputLabel } from "./StyledComponents";
import { useAuthContextHook } from "../../Context/ApiContext";
import { Oval } from "react-loader-spinner";

// const InputLabel = styled.label`
//     font-family: 'Poppins';
//     font-style: normal;
//     font-weight: 500;
//     font-size: 18px;
//     margin-bottom: 5px;
// `
const Button = styled.button`
    width: 100%;
    background-color: #1476FF;
    color: white;
    border-radius: 15px;
    border: none;
`
const Option = styled.option`
    color:  ${({ theme }) => theme.font};
    background: ${({ theme }) => theme.background};
`
// const Input = styled.input`
//     all: unset;
//     border: none;
//     background: inherit;
//     color: ${(props) => props.color};
//     outline: none;
// `
const StartingValue = {
    accountType: '',
    Bankcountry: '',
    currency: '',
    BankName: '',
    holderName: '',
    customBankDetails: '',
    IFSC: '',
    accountNo: '',
    bicCode: '',
    CountryResidency: '',
    state: '',
    city: '',
    zipCode: '',
    address: ''
}

const option1 = [
    {
        value: 'personal',
        label: 'Personal Account'
    },
    {
        value: 'business',
        label: 'Business Account'
    },
]

const option2 = [
    {
        value: 'inr',
        label: 'INR'
    },
    {
        value: 'usd',
        label: 'USD'
    },
]

const option3 = [
    {
        value: 'Haryana',
        label: 'Haryana'
    },
    {
        value: 'Uttar Pardesh',
        label: 'Uttar Pardesh'
    },
    {
        value: 'Delhi',
        label: 'Delhi'
    }
]


export default function AddBank({ handleClose, isBankEdit = false, singleBankDetails = {}, handleSetRefresh }) {

    // const { isDarkTheme } = useThemeContext();
    const [loading, setLoading] = useState(false);
    const [next, setnext] = useState(false);
    const [stateId, setStateId] = useState('')
    const { countryOptions, customFilterForCountry, fiatCurrencyOptions, customFilterForFiat, fetchStates, fetchCities } = useAuthContextHook()

    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [allBankList, setAllBankList] = useState([]);
    const [bankList, setBankList] = useState([]);

    const handleAddBankSubmit = (values) => {
        setLoading(true)
        axios.post(API_URLs.bankPost, {
            accountType: values.accountType?.value,
            Bankcountry: values.Bankcountry?.value,
            currency: values.currency?.value,
            BankName: values.BankName?.value,
            holderName: values.holderName,
            customBankDetails: values.customBankDetails,
            IFSC: values.IFSC,
            accountNo: values.accountNo,
            bicCode: values.bicCode,
            CountryResidency: values.CountryResidency?.value,
            state: values.state?.value,
            city: values?.city?.value,
            zipCode: values.zipCode,
            address: values.address,
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Details Added Successfully!!')
                setLoading(false)
                handleClose();
                handleSetRefresh && handleSetRefresh()
            })
            .catch((error) => {
                setLoading(false)
                console.log('error');
                toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Some Error Occured")
            })
    }

    const handleEditBankDetails = (values) => {
        setLoading(true)
        axios.patch(`${API_URLs.bankPost}/${singleBankDetails?.id}`, {
            accountType: values.accountType?.value,
            Bankcountry: values.Bankcountry?.value,
            currency: values.currency?.value,
            BankName: values.BankName?.value,
            holderName: values.holderName,
            customBankDetails: values.customBankDetails,
            IFSC: values.IFSC,
            accountNo: values.accountNo,
            bicCode: values.bicCode,
            CountryResidency: values.CountryResidency?.value,
            state: values.state?.value,
            city: values?.city?.value,
            zipCode: values.zipCode,
            address: values.address,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((res) => {
            console.log(res);
            toast.success(res?.msg ? res.msg : "Details Updated Succesfully")
            setLoading(false)
            handleClose();
            handleSetRefresh()
        })
            .catch((error) => {
                setLoading(false)
                console.log('error');
                toast.error(error.response?.data?.message ? error.response?.data?.message : "Some Error Occured")
            })
    }

    let nameregex = /^[a-zA-Z ]{2,50}$/
    let bicregex = /^[a-zA-Z0-9]{8,12}$/
    let numberregex = /^[0-9]+$/
    const formik = useFormik({
        initialValues: StartingValue,
        validationSchema: Yup.object().shape({
            accountType: Yup.object().shape({
                // label: Yup.string().required(),
                value: Yup.string().required('Account Type is Required'),
            }),
            Bankcountry: Yup.object().shape({
                // label: Yup.string().required(),
                value: Yup.string().required("Bank Country is Required"),
            }),
            currency: Yup.object().shape({
                // label: Yup.string().required(),
                value: Yup.string().required("Currency is Required"),
            }),
            BankName: Yup.object().shape({
                // label: Yup.string().required(),
                value: Yup.string().required("Bank Name is Required"),
            }),
            // BankName: Yup.string().min(3, 'Enter a Valid Bank Name').max(35, 'Enter a Valid Bank Name').required('Required'),
            holderName: Yup.string().min(3, 'Enter a Valid Account Holder Name').max(30, 'Enter a Valid Account Holder Name').matches(nameregex, "Invalid Name").required('Holder Name is Required'),
            customBankDetails: Yup.string().max(30, 'Enter a valid Details'),
            IFSC: Yup.string().max(15, 'Enter a Valid IFSC Code'),
            accountNo: Yup.string().min(6, 'Enter a Valid Account Number').max(30, 'Enter a Valid Account Number').matches(numberregex, "Invalid Number"),
            bicCode: Yup.string().min(8, 'Enter a valid BIC Code').max(11, 'Enter a valid BIC Code').matches(bicregex, "Invalid BIC Code"),
            CountryResidency: Yup.object().shape({
                value: Yup.string().required('Country is Required'),
            }),
            state: Yup.object().shape({
                value: Yup.string().required('State is Required'),
            }),
            city: Yup.object().shape({
                value: Yup.string().required("City is Required"),
            }),
            zipCode: Yup.string().min(3, 'Enter a valid Zip Code').max(10, 'Enter a valid Zip Code').matches(numberregex, 'Enter a valid Zip Code').required('Zipcode is Required'),
            address: Yup.string().min(3, 'Enter a valid Address').required('Address is Required')
        }),
        onSubmit: (values) => {
            if (isBankEdit) {
                handleEditBankDetails(values)
            } else {
                handleAddBankSubmit(values);
            }
        }
    })


    const handleNext = (e) => {
        e.preventDefault();

        if (formik.values.accountType && formik.values.Bankcountry && formik.values.currency) {
            setnext(true)
        }
    }


    useEffect(() => {

        console.log(singleBankDetails, "singleBankDetail");

        let accountType = option1.filter((option) => {
            return option.value === singleBankDetails.accountType
        })

        let bankCountry = countryOptions.filter((option) => {
            return option.value === singleBankDetails.Bankcountry?._id
        })

        let currency = fiatCurrencyOptions.filter((option) => {
            return option.value === singleBankDetails.currency?.id
        })

        let filteredCountryResidency = countryOptions.filter((option) => {
            return option.value === singleBankDetails.CountryResidency?._id
        })

        handleFetchState(filteredCountryResidency[0]?._id).then((stateList) => {

            let filteredState = stateList.filter((option) => {
                return option.value === singleBankDetails.state
            })

            // console.log(filteredState, "filteredStatefilteredStatefilteredState");

            handleFetchCity(filteredCountryResidency[0]?._id, filteredState[0]?.value).then((cityList) => {

                let filteredCity = cityList.filter((option) => {
                    return option.value === singleBankDetails.city
                })

                console.log(filteredCity, "filteredCityfilteredCityfilteredCity");

                if (isBankEdit) {
                    formik.setValues({
                        accountType: accountType[0],
                        Bankcountry: bankCountry[0],
                        currency: currency[0],
                        BankName: {
                            value: singleBankDetails.BankName,
                            label: singleBankDetails.BankName,
                        },
                        holderName: singleBankDetails.holderName,
                        customBankDetails: singleBankDetails.customBankDetails,
                        IFSC: singleBankDetails.IFSC,
                        accountNo: singleBankDetails.accountNo,
                        bicCode: singleBankDetails.bicCode,
                        CountryResidency: filteredCountryResidency[0],
                        state: filteredState[0],
                        city: filteredCity[0],
                        zipCode: singleBankDetails.zipCode,
                        address: singleBankDetails.address
                    })
                }

            })

        })

    }, [isBankEdit, singleBankDetails])


    const handleFetchState = async (countryID) => {
        try {
            let list = []

            if (countryID) {
                let res = await fetchStates(countryID)

                let filteredCountry = countryOptions?.filter((country) => {
                    return country?.value === countryID
                })

                console.log(filteredCountry)

                formik.setValues({
                    ...formik.values, CountryResidency: filteredCountry[0], state: "", city: ""
                })

                list = res.map((st) => {
                    return {
                        value: st?.code,
                        label: st?.name
                    }
                })

                setStateList(list)
            }
            console.log(list, "lost");
            return list
        } catch (error) {
            console.log(error);
            // return []
        }
    }

    const handleFetchCity = async (countryId, stateId) => {
        try {
            let list = [];

            if (countryId && stateId) {
                let res = await fetchCities(countryId, stateId)

                let filteredState = stateList?.filter((state) => {
                    return state?.value === stateId
                })

                formik.setValues({
                    ...formik.values, state: filteredState[0], city: ""
                })
                list = res.map((ct) => {
                    return {
                        value: ct?.name,
                        label: ct?.name
                    }
                })

                setCityList(list)
            }
            console.log(list, "lost");
            return list
        } catch (error) {
            console.log(error);
            return []
        }
    }

    const getAllBanks = () => {
        axios.get(API_URLs.allBanks, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((res) => {
            console.log(res.data);
            setAllBankList(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllBanks()
    }, [])

    useEffect(() => {
        let filteredBanks = allBankList.filter((bank) => {
            return String(bank?.name).toLowerCase() === String(formik.values.Bankcountry?.name).toLowerCase()
        })
        console.log(filteredBanks, "filteredBanks");
        let selectOptions = filteredBanks[0]?.bank?.map((bank) => {
            return ({
                label: bank,
                value: bank
            })
        })
        setBankList(selectOptions)
        console.log(selectOptions, "filteredBanks");
    }, [allBankList, formik.values.Bankcountry])

    // useEffect(() => {
    //     handleFetchState(formik.values.CountryResidency?.value)
    // }, [formik.values.CountryResidency, fetchStates])

    // useEffect(() => {
    //     handleFetchCity(formik.values.CountryResidency?.value, formik.values.state?.value)
    // }, [formik.values.state, fetchCities])

    return (
        <>
            {
                next ?
                    <form onSubmit={formik.handleSubmit}>
                        <div
                            type='button'
                            onClick={() => setnext(false)}>
                            <MdOutlineArrowBack />
                        </div>
                        <div className='mt-3 d-flex flex-column'>
                            <InputLabel htmlFor="BankName">Bank Name<span className="text-danger"> *</span></InputLabel>

                            <Select options={bankList}
                                // filterOption={customFilterForFiat}
                                // styles={{
                                //     control: (styles) => ({
                                //         ...styles,
                                //         // padding: '2px 0',
                                //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         border: '1px solid rgb(233, 234, 243)',
                                //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                //         borderRadius: '52px',
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     indicatorSeparator: () => ({
                                //         all: 'unset'
                                //     }),
                                //     indicatorsContainer: (styles) => ({
                                //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //         }
                                //     }),
                                //     menu: (styles) => ({
                                //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     input: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     singleValue: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     option: (styles, { isSelected }) => ({
                                //         ...styles, color: () => {
                                //             if (isDarkTheme) {
                                //                 return isSelected ? 'blue' : 'black'
                                //             } else {
                                //                 return isSelected ? 'black' : 'black'
                                //             }
                                //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                //         }
                                //     })
                                // }}
                                name='BankName'
                                id='BankName'
                                onChange={(selectedValues) => {
                                    let event = { target: { name: 'BankName', value: selectedValues } }
                                    formik.handleChange(event)
                                }}
                                onBlur={(selectedValues) => {
                                    let event = { target: { name: 'BankName', value: selectedValues } }
                                    formik.handleBlur(event)
                                }}
                                value={formik.values.BankName}
                                placeholder="Select Bank"
                            />

                            {/* <Input
                                placeholder='Enter Bank Name'
                                id="BankName"
                                name="BankName"
                                type="text"
                                className="px-3 py-2"
                                value={formik.values.BankName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            /> */}

                            <small>
                                {formik.errors.BankName && formik.touched.BankName && (
                                    <div className="input-feedback text-danger auth-error text-start">{formik.errors.BankName?.value}</div>
                                )}
                            </small>


                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="holderName">Account Holder's Name<span className="text-danger"> *</span></InputLabel>

                                <Input
                                    type="text"
                                    placeholder='Enter Account Holder Name'
                                    name="holderName"
                                    id='holderName'
                                    value={formik.values.holderName}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <small>
                                    {formik.errors.holderName && formik.touched.holderName && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.holderName}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="customBankDetails">Custom Bank Details</InputLabel>

                                <Input
                                    type="text"
                                    placeholder="Enter Custom Bank Details"
                                    name="customBankDetails"
                                    id='customBankDetails'
                                    value={formik.values.customBankDetails}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />

                                <small>
                                    {formik.errors.customBankDetails && formik.touched.customBankDetails && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.customBankDetails}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="IFSC">IFSC</InputLabel>

                                <Input
                                    placeholder='Enter IFSC Code'
                                    type="text"
                                    id='IFSC'
                                    name="IFSC"
                                    value={formik.values.IFSC}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <small>
                                    {formik.errors.IFSC && formik.touched.IFSC && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.IFSC}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="accountNo">Account Number</InputLabel>

                                <Input
                                    placeholder='Enter Account Number'
                                    type="text"
                                    name="accountNo"
                                    id='accountNo'
                                    value={formik.values.accountNo}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <small>
                                    {formik.errors.accountNo && formik.touched.accountNo && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.accountNo}</div>
                                    )}
                                </small>
                            </div>

                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="bicCode">SWIFT / BIC code</InputLabel>

                                <Input
                                    placeholder='Enter SWIFT / BIC code'
                                    type="text"
                                    name="bicCode"
                                    id='bicCode'
                                    value={formik.values.bicCode}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <small>
                                    {formik.errors.bicCode && formik.touched.bicCode && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.bicCode}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="CountryResidency">Country of Residency<span className="text-danger"> *</span></InputLabel>
                                <Select options={countryOptions}
                                    filterOption={customFilterForCountry}
                                    placeholder='Select Country'
                                    // styles={{
                                    //     control: (styles) => ({
                                    //         ...styles,
                                    //         // padding: '2px 0',
                                    //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                    //         border: '1px solid rgb(233, 234, 243)',
                                    //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                    //         borderRadius: '52px',
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //     }),
                                    //     indicatorSeparator: () => ({
                                    //         all: 'unset'
                                    //     }),
                                    //     indicatorsContainer: (styles) => ({
                                    //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                    //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //         }
                                    //     }),
                                    //     menu: (styles) => ({
                                    //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //     }),
                                    //     input: (styles) => ({
                                    //         ...styles,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                    //         fontFamily: 'Inter',
                                    //         fontStyle: 'normal',
                                    //         fontWeight: '400',
                                    //         fontSize: '14px'
                                    //     }),
                                    //     singleValue: (styles) => ({
                                    //         ...styles,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                    //         fontFamily: 'Inter',
                                    //         fontStyle: 'normal',
                                    //         fontWeight: '400',
                                    //         fontSize: '14px'
                                    //     }),
                                    //     option: (styles, { isSelected }) => ({
                                    //         ...styles, color: () => {
                                    //             if (isDarkTheme) {
                                    //                 return isSelected ? 'blue' : 'black'
                                    //             } else {
                                    //                 return isSelected ? 'black' : 'black'
                                    //             }
                                    //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                    //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                    //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                    //         }
                                    //     })
                                    // }}
                                    name='CountryResidency'
                                    id='CountryResidency'
                                    onChange={async (selectedValues) => {
                                        let event = { target: { name: 'CountryResidency', value: selectedValues } }
                                        formik.handleChange(event)
                                        handleFetchState(selectedValues?.value)
                                        setStateId(selectedValues?.value)

                                    }}
                                    onBlur={(selectedValues) => {
                                        let event = { target: { name: 'CountryResidency', value: selectedValues } }
                                        formik.handleBlur(event)
                                    }}

                                    value={formik.values.CountryResidency}
                                />
                                <small>
                                    {formik.errors.CountryResidency && formik.touched.CountryResidency && (
                                        <div className="input-feedback text-danger auth-error text-start">{String(formik.errors.CountryResidency?.value).replace('.value', '')}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="state">State<span className="text-danger"> *</span></InputLabel>
                                <Select options={stateList}
                                    placeholder='Select State'
                                    // styles={{
                                    //     control: (styles) => ({
                                    //         ...styles,
                                    //         // padding: '2px 0',
                                    //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                    //         border: '1px solid rgb(233, 234, 243)',
                                    //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                    //         borderRadius: '52px',
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //     }),
                                    //     indicatorSeparator: () => ({
                                    //         all: 'unset'
                                    //     }),
                                    //     indicatorsContainer: (styles) => ({
                                    //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                    //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //         }
                                    //     }),
                                    //     menu: (styles) => ({
                                    //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //     }),
                                    //     input: (styles) => ({
                                    //         ...styles,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                    //         fontFamily: 'Inter',
                                    //         fontStyle: 'normal',
                                    //         fontWeight: '400',
                                    //         fontSize: '14px'
                                    //     }),
                                    //     singleValue: (styles) => ({
                                    //         ...styles,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                    //         fontFamily: 'Inter',
                                    //         fontStyle: 'normal',
                                    //         fontWeight: '400',
                                    //         fontSize: '14px'
                                    //     }),
                                    //     option: (styles, { isSelected }) => ({
                                    //         ...styles, color: () => {
                                    //             if (isDarkTheme) {
                                    //                 return isSelected ? 'blue' : 'black'
                                    //             } else {
                                    //                 return isSelected ? 'black' : 'black'
                                    //             }
                                    //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                    //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                    //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                    //         }
                                    //     })
                                    // }}
                                    name='state'
                                    id='state'
                                    onChange={(selectedValues) => {
                                        let event = { target: { name: 'state', value: selectedValues } }
                                        formik.handleChange(event)
                                        handleFetchCity(formik.values.CountryResidency?.value, selectedValues?.value)
                                    }}
                                    onBlur={(selectedValues) => {
                                        let event = { target: { name: 'state', value: selectedValues } }
                                        formik.handleBlur(event)
                                    }}
                                    value={formik.values.state}
                                />
                                <small>
                                    {formik.errors.state && formik.touched.state && (
                                        <div className="input-feedback text-danger auth-error text-start">{String(formik.errors.state?.value).replace('.value', '')}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="city">City<span className="text-danger"> *</span></InputLabel>

                                <Select options={cityList}
                                    placeholder='Select City'
                                    // styles={{
                                    //     control: (styles) => ({
                                    //         ...styles,
                                    //         // padding: '2px 0',
                                    //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                    //         border: '1px solid rgb(233, 234, 243)',
                                    //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                    //         borderRadius: '52px',
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //     }),
                                    //     indicatorSeparator: () => ({
                                    //         all: 'unset'
                                    //     }),
                                    //     indicatorsContainer: (styles) => ({
                                    //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                    //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //         }
                                    //     }),
                                    //     menu: (styles) => ({
                                    //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    //     }),
                                    //     input: (styles) => ({
                                    //         ...styles,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                    //         fontFamily: 'Inter',
                                    //         fontStyle: 'normal',
                                    //         fontWeight: '400',
                                    //         fontSize: '14px'
                                    //     }),
                                    //     singleValue: (styles) => ({
                                    //         ...styles,
                                    //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                    //         fontFamily: 'Inter',
                                    //         fontStyle: 'normal',
                                    //         fontWeight: '400',
                                    //         fontSize: '14px'
                                    //     }),
                                    //     option: (styles, { isSelected }) => ({
                                    //         ...styles, color: () => {
                                    //             if (isDarkTheme) {
                                    //                 return isSelected ? 'blue' : 'black'
                                    //             } else {
                                    //                 return isSelected ? 'black' : 'black'
                                    //             }
                                    //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                    //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                    //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                    //         }
                                    //     })
                                    // }}
                                    name='city'
                                    id='city'
                                    onChange={(selectedValues) => {
                                        let event = { target: { name: 'city', value: selectedValues } }
                                        formik.handleChange(event)
                                    }}
                                    onBlur={(selectedValues) => {
                                        let event = { target: { name: 'city', value: selectedValues } }
                                        formik.handleBlur(event)
                                    }}
                                    value={formik.values.city}
                                />

                                <small>
                                    {formik.errors.city && formik.touched.city && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.city?.value}</div>
                                    )}
                                </small>
                                {/* <Select options={option4}
                                placeholder='Select State'
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        padding: '2px 0',
                                        background: isDarkTheme ? darkTheme.body : lightTheme.background,
                                        borderRadius: '40px',
                                        boxShadow: 'none',
                                        border: `1px solid ${isDarkTheme ? darkTheme.text : lightTheme.text}`, "&:hover": {
                                            border: `1px solid ${isDarkTheme ? darkTheme.text : lightTheme.text}`
                                        },
                                        color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    }),
                                    indicatorSeparator: () => ({
                                        all: 'unset'
                                    }),
                                    indicatorsContainer: (styles) => ({
                                        ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                            color: isDarkTheme ? darkTheme.text : lightTheme.text
                                        }
                                    }),
                                    menu: (styles) => ({
                                        ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.background,
                                        color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    }),
                                    input: (styles) => ({
                                        ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    }),
                                    singleValue: (styles) => ({
                                        ...styles,
                                        color: isDarkTheme ? darkTheme.text : lightTheme.text
                                    }),
                                    option: (styles, { isSelected }) => ({
                                    ...styles, color: () => {
                                        if (isDarkTheme) {
                                            return isSelected ? 'blue' : 'black'
                                        } else {
                                            return isSelected ? 'black' : 'black'
                                        }
                                    }, background: isDarkTheme ? darkTheme.body : lightTheme.background, ":hover": {
                                        background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                        color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                    }
                                })
                                }}
                                name='city'
                                id='city'
                                onChange={(selectedValues) => {
                                    let event = { target: { name: 'city', value: selectedValues } }
                                    formik.handleChange(event)
                                }}
                                onBlur={(selectedValues) => {
                                    let event = { target: { name: 'city', value: selectedValues } }
                                    formik.handleBlur(event)
                                }}
                                value={formik.values.city}
                            /> */}
                                {/* <small>
                                {formik.errors.city && formik.touched.city && (
                                    <div className="input-feedback text-danger auth-error text-start">{String(formik.errors.city?.value).replace('.value', '')}</div>
                                )}
                            </small> */}
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="zipCode">Zip Code<span className="text-danger"> *</span></InputLabel>

                                <Input
                                    placeholder='Enter Zip Code'
                                    type="text"
                                    name="zipCode"
                                    id='zipCode'
                                    value={formik.values.zipCode}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <small>
                                    {formik.errors.zipCode && formik.touched.zipCode && (
                                        <div className="input-feedback text-danger auth-error text-start">{formik.errors.zipCode}</div>
                                    )}
                                </small>
                            </div>
                            <div className='mt-3 d-flex flex-column'>
                                <InputLabel htmlFor="address">Address<span className="text-danger"> *</span></InputLabel>

                                <Input
                                    placeholder='Enter your Address'
                                    type="text"
                                    name="address"
                                    id='address'
                                    value={formik.values.address}
                                    className="px-3 py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <small>
                                {formik.errors.address && formik.touched.address && (
                                    <div className="input-feedback text-danger auth-error text-start">{formik.errors.address}</div>
                                )}
                            </small>
                        </div>
                        <div>
                            <Button disabled={loading} className="my-3 py-2 d-flex justify-content-center align-items-center" type="submit">
                                {
                                    loading ?
                                        <Oval
                                            height={14}
                                            width={14}

                                        /> : isBankEdit ? 'Update' : 'Submit'
                                }
                            </Button>
                        </div>
                    </form>
                    :
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
                        <div className='col-md-12'>
                            <InputLabel htmlFor='accountType'>Account Type<span className="text-danger"> *</span></InputLabel>
                            <Select options={option1}
                                // styles={{
                                //     control: (styles) => ({
                                //         ...styles,
                                //         // padding: '2px 0',
                                //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         border: '1px solid rgb(233, 234, 243)',
                                //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                //         borderRadius: '52px',
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     indicatorSeparator: () => ({
                                //         all: 'unset'
                                //     }),
                                //     indicatorsContainer: (styles) => ({
                                //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //         }
                                //     }),
                                //     menu: (styles) => ({
                                //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     input: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     singleValue: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     option: (styles, { isSelected }) => ({
                                //         ...styles, color: () => {
                                //             if (isDarkTheme) {
                                //                 return isSelected ? 'blue' : 'black'
                                //             } else {
                                //                 return isSelected ? 'black' : 'black'
                                //             }
                                //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                //         }
                                //     })
                                // }}
                                name='accountType'
                                id='accountType'
                                onChange={(selectedValues) => {
                                    let event = { target: { name: 'accountType', value: selectedValues } }
                                    formik.handleChange(event)
                                }}
                                onBlur={(selectedValues) => {
                                    let event = { target: { name: 'accountType', value: selectedValues } }
                                    formik.handleBlur(event)
                                }}
                                value={formik.values.accountType}
                            />
                            <small>
                                {formik.errors.accountType && formik.touched.accountType && (
                                    <div className="input-feedback text-danger auth-error text-start">{String(formik.errors.accountType?.value).replace('.value', '')}</div>
                                )}
                            </small>
                        </div>
                        <div className='col-md-12'>
                            <InputLabel htmlFor='Bankcountry'>Bank Account Country<span className="text-danger"> *</span></InputLabel>
                            <Select options={countryOptions}
                                filterOption={customFilterForCountry}
                                // styles={{
                                //     control: (styles) => ({
                                //         ...styles,
                                //         // padding: '2px 0',
                                //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         border: '1px solid rgb(233, 234, 243)',
                                //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                //         borderRadius: '52px',
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     indicatorSeparator: () => ({
                                //         all: 'unset'
                                //     }),
                                //     indicatorsContainer: (styles) => ({
                                //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //         }
                                //     }),
                                //     menu: (styles) => ({
                                //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     input: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     singleValue: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     option: (styles, { isSelected }) => ({
                                //         ...styles, color: () => {
                                //             if (isDarkTheme) {
                                //                 return isSelected ? 'blue' : 'black'
                                //             } else {
                                //                 return isSelected ? 'black' : 'black'
                                //             }
                                //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                //         }
                                //     })
                                // }}
                                name='Bankcountry'
                                id='Bankcountry'
                                onChange={(selectedValues) => {
                                    let event = { target: { name: 'Bankcountry', value: selectedValues } }
                                    formik.handleChange(event)
                                }}
                                onBlur={(selectedValues) => {
                                    let event = { target: { name: 'Bankcountry', value: selectedValues } }
                                    formik.handleBlur(event)
                                }}
                                value={formik.values.Bankcountry}
                            />
                            <small>
                                {formik.errors.Bankcountry && formik.touched.Bankcountry && (
                                    <div className="input-feedback text-danger auth-error text-start">{String(formik.errors.Bankcountry?.value).replace('.value', '')}</div>
                                )}
                            </small>
                        </div>
                        <div className='col-md-12'>
                            <InputLabel htmlFor='currency'>Currency<span className="text-danger"> *</span></InputLabel>
                            <Select options={fiatCurrencyOptions}
                                filterOption={customFilterForFiat}
                                // styles={{
                                //     control: (styles) => ({
                                //         ...styles,
                                //         // padding: '2px 0',
                                //         background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         border: '1px solid rgb(233, 234, 243)',
                                //         boxShadow: '0px 2px 12px rgba(11, 22, 44, 0.05)',
                                //         borderRadius: '52px',
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     indicatorSeparator: () => ({
                                //         all: 'unset'
                                //     }),
                                //     indicatorsContainer: (styles) => ({
                                //         ...styles, color: isDarkTheme ? darkTheme.text : lightTheme.text, 'div:nth-child(2)': {
                                //             color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //         }
                                //     }),
                                //     menu: (styles) => ({
                                //         ...styles, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text
                                //     }),
                                //     input: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     singleValue: (styles) => ({
                                //         ...styles,
                                //         color: isDarkTheme ? darkTheme.text : lightTheme.text,
                                //         fontFamily: 'Inter',
                                //         fontStyle: 'normal',
                                //         fontWeight: '400',
                                //         fontSize: '14px'
                                //     }),
                                //     option: (styles, { isSelected }) => ({
                                //         ...styles, color: () => {
                                //             if (isDarkTheme) {
                                //                 return isSelected ? 'blue' : 'black'
                                //             } else {
                                //                 return isSelected ? 'black' : 'black'
                                //             }
                                //         }, background: isDarkTheme ? darkTheme.body : lightTheme.inputBG, ":hover": {
                                //             background: isDarkTheme ? darkTheme.heading : lightTheme.heading,
                                //             color: !isDarkTheme ? darkTheme.font : lightTheme.font
                                //         }
                                //     })
                                // }}
                                name='currency'
                                id='currency'
                                onChange={(selectedValues) => {
                                    let event = { target: { name: 'currency', value: selectedValues } }
                                    formik.handleChange(event)
                                }}
                                onBlur={(selectedValues) => {
                                    let event = { target: { name: 'currency', value: selectedValues } }
                                    formik.handleBlur(event)
                                }}
                                value={formik.values.currency}
                            />
                            <small>
                                {formik.errors.currency && formik.touched.currency && (
                                    <div className="input-feedback text-danger auth-error text-start">{String(formik.errors.currency?.value).replace('.value', '')}</div>
                                )}
                            </small>
                            {/* formik.errors.accountType || formik.errors.Bankcountry || formik.errors.currency */}

                        </div>
                        <div>
                            <Button disabled={loading} type='button' className="my-3 py-2" onClick={handleNext}>Next</Button>
                        </div>
                    </form>
            }
        </>
    );
}