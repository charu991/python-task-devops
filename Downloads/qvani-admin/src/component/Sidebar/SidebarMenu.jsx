import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Q_Logo.svg";
import "./SidebarMenu.modules.css";
import { AiOutlineUser, AiOutlineTransaction } from 'react-icons/ai'
import { BiWallet, BiBlock, BiMoneyWithdraw, BiGroup, BiGridAlt } from 'react-icons/bi'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'
import { MdOutlineReportProblem, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { TbDiscountCheck } from 'react-icons/tb'
import { RiFeedbackLine } from 'react-icons/ri'
import { LuShare } from 'react-icons/lu'
import { GoVerified, GoGraph } from 'react-icons/go'

const SidebarMenu = () => {
  return (
    <div style={{ display: "flex", height: "100%", zIndex: 10 }}>
      <Sidebar breakPoint="md">
        <Menu>
          <MenuItem
            className="py-3"
            component={<Link to="/dashboard" />}
            icon={<img src={logo} alt="LOGO" />} >
            <h2 className="fw-bold mb-0">VANI</h2>
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/dashboard" />
            }
            icon={<BiGridAlt size={25} />}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/usermanagement" />
            }
            icon={<AiOutlineUser size={25} />}>  User</MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/walletmanagement" />
            }
            icon={<BiWallet size={25} />}
          >
            Wallet
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/transactionmanagement" />
            }
            icon={<AiOutlineTransaction size={25} />}
          >
            Transaction
          </MenuItem>

          <MenuItem
            component={<NavLink activeclassname="active" to="/kycmanagement" />}
            icon={<GoVerified size={25} />}
          >
            KYC
          </MenuItem>

          <MenuItem
            component={<NavLink activeclassname="active" to="/feemanagement" />}
            icon={<FaRegMoneyBillAlt size={25} />}
          >
            Fee Management
          </MenuItem>

          {/* <MenuItem
            component={
              <NavLink activeclassname="active" to="/trademanagement" />
            }
            icon={<GoGraph size={25} />}
          >
            Trade
          </MenuItem> */}
          <MenuItem
            component={
              <NavLink activeclassname="active" to="/withdrawalmanagement" />
            }
            icon={<BiMoneyWithdraw size={25} />}
          >
            Withdrawal
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/disputemanagement" />
            }
            icon={<MdOutlineReportProblem size={25} />}
          >
            Dispute
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/rolemanagement" />
            }
            icon={<BiGroup size={25} />}
          >
            Role
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/referralmanagement" />
            }
            icon={<LuShare size={25} />}
          >
            Referral
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/activetrademanagement" />
            }
            icon={<TbDiscountCheck size={25} />}
          >
            Active Trades
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/currencymanagement" />
            }
            icon={<GrMoney size={25} />}
          >
            Currency
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/countrymanagement" />
            }
            icon={<GiEarthAfricaEurope size={25} />}
          >
            Country
          </MenuItem>

          <MenuItem
            component={
              <NavLink activeclassname="active" to="/blacklistmanagement" />
            }
            icon={<BiBlock size={25} />}
          >
            BlackList
          </MenuItem>

          <MenuItem
            component={<NavLink activeclassname="active" to="/feedbackmanagement" />}
            icon={<RiFeedbackLine size={25} />}
          >
            Feedback
          </MenuItem>
          <MenuItem
            component={<NavLink activeclassname="active" to="/limits" />}
            icon={<MdOutlineProductionQuantityLimits size={25} />}
          >
            Limits
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
