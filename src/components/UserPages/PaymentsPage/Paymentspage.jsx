import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LiaWalletSolid } from "react-icons/lia";

import "../StatisticsPage/Statisticspage.css";
import "./Paymentspage.css";

import Navbar from "../../NavBar/Navbar";
import Createaccountbanner from "../../CreateAccountBanner/Createaccountbanner";
import Homefooter from "../../HomeFooter/Homefooter";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

function Paymentspage() {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState({
    points: 0,
    userData: {},
  });

  useEffect(() => {
    userAuthenticate();
  }, []);
  const userAuthenticate = async () => {
    try {
      const response = await axiosPrivate.get("/pages/myaccount-payments", {
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
  const navigate = useNavigate();
  const [dropdown, setdropdown] = useState(0);
  const path = useLocation();
  const [sliderValue, setSliderValue] = useState(149);
  const paymentsId = useParams();
  const [show, setShow] = useState(false);
  const [modalForm, setModalForm] = useState(false);
  const [selectTopup, setSelectedTopup] = useState("4");
  const [modalForm1Values, setModalForm1Values] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
    toPay: "",
  });

  const [modalForm2Values, setModalForm2Values] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    email: "",
    companyName: "",
    city: "",
    taxId: "",
    phoneNumber: "",
  });
  const [modalForm1Errors, setModalForm1Errors] = useState({});
  const [isModalForm1Submit, setIsModalForm1Submit] = useState(false);
  const [modalForm2Errors, setModalForm2Errors] = useState({});
  const [isModalForm2Submit, setIsModalForm2Submit] = useState(false);
  const [topUpValues, setTopUpValues] = useState({
    depositValue: 149,
    buyPoints: 149,
    freePoints: 0.0,
    rangeLeft: 50,
    rangeRight: 149,
    toPay: 149,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handletopupdropdown() {
    setdropdown(!dropdown);
  }

  function handleTopUpButton() {
    window.open("/myaccount-payments/topupfunds", "_blank");
  }

  function handleSliderValue(e) {
    setSliderValue(e.target.value);
  }

  function handleModalForm() {
    setModalForm(!modalForm);
  }

  function handleModalForm1Change(e) {
    const { name, value } = e.target;
    setModalForm1Values({ ...modalForm1Values, [name]: value });
  }
  function handleModalForm2Change(e) {
    const { name, value } = e.target;
    setModalForm2Values({ ...modalForm2Values, [name]: value });
  }

  const handleModalForm1Submit = async (e) => {
    e.preventDefault();
    setModalForm1Errors(modalForm1Validate(modalForm1Values));
    setIsModalForm1Submit(true);
    const response = await axiosPrivate.post("/pay/topup", modalForm1Values, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    });

    const data = await response.data;

    // console.log(data);
    if (response.status === 201) {
      // window.alert("payment done succefully");
      window.location = data.url;
      // window.open(data.url, "_blank");
      navigate("/myaccount-payments/topupfunds");
      // console.log(data);
    } else if (response.status > 400 || !data) {
      // console.log(response.error);
      window.alert("Error in making your payment");
      navigate("/payment/fail");
    }
  };
  const handleModalForm2Submit = async (e) => {
    e.preventDefault();
    setModalForm2Errors(modalForm2Validate(modalForm2Values));
    setIsModalForm2Submit(true);
    const response = await axiosPrivate.post("/pay/topup", modalForm2Values, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    });

    const data = await response.data;
    // console.log(data);
    if (response.status === 201) {
      window.alert("payment done succefully");
      navigate("/payment/success");
      // console.log(data);
    } else if (response.status > 400 || !data) {
      window.alert("Error in making your payment");
      navigate("/payment/fail");
    }
  };

  useEffect(() => {
    // console.log(modalForm1Errors);
    if (Object.keys(modalForm1Errors).length === 0 && isModalForm1Submit) {
      // console.log(modalForm1Values);
    }
  });
  useEffect(() => {
    // console.log(modalForm2Errors);
    if (Object.keys(modalForm2Errors).length === 0 && isModalForm2Submit) {
      // console.log(modalForm2Values);
    }
  });

  function modalForm2Validate(values) {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "Required field";
    }
    if (!values.companyName) {
      errors.companyName = "Required field";
    }
    if (!values.address) {
      errors.address = "Required field";
    }
    if (!values.postalCode) {
      errors.postalCode = "Required field";
    }
    if (!values.city) {
      errors.city = "Required field";
    }
    if (!values.taxId) {
      errors.taxId = "Required field";
    }
    if (!values.email) {
      errors.email = "Required field";
    }
    return errors;
  }
  function modalForm1Validate(values) {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "Required field";
    }
    if (!values.address) {
      errors.address = "Required field";
    }
    if (!values.postalCode) {
      errors.postalCode = "Required field";
    }
    if (!values.city) {
      errors.city = "Required field";
    }
    if (!values.email) {
      errors.email = "Required field";
    }
    return errors;
  }

  function handleToPayAmount() {
    setModalForm1Values({
      ...modalForm1Values,
      toPay: sliderValue,
    });
  }

  const updateTopUpValues = (newValues) => {
    setTopUpValues((prevTopUpValues) => {
      return {
        ...prevTopUpValues,
        ...newValues,
      };
    });
  };

  function handleSelectTopup(e) {
    const value = e.target.value;
    // console.log(value);
    if (value === "1") {
      updateTopUpValues({
        depositValue: 3000,
        buyPoints: 3000,
        freePoints: 0.15,
        rangeLeft: 500,
        rangeRight: 3000,
        toPay: 3000,
      });
      setSliderValue(500);
    } else if (value === "2") {
      updateTopUpValues({
        depositValue: 499,
        buyPoints: 499,
        freePoints: 0.1,
        rangeLeft: 300,
        rangeRight: 499,
        toPay: 499,
      });
      setSliderValue(300);
    } else if (value === "3") {
      updateTopUpValues({
        depositValue: 299,
        buyPoints: 299,
        freePoints: 0.05,
        rangeLeft: 150,
        rangeRight: 299,
        toPay: 299,
      });
      setSliderValue(150);
    } else if (value === "4") {
      updateTopUpValues({
        depositValue: 149,
        buyPoints: 149,
        freePoints: 0.0,
        rangeLeft: 50,
        rangeRight: 149,
        toPay: 149,
      });
      setSliderValue(50);
    }
    // console.log(topUpValues);
    setSelectedTopup(value);
    // console.log(e.target);
    // console.log(selectTopup);
  }
  // useEffect(() => {
  //   console.log(topUpValues);
  // }, [topUpValues]);

  function handleStripePayment() {}

  return (
    <div className="payments-page">
      <Navbar />
      <div className="user-pages-header-section">
        <div className="user-pages-header-box">
          <div className="user-pages-header">
            <h1>Your Payments</h1>
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
                  path.pathname === "/myaccount-payments/wallet" ||
                  path.pathname === "/myaccount-payments/invoices" ||
                  path.pathname === "/myaccount-payments/fundoperations" ||
                  path.pathname === "/myaccount-payments/topupfunds"
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
                  path.pathname === "/myaccount-settings"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Settings
              </a>
            </li>
          </ul>

          <div className="payments-catg-tab-box">
            <a
              href="/myaccount-payments/wallet"
              className={
                path.pathname === "/myaccount-payments/wallet"
                  ? "payments-catg-tab-show"
                  : "payments-catg-tab"
              }
            >
              Payment history
            </a>
            <a
              href="/myaccount-payments/invoices"
              className={
                path.pathname === "/myaccount-payments/invoices"
                  ? "payments-catg-tab-show"
                  : "payments-catg-tab"
              }
            >
              Invoices
            </a>
            <a
              href="/myaccount-payments/fundoperations"
              className={
                path.pathname === "/myaccount-payments/fundoperations"
                  ? "payments-catg-tab-show"
                  : "payments-catg-tab"
              }
            >
              Operations on Personalmoto Assests
            </a>
            <a
              href="/myaccount-payments/topupfunds"
              className={
                path.pathname === "/myaccount-payments/topupfunds"
                  ? "payments-catg-tab-show"
                  : "payments-catg-tab"
              }
            >
              Top up Funds on Personalmoto
            </a>
          </div>
        </div>
      </div>

      <div
        className={
          paymentsId.paymentsId === "wallet"
            ? "payments-catg-page-show"
            : "payments-catg-page"
        }
      >
        <div className="payments-content-box">
          <img
            src="https://statics.otomoto.pl/optimus-storage/a/common/images/payment/empty-payment.svg"
            alt="empty-wallet-img"
          ></img>
          <span className="payments-empty-span">
            You don't have payment history yet. Once you have made your first
            payment, you will see it here.
          </span>
        </div>
      </div>

      <div
        className={
          paymentsId.paymentsId === "invoices"
            ? "payments-catg-page-show"
            : "payments-catg-page"
        }
      >
        <div className="payments-content-box">
          <img
            src="https://statics.otomoto.pl/optimus-storage/a/common/images/payment/empty-payment.svg"
            alt="empty-wallet-img"
          ></img>
          <span className="payments-empty-span">
            You don't have any invoices yet.
          </span>
        </div>
      </div>

      <div
        className={
          paymentsId.paymentsId === "fundoperations"
            ? "payments-catg-page-show"
            : "payments-catg-page"
        }
      >
        <div className="payments-operations-box">
          <div className="topup-operations-box">
            <img
              src="https://statics.otomoto.pl/optimus-storage/a/common/images/payment/credits-coins.svg"
              alt="credits-coins"
              className="topup-coin-img"
            ></img>
            <div className="current-balance-box">
              <span className="current-balance">Current 0 balance</span>
            </div>
            <div className="topup-balance-button-box">
              <button
                className="topup-balance-button"
                onClick={handleTopUpButton}
              >
                Top Up
              </button>
            </div>
          </div>
        </div>
        <div className="payments-content-box">
          <img
            src="https://statics.otomoto.pl/optimus-storage/a/common/images/payment/empty-payment.svg"
            alt="empty-wallet-img"
          ></img>
          <span className="payments-empty-span">
            You don't have funds for Personalmoto yet.
          </span>
        </div>
      </div>

      <div
        className={
          paymentsId.paymentsId === "topupfunds"
            ? "payments-catg-page-show"
            : "payments-catg-page"
        }
      >
        <div className="payments-content-box payments-content-box-m payments-content-box-n">
          <div className="payments-content-box-i">
            <div className="payments-steps">
              <div className="topup-warning-box">
                <div className="topup-warning-box-o">
                  <div className="topup-warning-box-i">
                    <p className="topup-warning">
                      Points can only be used to pay for promotions. Activate
                      the ad using PayU or SMS
                    </p>
                  </div>
                </div>
              </div>

              <div className="payments-steps-step payments-steps-step-chain">
                <span className="steps-step-num">1</span>
                <div className="steps-step-label-box">
                  <p className="steps-step-label">
                    Select the amount range you want to top up OTOMOTO Funds.
                    Then use the slider to set the exact value.
                    <span>
                      Points will expire after 60 days from the last top-up.
                      <a href="#" target="_blank">
                        {" "}
                        Click to learn more
                      </a>
                    </span>
                  </p>
                </div>
                <div className="topup-checkboxes" onChange={handleSelectTopup}>
                  <div className="topup-checkbox-item">
                    <input
                      type="radio"
                      id="topup-g1"
                      value="1"
                      name="g"
                    ></input>
                    <label for="topup-g1" className="topup-checkbox-item-label">
                      <span>From 500 to 3000 points</span>
                      <strong>
                        {" "}
                        + 15% <sub>free</sub>
                      </strong>
                      <LiaWalletSolid className="wallet-icon"></LiaWalletSolid>
                    </label>
                  </div>
                  <div className="topup-checkbox-item">
                    <input
                      type="radio"
                      id="topup-g2"
                      value="2"
                      name="g"
                    ></input>
                    <label for="topup-g2" className="topup-checkbox-item-label">
                      <span>From 300 to 499 points</span>
                      <strong>
                        {" "}
                        + 10% <sub>free</sub>
                      </strong>
                      <LiaWalletSolid className="wallet-icon"></LiaWalletSolid>
                    </label>
                  </div>
                  <div className="topup-checkbox-item">
                    <input
                      type="radio"
                      id="topup-g3"
                      value="3"
                      name="g"
                    ></input>
                    <label for="topup-g3" className="topup-checkbox-item-label">
                      <span>From 150 to 299 points</span>
                      <strong>
                        {" "}
                        + 5% <sub>free</sub>
                      </strong>
                      <LiaWalletSolid className="wallet-icon"></LiaWalletSolid>
                    </label>
                  </div>
                  <div className="topup-checkbox-item">
                    <input
                      type="radio"
                      id="topup-g4"
                      value="4"
                      name="g"
                      checked={selectTopup === "4"}
                    ></input>
                    <label for="topup-g4" className="topup-checkbox-item-label">
                      <span>From 50 to 149 points</span>
                      <strong>
                        {" "}
                        + 0% <sub>free</sub>
                      </strong>
                      <LiaWalletSolid className="wallet-icon"></LiaWalletSolid>
                    </label>
                  </div>
                </div>

                <div className="topup-amount-slider-box">
                  <input
                    type="range"
                    className="topup-amount-slider"
                    //
                    onChange={handleSliderValue}
                    value={sliderValue}
                    min={topUpValues.rangeLeft}
                    max={topUpValues.rangeRight}
                  ></input>

                  <div className="topup-amount-range">
                    <span className="topup-amount-range-min">
                      {topUpValues.rangeLeft} INR
                    </span>
                    <span className="topup-amount-range-max">
                      {topUpValues.rangeRight} INR
                    </span>
                  </div>
                  <p className="topup-current-amount">{sliderValue}</p>
                </div>

                <dl className="topup-amount-calc-box">
                  <dl className="topup-amount-calc-label">Deposit value:</dl>
                  <dd className="topup-amount-calc-value">
                    <sup>INR</sup>
                    {sliderValue}
                  </dd>
                  <dl className="topup-amount-calc-label">
                    You will receive on your account:
                  </dl>
                  <dd className="topup-amount-calc-value">
                    <span className="topup-raw-amount">
                      {sliderValue} points +{" "}
                    </span>
                    <span className="topup-bonus-amount">
                      {(sliderValue * topUpValues.freePoints).toFixed(2)} free
                    </span>
                  </dd>
                </dl>
              </div>

              <div className="payments-steps-step">
                <span className="steps-step-num">2</span>
                <div className="steps-step-label-box">
                  <p className="steps-step-label">Choose payment method</p>
                </div>
                <div className="topup-payment-method">
                  <input
                    type="radio"
                    name="payment-opt"
                    id="stripe-pay"
                    checked="checked"
                  ></input>
                  <label for="stripe-pay" className="payment-method-label">
                    Stripe Payments
                  </label>
                  <span className="payment-method-icon">
                    <img
                      src="https://stripe.com/img/about/logos/logos/blue@2x.png"
                      alt="stripe-logo"
                    ></img>
                  </span>
                </div>
                <div className="topup-amount-summary-box">
                  <input type="hidden" id="total-amount"></input>
                  <span className="topup-amount-summary-label">To pay</span>
                  <span className="topup-amount-summary-total">
                    <sup>INR</sup>
                    {sliderValue}
                  </span>
                  <a
                    href="/myaccount-payments/fundoperations"
                    className="topup-amount-cancel-link"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    id="paymentSubmit"
                    className="topup-amount-summary-submit topup-submit-btn"
                    onClickCapture={handleShow}
                    onClick={handleToPayAmount}
                  >
                    Next
                  </button>
                </div>

                <form id="payment-form"></form>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} className="topup-payment-modal">
          <Modal.Header closeButton className="payment-modal-header">
            Payment details
          </Modal.Header>
          <Modal.Body>
            <div className="payment-modal-content">
              <h2 className="payment-modal-heading">
                Provide or verify your payment details
              </h2>
              <span className="payment-modal-tip">
                If you are purchasing for business purposes, select the
                appropriate option and enter the data. It will not be possible
                to receive an invoice for the company at a later date or to
                change the data.
              </span>

              {modalForm ? (
                <form
                  className="payment-modal-form"
                  onSubmit={handleModalForm2Submit}
                >
                  <div className="payment-type-sel-box">
                    <div className="payment-type-sel">
                      <input
                        type="radio"
                        id="noNeedInvoice"
                        name="payment-type-sel"
                        className="type-sel-radio"
                        onClick={handleModalForm}
                        checked={modalForm ? "" : "checked"}
                      ></input>
                      <label for="noNeedInvoice" className="type-sel-label">
                        <span className="type-sel-label-text">
                          I am buying as a private person
                        </span>
                      </label>
                    </div>
                    <div className="payment-type-sel">
                      <input
                        type="radio"
                        id="NeedInvoice"
                        name="payment-type-sel"
                        className="type-sel-radio"
                        onClick={handleModalForm}
                      ></input>
                      <label for="NeedInvoice" className="type-sel-label">
                        <span className="type-sel-label-text">
                          I am buying as a company
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="payment-input-box">
                    <label className="payment-input-label" for="firstName">
                      Name*
                    </label>
                    <input
                      className="payment-input"
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.firstName}
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="lastName">
                      Last Name
                    </label>
                    <input
                      className="payment-input"
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                  </div>

                  <div
                    className={
                      !modalForm2Errors
                        ? "req-input-box payment-input-box"
                        : "payment-input-box"
                    }
                  >
                    <label className="payment-input-label" for="companyName">
                      Company Name*
                    </label>
                    <input
                      className="payment-input"
                      id="companyName"
                      name="companyName"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.companyName}
                    </div>
                  </div>

                  <div
                    className={
                      !modalForm2Errors
                        ? "req-input-box payment-input-box"
                        : "payment-input-box"
                    }
                  >
                    <label className="payment-input-label" for="address">
                      Address (street and number)*
                    </label>
                    <input
                      className="payment-input"
                      id="address"
                      name="address"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.address}
                    </div>
                  </div>

                  <div
                    className={
                      !modalForm2Errors
                        ? "req-input-box payment-input-box"
                        : "payment-input-box"
                    }
                  >
                    <label className="payment-input-label" for="postalCode">
                      Zip code*
                    </label>
                    <input
                      className="payment-input"
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.postalCode}
                    </div>
                  </div>

                  <div
                    className={
                      !modalForm2Errors
                        ? "req-input-box payment-input-box"
                        : "payment-input-box"
                    }
                  >
                    <label className="payment-input-label" for="city">
                      Town*
                    </label>
                    <input
                      className="payment-input"
                      id="city"
                      name="city"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.city}
                    </div>
                  </div>

                  <div
                    className={
                      !modalForm2Errors
                        ? "req-input-box payment-input-box"
                        : "payment-input-box"
                    }
                  >
                    <label className="payment-input-label" for="taxId">
                      Number nip*
                    </label>
                    <input
                      className="payment-input"
                      id="taxId"
                      name="taxId"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.taxId}
                    </div>
                  </div>

                  <div
                    className={
                      !modalForm2Errors
                        ? "req-input-box payment-input-box"
                        : "payment-input-box"
                    }
                  >
                    <label className="payment-input-label" for="email">
                      E-mail*
                    </label>
                    <input
                      className="payment-input"
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleModalForm2Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm2Errors.email}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="payment-opt-redirect-btn"
                    onClick={handleStripePayment}
                  >
                    Proceed to payment
                  </button>
                </form>
              ) : (
                <form
                  className="payment-modal-form"
                  onSubmit={handleModalForm1Submit}
                >
                  <div className="payment-type-sel-box">
                    <div className="payment-type-sel">
                      <input
                        type="radio"
                        id="noNeedInvoice"
                        name="payment-type-sel"
                        className="type-sel-radio"
                        onClick={handleModalForm}
                        checked={modalForm ? "" : "checked"}
                      ></input>
                      <label for="noNeedInvoice" className="type-sel-label">
                        <span className="type-sel-label-text">
                          I am buying as a private person
                        </span>
                      </label>
                    </div>
                    <div className="payment-type-sel">
                      <input
                        type="radio"
                        id="NeedInvoice"
                        name="payment-type-sel"
                        className="type-sel-radio"
                        onClick={handleModalForm}
                      ></input>
                      <label for="NeedInvoice" className="type-sel-label">
                        <span className="type-sel-label-text">
                          I am buying as a company
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="firstName">
                      Name*
                    </label>
                    <input
                      className="payment-input"
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm1Errors.firstName}
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="lastName">
                      Last Name
                    </label>
                    <input
                      className="payment-input"
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="address">
                      Address (street and number)*
                    </label>
                    <input
                      className="payment-input"
                      id="address"
                      name="address"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm1Errors.address}
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="postalCode">
                      Zip code*
                    </label>
                    <input
                      className="payment-input"
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm1Errors.postalCode}
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="city">
                      Town*
                    </label>
                    <input
                      className="payment-input"
                      id="city"
                      name="city"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm1Errors.city}
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="email">
                      E-mail*
                    </label>
                    <input
                      className="payment-input"
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                    <div className="req-input-error-msg">
                      {modalForm1Errors.email}
                    </div>
                  </div>

                  <div className="payment-input-box">
                    <label className="payment-input-label" for="phoneNumber">
                      Telephone
                    </label>
                    <input
                      className="payment-input"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      onChange={handleModalForm1Change}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="payment-opt-redirect-btn"
                    onClick={handleStripePayment}
                  >
                    Proceed to payment
                  </button>
                </form>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <Createaccountbanner />
      <Homefooter />
    </div>
  );
}

export default Paymentspage;
