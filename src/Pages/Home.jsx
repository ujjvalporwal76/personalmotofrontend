import React from "react";
import "./Home.css";
import Navbar from "../components/NavBar/Navbar";
import Searchform from "../components/SearchForm/Searchform";
import Offercard from "../components/OfferCard/Offercard";
import Featuresection from "../components/FeatureSection/Featuresection";
import Homeproductsection from "../components/MadeForYouSection/Homeproductsection";
import Createaccountbanner from "../components/CreateAccountBanner/Createaccountbanner";
import Homefooter from "../components/HomeFooter/Homefooter";

import offerposter from "../images/offerposter.jpeg";
import offerposter1 from "../images/offerposter1.webp";
import banner from "../images/mainbanner.webp";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Searchform />
      <img src={banner} className="banner-img"></img>
      {/* <img src={offerposter} className='offer-img1'></img> */}
      {/* <img src={offerposter1} className="offer-img2"></img> */}
      <Offercard category="car" />
      <Featuresection />
      <Homeproductsection />
      <Homeproductsection />
      <Homeproductsection />
      <Homeproductsection />
      <Createaccountbanner />
      <Homefooter />
    </div>
  );
}

export default Home;
