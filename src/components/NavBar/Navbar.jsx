import React, { useEffect, useState } from "react";
import { useNavigate, redirect, Link } from "react-router-dom";
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import logo from "../../images/logo.png";
import "./Navbar.css";
import useAuth from "../../Hooks/useAuth";
import { Button, Dropdown, Menu } from "antd";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
function Navbar() {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  useEffect(() => {
    // console.log(isLogin);
  }, []);
  function redirectsellerpage() {
    navigate("/start-selling");
  }

  // <nav className="navbar navbar-expand-lg bg-body-tertiary">
  //   <div className="container-fluid">
  //     <a className="navbar-brand" href="/">
  //       <img src={logo} alt="logo" />
  //     </a>
  //     <button
  //       className="navbar-toggler"
  //       type="button"
  //       data-bs-toggle="collapse"
  //       data-bs-target="#navbarNav"
  //       aria-controls="navbarNav"
  //       aria-expanded="false"
  //       aria-label="Toggle navigation"
  //     >
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse nav-items" id="navbarNav">
  //       <ul className="navbar-nav">
  //         {/* <li className="nav-item">
  //             <a className="nav-link" aria-current="page" href="#">
  //               Financing on PersonalMoto
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link" href="#">
  //               MotorPedia
  //             </a>
  //           </li> */}
  //         <li className="nav-item">
  //           <a className="nav-link" href="/watched-page-ads">
  //             Watched
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a className="nav-link" href="/logout">
  //             <BiLogOut />
  //             Logout
  //           </a>
  //         </li>
  //         <li className="nav-item">
  //           <a className="nav-link" href="/login">
  //             <BiSolidUser /> Log in | Register
  //           </a>
  //         </li>
  //         <li className="nav-item dropdown">
  //           <a
  //             className="nav-link dropdown-toggle"
  //             href="#"
  //             id="navbarDropdown"
  //             role="button"
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             <BiSolidUser /> My account
  //           </a>
  //           <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
  //             {/* <h5>My PersonalMoto</h5> */}
  //             <li className="dropdown-menu-item">
  //               <a className="dropdown-item" href="/myaccount-statistics">
  //                 Statistics
  //               </a>
  //             </li>
  //             <li className="dropdown-menu-item">
  //               <a className="dropdown-item" href="/myaccount-advertisements">
  //                 Advertisements
  //               </a>
  //             </li>
  //             <li className="dropdown-menu-item">
  //               <a className="dropdown-item" href="/myaccount-news/selling">
  //                 The News
  //               </a>
  //             </li>
  //             <li className="dropdown-menu-item">
  //               <a
  //                 className="dropdown-item"
  //                 href="/myaccount-payments/wallet"
  //               >
  //                 Payments
  //               </a>
  //             </li>
  //             <li className="dropdown-menu-item">
  //               <a
  //                 className="dropdown-item"
  //                 href="/myaccount-settings/settings"
  //               >
  //                 Settings
  //               </a>
  //             </li>
  //           </ul>
  //         </li>
  //         <li className="nav-item">
  //           <button
  //             type="button"
  //             className="btn btn-primary"
  //             onClick={redirectsellerpage}
  //           >
  //             <AiOutlinePlus /> Start Selling
  //           </button>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </nav>
  // <nav className="navbar navbar-expand-lg bg-body-tertiary">
  //   <div className="container-fluid">
  //     <a className="navbar-brand" href="/">
  //       <img src={logo} alt="logo" />
  //     </a>
  //     <button
  //       className="navbar-toggler"
  //       type="button"
  //       data-bs-toggle="collapse"
  //       data-bs-target="#navbarNav"
  //       aria-controls="navbarNav"
  //       aria-expanded="false"
  //       aria-label="Toggle navigation"
  //     >
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse nav-items" id="navbarNav">
  //       <ul className="navbar-nav">
  //         <li className="nav-item">
  //           <a className="nav-link" href="/watched-page-ads">
  //             Watched
  //           </a>
  //         </li>
  //         <>
  //           <li className="nav-item">
  //             <a className="nav-link" href="/logout">
  //               <BiLogOut />
  //               Logout
  //             </a>
  //           </li>
  // <li className="nav-item dropdown">
  //   <a
  //     className="nav-link dropdown-toggle"
  //     href="#"
  //     id="navbarDropdown"
  //     role="button"
  //     data-bs-toggle="dropdown"
  //     aria-expanded="false"
  //   >
  //     <BiSolidUser /> My account
  //   </a>
  //   <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
  //     <li className="dropdown-menu-item">
  //       <a className="dropdown-item" href="/myaccount-statistics">
  //         Statistics
  //       </a>
  //     </li>
  //     <li className="dropdown-menu-item">
  //       <a
  //         className="dropdown-item"
  //         href="/myaccount-advertisements"
  //       >
  //         Advertisements
  //       </a>
  //     </li>
  //     <li className="dropdown-menu-item">
  //       <a className="dropdown-item" href="/myaccount-news/selling">
  //         The News
  //       </a>
  //     </li>
  //     <li className="dropdown-menu-item">
  //       <a
  //         className="dropdown-item"
  //         href="/myaccount-payments/wallet"
  //       >
  //         Payments
  //       </a>
  //     </li>
  //     <li className="dropdown-menu-item">
  //       <a
  //         className="dropdown-item"
  //         href="/myaccount-settings/settings"
  //       >
  //         Settings
  //       </a>
  //     </li>
  //   </ul>
  // </li>
  //         </>

  //         <li className="nav-item">
  //           <a className="nav-link" href="/login">
  //             <BiSolidUser /> Log in | Register
  //           </a>
  //         </li>

  //         <li className="nav-item">
  //           <button
  //             type="button"
  //             className="btn btn-primary"
  //             onClick={redirectsellerpage}
  //           >
  //             <AiOutlinePlus /> Start Selling
  //           </button>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </nav>

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse nav-items" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/watched-page-ads">
                Watched
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                <BiLogOut />
                Logout
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BiSolidUser /> My account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li className="dropdown-menu-item">
                  <a className="dropdown-item" href="/myaccount-statistics">
                    Statistics
                  </a>
                </li>
                <li className="dropdown-menu-item">
                  <a
                    className="dropdown-item"
                    href="/myaccount-advertisements/active"
                  >
                    Advertisements
                  </a>
                </li>
                <li className="dropdown-menu-item">
                  <a className="dropdown-item" href="/myaccount-news/selling">
                    The News
                  </a>
                </li>
                <li className="dropdown-menu-item">
                  <a
                    className="dropdown-item"
                    href="/myaccount-payments/wallet"
                  >
                    Payments
                  </a>
                </li>
                <li className="dropdown-menu-item">
                  <a
                    className="dropdown-item"
                    href="/myaccount-settings/settings"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <BiSolidUser /> Log in | Register
              </a>
            </li>
            <li className="nav-item">
              <Button type="primary" onClick={redirectsellerpage}>
                <AiOutlinePlus /> Start Selling
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
