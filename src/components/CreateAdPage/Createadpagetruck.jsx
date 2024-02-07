import React, { useState, useRef, useEffect } from "react";
import axios from "../../axios/axios.config";
import { FcIdea } from "react-icons/fc";
import { BiErrorCircle } from "react-icons/bi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { Form } from "react-bootstrap";
import cameraimg from "../../images/cameraimg.svg";
import "./Createadpage.css";
import Navbar from "../NavBar/Navbar";
import Searchformlistitem from "../SearchForm/Searchformlistitem";

import Years from "../SearchForm/Year";

import Colors from "../SearchForm/Color";
import Currencies from "../SearchForm/Currency";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import fetchTruckBrands from "../SearchForm/Truckbrand";
import fetchTruckModels from "../SearchForm/Truckmodel";

function createYearlist(Year) {
  return <Searchformlistitem key={Year.id} year={Year.year} />;
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
      key={Vehiclemodel.Model_ID}
      vehiclemodel={Vehiclemodel.Model_Name}
    />
  );
}

function createColorlist(Color) {
  return <Searchformlistitem key={Color.id} color={Color.color} />;
}

function createCurrencylist(Currency) {
  return <Searchformlistitem key={Currency.id} currency={Currency.currency} />;
}

function Createadpagetruck() {
  const navigate = useNavigate();

  const subTruck = useParams();
  const [TruckModels, setTruckModels] = useState([]);
  const [TruckBrands, setTruckBrands] = useState([]);

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

  const handleTruckBrandChange = async (e) => {
    const selectedBrand = e.target.value;

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
  const [damageSelect, setDamageSelect] = useState(false);
  const [steeringRight, setSteeringRight] = useState(false);
  const [priceSelect, setPriceSelect] = useState(false);

  const [vinFilled, setVinFilled] = useState(true);
  const [mileageFilled, setMileageFilled] = useState(true);
  const [powerFilled, setPowerFilled] = useState(true);

  const [priceFilled, setPriceFilled] = useState(true);

  const [aside, setAside] = useState(false);
  const imageUploadInput = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const [adFormValues, setAdFormValues] = useState({
    productType: "",
    damaged: "NO",
    category: "truck",
    steeringRight: "NO",
    vin: "",
    mileage: "",
    registration: "",
    registrationDate: "",
    productionYear: "",
    vehicleBrand: "",
    vehicleModel: "",
    fuelType: "",
    power: "",
    displacement: "",
    capacity: "",
    gearBox: "",
    emission: "",
    color: "",
    axle: "",
    package: "",
    grossWeight: "",
    ytVideo: "",
    title: "",
    description: "",
    netPrice: "gross",
    price: "",
    currency: "",
    sellerName: "",
    postalCode: "",
    telephone: "",

    images: [],
  });
  // let style = {transform : `rotate(90deg)`};
  function handledamageselect() {
    setDamageSelect(!damageSelect);
  }
  function handleSteeringSelect() {
    setSteeringRight(!steeringRight);
  }
  function handlePriceSelect() {
    setPriceSelect(!priceSelect);
  }

  function handleAsideShow() {
    setAside(!aside);
  }

  function triggerImageUploader1() {
    imageUploadInput.current.click();
  }
  function triggerImageUploader2() {
    imageUploadInput.current.click();
  }
  // function handleSelectFile(e) {
  //   handleAdFormValues("images");
  //   const selectedFiles = e.target.files;

  //   console.log(selectedFiles);
  //   // if (!selectedFiles || !selectedFiles[0]) return null;
  //   setIsImageSelected(true);
  //   const selectedFilesArray = Array.from(selectedFiles);

  //   setSelectedImages((previousImages) =>
  //     previousImages.concat(selectedFilesArray)
  //   );

  //   setAdFormValues({
  //     ...adFormValues,
  //     images: [...selectedFilesArray],
  //   });
  // }
  const handleSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const blobURLs = selectedFilesArray.map((file) =>
      URL.createObjectURL(file)
    );
    setIsImageSelected(true);
    setSelectedImages((previousImages) =>
      previousImages.concat(selectedFilesArray)
    );

    setAdFormValues((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...selectedFilesArray],
    }));
    setShowImages((previousShowImages) => [...previousShowImages, ...blobURLs]);
    // console.log(showImages);
    // console.log(adFormValues.images);
  };

  //Handling form submit
  async function handleAdForm(e) {
    e.preventDefault();

    const formData = new FormData();

    // Iterate over the adFormValues state variable and append each field to the FormData object
    for (const key of Object.keys(adFormValues)) {
      const value = adFormValues[key];

      if (key === "images") {
        for (const image of value) {
          formData.append("images", image);
        }
      } else {
        formData.append(key, value);
      }
    }

    // Console.log the image strings
    // console.log(adFormValues.images);

    // Send the FormData object to the backend
    try {
      const response = await axios.post("/pages/create-ad-page", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
      });

      // Handle the response
      const data = await response.data;

      if (response.status === 201) {
        toast.success("Your ad is saved successfully");
        console.log(data.adId);
        navigate(`payment/adplanselect/${data.adId}`);
        // console.log(data);
      }
    } catch (error) {
      toast.error("An error occurred while saving your ad or you logged out");
      // console.log(error);
    }
  }

  //Handling form Values
  const handleAdFormValues = (prop) => (e) => {
    let redirectTo = "/create-ad-page/";
    switch (prop) {
      case "productType":
        // Determine the appropriate URL based on the selected category

        switch (e.target.value) {
          case "personal":
            redirectTo += "personal";
            break;
          case "motorcycle":
            redirectTo += "motorcycle";
            break;
          case "autoparts":
          case "motorcycleparts":
          case "truckparts":
          case "deliveryparts":
          case "vehicleforparts":

          case "agriculturalparts":
          case "constructionparts":
            redirectTo += "parts/" + e.target.value;
            break;
          case "bus":
          case "concretemixer":
          case "tractor":
          case "isotherms":
          case "cranes":
          case "trolley":
          case "publicutilityvehicles":
          case "tarpaulin":
          case "concretepump":
          case "tank":
          case "towtruck":
          case "builtin":
          case "container":
          case "special":
          case "trailer":
          case "hooklifts":
          case "accessoriestrucks":
            redirectTo += "trucks/" + e.target.value;
            break;
          default:
            redirectTo += "personal";
        }

        // Redirect to the determined URL
        navigate(redirectTo);

        break;
      default:
        redirectTo += "personal";
    }
    setAdFormValues({
      ...adFormValues,
      [prop]: e.target.value,
    });
    if (prop === "images") {
      setAdFormValues({
        ...adFormValues,
        [prop]: selectedImages,
      });
      // console.log("image", adFormValues.images);
    }
    if (prop === "showRegistrationCheck" || prop === "freeVerificationCheck") {
      // Update the adFormValues state variable with the selected value.
      setAdFormValues((prevAdFormValues) => ({
        ...prevAdFormValues,
        [prop]: e.target.checked,
      }));
    }
    if (adFormValues.vin.length < 17) {
      setVinFilled(false);
    } else {
      setVinFilled(true);
    }
    if (adFormValues.mileage.length < 1) {
      setMileageFilled(false);
    } else {
      setMileageFilled(true);
    }
    if (adFormValues.power.length < 1) {
      setPowerFilled(false);
    } else {
      setPowerFilled(true);
    }

    if (adFormValues.price.length < 1) {
      setPriceFilled(false);
    } else {
      setPriceFilled(true);
    }
  };
  const handleImageDelete = (index) => {
    // Make a copy of the selectedImages array and remove the selected image
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);

    // Make a copy of the showImages array and remove the selected image
    const updatedShowImages = [...showImages];
    updatedShowImages.splice(index, 1);

    // Update the state with the modified arrays
    setSelectedImages(updatedSelectedImages);
    setShowImages(updatedShowImages);

    // Update the adFormValues if needed
    setAdFormValues((prevState) => ({
      ...prevState,
      images: updatedSelectedImages,
    }));
  };

  return (
    <div className="create-ad-page">
      <Navbar />
      <div className="create-ad-section">
        {/* Create-ad-form */}
        <form
          className="create-ad-form"
          onSubmit={handleAdForm}
          method="POST"
          enctype="multipart/form-data"
        >
          <div className="create-ad-form-box">
            <section>
              <div className="ad-form-header">
                <h1 className="ad-form-heading">Create an Truck ad</h1>
                <div className="ad-form-category-box">
                  <div className="ad-form-category">
                    <select
                      id="productType"
                      value={adFormValues.productType}
                      className=""
                      onChange={handleAdFormValues("productType")}
                    >
                      <option value="">Select Product Type</option>
                      <option value="personal">Personal</option>
                      <option value="motorcycle">Motorcycle</option>
                      <optgroup label="Parts">
                        <option value="autoparts">Auto Parts</option>
                        <option value="motorcycleparts">
                          Motorcycle Parts
                        </option>
                        <option value="truckparts">Parts for trucks</option>
                        <option value="deliveryparts">
                          Parts for delivery vehicles
                        </option>
                        <option value="vehicleforparts">
                          Vehicle for parts
                        </option>

                        <option value="agriculturalparts">
                          Parts for vehicles and agricultural machines
                        </option>
                        <option value="constructionparts">
                          Parts for vehicles and construction machines
                        </option>

                        {/* Add more specific parts options as needed */}
                      </optgroup>
                      <optgroup label="Trucks">
                        <option value="bus">Bus</option>
                        <option value="concretemixer">Concrete mixer</option>
                        <option value="tractor">Tractor</option>
                        <option value="isotherms">
                          Cold storage and isotherms
                        </option>
                        <option value="cranes">
                          Cranes, cranes, mobile lifts
                        </option>
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
                        <option value="hooklifts">
                          Hook lifts and skip loaders
                        </option>
                        <option value="accessoriestrucks">
                          Accessories for trucks
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              <section className="vehicle-details-section">
                {/* Vehicle Data         */}
                <div>
                  <div className="vehicle-details-header">
                    <div className="vehicle-details-header-box">
                      <h3 className="vehicle-details-heading">Vehicle Data</h3>
                    </div>
                  </div>
                  {/* Main Feature */}

                  <div>
                    <div className="vehicle-details-fill-box">
                      <div className="vehicle-details-fill-header">
                        <h5 className="vehicle-details-fill-heading">
                          Main Features
                        </h5>
                      </div>
                      <div className="vehicle-feature-select vehicle-main-feature-data">
                        <div className="vehicle-feature-select-box-o">
                          <div className="vehicle-feature-select-box-i">
                            <div className="vehicle-feature-select-name vehicle-feature-select-box">
                              Damaged
                            </div>
                            <div className="vehicle-feature-select-opt vehicle-feature-select-box">
                              <div
                                id="damage-data"
                                className="vehicle-feature-opt-box"
                              >
                                <div
                                  className={
                                    damageSelect
                                      ? "vehicle-feature-opt"
                                      : "vehicle-feature-opt-sel"
                                  }
                                >
                                  <input
                                    type="button"
                                    className="vehicle-feature-opt-btn"
                                    onClick={handledamageselect}
                                    onClickCapture={handleAdFormValues(
                                      "damaged"
                                    )}
                                    value="NO"
                                  ></input>
                                </div>
                                <div
                                  className={
                                    !damageSelect
                                      ? "vehicle-feature-opt"
                                      : "vehicle-feature-opt-sel"
                                  }
                                >
                                  <input
                                    type="button"
                                    className="vehicle-feature-opt-btn"
                                    onClick={handledamageselect}
                                    onClickCapture={handleAdFormValues(
                                      "damaged"
                                    )}
                                    value="YES"
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="vehicle-feature-select vehicle-main-feature-data">
                        <div className="vehicle-feature-select-box-o">
                          <div className="vehicle-feature-select-box-i">
                            <div className="vehicle-feature-select-name vehicle-feature-select-box">
                              Steering wheel on the right (English)
                            </div>
                            <div className="vehicle-feature-select-opt vehicle-feature-select-box">
                              <div
                                id="steering-data"
                                className="vehicle-feature-opt-box"
                              >
                                <div
                                  className={
                                    steeringRight
                                      ? "vehicle-feature-opt"
                                      : "vehicle-feature-opt-sel"
                                  }
                                >
                                  <input
                                    type="button"
                                    className="vehicle-feature-opt-btn"
                                    onClick={handleSteeringSelect}
                                    onClickCapture={handleAdFormValues(
                                      "steeringRight"
                                    )}
                                    value="NO"
                                  ></input>
                                </div>
                                <div
                                  className={
                                    !steeringRight
                                      ? "vehicle-feature-opt"
                                      : "vehicle-feature-opt-sel"
                                  }
                                >
                                  <input
                                    type="button"
                                    className="vehicle-feature-opt-btn"
                                    onClick={handleSteeringSelect}
                                    onClickCapture={handleAdFormValues(
                                      "steeringRight"
                                    )}
                                    value="YES"
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}

                  <div>
                    <div className="vehicle-details-fill-box">
                      <div className="vehicle-details-fill-header">
                        <h5 className="vehicle-details-fill-heading">
                          Basic Information
                        </h5>
                      </div>
                      <div className="basic-info-tip-box">
                        <FcIdea className="basic-info-tip-icon" />
                        <p className="basic-info-tip">
                          Enter your VIN and we will automatically complete the
                          information for you, if possible.
                        </p>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="vin" className="info-input-box-n">
                              <label className="info-input-label">VIN*</label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    // maxLength={17}
                                    placeholder="e.g. 1FTPW14V88FC22108"
                                    required
                                    name="vin"
                                    className={
                                      vinFilled
                                        ? "info-input-f"
                                        : "info-input-nf"
                                    }
                                    onChange={handleAdFormValues("vin")}
                                    value={adFormValues.vin}
                                  ></input>
                                  <BiErrorCircle
                                    className={
                                      vinFilled
                                        ? "info-input-icon-f"
                                        : "info-input-icon-nf"
                                    }
                                  />
                                </div>
                              </div>
                              <p
                                className={
                                  vinFilled
                                    ? "info-input-warning-f"
                                    : "info-input-warning-nf"
                                }
                              >
                                Complete this field. The VIN number should
                                consist of 17 characters.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="mileage" className="info-input-box-n">
                              <label className="info-input-label">
                                Mileage*
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 100,000 km"
                                    required
                                    name="mileage"
                                    min={1}
                                    max={3000000}
                                    className={
                                      mileageFilled
                                        ? "info-input-f"
                                        : "info-input-nf"
                                    }
                                    onChange={handleAdFormValues("mileage")}
                                    value={adFormValues.mileage}
                                  ></input>
                                  <BiErrorCircle
                                    className={
                                      mileageFilled
                                        ? "info-input-icon-f"
                                        : "info-input-icon-nf"
                                    }
                                  />
                                </div>
                              </div>
                              <p
                                className={
                                  mileageFilled
                                    ? "info-input-warning-f"
                                    : "info-input-warning-nf"
                                }
                              >
                                Complete this field.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="registration" className="info-input-box-n">
                              <label className="info-input-label">
                                Vehicle registration number
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. WA6642E"
                                    required
                                    name="registration"
                                    className="info-input-f"
                                    onChange={handleAdFormValues(
                                      "registration"
                                    )}
                                    value={adFormValues.registration}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="date" className="info-input-box-n">
                              <label className="info-input-label">
                                Date of first registration in the vehicle's
                                history
                              </label>
                              <div className="info-input-date-box">
                                <div className="info-input-box-i">
                                  <div className="info-input-box-u">
                                    <input
                                      autoComplete="off"
                                      type="text"
                                      placeholder="DD/MM/YYYY"
                                      required
                                      name="date"
                                      className="info-input-f"
                                      onChange={handleAdFormValues(
                                        "registrationDate"
                                      )}
                                      value={adFormValues.registrationDate}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="info-reg-check-box">
                        <div className="info-reg-check">
                          <Form.Check
                            checked={adFormValues.showRegistrationCheck}
                            onChange={handleAdFormValues(
                              "showRegistrationCheck"
                            )}
                          ></Form.Check>
                          <p className="info-reg-check-name">
                            Do not show the registration number in the ad
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Technical Data           */}

                  <div>
                    <div className="vehicle-details-fill-box">
                      <div className="vehicle-details-fill-header">
                        <h5 className="vehicle-details-fill-heading">
                          Technical Data
                        </h5>
                      </div>

                      <div className="technical-tip-box">
                        <p className="technical-tip">
                          Attention! Check the vehicle details before publishing
                          the ad. Editing errors regarding the brand, model,
                          year and the new/used parameter will only be available
                          for 24 hours from the moment the ad is added .
                        </p>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div
                              id="productionYear"
                              className="info-input-box-n"
                            >
                              <label className="info-input-label">
                                Year of Production *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <select
                                    id="productionYear"
                                    value={adFormValues.productionYear}
                                    onChange={handleAdFormValues(
                                      "productionYear"
                                    )}
                                    className="search-form-category-dropdown"
                                  >
                                    <option value="">Choose</option>
                                    {Years.map(createYearlist)}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="vehicleBrand" className="info-input-box-n">
                              <label className="info-input-label">
                                Vehicle Brand *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <select
                                    id="vehicleBrand"
                                    value={adFormValues.vehicleBrand}
                                    onChange={handleAdFormValues(
                                      "vehicleBrand"
                                    )}
                                    onChangeCapture={handleTruckBrandChange}
                                    className="search-form-category-dropdown"
                                  >
                                    <option value="">Choose</option>
                                    {TruckBrands.map(createVehicleBrandlist)}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="vehicleModel" className="info-input-box-n">
                              <label className="info-input-label">
                                Vehicle Model *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <select
                                    id="vehicleModel"
                                    value={adFormValues.vehicleModel}
                                    onChange={handleAdFormValues(
                                      "vehicleModel"
                                    )}
                                    className="search-form-category-dropdown"
                                    disabled={!adFormValues.vehicleBrand}
                                  >
                                    <option value="">Choose</option>
                                    {TruckModels.map(createVehicleModellist)}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div
                              id="truckFuelType"
                              className="info-input-box-n"
                            >
                              <label className="info-input-label">
                                Fuel Type *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <select
                                    id="truckFuelType"
                                    value={adFormValues.fuelType}
                                    onChange={handleAdFormValues("fuelType")}
                                    className="search-form-category-dropdown"
                                  >
                                    <option value="">Choose</option>
                                    <option value="Gas">Gas</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="CNG">CNG</option>
                                    <option value="LNG">LNG</option>
                                    <option value="Petrol+LPG">
                                      Petrol+LPG
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="power" className="info-input-box-n">
                              <label className="info-input-label">
                                Power *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 100,000 km"
                                    required
                                    name="engine_power"
                                    min={1}
                                    max={1500}
                                    className={
                                      powerFilled
                                        ? "info-input-f"
                                        : "info-input-nf"
                                    }
                                    onChange={handleAdFormValues("power")}
                                    value={adFormValues.power}
                                  ></input>
                                  <BiErrorCircle
                                    className={
                                      powerFilled
                                        ? "info-input-icon-f"
                                        : "info-input-icon-nf"
                                    }
                                  />
                                </div>
                              </div>
                              <p
                                className={
                                  powerFilled
                                    ? "info-input-warning-f"
                                    : "info-input-warning-nf"
                                }
                              >
                                Complete this field.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="displacement" className="info-input-box-n">
                              <label className="info-input-label">
                                Displacement *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 1,395 cm3"
                                    required
                                    name="engine_displacement"
                                    min={400}
                                    max={9000}
                                    className="info-input-f"
                                    onChange={handleAdFormValues(
                                      "displacement"
                                    )}
                                    value={adFormValues.displacement}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="truckGearBox" className="info-input-box-n">
                              <label className="info-input-label">
                                Gearbox *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <select
                                    id="truckGearBox"
                                    value={adFormValues.gearBox}
                                    onChange={handleAdFormValues("gearBox")}
                                    className="search-form-category-dropdown"
                                  >
                                    <option value="">Choose</option>
                                    <option value="Automatic">Automatic</option>

                                    <option value="Manual">Manual</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="emission" className="info-input-box-n">
                              <label className="info-input-label">
                                Co2 emission
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 6 g/km"
                                    name="emission"
                                    className="info-input-f"
                                    onChange={handleAdFormValues("emission")}
                                    value={adFormValues.emission}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="color" className="info-input-box-n">
                              <label className="info-input-label">
                                Color *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <select
                                    id="color"
                                    value={adFormValues.color}
                                    onChange={handleAdFormValues("color")}
                                    className="search-form-category-dropdown"
                                  >
                                    <option value="">Choose</option>
                                    {Colors.map(createColorlist)}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="axle" className="info-input-box-n">
                              <label className="info-input-label">
                                Number of axles *
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="number"
                                    name="axle"
                                    className="info-input-f"
                                    onChange={handleAdFormValues("axle")}
                                    value={adFormValues.axle}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="capacity" className="info-input-box-n">
                              <label className="info-input-label">
                                Capacity
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 95 m3"
                                    name="capacity"
                                    className="info-input-f"
                                    onChange={handleAdFormValues("capacity")}
                                    value={adFormValues.capacity}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="package" className="info-input-box-n">
                              <label className="info-input-label">
                                Allowed package
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 100 kg"
                                    name="package"
                                    className="info-input-f"
                                    onChange={handleAdFormValues("package")}
                                    value={adFormValues.package}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="info-input-box">
                        <div>
                          <div className="info-input-box-o">
                            <div id="grossWeight" className="info-input-box-n">
                              <label className="info-input-label">
                                Permissible gross weight
                              </label>
                              <div className="info-input-box-i">
                                <div className="info-input-box-u">
                                  <input
                                    autoComplete="off"
                                    type="text"
                                    placeholder="e.g. 100 kg"
                                    name="grossWeight"
                                    className="info-input-f"
                                    onChange={handleAdFormValues("grossWeight")}
                                    value={adFormValues.grossWeight}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Vehicle Media Data */}

              <section className="vehicle-media-section">
                <div>
                  <div className="vehicle-media-header">
                    <div className="vehicle-media-header-box">
                      <h3 className="vehicle-media-heading">Photos</h3>
                    </div>
                  </div>

                  <div className="vehicle-media-fill-box">
                    <div className="media-input-box">
                      <div className="media-input-box-o">
                        <div
                          className={
                            isImageSelected
                              ? "media-input-box-i-uploaded"
                              : "media-input-box-i"
                          }
                        >
                          <input
                            type="file"
                            name="images"
                            ref={imageUploadInput}
                            className="image-upload-input"
                            multiple
                            accept="image/png, image/jpeg, image/webp, image/jpg"
                            onChange={handleSelectFile}
                          ></input>
                          {!isImageSelected ? (
                            ""
                          ) : (
                            <p className="media-format-no media-format-main">
                              The first photo will be the main photo. Drag
                              photos to different places to change their order.
                            </p>
                          )}
                          {!isImageSelected ? (
                            <div>
                              <div className="media-add-files-box">
                                <button
                                  type="button"
                                  className="media-add-btn"
                                  onClick={triggerImageUploader1}
                                >
                                  Add photos
                                </button>
                                <p className="media-drop-p">
                                  or drop files here
                                </p>
                              </div>
                              <p className="media-format-no">
                                Add up to 40 photos in jpg, png or gif formats.
                              </p>
                            </div>
                          ) : (
                            <ol
                              id="preview-image-gallery"
                              className={
                                isImageSelected
                                  ? "preview-image-list"
                                  : "preview-image-list-hide"
                              }
                            >
                              {showImages.map((image, index) => {
                                return (
                                  <li
                                    className="preview-image-item"
                                    key={index}
                                  >
                                    <div
                                      className="preview-image"
                                      style={{
                                        backgroundImage: `url(${image})`,
                                      }}
                                    ></div>
                                    <div className="preview-image-delete-box">
                                      <button
                                        className="preview-image-delete-btn preview-image-btns"
                                        type="button"
                                        onClick={() => handleImageDelete(index)}
                                      >
                                        <span className="preview-image-icon-span">
                                          <span className="preview-image-icon">
                                            <RiDeleteBin6Line />
                                          </span>
                                        </span>
                                      </button>
                                    </div>
                                  </li>
                                );
                              })}
                              <button
                                type="button"
                                className="ad-image-add-btn media-add-btn"
                                onClick={triggerImageUploader2}
                              >
                                +
                              </button>
                            </ol>
                          )}
                        </div>
                        <div className="media-drop-box">
                          <img src={cameraimg} alt="camera-img"></img>
                          <h3>Drop files here</h3>
                        </div>
                      </div>
                    </div>
                    <div className="media-input-box">
                      <div className="media-input-tip-box">
                        <FcIdea className="media-tip-icon" />
                        <p className="media-tip">
                          Your ad may be more attractive if you add a link to a
                          YouTube video presenting the vehicle for sale
                        </p>
                      </div>
                      <div className="yt-video-link-box">
                        <div className="info-input-box">
                          <div>
                            <div className="info-input-box-o">
                              <div id="video" className="info-input-box-n">
                                <label className="info-input-label">
                                  Video on YouTube
                                </label>
                                <div className="info-input-box-i">
                                  <div className="info-input-box-u">
                                    <input
                                      autoComplete="off"
                                      type="text"
                                      placeholder="e.g. https://www.youtube.com/watch?v=LGT5ZQr8uwo"
                                      name="video"
                                      className="info-input-f"
                                      onChange={handleAdFormValues("ytVideo")}
                                      value={adFormValues.ytVideo}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Vehicle Description Data */}

              <section className="vehicle-description-section">
                <div className="vehicle-description-header">
                  <div className="vehicle-description-header-box">
                    <h3 className="vehicle-description-heading">Description</h3>
                  </div>
                </div>
                <div className="description-title-box">
                  <div className="info-input-box">
                    <div>
                      <div className="info-input-box-o">
                        <div id="title" className="info-input-box-n">
                          <label className="info-input-label">Ad Title</label>
                          <div className="info-input-box-i">
                            <div className="info-input-box-u">
                              <input
                                autoComplete="off"
                                type="text"
                                placeholder="e.g. first owner, perfect condition, new battery"
                                name="title"
                                className="info-input-f"
                                onChange={handleAdFormValues("title")}
                                value={adFormValues.title}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="description-box-area">
                  <div className="info-input-box">
                    <div>
                      <div className="info-input-box-o">
                        <div id="description" className="info-input-box-n">
                          <label className="info-input-label">
                            Description
                          </label>
                          <div className="info-input-box-i">
                            <div className="info-input-box-u">
                              <textarea
                                autoComplete="off"
                                type="text"
                                rows={10}
                                maxLength={6000}
                                minLength={30}
                                aria-invalid="false"
                                name="description"
                                className="info-input-f"
                                onChange={handleAdFormValues("description")}
                                value={adFormValues.description}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Vehicle Price Data */}

              <section className="vehicle-price-section">
                <div>
                  <div className="vehicle-price-header">
                    <div className="vehicle-price-header-box">
                      <h3 className="vehicle-price-heading">Price</h3>
                    </div>
                  </div>
                  <div className="vehicle-details-fill-box">
                    <div className="vehicle-feature-select vehicle-main-feature-data">
                      <div className="vehicle-feature-select-box-o">
                        <div className="vehicle-feature-select-box-i">
                          <div className="vehicle-feature-select-name vehicle-feature-select-box">
                            Net Price
                          </div>
                          <div className="vehicle-feature-select-opt vehicle-feature-select-box">
                            <div
                              id="price-data"
                              className="vehicle-feature-opt-box"
                            >
                              <div
                                className={
                                  priceSelect
                                    ? "vehicle-feature-opt"
                                    : "vehicle-feature-opt-sel"
                                }
                              >
                                <input
                                  type="button"
                                  className="vehicle-feature-opt-btn"
                                  onClick={handlePriceSelect}
                                  onClickCapture={handleAdFormValues(
                                    "netPrice"
                                  )}
                                  value="Gross"
                                ></input>
                              </div>
                              <div
                                className={
                                  !priceSelect
                                    ? "vehicle-feature-opt"
                                    : "vehicle-feature-opt-sel"
                                }
                              >
                                <input
                                  type="button"
                                  className="vehicle-feature-opt-btn"
                                  onClick={handlePriceSelect}
                                  onClickCapture={handleAdFormValues(
                                    "netPrice"
                                  )}
                                  value="Net"
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="price-info-input-box">
                      <div>
                        <div className="info-input-box-o">
                          <div id="price" className="info-input-box-n">
                            <label className="info-input-label">Price *</label>
                            <div className="info-input-box-i">
                              <div className="info-input-box-u">
                                <input
                                  autoComplete="off"
                                  type="text"
                                  placeholder="e.g. 1,000"
                                  required
                                  name="price"
                                  min={400}
                                  className={
                                    priceFilled
                                      ? "info-input-f"
                                      : "info-input-nf"
                                  }
                                  onChange={handleAdFormValues("price")}
                                  value={adFormValues.price}
                                ></input>
                                <BiErrorCircle
                                  className={
                                    priceFilled
                                      ? "info-input-icon-f"
                                      : "info-input-icon-nf"
                                  }
                                />
                              </div>
                            </div>
                            <p
                              className={
                                priceFilled
                                  ? "info-input-warning-f"
                                  : "info-input-warning-nf"
                              }
                            >
                              Complete this field.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="price-info-input-box">
                      <div>
                        <div className="info-input-box-o">
                          <div id="currency" className="info-input-box-n">
                            <label className="info-input-label">
                              Currency *
                            </label>
                            <div className="info-input-box-i">
                              <div className="info-input-box-u">
                                <select
                                  id="currency"
                                  value={adFormValues.currency}
                                  onChange={handleAdFormValues("currency")}
                                  className="search-form-category-dropdown"
                                >
                                  <option value="">Choose</option>
                                  {Currencies.map(createCurrencylist)}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seller Contact Data */}
              <section className="seller-contact-section">
                <div className="seller-contact-header">
                  <div className="seller-contact-header-box">
                    <h3 className="seller-contact-heading">Seller Details</h3>
                  </div>
                </div>

                <div className="seller-name-box">
                  <div className="info-input-box">
                    <div>
                      <div className="info-input-box-o">
                        <div id="seller_name" className="info-input-box-n">
                          <label className="info-input-label">Your name</label>
                          <div className="info-input-box-i">
                            <div className="info-input-box-u">
                              <input
                                autoComplete="off"
                                type="text"
                                placeholder="Enter your name"
                                name="seller_name"
                                className="info-input-f"
                                onChange={handleAdFormValues("sellerName")}
                                value={adFormValues.sellerName}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-input-box">
                    <div>
                      <div className="info-input-box-o">
                        <div id="seller_name" className="info-input-box-n">
                          <label className="info-input-label">
                            Enter city or code
                          </label>
                          <div className="info-input-box-i">
                            <div className="info-input-box-u">
                              <input
                                autoComplete="off"
                                type="text"
                                placeholder="Enter city code"
                                name="seller_name"
                                className="info-input-f"
                                onChange={handleAdFormValues("postalCode")}
                                value={adFormValues.postalCode}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-input-box">
                    <div>
                      <div className="info-input-box-o">
                        <div id="seller_name" className="info-input-box-n">
                          <label className="info-input-label">
                            Phone number
                          </label>
                          <div className="info-input-box-i">
                            <div className="info-input-box-u">
                              <input
                                autoComplete="off"
                                type="text"
                                placeholder="Phone number"
                                name="seller_name"
                                className="info-input-f"
                                onChange={handleAdFormValues("telephone")}
                                value={adFormValues.telephone}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="info-contact-check-box">
                    <div className="info-reg-check">
                      <Form.Check
                        checked={adFormValues.freeVerificationCheck}
                        onChange={handleAdFormValues("freeVerificationCheck")}
                      ></Form.Check>
                      <p className="info-reg-check-name">
                        I want to use the free "Advertisement data verification"
                        functionality.
                      </p>
                    </div>
                  </div> */}
                </div>
              </section>
            </section>
          </div>

          <div className="create-ad-footer-box">
            <footer className="create-ad-footer">
              {/* <p className="footer-field-count">
                <b>11</b>/17 Mandatory fields completed
              </p> */}
              <div className="footer-btns-box">
                <button
                  type="submit"
                  id="ad-form-submit-btn"
                  className="create-ad-submit-btn"
                >
                  Add an announcement
                </button>
                {/* <button
                  type="button"
                  id="ad-form-draft-btn"
                  className="create-ad-draft-btn"
                >
                  <span>Save your draft</span>
                </button> */}
              </div>
            </footer>
          </div>
        </form>

        {/* create-ad-aside-tips */}

        <aside className={aside ? "create-ad-aside-show" : "create-ad-aside"}>
          <div className="aside-show-box">
            <div className="aside-show-box-o">
              <div>
                <div className="aside-show-box-i">
                  <button
                    className="aside-show-btn"
                    type="button"
                    onClick={handleAsideShow}
                  >
                    <span className="aside-show-icon-span">
                      {aside ? (
                        <SlArrowRight className="aside-show-icon" />
                      ) : (
                        <SlArrowLeft className="aside-show-icon" />
                      )}
                    </span>
                  </button>
                </div>
              </div>
              <div className="aside-tip-hover">
                {aside ? <p>Hide Tips</p> : <p>Show Tips</p>}
              </div>
            </div>
          </div>

          <article className="aside-article-section">
            <div className="aside-article-box-o">
              <div className="aside-article-box-i">
                <h2 className="aside-article-heading">
                  Verification of advertisement data
                </h2>
                <p className="aside-tips">
                  Enter the price of the vehicle. Enter only numbers, do not use
                  spaces or commas. If you allow price negotiations, check this
                  option in the box next to it.
                </p>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}

export default Createadpagetruck;
