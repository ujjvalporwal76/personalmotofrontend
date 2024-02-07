//Motorcycle search form

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Searchform.css";
import "./Test.css";

import Bodytypes from "./Bodytype";
import fetchMotorBrands from "./Motorbrand";
import fetchMotorModels from "./Motormodel";
import Fueltypes from "./Fueltype";
import Prices from "./Price";
import Mileages from "./Mileage";
import Years from "./Year";

import Searchformlistitem from "./Searchformlistitem";

function createBodytypelist(Bodytype) {
  return <Searchformlistitem key={Bodytype.id} bodytype={Bodytype.bodytype1} />;
}
function createVehicleBrandlist(Vehiclebrand) {
  return (
    <Searchformlistitem
      key={Vehiclebrand.MakeId}
      vehiclebrand={Vehiclebrand.MakeName}
    />
  );
}
function createVehicleModellist(Vehiclemodel) {
  return (
    <Searchformlistitem
      key={Vehiclemodel.id}
      vehiclemodel={Vehiclemodel.name}
    />
  );
}
function createFuelTypelist(Fueltype) {
  return <Searchformlistitem key={Fueltype.id} fueltype={Fueltype.fuelType} />;
}

function createPricelist(Price) {
  return <Searchformlistitem key={Price.id} price={Price.price} />;
}

function createMileagelist(Mileage) {
  return <Searchformlistitem key={Mileage.id} mileage={Mileage.mileage} />;
}
function createYearlist(Year) {
  return <Searchformlistitem key={Year.id} year={Year.year} />;
}
const Test2 = () => {
  const [MotorModels, setMotorModels] = useState([]);
  const [MotorBrands, setMotorBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // You can perform additional actions when VehicleModels changes, if needed
    // console.log("VehicleModels updated:", VehicleModels);
  }, [MotorModels]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMotorBrands();
        setMotorBrands(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [bodyType, setBodyType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");

  const handleSearch = () => {
    // Perform search based on selected categories
    // Display search results
  };

  const handleMotorBrandChange = async (e) => {
    const selectedBrand = e.target.value;
    setVehicleBrand(selectedBrand);

    try {
      const data = await fetchMotorModels(selectedBrand);
      setMotorModels(data);
      console.log(MotorModels);
      // Do something with the data, e.g., update the state or log it
      console.log(data);
    } catch (error) {
      // Handle errors if needed
      console.error(error);
    }
  };

  const handleRedirectSearch = () => {
    // Redirect to search page
    navigate("/search");
  };
  return (
    <div className="search-form-main-box">
      <h1 className="search-form-box-heading">What are you looking for?</h1>
      <div className="search-form-box">
        <div className="search-form-category">
          <p className="search-form-category-name">Body Type</p>
          <div className="search-form-category-box">
            <select
              id="bodyType"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">Select Body Type</option>
              {Bodytypes.map(createBodytypelist)}
            </select>
          </div>
        </div>

        <div className="search-form-category">
          <p className="search-form-category-name">Vehicle Brand</p>
          <div className="search-form-category-box">
            <select
              id="vehicleBrand"
              value={vehicleBrand}
              onChange={handleMotorBrandChange}
              className="search-form-category-dropdown"
            >
              <option value="">Select Vehicle Brand</option>
              {MotorBrands.map(createVehicleBrandlist)}
            </select>
          </div>
        </div>
        <div className="search-form-category">
          <p className="search-form-category-name">Vehicle Model</p>
          <div className="search-form-category-box">
            <select
              id="vehicleModel"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className="search-form-category-dropdown"
              disabled={!vehicleBrand}
            >
              <option value="">Select Vehicle Model</option>
              {MotorModels.map(createVehicleModellist)}
            </select>
          </div>
        </div>
        <div className="search-form-category">
          <p className="search-form-category-name">Generation</p>
          <div className="search-form-category-box">
            <select
              id="vehicleBrand"
              value={vehicleBrand}
              onChange={(e) => setVehicleBrand(e.target.value)}
              className="search-form-category-dropdown"
              disabled
            >
              <option value="">Select Generation</option>
              {/* {MotorModels.map(createVehicleBrandlist)} */}
            </select>
          </div>
        </div>
        <div className="search-form-category">
          <p className="search-form-category-name">Price Range</p>
          <div className="search-form-category-box">
            <select
              id="priceFrom"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">From</option>
              {Prices.map(createPricelist)}
            </select>
            <select
              id="priceTo"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">Down</option>
              {Prices.map(createPricelist)}
            </select>
          </div>
        </div>

        <div className="search-form-category">
          <p className="search-form-category-name">Fuel Type</p>
          <div className="search-form-category-box">
            <select
              id="fuelType"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">Select Fuel Type</option>
              {Fueltypes.map(createFuelTypelist)}
            </select>
          </div>
        </div>

        <div className="search-form-category">
          <p className="search-form-category-name">Production Year</p>
          <div className="search-form-category-box">
            <select
              id="yearFrom"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">From</option>
              {Years.map(createYearlist)}
            </select>
            <select
              id="yearTo"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">Down</option>
              {Years.map(createYearlist)}
            </select>
          </div>
        </div>
        <div className="search-form-category">
          <p className="search-form-category-name">Mileage Range</p>
          <div className="search-form-category-box">
            <select
              id="mileageFrom"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">From</option>
              {Mileages.map(createMileagelist)}
            </select>
            <select
              id="mileageTo"
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">Down</option>
              {Mileages.map(createMileagelist)}
            </select>
          </div>
        </div>

        <Button
          className="search-form-submit-btn"
          onClick={handleRedirectSearch}
        >
          Show Results
        </Button>
      </div>
    </div>
  );
};

export default Test2;
