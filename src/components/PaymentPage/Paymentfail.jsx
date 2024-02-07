import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import Button from "react-bootstrap/Button";
import "./Payment.css";
function Paymentfail() {
  return (
    <div className="fail-page">
      <RxCrossCircled />
      <h1>Payment Failed!</h1>
      <p>
        <strong>
          Oops!!! Your Payment wasn't successful, Please try again.
        </strong>
      </p>
      <p>
        <strong>Please go back and try again.</strong>
      </p>
      <Button href="/" className="btn-danger">
        Go Home
      </Button>
    </div>
  );
}

export default Paymentfail;
