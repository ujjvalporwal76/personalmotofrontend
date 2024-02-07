import React, { useEffect, useState } from "react";
import axios from "../../axios/axios.config";
import Products from "./ProductDetails";

import offerposter from "../../images/offerposter1.webp";
import Navbar from "../NavBar/Navbar";
import Sellercard from "../SellerCard/Sellercard";
import Productdetailsection from "../ProductDetailSection/ProductdetailSection";
import Productdescriptionsection from "../ProductDescriptionSection/Productdescriptionsection";
import Createaccountbanner from "../CreateAccountBanner/Createaccountbanner";
import Homefooter from "../HomeFooter/Homefooter";
import Homeproductsection from "../MadeForYouSection/Homeproductsection";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./Productpage.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
function Productpage() {
  const productId = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);

    handleProductDetails();
  }, []);

  const handleProductDetails = async () => {
    try {
      const response = await axios.get(`/product/${productId.productId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": "true",
          // "Access-Control-Expose-Headers": "Authorization",
        },
        withCredentials: true,
      });

      const data = await response.data;
      setProductDetails({ ...data });
      console.log(productDetails.ytVideo);
      // console.log(data);
      if (!productDetails) {
        return <div>Loading...</div>;
      }
    } catch (error) {
      // console.log(error);
      toast.error("No product details");
    }
  };
  return (
    <div className="product-page">
      <Navbar />
      <div className="product-full-details-box">
        <div className="product-full-image-slider">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            <SwiperSlide>
              {productDetails.ytVideo && (
                <iframe
                  src={`https://www.youtube.com/embed/${productDetails.ytVideo
                    .split("v=")
                    .pop()}`}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              )}
            </SwiperSlide>
            {productDetails.images?.map((file, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/${file}`}
                  alt="product-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-preview-image-slider">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="https://i.ytimg.com/vi/LGT5ZQr8uwo/default.jpg"
                alt="product-img"
              />
            </SwiperSlide>
            {productDetails.images?.map((file, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/Images/${file}`}
                  alt="product-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-full-desription-box">
          <h2 className="product-name">
            {productDetails.vehicleBrand} {productDetails.vehicleModel}
          </h2>
          <section className="product-characteristics">
            <ul className="product-characteristics-list">
              <li className="product-characteristics-list-item">
                <span>{productDetails.productionYear}</span>
              </li>
              <li className="product-characteristics-list-item">
                <span>{productDetails.mileage}</span>
              </li>
              <li className="product-characteristics-list-item">
                <span>{productDetails.fuelType}</span>
              </li>
              <li className="product-characteristics-list-item">
                <span>{productDetails.capacity}</span>
              </li>
            </ul>
            <div className="product-price">
              <span className="product-price-currency">
                {productDetails.currency === "Dollar" ? "PLN" : "PLN"}
              </span>
              <span className="product-price-amount">
                {productDetails.price}
              </span>
            </div>
          </section>
          <Sellercard
            sellerName={productDetails.sellerName}
            telePhone={productDetails.telephone}
          />
        </div>
      </div>
      <Productdetailsection
        vin={productDetails.vin}
        registration={productDetails.registration}
        vehicleBrand={productDetails.vehicleBrand}
        vehicleModel={productDetails.vehicleModel}
        version={productDetails.version}
        productionYear={productDetails.productionYear}
        mileage={productDetails.mileage}
        capacity={productDetails.capacity}
        fuelType={productDetails.fuelType}
        power={productDetails.power}
        gearBox={productDetails.gearBox}
        bodyType={productDetails.bodyType}
        doors={productDetails.doors}
        color={productDetails.color}
        registrationDate={productDetails.registrationDate}
        damaged={productDetails.damaged}
      />
      <Productdescriptionsection description={productDetails.description} />
      <Homeproductsection />
      <Createaccountbanner />
      <Homefooter />
    </div>
  );
}

export default Productpage;
