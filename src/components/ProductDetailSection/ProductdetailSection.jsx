import React from "react";

import "./Productdetailsection.css";

function Productdetailsection(props) {
  return (
    <div className="details-main-column">
      <div className="details-parameters-box">
        <h4 className="details-heading">Details</h4>
        <div className="details-parameters">
          <ul className="details-parameters-list">
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">offer from</span>
              <div className="details-parameters-value">Private</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">
                Show offers with VIN number
              </span>
              <div className="details-parameters-value">Yes</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">
                It has a registration number
              </span>
              <div className="details-parameters-value">
                {props.registration ? "Yes" : "No"}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Vehicle brand</span>
              <div className="details-parameters-value">
                {props.vehicleBrand}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">offer from</span>
              <div className="details-parameters-value">
                {props.vehicleBrand}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Vehicle model</span>
              <div className="details-parameters-value">
                {props.vehicleModel}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Version</span>
              <div className="details-parameters-value">{props.version}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">
                Year of production
              </span>
              <div className="details-parameters-value">
                {props.productionYear}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Mileage</span>
              <div className="details-parameters-value">{props.mileage}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Capacity</span>
              <div className="details-parameters-value">{props.capacity}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Fuel Type</span>
              <div className="details-parameters-value">{props.fuelType}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Power</span>
              <div className="details-parameters-value">{props.power}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Transmission</span>
              <div className="details-parameters-value">{props.gearBox}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Body type</span>
              <div className="details-parameters-value">{props.bodyType}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Number of doors</span>
              <div className="details-parameters-value">{props.doors}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">VIN</span>
              <div className="details-parameters-value">{props.vin}</div>
            </li>
          </ul>
          <ul className="details-parameters-list">
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Color</span>
              <div className="details-parameters-value">{props.color}</div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">
                Date of first registration in the vehicle's history
              </span>
              <div className="details-parameters-value">
                {props.registrationDate}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">
                Vehicle registration number
              </span>
              <div className="details-parameters-value">
                {props.registration}
              </div>
            </li>
            <li className="details-parameters-list-item">
              <span className="details-parameters-label">Accident free</span>
              <div className="details-parameters-value">
                {props.damaged === "NO" ? "Yes" : "No"}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Productdetailsection;
