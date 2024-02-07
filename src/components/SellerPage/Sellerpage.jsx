import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ProgressBar } from "react-bootstrap";
import "./Sellerpage.css";

import Navbar from "../NavBar/Navbar";
import Searchformlistitem from "../SearchForm/Searchformlistitem";

import sellerpageimg from "../../images/sellerpageimg.jpg";
import carmoneybalanceimg from "../../images/carmoneybalance.avif";
import cameraimg from "../../images/cameraimg.svg";
import carshineready from "../../images/carshineready.svg";
import cleaningservice from "../../images/cleaningservice.svg";
import mileageimg from "../../images/mileageimg.svg";
import pricecalculator from "../../images/pricecalculator.svg";
import vehicleregistration from "../../images/vehicleregistrationPL.svg";
import Years from "../SearchForm/Year";
import Bodytypes from "../SearchForm/Bodytype";
import fetchVehicleBrands from "../SearchForm/Vehiclebrand";
import fetchVehicleModels from "../SearchForm/Vehiclemodel";
import Fueltypes from "../SearchForm/Fueltype";

function createBodytypelist(Bodytype) {
  return <Searchformlistitem key={Bodytype.id} bodytype={Bodytype.bodytype1} />;
}
function createVehicleBrandlist(Vehiclebrand) {
  return (
    <Searchformlistitem
      key={Vehiclebrand.id}
      vehiclebrand={Vehiclebrand.vehicleBrand}
    />
  );
}
function createFuelTypelist(Fueltype) {
  return <Searchformlistitem key={Fueltype.id} fueltype={Fueltype.fuelType} />;
}
function createVehicleModellist(Vehiclemodel) {
  return (
    <Searchformlistitem
      key={Vehiclemodel.id}
      vehiclemodel={Vehiclemodel.vehicleModel}
    />
  );
}

function createYearlist(Year) {
  return <Searchformlistitem key={Year.id} year={Year.year} />;
}

