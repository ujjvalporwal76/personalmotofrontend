import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../LoginPage/Loginpage.css";
import loginpagebanner from "../../images/loginpagebanner.jpeg";

import { BsFacebook, BsGoogle, BsApple } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import Navbar from "../NavBar/Navbar";
import axios from "../../axios/axios.config";
import toast from "react-hot-toast";

function Signuppage() {
  const navigate = useNavigate();
  const [signUpValues, setSignUpValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpValues = (prop) => (event) => {
    setSignUpValues({ ...signUpValues, [prop]: event.target.value });
  };

  const handleSendSignUpData = async (e) => {
    e.preventDefault();
    const { userName, email, password } = signUpValues;

    try {
      const response = await axios.post("/users/signup", signUpValues, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Invalid Registration or email already exist");
    }
  };
  return (
    <div className="login-page">
      <Navbar />
      <div className="login-page-content">
        <div className="login-page-left-content">
          <div className="login-page-heading">
            <h1>Create an account</h1>
          </div>
          <div className="login-box">
            <div className="login-social-options">
              <div className="login-social-option-btns">
                <button className="login-social-btn facebook-btn">
                  <BsFacebook className="login-social-icons" size={25} />
                  Continue via Facebook
                </button>
                <button className="login-social-btn google-btn">
                  <BsGoogle className="login-social-icons" size={25} />
                  Continue via Google Account
                </button>
                <button className="login-social-btn apple-btn">
                  <BsApple className="login-social-icons" size={25} />
                  Continue via Apple Account
                </button>
              </div>
              <div className="login-options-seperator">
                <div className="login-options-separator-line"></div>
                <div className="login-options-separator-text">OR</div>
                <div className="login-options-separator-line"></div>
              </div>
            </div>
            <div className="login-signup-redirect-box">
              <div className="login-signup-redirect-tabs">
                <button className="login-redirect-btn redirect-btn">
                  <Link to="/login" target="_blank">
                    Login
                  </Link>
                </button>
                <button className="signup-redirect-btn redirect-btn">
                  <Link to="/signup" target="_blank">
                    Create Account
                  </Link>
                </button>
              </div>
            </div>
            <div className="email-login-box">
              <div className="email-login-form-box">
                <form
                  id="login-form"
                  className="login-form-class"
                  method="POST"
                  onSubmit={handleSendSignUpData}
                  autoComplete="off"
                >
                  <div className="login-email-box">
                    <div>
                      <label className="login-email-label">Username</label>
                      <div className="login-email-input-box">
                        <input
                          className="login-email-input"
                          name="username"
                          type="text"
                          placeholder="Username"
                          onChange={handleSignUpValues("userName")}
                          value={signUpValues.userName}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="login-email-box">
                    <div>
                      <label className="login-email-label">Email</label>
                      <div className="login-email-input-box">
                        <input
                          className="login-email-input"
                          name="email"
                          type="email"
                          placeholder="Email address"
                          onChange={handleSignUpValues("email")}
                          value={signUpValues.email}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="login-password-box">
                    <div>
                      <label className="login-password-label">Password</label>
                      <div className="login-email-input-box">
                        <input
                          className="login-password-input"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          onChange={handleSignUpValues("password")}
                          value={signUpValues.password}
                          placeholder="Password"
                        ></input>
                        <div className="show-password-toggler">
                          <div
                            className="password-toggler-box"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible size={25} />
                            ) : (
                              <AiOutlineEye size={25} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="login-form-submit-btn" type="submit">
                    <span>Create an account</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="login-page-right-content">
          <img src={loginpagebanner} alt="login-banner"></img>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
