import React, { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { HiMenuAlt2 } from "react-icons/hi";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiLogOutCircle } from "react-icons/bi";
import SettingsIcon from '../../assets/SettingsIcon';
import ProfileLogoWhiteCopy from '../../assets/profile-logo-white copy';
import { useProSidebar } from "react-pro-sidebar";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import "./NavbarMenu.css";
import { useAuthContextHook } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URLs } from "../../utils/ApiUrls";
const Span = styled.span`
    
`
const NavbarMenu = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const { loadingOtpHandle, loadinghandle, user } = useAuthContextHook();

  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const [screenWidth, setScreenWidth] = useState();

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  // console.log(user);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    axios.get(API_URLs.getProfile, {
      headers: {
        "accept": 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
      .then((res) => {
        // console.log('oihfdfdfdboht ltoipre r', res);
        setName(res.data.profile.email)
      })
      .catch((error) => {
        // console.log(error);
      })
  }, [])
  // console.log('oihfdfdfdboht ltoipre r',name);

  const handleLogout = () => {
    loadingOtpHandle(false);
    loadinghandle(false);
    localStorage.clear();
    toast.success('Logout Successfully!!', {
      position: toast.POSITION.TOP_CENTER
    })
    navigate("/login");
  };

  return (
    <Navbar className="navbar-style d-flex justify-content-between" collapseOnSelect expand="lg">
      {/* <Container> */}
      <HiMenuAlt2
        size="30"
        role="button"
        onClick={() => {
          if (screenWidth >= 1000) {
            collapseSidebar();
          } else {
            toggleSidebar();
          }
        }}
      />
      <NavDropdown
        className='pe-4'
        // align={`${direction === 'rtl' ? 'start' : 'end'}`}
        align={'end'}
        // style={{
        //     background: 'white',
        //     color: isDarkTheme ? darkTheme.text : lightTheme.text
        // }}
        title={
          <>
            <Span>{name}</Span>
            <span className='ps-2'>
              <ProfileLogoWhiteCopy fill={'black'} />
            </span>
          </>
        } id="collasible-nav-dropdown-4">
        <NavDropdown.Item as={Link} to="/settings" className='p-2 d-flex align-items-center gap-2 justify-content-start'>
          <SettingsIcon fill={'black'} />
          <span className='Link'>Setting</span>
        </NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}
          className='p-2 d-flex align-items-center gap-2 justify-content-start'>
          <BiLogOutCircle />
          <span className='Link' >Logout</span>
        </NavDropdown.Item>
      </NavDropdown>
      {/* </Container> */}
    </Navbar>
  );
};

export default NavbarMenu;
