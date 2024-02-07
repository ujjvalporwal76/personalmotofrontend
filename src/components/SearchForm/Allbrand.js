import axios from "axios";
const fetchAllBrands = async () => {
  const options = {
    method: "GET",
    url: "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json",
    // headers: {
    //   "X-RapidAPI-Key": "159b71a141mshc347163510a11ebp1c4d6fjsncebf3016f1b1",
    //   "X-RapidAPI-Host": "motorcycle-specs-database.p.rapidapi.com",
    // },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.Results;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchAllBrands;
