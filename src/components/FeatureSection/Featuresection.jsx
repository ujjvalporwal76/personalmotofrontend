import React, { useState, useEffect } from "react";
import Productcard from "../ProductCard/Productcard";
import "./Featuresection.css";
import Products from "../ProductCard/Product";
import axios from "../../axios/axios.config";
import toast from "react-hot-toast";
function createProductCard(Product) {
  if (Product.adtype === "featured")
    return (
      <Productcard
        key={Product._id}
        productId={Product._id}
        image={`${process.env.REACT_APP_SERVER_URL}/Images/${Product.images[0]}`}
        name={Product.title}
        year={Product.productionYear}
        fuelType={Product.fuelType}
        distanceTravelled={Product.mileage}
        power={Product.power}
        price={Product.price}
      />
    );
}

function Featuresection() {
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);

    handleAllProducts();
  }, []);

  const handleAllProducts = async () => {
    try {
      const response = await axios.get("/allproducts", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
      });

      const data = response.data;
      setProductDetails(data);
      // console.log(data);

      if (!productDetails) {
        return <div>Loading...</div>;
      }
    } catch (error) {
      // console.log(error);
      toast.error("No product");
    }
  };
  return (
    <section className="feature-product-section">
      <div className="feaute-product-header">
        <h2 className="feauted-product-heading">Featured Products</h2>
        <div className="show-feature-product-link">
          <a className="feaute-products-link" href="#">
            see all
          </a>
        </div>
      </div>
      <div className="feature-product-row">
        {productDetails?.map(createProductCard)}
      </div>
    </section>
  );
}

export default Featuresection;
