import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscPassFilled } from "react-icons/vsc";
import Button from "react-bootstrap/Button";
import "./Payment.css";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import toast from "react-hot-toast";

function Paymentpass() {
  const axiosPrivate = useAxiosPrivate();

  // const navigate = useNavigate();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const transactionId = urlSearchParams.get("id");

    const paid = urlSearchParams.get("paid");
    const email = urlSearchParams.get("email");
    // console.log(paid, email, transactionId);

    // Handle points if needed
    handlePoints(transactionId, email, paid);
    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
    // window.history.pushState({}, "", "/");
  }, []);

  const handlePoints = async (transactionId, email, paid) => {
    try {
      if (!email || !paid) {
        // console.log("no value in paid");
        return;
      }
      console.log(transactionId);
      let res = await axiosPrivate.post(
        "/pay/points",
        { transactionId, email, paid },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
        }
      );
      const data = res.data;
      if (res.status === 201) {
        // console.log("points added");
        // console.log(data);
        toast.success("Points added successfully");
      }
      if (res.status === 409) {
        // console.log("points added");
        // console.log(data);
        toast.success("Points was already added for this transaction");
      }
    } catch (error) {
      // console.log(error);
      toast.error("points couldn't credit");
    }
  };
  return (
    <div className="success-page">
      <VscPassFilled />
      <h1>Payment Successful </h1>
      <p>
        <strong>Thank you for completing your secure online payment.</strong>
      </p>
      <p>
        <strong>Your points will get credit shortly.</strong>
      </p>
      <Button href="/myaccount-payments/invoices">Go to Invoices</Button>
    </div>
  );
}

export default Paymentpass;
