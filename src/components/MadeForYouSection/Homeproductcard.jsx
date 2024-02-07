import React from "react";
import "./Homeproductcard.css";

function Homeproductcard(props) {
  return (
    <div className="container home-product-card-container">
      <a className="product-card-link" href={`/product/${props.id}`}>
        <div className="card home-product-card">
          <img
            src={props.image}
            className="home-card-img-top"
            alt="product-img"
          />
          <div className="card-body">
            <h2 className="card-title product-name">{props.name}</h2>
            <section className="product-characteristics">
              <ul className="product-characteristics-list">
                <li className="home-product-characteristics-list-item">
                  <span>{props.year}</span>
                </li>
                <li className="home-product-characteristics-list-item">
                  <span>{props.distanceTravelled}</span>
                </li>
                <li className="home-product-characteristics-list-item">
                  <span>{props.fuelType}</span>
                </li>
                <li className="home-product-characteristics-list-item">
                  <span>{props.power}</span>
                </li>
              </ul>
            </section>
            <div className="product-price">
              <span className="home-product-price-currency">PLN</span>
              <span className="home-product-price-amount">{props.price}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Homeproductcard;
