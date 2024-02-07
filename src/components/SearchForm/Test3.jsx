//Truck search form

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Searchform.css";
import "./Test.css";

import Prices from "./Price";
import Mileages from "./Mileage";
import Years from "./Year";

import Searchformlistitem from "./Searchformlistitem";
import fetchTruckBrands from "./Truckbrand";
import fetchTruckModels from "./Truckmodel";

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
      key={Vehiclemodel.Model_ID}
      vehiclemodel={Vehiclemodel.Model_Name}
    />
  );
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
const Test3 = () => {
  const [TruckModels, setTruckModels] = useState([]);
  const [TruckBrands, setTruckBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // You can perform additional actions when VehicleModels changes, if needed
    // console.log("VehicleModels updated:", VehicleModels);
  }, [TruckModels]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTruckBrands();
        setTruckBrands(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [application, setApplication] = useState("");
  const handleSearch = () => {
    // Perform search based on selected categories
    // Display search results
  };

  const handleTruckBrandChange = async (e) => {
    const selectedBrand = e.target.value;
    setVehicleBrand(selectedBrand);

    try {
      const data = await fetchTruckModels(selectedBrand);
      setTruckModels(data);
      console.log(TruckModels);
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
          <p className="search-form-category-name">Applications</p>
          <div className="search-form-category-box">
            <select
              id="application"
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="search-form-category-dropdown"
            >
              <option value="">Select Application</option>
              <option value="bus">Bus</option>
              <option value="concretemixer">Concrete mixer</option>
              <option value="tractor">Tractor</option>
              <option value="isotherms">Cold storage and isotherms</option>
              <option value="cranes">Cranes, cranes, mobile lifts</option>
              <option value="trolley">Trolley</option>
              <option value="publicutilityvehicles">
                Public utility vehicles
              </option>
              <option value="tarpaulin">Tarpaulin (curtain)</option>
              <option value="concretepump">Concrete pump</option>
              <option value="tank">Tank</option>
              <option value="towtruck">Tow truck</option>
              <option value="builtin">Built-in vehicles</option>
              <option value="container">Container</option>
              <option value="special">Special</option>
              <option value="trailer">
                Set (tractor with semi-trailer/trailer)
              </option>
              <option value="hooklifts">Hook lifts and skip loaders</option>
              <option value="accessoriestrucks">Accessories for trucks</option>
            </select>
          </div>
        </div>

        <div className="search-form-category">
          <p className="search-form-category-name">Vehicle Brand</p>
          <div className="search-form-category-box">
            <select
              id="vehicleBrand"
              value={vehicleBrand}
              onChange={handleTruckBrandChange}
              className="search-form-category-dropdown"
            >
              <option value="">Select Vehicle Brand</option>
              {TruckBrands.map(createVehicleBrandlist)}
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
              {TruckModels.map(createVehicleModellist)}
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

export default Test3;
