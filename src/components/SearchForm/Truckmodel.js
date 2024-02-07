import axios from "axios";

const fetchTruckModels = async (selectedBrand) => {
  if (!selectedBrand) {
    return [];
  }
  const options = {
    method: "GET",
    url: `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedBrand}?format=json`,
  };
  try {
    const response = await axios.request(options);
    const data = response.data.Results;
    console.log(response);
    console.log(data);
    return data;
  } catch (error) {}
};

export default fetchTruckModels;
