import axios from "axios";

const fetchTruckBrands = async () => {
  const options = {
    method: "GET",
    url: "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/truck?format=json",
  };
  try {
    const response = await axios.request(options);
    const data = response.data.Results;
    console.log(response);
    // console.log("vehiclebrand: " + response.data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchTruckBrands;
