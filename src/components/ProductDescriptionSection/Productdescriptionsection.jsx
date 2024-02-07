import React from "react";

import "./Productdescription.css";
function Productdescriptionsection(props) {
  return (
    <div className="product-description-box">
      <h3 className="product-description-heading">Description</h3>
      <div className="product-full-description">{props.description}</div>
    </div>
  );
}

export default Productdescriptionsection;
