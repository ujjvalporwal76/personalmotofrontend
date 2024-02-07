import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";

import "../StatisticsPage/Statisticspage.css";
import "./Advertisementspage.css";

import Navbar from "../../NavBar/Navbar";
import Createaccountbanner from "../../CreateAccountBanner/Createaccountbanner";
import Homefooter from "../../HomeFooter/Homefooter";

import AdsCategory from "./Adscategory";
import Searchformlistitem from "../../SearchForm/Searchformlistitem";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
function Advertisementspage() {
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    points: 0,
    userData: {},
  });
  useEffect(() => {
    userAuthenticate();
  }, []);
  const userAuthenticate = async () => {
    try {
      const response = await axiosPrivate.get(
        "/pages/myaccount-advertisements",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Expose-Headers": "Authorization",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      setUserData({ points: data.points.toFixed(2), userData: data.userData });
      // console.log(data);
      if (response.status === 401) {
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };
  const [dropdown, setdropdown] = useState(0);
  const path = useLocation();

  const [category, setCategory] = useState("");
  function handletopupdropdown() {
    setdropdown(!dropdown);
  }

  function createAdsCategorylist(category) {
    return (
      <Searchformlistitem key={category.id} category={category.category} />
    );
  }

  return (
    <div className="advertisements-page">
      <Navbar />
      <div className="user-pages-header-section">
        <div className="user-pages-header-box">
          <div className="user-pages-header">
            <h1>Your ads</h1>
            <div className="user-wallet-topup">
              <div className="user-wallet-box">
                <div className="user-wallet">
                  <div className="user-wallet-funds-box">
                    <span className="user-wallet-funds">
                      Funds for Personalmoto: {userData.points} points
                    </span>
                  </div>
                  <div className="user-wallet-topup topup-dropdown">
                    <button
                      type="button"
                      className="wallet-topup-btn"
                      onClick={handletopupdropdown}
                    >
                      <span className="topup-btn-name">Top up</span>
                    </button>

                    <ul
                      className={
                        dropdown ? "wallet-topup-menu" : "topup-dropdown-menu"
                      }
                    >
                      <li className="topup-dropdown-label">
                        Top up Funds on Personalmoto
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 50 to 149 Points + 0% free
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 150 to 299 Points + 5% free
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 300 to 499 Points + 10% free
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wallet-topup-link">
                          From 500 to 3000 Points + 15% free
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="user-pages-header-btns">
            <li className="col-md-2">
              <a
                href="/myaccount-statistics"
                className={
                  path.pathname === "/myaccount-statistics"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Statistics
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-advertisements"
                className={
                  path.pathname === "/myaccount-advertisements/active" ||
                  "/myaccount-advertisements/pending"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Advertisements
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-news/selling"
                className={
                  path.pathname === "/myaccount-news/selling"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                The news
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-payments/wallet"
                className={
                  path.pathname === "/myaccount-payments/wallet"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Payments
              </a>
            </li>
            <li className="col-md-2">
              <a
                href="/myaccount-settings/settings"
                className={
                  path.pathname === "/myaccount-settings/settings"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="news-catg-tab-box">
            <a
              href="/myaccount-advertisements/active"
              className={
                path.pathname === "/myaccount-advertisements/active"
                  ? "ads-catg-tab-show"
                  : "ads-catg-tab"
              }
            >
              Active
            </a>
            <a
              href="/myaccount-advertisements/pending"
              className={
                path.pathname === "/myaccount-advertisements/pending"
                  ? "ads-catg-tab-show"
                  : "ads-catg-tab"
              }
            >
              Pending
            </a>
          </div>
        </div>
      </div>

      <section className="user-ads-section">
        <div className="user-ads-box">
          <div className="ads-catg-search-box">
            <div className="ads-catg-search-box-i">
              <div className="ads-catg-box">
                <div className="ads-catg-box-i">
                  <select
                    id="ads-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="search-form-category-dropdown"
                  >
                    <option value="">Select Category</option>
                    {AdsCategory.map(createAdsCategorylist)}
                  </select>
                </div>
              </div>
              <div className="ads-search-box">
                <div className="ads-search-box-i">
                  <input
                    type="text"
                    name="ads-search"
                    placeholder="Search..."
                    class="ads-search-input"
                  ></input>
                  <button className="ads-search-btn ads-search-icon">
                    <AiOutlineSearch size={20} />
                  </button>
                </div>
              </div>
              <div className="ads-total-box">
                <p className="ads-total">0 Ads</p>
              </div>
            </div>
          </div>
        </div>

        <div className="user-ads-show-box">
          <div className="no-ads-box" id="noAdsBox">
            <h3 className="no-ads-heading">
              You currently do not have any active Ads
            </h3>
            <a
              href="/start-selling"
              className="no-ads-start-sell-btn"
              target="_blank"
            >
              <AiOutlinePlus size={20} />
              <span>Start Selling</span>
            </a>
          </div>
        </div>
      </section>

      <Createaccountbanner />
      <Homefooter />
    </div>
  );
}

export default Advertisementspage;
