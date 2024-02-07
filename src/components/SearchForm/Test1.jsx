//Parts search form

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Searchform.css";
import "./Test.css";

import Bodytypes from "./Bodytype";
import fetchVehicleBrands from "./Vehiclebrand";

import fetchVehicleModels from "./Vehiclemodel";
import Searchformlistitem from "./Searchformlistitem";

function createBodytypelist(Bodytype) {
  return <Searchformlistitem key={Bodytype.id} bodytype={Bodytype.bodytype1} />;
}
function createVehicleBrandlist(Vehiclebrand) {
  return (
    <Searchformlistitem
      key={Vehiclebrand.id}
      vehiclebrand={Vehiclebrand.name}
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

const Test1 = () => {
  const [VehicleModels, setVehicleModels] = useState([]);
  const [VehicleBrands, setVehicleBrands] = useState([]);
  const navigate = useNavigate();

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
  const [bodyType, setBodyType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  const handleSearch = () => {
    // Perform search based on selected categories
    // Display search results
  };

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

  const handleRedirectSearch = () => {
    // Redirect to search page
    navigate("/search");
  };
  return (
    <div className="search-form-main-box">
      <h1 className="search-form-box-heading">What are you looking for?</h1>
      <div className="search-form-box">
        <div className="search-form-category">
          <p className="search-form-category-name">Application</p>
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
              onChange={handleVehicleBrandChange}
              className="search-form-category-dropdown"
            >
              <option value="">Select Vehicle Brand</option>
              {VehicleBrands.map(createVehicleBrandlist)}
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
              {VehicleModels.map(createVehicleModellist)}
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
              {VehicleModels.map(createVehicleBrandlist)}
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

export default Test1;
