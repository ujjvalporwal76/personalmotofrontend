import React, { useState, useEffect } from "react";
import "./Homeproductsection.css";
import MadeforyouProducts from "./Madeforyouproduct";
import Homeproductcard from "./Homeproductcard";
import axios from "../../axios/axios.config";
import toast from "react-hot-toast";
function createProductCard(Product) {
  if (Product.adtype === "standard")
    return (
      <Homeproductcard
        key={Product._id}
        id={Product._id}
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
function Homeproductsection() {
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
    <section className="home-product-section">
      <div className="home-product-header">
        <h2 className="home-product-heading">Made for you</h2>
        <div className="show-home-product-link">
          <a className="feaute-products-link" href="#">
            see all
          </a>
        </div>
      </div>
      <div className="home-product-row">
        {productDetails?.map(createProductCard)}
      </div>
    </section>
  );
}
export default Homeproductsection;
