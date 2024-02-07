import axios from "../axios/axios.config";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { user, setUser } = useAuth();

  const refresh = async () => {
    const res = await axios.get("/refresh", {
      withCredentials: true,
    });
    const accessToken = res.data.accessToken;
    // console.log(accessToken);
    // Update the user object with the new access token

    // setUser(accessToken);
    setUser((prev) => {
      // console.log(prev);
      return { ...prev, accessToken };
    });
    // console.log(user);
    // Return the access token
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