function Sellerpage() {
  const [VehicleModels, setVehicleModels] = useState([]);
  const [VehicleBrands, setVehicleBrands] = useState([]);
  const [yearFrom, setYearFrom] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState("1");

  const handlesellercategory = (event) => {
    setActive(event.target.id);
  };

  function handleadpage() {
    navigate("/create-ad-page/personal");
  }
  useEffect(() => {
    // You can perform additional actions when VehicleModels changes, if needed
    // console.log("VehicleModels updated:", VehicleModels);
  }, [VehicleModels]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVehicleBrands();
        setVehicleBrands(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleVehicleBrandChange = async (e) => {
    const selectedBrand = e.target.value;
    setVehicleBrand(selectedBrand);

    try {
      const data = await fetchVehicleModels(selectedBrand);
      setVehicleModels(data);
      console.log(VehicleModels);
      // Do something with the data, e.g., update the state or log it
      console.log(data);
    } catch (error) {
      // Handle errors if needed
      console.error(error);
    }
  };
  return (
    <div className="seller-page">
      <Navbar />
      <section className="seller-ad-section">
        <div className="seller-ad-box">
          <article className="seller-ad-content">
            <figure className="seller-ad-img-area">
              <img
                src={sellerpageimg}
                alt="post-ad-img"
                className="seller-ad-img"
              ></img>
            </figure>
            <div className="seller-post-ad-box">
              <div className="seller-post-ad">
                <h4 className="seller-post-ad-heading">
                  Post your ads on Personalmoto
                </h4>
                <p className="seller-post-ad-slogan">
                  Advertise your vehicle or part and sell within 2-4 weeks.
                </p>
                <button
                  type="button"
                  className="seller-post-ad-btn"
                  onClick={handleadpage}
                >
                  <span className="seller-post-ad-btn-name">Create an ad</span>
                </button>
                <ul className="seller-ad-features">
                  <li className="seller-ad-feature-item">
                    <div>
                      <AiOutlineCheck
                        className="seller-ad-feature-icon"
                        size={25}
                      />
                    </div>
                    <p>
                      Website no. 1 in Poland dedicated to the automotive
                      industry
                    </p>
                  </li>
                  <li className="seller-ad-feature-item">
                    <div>
                      <AiOutlineCheck
                        className="seller-ad-feature-icon"
                        size={25}
                      />
                    </div>
                    <p>Over 1,000,000 users every day</p>
                  </li>
                  <li className="seller-ad-feature-item">
                    <div>
                      <AiOutlineCheck
                        className="seller-ad-feature-icon"
                        size={25}
                      />
                    </div>
                    <p>Tools and expert tips to help you sell faster</p>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <article className="car-select-section">
        <div className="car-select-box">
          <div className="car-select-content-box">
            <div className="car-select-content-header">
              <div className="car-select-heading-box">
                <h3 className="car-select-content-heading">
                  How much is your car worth?
                </h3>
              </div>
            </div>
            <div className="car-select-content-header car-select-form-outer">
              <div className="car-select-form-box">
                <p className="car-select-form-slogan">
                  Get a free quote that only takes a few minutes.
                </p>
                <div className="car-select-form-boxes">
                  <div className="car-select-dropdown-box">
                    <div>
                      <label className="car-select-dropdown-name">
                        Year of production *
                      </label>
                      <select
                        id="yearFrom"
                        value={yearFrom}
                        onChange={(e) => setYearFrom(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {Years.map(createYearlist)}
                      </select>
                    </div>
                  </div>
                  <div className="car-select-dropdown-box">
                    <div>
                      <label className="car-select-dropdown-name">
                        Vehicle Brand *
                      </label>
                      <select
                        id="yearFrom"
                        value={vehicleBrand}
                        onChange={handleVehicleBrandChange}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {VehicleBrands.map(createVehicleBrandlist)}
                      </select>
                    </div>
                  </div>
                  <div className="car-select-form-boxes">
                    <div className="car-select-btn-box">
                      <button
                        className="car-select-form-btn"
                        type="button"
                        onClick={handleShow}
                      >
                        <span className="car-select-btn-text">Continue</span>
                      </button>
                      <p className="car-select-form-steps">Step 1 of 2</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="car-feature-img-box">
                <div className="car-feature-img-inner-box">
                  <figure>
                    <img
                      className="car-feature-img"
                      src={carmoneybalanceimg}
                      alt="car-feature-img"
                    ></img>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className="car-select-form-modal"
        >
          <Modal.Header
            closeButton
            className="car-select-modal-close"
          ></Modal.Header>
          <Modal.Body>
            <div className="car-select-modal-content">
              <span className="car-select-form-steps">
                Step 2 of 2 : Detailed information about the car
              </span>
              <div className="car-form-progress-bar">
                <ProgressBar
                  variant="primary"
                  now={100}
                  className="progress-bar"
                />
                <ProgressBar
                  variant="primary"
                  now={100}
                  className="progress-bar"
                />
              </div>
              <h2 className="car-form-modal-heading">
                We just need a few more details
              </h2>
              <div className="car-select-content-header">
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      Year of production *
                    </label>
                    <select
                      id="yearFrom"
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                      className="search-form-category-dropdown"
                    >
                      <option value="">Choose</option>
                      {Years.map(createYearlist)}
                    </select>
                  </div>
                </div>
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      Vehicle Brand *
                    </label>
                    <select
                      id="yearFrom"
                      value={vehicleBrand}
                      onChange={handleVehicleBrandChange}
                      className="search-form-category-dropdown"
                    >
                      <option value="">Choose</option>
                      {VehicleBrands.map(createVehicleBrandlist)}
                    </select>
                  </div>
                </div>
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      Vehicle Model *
                    </label>
                    <select
                      id="vehicleModel"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="search-form-category-dropdown"
                    >
                      <option value="">Choose</option>
                      {VehicleModels.map(createVehicleModellist)}
                    </select>
                  </div>
                </div>
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      Body Type *
                    </label>
                    <select
                      id="yearFrom"
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                      className="search-form-category-dropdown"
                    >
                      <option value="">Choose</option>
                      {Bodytypes.map(createBodytypelist)}
                    </select>
                  </div>
                </div>

                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      Mileage *
                    </label>
                    <input
                      autoCapitalize="off"
                      type="text"
                      inputMode="numeric"
                      name="mileage"
                      placeholder="in km"
                      className="car-select-input"
                    ></input>
                  </div>
                </div>
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      Fuel Type *
                    </label>
                    <select
                      id="yearFrom"
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="search-form-category-dropdown"
                    >
                      <option value="">Choose</option>
                      {Fueltypes.map(createFuelTypelist)}
                    </select>
                  </div>
                </div>
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">Power</label>
                    <input
                      autoCapitalize="off"
                      type="text"
                      inputMode="numeric"
                      name="engine-power"
                      placeholder="in km"
                      className="car-select-input"
                    ></input>
                  </div>
                </div>
                <div className="car-select-dropdown-box">
                  <div>
                    <label className="car-select-dropdown-name">
                      What type of seller are you? *
                    </label>
                    <div>
                      <div className="car-seller-category">
                        <button
                          className={
                            active === "1"
                              ? "car-seller-category-btn-active"
                              : "car-seller-category-btn"
                          }
                          type="button"
                          onClick={handlesellercategory}
                          key={1}
                          id={"1"}
                        >
                          Private
                        </button>
                        <button
                          className={
                            active === "2"
                              ? "car-seller-category-btn-active"
                              : "car-seller-category-btn"
                          }
                          type="button"
                          onClick={handlesellercategory}
                          key={2}
                          id={"2"}
                        >
                          Professional
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="form-required-info">* Required information</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="car-form-submit-btn-box">
              <button className="car-form-submit-btn" onClick={handleadpage}>
                Take advantage of our free quote
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </article>

      <article className="blog-ad-section">
        <div className="blog-ad-box">
          <h2 className="blog-ad-heading">
            Find inspiration with articles and videos on our blog
          </h2>
          <div className="blog-ad-redirect-box">
            <a
              href="/blog-page"
              target="_blank"
              className="blog-ad-redirect-link"
            >
              Find more resources
            </a>
          </div>
          <ul className="blog-ad-list">
            <li className="blog-ad-list-item">
              <a href="#" target="_blank" className="blog-ad-link">
                <img
                  src="https://motopedia.otomoto.pl/_next/image?url=https%3A%2F%2Fapimotopedia.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F03%2FIMG_7708.jpg&w=992&q=70"
                  alt="blog-img"
                  className="blog-ad-img"
                ></img>
                <div className="blog-ad-name-box">
                  <p className="blog-ad-name">
                    Check how to sell effectively on Personalmoto
                  </p>
                  <p className="blog-reading-time-para">
                    <div className="blog-reading-time-icon-box">
                      <RiPagesLine
                        size={16}
                        className="blog-reading-time-icon"
                      />
                      <span className="blog-reading-time">3 min</span>
                    </div>
                  </p>
                </div>
              </a>
            </li>
            <li className="blog-ad-list-item">
              <a href="#" target="_blank" className="blog-ad-link">
                <img
                  src="https://motopedia.otomoto.pl/_next/image?url=https%3A%2F%2Fapimotopedia.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F03%2FIMG_7708.jpg&w=992&q=70"
                  alt="blog-img"
                  className="blog-ad-img"
                ></img>
                <div className="blog-ad-name-box">
                  <p className="blog-ad-name">
                    Check how to sell effectively on Personalmoto
                  </p>
                  <p className="blog-reading-time-para">
                    <div className="blog-reading-time-icon-box">
                      <RiPagesLine
                        size={16}
                        className="blog-reading-time-icon"
                      />
                      <span className="blog-reading-time">3 min</span>
                    </div>
                  </p>
                </div>
              </a>
            </li>
            <li className="blog-ad-list-item">
              <a href="#" target="_blank" className="blog-ad-link">
                <img
                  src="https://motopedia.otomoto.pl/_next/image?url=https%3A%2F%2Fapimotopedia.wpengine.com%2Fwp-content%2Fuploads%2F2023%2F03%2FIMG_7708.jpg&w=992&q=70"
                  alt="blog-img"
                  className="blog-ad-img"
                ></img>
                <div className="blog-ad-name-box">
                  <p className="blog-ad-name">
                    Check how to sell effectively on Personalmoto
                  </p>
                  <p className="blog-reading-time-para">
                    <div className="blog-reading-time-icon-box">
                      <RiPagesLine
                        size={16}
                        className="blog-reading-time-icon"
                      />
                      <span className="blog-reading-time">3 min</span>
                    </div>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </article>

      <article className="car-checklist-section">
        <h2 className="car-checklist-heading">
          A useful checklist before creating your ad
        </h2>
        <div className="car-checklist-box">
          <ul className="car-checklist-list">
            <li className="car-checklist-item">
              <img
                className="car-checklist-icon"
                src={vehicleregistration}
                type="image/svg+xml"
              ></img>
              <p className="car-checklist-item-name">
                1. Take your registration certificate
              </p>
            </li>
            <li className="car-checklist-item">
              <img
                className="car-checklist-icon"
                src={mileageimg}
                type="image/svg+xml"
              ></img>
              <p className="car-checklist-item-name">
                2. Record the vehicle's mileage
              </p>
            </li>
            <li className="car-checklist-item">
              <img
                className="car-checklist-icon"
                src={pricecalculator}
                type="image/svg+xml"
              ></img>
              <p className="car-checklist-item-name">
                3. Take your registration certificate
              </p>
            </li>
          </ul>

          <ul className="car-checklist-list list-right">
            <li className="car-checklist-item">
              <img
                className="car-checklist-icon"
                src={cleaningservice}
                type="image/svg+xml"
              ></img>
              <p className="car-checklist-item-name">
                4. Take your registration certificate
              </p>
            </li>
            <li className="car-checklist-item">
              <img
                className="car-checklist-icon"
                src={cameraimg}
                type="image/svg+xml"
              ></img>
              <p className="car-checklist-item-name">
                5. Take your registration certificate
              </p>
            </li>
            <li className="car-checklist-item">
              <img
                className="car-checklist-icon"
                src={carshineready}
                type="image/svg+xml"
              ></img>
              <p className="car-checklist-item-name">
                6. Take your registration certificate
              </p>
            </li>
          </ul>
        </div>
      </article>

      <section className="seller-ad-section">
        <div className="seller-ad-box">
          <article className="seller-ad-content">
            <figure className="seller-ad-img-area">
              <img
                src={sellerpageimg}
                alt="post-ad-img"
                className="seller-ad-img"
              ></img>
            </figure>
            <div className="seller-post-ad-box">
              <div className="seller-post-ad">
                <h4 className="seller-post-ad-heading">
                  Post your ads on Personalmoto
                </h4>
                <p className="seller-post-ad-slogan">
                  Advertise your vehicle or part and sell within 2-4 weeks.
                </p>
                <button
                  type="button"
                  className="seller-post-ad-btn"
                  onClick={handleadpage}
                >
                  <span className="seller-post-ad-btn-name">Create an ad</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Sellerpage;
