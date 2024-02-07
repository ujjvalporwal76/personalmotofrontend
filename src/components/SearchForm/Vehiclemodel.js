import axios from "axios";

const fetchVehicleModels = async (selectedBrand) => {
  if (!selectedBrand) {
    console.error("No selectedBrand provided.");
    return []; // or handle the case in your application logic
  }
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}/carapi/models/${selectedBrand}`,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiZGU3Y2Y1NTctMDM2OS00ZWViLTkyNDgtNTFjMzM4ZThhNDA0IiwiYXVkIjoiZGU3Y2Y1NTctMDM2OS00ZWViLTkyNDgtNTFjMzM4ZThhNDA0IiwiZXhwIjoxNzAyODgzMjAxLCJpYXQiOjE3MDIyNzg0MDEsImp0aSI6IjJhNjkxOTI3LTE4MTMtNDNjMi1iN2VlLTQzMTEwOWZkYmNmZCIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCJ9fQ.7NJhd_CWXbJmb69hauyavJ4sq3Tj-DIw7gindbLyE_E",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.data;
    // console.log(response.data.data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchVehicleModels;
