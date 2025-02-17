import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Topbar from "../components/Topbar"; 
import Dashboard from '../img/dashininaactive.png';
import Dashboardact from '../img/Dashboard.png';
import { useLocation } from "react-router-dom";
import Students from '../img/Accountinactie.png';
import Studentsact from '../img/Studentsactive.png';
import Transaction from '../img/Transactioninactive.png';
import Transactionact from '../img/Transactionactive.png';
import AccountView from '../img/Accountinactie.png';
import AccountViewact from '../img/Accountactive.png';
import Reports from '../img/Reportsinactive.png';
import Reportsact from '../img/Reports.png';
import AccountMasteract from '../img/Masteractive.png';
import AccountMaster from '../img/Masterinactive.png';
import UserAccessact from '../img/UserAccessactive.png';
import UserAccess from '../img/UserAccess.png';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0); // Default to Dashboard
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  
  const location = useLocation();

  const menuItem = [
    { path: "/Dashboard", name: "Dashboard", img: [Dashboard, Dashboardact] },
    { path: "/Students", name: "Students", img: [Students, Studentsact] },
    { 
      path: "/OpeningBalance", 
      name: "Transaction", 
      img: [Transaction, Transactionact], 
      subMenu: [
        { path: "/OpeningBalance", name: "Opening Balance" },
        { path: "/JournalEntry", name: "Journal Entry" },
        { path: "/VoucherNumberForm", name: "Voucher Number Form" },
      ]
    },
    { path: "/AccountView", name: "Account View", img: [AccountView, AccountViewact] },
    { path: "/Reports", name: "Reports", img: [Reports, Reportsact] },
    { path: "/AccountMaster", name: "Account Master", img: [AccountMaster, AccountMasteract] },
    { path: "/UserAccess", name: "User Access", img: [UserAccess, UserAccessact] },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const index = menuItem.findIndex(item => item.path === currentPath);
    
    // If the current path is found, set activeItemIndex; otherwise, set it to 0 (Dashboard)
    setActiveItemIndex(index !== -1 ? index : 0);
  }, [location.pathname]); // Run this effect whenever the path changes

  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const getNavLinkClass = (path, index) => {
    return index === activeItemIndex ? "active" : "";
  };

  return (
    <>
      <Topbar toggle={toggle} isOpen={isOpen} />
      <div className="section d-flex" style={{ fontFamily: "Roboto, sans-serif" }}>
        <div style={{ width: isOpen ? "300px" : "70px" }} className="sidebar mt-3">
          {menuItem.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.path}
                className={`linkss ${getNavLinkClass(item.path, index)}`}
                onClick={() => {
                  if (item.subMenu) toggleDropdown(index);
                  setActiveItemIndex(index);
                }}
                onMouseEnter={() => setHoveredItemIndex(index)}
                onMouseLeave={() => setHoveredItemIndex(null)}
              >
                <div className="icon mt-1 mb-1">
                  <img src={activeItemIndex === index || hoveredItemIndex === index ? item.img[1] : item.img[0]} alt={item.name} className="imgs" />
                </div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text mt-1 mb-1">
                  {item.name}
                </div>
                {item.subMenu && (
                  <div className="dropdown-icon" style={{ marginLeft: "auto" }}>
                    {dropdownOpen === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                )}
              </NavLink>
              {item.subMenu && dropdownOpen === index && (
                <div className="subMenu" style={{ display: isOpen ? "block" : "none", marginLeft: "20px" }}>
                  {item.subMenu.map((subItem, subIndex) => (
                    <NavLink to={subItem.path} key={subIndex} className="linkss2 sub-link">
                      <div className="link_text mt-1 mb-1">
                        <GoDotFill className="imgs" /> {subItem.name}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="link d-flex" style={{ marginTop: "10%" }}>
            <div className="icon"><FaSignOutAlt /></div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text d-flex">Logout</div>
          </div>
        </div>
        <main className="content">{children}</main>
      </div>
    </>
  );
};

const withSideBarLayout = (component) => {
  return <Sidebar>{component}</Sidebar>;
};

export default withSideBarLayout;
