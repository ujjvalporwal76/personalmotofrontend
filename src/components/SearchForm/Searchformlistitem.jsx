import React from "react";
import "./Searchform.css";
import "./Test.css";
function Searchformlistitem(props) {
  return (
    <option className="search-form-category-dropdown-option">
      {props.bodytype}
      {props.vehiclebrand}
      {props.fueltype}
      {props.mileage}
      {props.price}
      {props.year}
      {props.vehiclemodel}
      {props.door}
      {props.gearbox}
      {props.version}
      {props.color}
      {props.currency}
      {props.category}
      {props.filter1}
      {props.filter2}
      {props.engineType}
      {props.transmissionType}
      {props.driveType}
    </option>
  );
}
export default Searchformlistitem;
