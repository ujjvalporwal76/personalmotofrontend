import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Logoutpage.css";
import useAuth from "../../Hooks/useAuth";
import axios from "../../axios/axios.config";
import toast from "react-hot-toast";
const handleLoginRedirect = () => {
  window.location.href = "/login";
};

function Logoutpage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogoutUser = async () => {
    try {
      const res = await axios.get("/users/logout", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (res) {
        // console.log("Successfully logged out");

        setUser(null);
        // navigating to login page after logout
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Some Error Occured");
    }
  };
  useEffect(() => {
    handleLogoutUser();
  });
  return (
    <div className="logout-page">
      <div className="logout-page-content">
        <h1>Hi, User you are logged out.</h1>
        <Button variant="primary" onClick={handleLoginRedirect}>
          Go to Login page
        </Button>
      </div>
    </div>
  );
}

export default Logoutpage;
