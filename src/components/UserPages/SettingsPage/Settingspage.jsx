import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "../StatisticsPage/Statisticspage.css";
import "./Settingspage.css";
import Navbar from "../../NavBar/Navbar";
import Createaccountbanner from "../../CreateAccountBanner/Createaccountbanner";
import Homefooter from "../../HomeFooter/Homefooter";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsDatabaseFillLock } from "react-icons/bs";
import { RiBillFill } from "react-icons/ri";
import Searchformlistitem from "../../SearchForm/Searchformlistitem";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

import toast from "react-hot-toast";
function Settingspage() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const settingsId = useParams();
  const [isMatch, setIsMatch] = useState(true);
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [updateContact, setUpdateContact] = useState({
    country: "",
    postalCode: "",
    town: "",
    telephone: "",
  });
  const [userData, setUserData] = useState({
    points: 0,
    userData: {},
  });
  useEffect(() => {
    userAuthenticate();
  }, []);
  const userAuthenticate = async () => {
    try {
      const response = await axiosPrivate.get("/pages/myaccount-settings", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": "true",
          // "Access-Control-Expose-Headers": "Authorization",
        },
        withCredentials: true,
      });

      const data = response.data;
      setUserData({ points: data.points.toFixed(2), userData: data.userData });
      // console.log(data);
      if (response.status === 401) {
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };
  const [dropdown, setdropdown] = useState(0);
  const path = useLocation();

  const [category, setCategory] = useState("");
  function handletopupdropdown() {
    setdropdown(!dropdown);
  }

  const handlePasswordChange = (prop) => (e) => {
    let value = e.target.value;
    setUpdatePassword({ ...updatePassword, [prop]: value });
  };

  const handlePasswordMatch = () => {
    if (updatePassword.confirmNewPassword !== updatePassword.newPassword) {
      setIsMatch(false);
      return false;
    } else {
      setIsMatch(true);
      return true;
    }
    // return isMatch;
  };

  const handlePasswordForm = async (e) => {
    e.preventDefault();
    const Match = await handlePasswordMatch();
    // console.log(isMatch);
    if (Match) {
      // console.log("match");
      try {
        const response = await axiosPrivate.post(
          "/update/updatepassword",
          updatePassword,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Credentials": "true",
            },
            withCredentials: true,
          }
        );

        // const data = await response.data;

        if (response.status === 201) {
          // console.log("Password updated");
          // console.log(data);
          toast.success("Password is Updated Successfully");
          setTimeout(() => {
            window.location.reload(false);
          }, 2000);
          // } else if (response.status === 400) {
          //   console.log("Invalid Password");
          //   toast.error("Invalid Password");
          // } else if (response.status === 401) {
          //   console.log("Unauthorized Access");
          //   toast.error("Unauthorized Access");
          // } else if (response.status === 500) {
          //   console.log("Server Error Occurred");
          //   toast.error("Server Error Occurred");
          // }
        }
      } catch (error) {
        // console.error(error);
        // Handle unexpected errors
        toast.error("Invalid Old Password or User not found");
      }
    } else {
      toast.error("Password doesn't match");
    }
  };

  const handleContactChange = (prop) => (e) => {
    const value = e.target.value;
    setUpdateContact({ ...updateContact, [prop]: value });
  };

  const handleContactForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        "/update/updatecontact",
        updateContact,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
        }
      );

      // const data = await response.data
      // console.log(response);
      if (response.status === 201) {
        toast.success("Contact Information updated successfully");
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error in updating contact info");
    }
    // console.log("submit form");
  };
  return (
    <div className="settings-page">
      <Navbar />
      <div className="user-pages-header-section">
        <div className="user-pages-header-box">
          <div className="user-pages-header">
            <h1>Account Settings</h1>
            <div className="user-wallet-topup">
              <div className="user-wallet-box">
                <div className="user-wallet">
                  <div className="user-wallet-funds-box">
                    <span className="user-wallet-funds">
                      Funds for Personalmoto: {userData.points} points
                    </span>
                  </div>
                  <div className="user-wallet-topup topup-dropdown">
                    <button
                      type="button"
                      className="wallet-topup-btn"
                      onClick={handletopupdropdown}
                    >
                      <span className="topup-btn-name">Top up</span>
                    </button>

                    <ul
                      className={
                        dropdown ? "wallet-topup-menu" : "topup-dropdown-menu"
                      }
                    >
                      <li className="topup-dropdown-label">
                        Top up Funds on Personalmoto
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 50 to 149 Points + 0% free
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 150 to 299 Points + 5% free
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 300 to 499 Points + 10% free
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 500 to 3000 Points + 15% free
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="user-pages-header-btns">
            <li className="col-md-2">
              <a
                href="/myaccount-statistics"
                className={
                  path.pathname === "/myaccount-statistics"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Statistics
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-advertisements"
                className={
                  path.pathname === "/myaccount-advertisements"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Advertisements
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-news/selling"
                className={
                  path.pathname === "/myaccount-news/selling/selling"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                The news
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-payments/wallet"
                className={
                  path.pathname === "/myaccount-payments/wallet"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Payments
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-settings/settings"
                className={
                  path.pathname === "/myaccount-settings/settings" ||
                  "/myaccount-settings/preferences"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="settings-catg-tab-box">
            <a
              href="/myaccount-settings/settings"
              className={
                path.pathname === "/myaccount-settings/settings"
                  ? "settings-catg-tab-show"
                  : "settings-catg-tab"
              }
            >
              Settings
            </a>
            <a
              href="/myaccount-settings/preferences"
              className={
                path.pathname === "/myaccount-settings/preferences"
                  ? "settings-catg-tab-show"
                  : "settings-catg-tab"
              }
            >
              Preferences
            </a>
          </div>
        </div>
      </div>

      <div
        className={
          settingsId.settingsId === "settings"
            ? "settings-catg-page-show"
            : "settings-catg-page"
        }
      >
        <div className="settings-content-box">
          <div className="settings-content-box-o">
            <div className="settings-content-box-i">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <BiSolidUserCircle />
                    <p className="accordion-header-text">
                      Change your contact details
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <form
                      id="changeContactForm"
                      className="user-update-form"
                      method="POST"
                      onSubmit={handleContactForm}
                    >
                      <input type="hidden" name="token" value="s"></input>
                      <div className="update-input-box">
                        <label className="update-input-label">Country:</label>
                        <input
                          className="update-input"
                          name="country"
                          onChange={handleContactChange("country")}
                          value={updateContact.country}
                          required
                        ></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          Postal Code:
                        </label>
                        <input
                          className="update-input"
                          name="postalCode"
                          onChange={handleContactChange("postalCode")}
                          value={updateContact.postalCode}
                          required
                        ></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">Town:</label>
                        <input
                          className="update-input"
                          name="town"
                          onChange={handleContactChange("town")}
                          value={updateContact.town}
                          required
                        ></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">Phone no:</label>
                        <input
                          className="update-input"
                          name="telephone"
                          onChange={handleContactChange("telephone")}
                          value={updateContact.telephone}
                          required
                        ></input>
                      </div>
                      <div className="update-form-btn-box">
                        <button className="update-form-btn" type="submit">
                          Save
                        </button>
                      </div>
                    </form>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <BsDatabaseFillLock />
                    <p className="accordion-header-text">
                      Create a new password
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <form
                      id="changePasswordForm"
                      className="user-update-form"
                      // method="POST"
                      onSubmit={handlePasswordForm}
                    >
                      <input type="hidden" name="token" value="s"></input>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          Old Password*
                        </label>
                        <input
                          className="update-input"
                          type="password"
                          required
                          name="oldPassword"
                          onChange={handlePasswordChange("oldPassword")}
                          value={updatePassword.oldPassword}
                        ></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          New Password*
                        </label>
                        <input
                          className="update-input"
                          required
                          type="password"
                          name="newPassword"
                          onChange={handlePasswordChange("newPassword")}
                          value={updatePassword.newPassword}
                        ></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          Confirm Password*
                        </label>
                        <input
                          className="update-input"
                          required
                          type="password"
                          name="confirmNewPassword"
                          onChange={handlePasswordChange("confirmNewPassword")}
                          value={updatePassword.confirmNewPassword}
                        ></input>
                        {isMatch ? (
                          <span></span>
                        ) : (
                          <span className="update-error">
                            Password doesn't Match
                          </span>
                        )}
                      </div>

                      <div className="update-form-btn-box">
                        <button className="update-form-btn" type="submit">
                          Change Password
                        </button>
                      </div>
                    </form>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <RiBillFill />
                    <p className="accordion-header-text">
                      Update your billing information
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <form id="changeBillingForm" className="user-update-form">
                      <input type="hidden" name="token" value="s"></input>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          Company name:
                        </label>
                        <input className="update-input"></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">Address:</label>
                        <input className="update-input"></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          Postal Code:
                        </label>
                        <input className="update-input"></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          City or Town:
                        </label>
                        <input className="update-input"></input>
                      </div>
                      <div className="update-input-box">
                        <label className="update-input-label">
                          Number nip:
                        </label>
                        <input className="update-input"></input>
                      </div>
                      <div className="update-form-btn-box">
                        <button className="update-form-btn" type="submit">
                          Save
                        </button>
                      </div>
                    </form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          settingsId.settingsId === "preferences"
            ? "settings-catg-page-show"
            : "settings-catg-page"
        }
      >
        <div className="settings-content-box">
          <div className="settings-content-box-o">
            <div className="settings-content-box-i">
              <h2 className="settings-title">Preferences</h2>
            </div>
          </div>
        </div>
      </div>
      <Createaccountbanner />
      <Homefooter />
    </div>
  );
}

export default Settingspage;
