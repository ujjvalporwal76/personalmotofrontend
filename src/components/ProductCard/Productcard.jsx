import React from "react";
import "./Productcard.css";

function Productcard(props) {
  return (
    <div className="container product-card-container">
      <a className="product-card-link" href={`/product/${props.productId}`}>
        <div className="card">
          <img src={props.image} className="card-img-top" alt="product-img" />
          <div className="card-body">
            <h2 className="card-title product-name">{props.name}</h2>
            <section className="product-characteristics">
              <ul className="product-characteristics-list">
                <li className="product-characteristics-list-item">
                  <span>{props.year}</span>
                </li>
                <li className="product-characteristics-list-item">
                  <span>{props.distanceTravelled}</span>
                </li>
                <li className="product-characteristics-list-item">
                  <span>{props.fuelType}</span>
                </li>
                <li className="product-characteristics-list-item">
                  <span>{props.power}</span>
                </li>
              </ul>
            </section>
            <div className="product-price">
              <span className="product-price-currency">PLN</span>
              <span className="product-price-amount">{props.price}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Productcard;
