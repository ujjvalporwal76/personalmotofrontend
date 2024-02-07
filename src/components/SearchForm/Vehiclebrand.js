import axios from "axios";

const fetchVehicleBrands = async () => {
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}/carapi/makes`,
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiZGU3Y2Y1NTctMDM2OS00ZWViLTkyNDgtNTFjMzM4ZThhNDA0IiwiYXVkIjoiZGU3Y2Y1NTctMDM2OS00ZWViLTkyNDgtNTFjMzM4ZThhNDA0IiwiZXhwIjoxNzA3OTEzMTg4LCJpYXQiOjE3MDczMDgzODgsImp0aSI6ImVhODVlYjg1LTU1ZjYtNDU0YS04NzI0LWZjZjc1OWFmNzVmMiIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCIsImFkZG9ucyI6eyJhbnRpcXVlX3ZlaGljbGVzIjpmYWxzZX19fQ.1cPYiylE7IBsRaGGk6gpQLLV_EWJFxHPEFVJfsvgpbc",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.data;

    // console.log("vehiclebrand: " + response.data.data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchVehicleBrands;
