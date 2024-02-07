import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: baseURL,
});
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
