import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";

import "./Searchresultpage.css";
import Navbar from "../NavBar/Navbar";
// import Test from "../SearchForm/Test";
import { Row, Col, Button } from "antd";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import fetchVehicleBrands from "../SearchForm/Vehiclebrand";
import fetchVehicleModels from "../SearchForm/Vehiclemodel";
import Prices from "../SearchForm/Price";
import Years from "../SearchForm/Year";
import Bodytypes from "../SearchForm/Bodytype";
import Fueltypes from "../SearchForm/Fueltype";
import Mileages from "../SearchForm/Mileage";
import Searchformlistitem from "../SearchForm/Searchformlistitem";
import Searchresultcard from "./Searchresultcard";
import axios from "../../axios/axios.config";

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
function createProductCard(Product) {
  // if (Product.status === "Active")
  return (
    <Searchresultcard
      key={Product._id}
      adType={Product.adtype}
      productId={Product._id}
      productionYear={Product.productionYear}
      image={`${process.env.REACT_APP_SERVER_URL}/Images/${Product.images[0]}`}
      name={Product.title}
      bodyType={Product.bodyType}
      year={Product.productionYear}
      mileage={Product.mileage}
      fuelType={Product.fuelType}
      distanceTravelled={Product.mileage}
      power={Product.power}
      price={Product.price}
      capacity={Product.capacity}
      gearBox={Product.gearBox}
      updatedAt={Product.updatedAt}
    />
  );
}
function Searchresultpage() {
  const [VehicleModels, setVehicleModels] = useState([]);
  const [VehicleBrands, setVehicleBrands] = useState([]);
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
  const [sortFilter, setSortFilter] = useState("");
  const [damaged, setDamaged] = useState("");
  const [searchedAds, setSearchedAds] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/search/allAds", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const data = response.data;
        setSearchedAds(data);
        console.log(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // const onChange = (key) => {
  //   console.log(key);
  // };
  // const items = [
  //   {
  //     key: "1",
  //     label: "All",
  //     children: "Content of Tab Pane 1",
  //   },
  //   {
  //     key: "2",
  //     label: "Used",
  //     children: "Content of Tab Pane 2",
  //   },
  //   {
  //     key: "3",
  //     label: "New",
  //     children: "Content of Tab Pane 3",
  //   },
  // ];

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
  const handleSearch = async (e) => {
    console.log("submit");
    e.preventDefault();
    const filters = {
      bodyType,
      vehicleBrand,
      vehicleModel,
      priceRange: { from: priceFrom, to: priceTo },
      mileageRange: { from: mileageFrom, to: mileageTo },
      yearRange: { from: yearFrom, to: yearTo },
      fuelType,
      sortFilter,
      damaged,
    };

    const searchData = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== "" &&
        (typeof value !== "object" ||
          Object.values(value).some((subValue) => subValue !== ""))
      ) {
        searchData[key] = value;
      }
    });

    // Make a request to your backend using Axios
    try {
      const response = await axios.post("/search/filters", searchData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      console.log(data);
      setSearchedAds(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="search-result-page">
      <Navbar />
      <div className="search-result-section">
        <div className="search-filters-section">
          <div className="search-filters-box">
            <form
              className="search-form"
              role="search"
              method="POST"
              onSubmit={handleSearch}
            >
              <section className="search-form-section">
                <div className="search-form-filters-box">
                  <Row gutter={[16, 16]} className="search-filters-row">
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="bodyType"
                          value={bodyType}
                          onChange={(e) => setBodyType(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Body Type</option>
                          {Bodytypes.map(createBodytypelist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="vehicleBrand"
                          value={vehicleBrand}
                          onChange={handleVehicleBrandChange}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Vehicle Brand</option>
                          {VehicleBrands.map(createVehicleBrandlist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="vehicleModel"
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          className="search-form-filter-dropdown"
                          disabled={!vehicleBrand}
                        >
                          <option value="">Vehicle Model</option>
                          {VehicleModels.map(createVehicleModellist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="vehicleBrand"
                          value={vehicleBrand}
                          onChange={(e) => setVehicleBrand(e.target.value)}
                          className="search-form-filter-dropdown"
                          disabled
                        >
                          <option value="">Generation</option>
                          {VehicleModels.map(createVehicleBrandlist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="priceFrom"
                          value={priceFrom}
                          onChange={(e) => setPriceFrom(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Price From</option>
                          {Prices.map(createPricelist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="priceTo"
                          value={priceTo}
                          onChange={(e) => setPriceTo(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Price To</option>
                          {Prices.map(createPricelist)}
                        </select>
                      </div>
                    </Col>

                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="yearFrom"
                          value={yearFrom}
                          onChange={(e) => setYearFrom(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Year From</option>
                          {Years.map(createYearlist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="yearTo"
                          value={yearTo}
                          onChange={(e) => setYearTo(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Year To</option>
                          {Years.map(createYearlist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="mileageFrom"
                          value={mileageFrom}
                          onChange={(e) => setMileageFrom(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Mileage From</option>
                          {Mileages.map(createMileagelist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="mileageTo"
                          value={mileageTo}
                          onChange={(e) => setMileageTo(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Mileage To</option>
                          {Mileages.map(createMileagelist)}
                        </select>
                      </div>
                    </Col>

                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="fuelType"
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Fuel Type</option>
                          {Fueltypes.map(createFuelTypelist)}
                        </select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div className="search-form-filter-box">
                        <select
                          id="damaged"
                          value={damaged}
                          onChange={(e) => setDamaged(e.target.value)}
                          className="search-form-filter-dropdown"
                        >
                          <option value="">Damage condition</option>
                          <option value="Any">Any</option>
                          <option value="Damaged">Damaged</option>
                          <option value="Undamaged">Undamaged</option>
                        </select>
                      </div>
                    </Col>
                    <Col span={8}>
                      <input
                        className="search-form-filter-dropdown search-form-filter-input"
                        placeholder="Others, models, brands.. "
                      ></input>
                    </Col>
                    <Col span={4}>
                      <Button
                        type="primary submit"
                        icon={<SearchOutlined />}
                        className="search-form-filter-btn"
                        htmlType="submit"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </div>
              </section>
            </form>
          </div>
        </div>

        <div className="search-result-section-o">
          <div className="search-result-section-i">
            <div className="search-result-box">
              <div className="search-result-box-i">
                <div className="search-result-header">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="result-heading-box">
                        <h4 className="result-heading">Cars</h4>
                        <p className="result-value-heading">
                          Number of ads: 258,258
                        </p>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="add-wishlist-box">
                        <Button
                          className="add-wishlist-btn"
                          icon={<BellFilled />}
                        >
                          Add to Wishlist
                        </Button>
                        <Button className="add-wishlist-btn" hidden>
                          Remove from Wishlist
                        </Button>
                      </div>
                    </Col>
                    <Col span={12}>
                      {/* <div className="sort-result-tab-box">
                        <Tabs
                          defaultActiveKey="1"
                          items={items}
                          onChange={onChange}
                        />
                      </div> */}
                    </Col>
                    <Col span={12}>
                      <div className="search-form-filter-box sort-filter-box">
                        <select
                          id="sortFilter"
                          value={sortFilter}
                          onChange={(e) => setSortFilter(e.target.value)}
                          className="search-form-category-dropdown"
                        >
                          <option value="">Sort By</option>
                          <option value="Featured">Featured</option>
                          <option value="Latest">Latest</option>
                          <option value="LowerPrice">Price: Lower First</option>
                          <option value="HighPrice">
                            Price: Highest First
                          </option>
                          <option value="LowMileage">Lowest Mileage</option>
                          <option value="HighMileage">Highest Mileage</option>
                          <option value="LowEngine">Lowest engine power</option>
                          <option value="HighEngine">
                            Highest engine power
                          </option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row align="vertical" gutter={[8, 16]}>
                  {searchedAds?.map(createProductCard)}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchresultpage;
