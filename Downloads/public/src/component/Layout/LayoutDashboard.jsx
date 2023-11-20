import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../Navbar/NavbarMenu";
import SidebarMenu from "../Sidebar/SidebarMenu";
import "./Layout.css";

const LayoutDashboard = () => {
  const containerStyle = {
    minHeight: `100vh`,
    // backgroundColor: "",
  };

  return (
    <>
      <div className="d-flex">
        <div>
          <SidebarMenu />
        </div>

        <div className="d-flex flex-column flex-grow-1">
          <div>
            <NavbarMenu />
          </div>
          <div className="mobile-outlet" style={containerStyle}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
