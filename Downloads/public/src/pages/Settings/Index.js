import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Password from './Password'
import AdminBank from './AdminBank';
import './Setting.css'
import { HiOutlineKey } from 'react-icons/hi'
import styled from 'styled-components';
const P = styled.p`
font-size: 25px;
font-weight: 700;
margin-bottom: 3px;
`
export default function Index() {
    const navigate = useNavigate();
    const location = useLocation();
    const isTabSelected = location.hash.includes('changepassword') || location.hash.includes('adminbank')
    return (
        <div className='p-3'>
            <P>Settings</P>
            <div>
                <ul className="nav nav-tabs myoffer-tabs gap-3 border-0" id="myTab" role="tablist">
                    <div className="nav-item text-decoration-none d-flex " role="presentation">
                        <button
                            className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('changepassword') ? 'active' : '' : 'active'}`}
                            id="changepassword-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#changepassword"
                            type="button"
                            role="tab"
                            aria-controls="changepassword"
                            onClick={() => navigate('#changepassword')}
                            aria-selected="true">
                            <HiOutlineKey />
                            Change Password
                        </button>
                        {/* <button
                            className={`nav-link gap-1 ${isTabSelected ? location.hash.includes('adminbank') ? 'active' : '' : ''}`}
                            id="adminbank-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#adminbank"
                            type="button"
                            role="tab"
                            aria-controls="adminbank"
                            onClick={() => navigate('#adminbank')}
                            aria-selected="true">
                            <HiOutlineKey />
                            Admin Bank
                        </button> */}
                    </div>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <div
                    className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('changepassword') ? 'show active' : '' : 'show active'}`}
                    id="changepassword"
                    role="tabpanel"
                    aria-labelledby="changepassword-tab">
                    <Password />
                </div>
                <div
                    className={`tab-pane fade py-3 px-2 ${isTabSelected ? location.hash.includes('adminbank') ? 'show active' : '' : ''}`}
                    id="adminbank"
                    role="tabpanel"
                    aria-labelledby="adminbank-tab">
                    <AdminBank />
                </div>
            </div>
        </div>
    );
}