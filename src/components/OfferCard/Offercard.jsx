// Offercard.js
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios.config";
import "./Offercard.css";

const Offercard = (props) => {
  const [productDetails, setProductDetails] = useState([]);
  const [offerProduct, setOfferProduct] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    handleAllProducts(props.category);
  }, [props.category]);

  const handleAllProducts = async () => {
    console.log(props.category);
    try {
      const response = await axios.get(
        `/allproducts?category=${props.category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const data = response.data;
      setProductDetails(data);
      const offerProduct = getOfferProduct(data);
      setOfferProduct(offerProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getOfferProduct = (productDetails) => {
    console.log("Product Details:", productDetails);
    const offerProduct = productDetails.find(
      (Product) => Product.adtype === "top" && Product.status === "Active"
    );
    return offerProduct;
  };

  return (
    <div className="offer-product-section">
      {offerProduct.title && (
        <div className="container offer-card-container">
          <a className="offercard-link" href={`/product/${offerProduct._id}`}>
            <div className="card">
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/Images/${offerProduct.images[0]}`}
                className="card-img-top"
                alt="product-img"
              />
              <div className="card-body">
                <h2 className="card-title offer-product-name">
                  {offerProduct.title}
                </h2>
                <section className="product-characteristics">
                  <ul className="product-characteristics-list">
                    <li className="offer-product-characteristics-list-item">
                      <span>{offerProduct.productionYear}</span>
                    </li>
                    <li className="offer-product-characteristics-list-item">
                      <span>{offerProduct.mileage}</span>
                    </li>
                    <li className="offer-product-characteristics-list-item">
                      <span>{offerProduct.fuelType}</span>
                    </li>
                    <li className="offer-product-characteristics-list-item">
                      <span>{offerProduct.power}</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="offer-show-container">
              <h2 className="offer-show-heading">Offer of the day</h2>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default Offercard;
