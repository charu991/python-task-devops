import React, { useState } from 'react'
import { CardContainer, ChangeButton, Input, InputLabel, ProfileHeading } from './StyledComponents.js'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URLs } from '../../utils/ApiUrls';
import { toast } from 'react-toastify';
import SubmitLoader from '../../component/Loader/SubmitLoader.jsx';
import styled from 'styled-components';
const Error = styled.div` 
font-size: 13px;
padding: 0px 5px;
font-weight: 400;
`
export default function ChangePassword() {

    const [oldPasswordTypeText, setOldPasswordTypeText] = useState(false);
    const [newPasswordTypeText, setNewPasswordTypeText] = useState(false);
    const [reEnterNewPasswordTypeText, setReEnterNewPasswordTypeText] = useState(false);

    const [loader, setLoader] = useState(false);

    const toggleOldPasswordType = () => {
        setOldPasswordTypeText(!oldPasswordTypeText)
    }

    const toggleNewPasswordType = () => {
        setNewPasswordTypeText(!newPasswordTypeText)
    }

    const toggleReEnterNewPasswordType = () => {
        setReEnterNewPasswordTypeText(!reEnterNewPasswordTypeText)
    }

    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '', reNewPassword: '' },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .min(8).required("Old Password is Required")
                .matches(/[A-Z]/, 'atleast 1 uppercase letter required')
                .matches(/[a-z]/, 'atleast 1 lowercase letter required')
                .matches(/[1-9]/, 'atleast 1 number required')
                .matches(/[!@#$%^&*]/, 'atleast 1 special character required'),

            newPassword: Yup.string().required('New Password is Required')
                .min(8, "Password must be minimum 8 characters").max(16)
                .matches(/[A-Z]/, 'atleast 1 uppercase letter required')
                .matches(/[a-z]/, 'atleast 1 lowercase letter required')
                .matches(/[1-9]/, 'atleast 1 number required')
                .matches(/[!@#$%^&*]/, 'atleast 1 special character required'),
            reNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Confirm password should be same as New  password').required('Confirm Password is Required')
        }),
        onSubmit: values => {
            // console.log('submtted', values);
            setLoader(true)
            axios.patch(API_URLs.changePassword, {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                cnewPassword: values.reNewPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
                    'accept': 'application/json'
                }
            })
                .then((res) => {
                    setLoader(false)
                    console.log(res);
                    toast.success('Password Changed Successfully!!')
                    formik.resetForm()
                })
                .catch((error) => {
                    setLoader(false)
                    console.log(error);
                    toast.error(error?.response?.data?.message ? error?.response?.data?.message : 'Some Error Occured')
                })
        }
    })

    return (
        <div className=''>
            <CardContainer className='p-4 col-md-6'>

                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-3 mt-3'>
                    <div className='d-flex flex-column gap-1'>
                        <InputLabel htmlFor='oldPassword'>Old Password</InputLabel>
                        <div className='d-flex w-100 '>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.oldPassword}
                                type={oldPasswordTypeText ? 'text' : 'password'}
                                placeholder='Enter Your Old Password Here'
                                className='px-3 py-2 w-100'
                                name='oldPassword'
                            />
                            <div className='d-flex align-items-center'>
                                {
                                    oldPasswordTypeText ?
                                        <FaEye role='button' onClick={toggleOldPasswordType} style={{ marginLeft: '-30px' }} className='position-absolute' /> :
                                        <FaEyeSlash role='button' onClick={toggleOldPasswordType} style={{ marginLeft: '-30px' }} className='position-absolute' />
                                }
                            </div>
                        </div>

                        {formik.touched.oldPassword && formik.errors.oldPassword ? (
                            <Error className='text-danger'>{formik.errors.oldPassword}</Error>
                        ) : null}
                    </div>

                    <div className='d-flex flex-column gap-1'>
                        <InputLabel htmlFor='newPassword'>New Password</InputLabel>
                        <div className='d-flex w-100'>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                                type={newPasswordTypeText ? 'text' : 'password'}
                                placeholder='Enter Your New Password Here'
                                className='px-3 py-2 w-100'
                                name='newPassword'
                            />
                            <div className='d-flex align-items-center'>
                                {
                                    newPasswordTypeText ?
                                        <FaEye role='button' onClick={toggleNewPasswordType} style={{ marginLeft: '-30px' }} className='position-absolute' /> :
                                        <FaEyeSlash role='button' onClick={toggleNewPasswordType} style={{ marginLeft: '-30px' }} className='position-absolute' />
                                }
                            </div>
                        </div>
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <Error className='text-danger'>{formik.errors.newPassword}</Error>
                        ) : null}
                    </div>

                    <div className='d-flex flex-column gap-1'>
                        <InputLabel htmlFor='reNewPassword'>Re Enter New Password</InputLabel>
                        <div className='d-flex w-100'>
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.reNewPassword}
                                type={reEnterNewPasswordTypeText ? 'text' : 'password'}
                                placeholder='Re Enter Your New Password Here'
                                className='px-3 py-2 w-100'
                                name='reNewPassword'
                            />
                            <div className='d-flex align-items-center'>
                                {
                                    reEnterNewPasswordTypeText ?
                                        <FaEye role='button' onClick={toggleReEnterNewPasswordType} style={{ marginLeft: '-30px' }} className='position-absolute' /> :
                                        <FaEyeSlash role='button' onClick={toggleReEnterNewPasswordType} style={{ marginLeft: '-30px' }} className='position-absolute' />
                                }
                            </div>
                        </div>

                        {formik.touched.reNewPassword && formik.errors.reNewPassword ? (
                            <Error className='text-danger'>{formik.errors.reNewPassword}</Error>
                        ) : null}
                    </div>

                    <div>
                        <ChangeButton disabled={loader} type='submit' className='py-2 mt-3'>
                            {
                                loader ? <SubmitLoader /> : 'Submit'
                            }
                        </ChangeButton>
                    </div>
                </form>


            </CardContainer>
        </div>
    )
}
