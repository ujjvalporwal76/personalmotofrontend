import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import "../StatisticsPage/Statisticspage.css";
import "./Newspage.css";

import Navbar from "../../NavBar/Navbar";
import Createaccountbanner from "../../CreateAccountBanner/Createaccountbanner";
import Homefooter from "../../HomeFooter/Homefooter";

import Searchformlistitem from "../../SearchForm/Searchformlistitem";
import NewsFilter1 from "./NewsFilter1";
import NewsFilter2 from "./NewsFilter2";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

function Newspage() {
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
      const response = await axiosPrivate.get("/pages/myaccount-news", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": "true",
          // "Access-Control-Expose-Headers": "Authorization",
        },
        withCredentials: true,
      });

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

  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  function createFilter1list(filter1) {
    return <Searchformlistitem key={filter1.id} filter1={filter1.filter1} />;
  }
  function createFilter2list(filter2) {
    return <Searchformlistitem key={filter2.id} filter2={filter2.filter2} />;
  }
  function handletopupdropdown() {
    setdropdown(!dropdown);
  }

  const newsId = useParams();

  return (
    <div className="news-page">
      <Navbar />
      <div className="user-pages-header-section">
        <div className="user-pages-header-box">
          <div className="user-pages-header">
            <h1>Your Messages</h1>
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
                  path.pathname === "/myaccount-advertisements"
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
                  path.pathname === "/myaccount-news/selling" ||
                  path.pathname === "/myaccount-news/buying" ||
                  path.pathname === "/myaccount-news/archived"
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
              href="/myaccount-news/selling"
              className={
                path.pathname === "/myaccount-news/selling"
                  ? "news-catg-tab-show"
                  : "news-catg-tab"
              }
            >
              Seller
            </a>
            <a
              href="/myaccount-news/buying"
              className={
                path.pathname === "/myaccount-news/buying"
                  ? "news-catg-tab-show"
                  : "news-catg-tab"
              }
            >
              Buying
            </a>
            <a
              href="/myaccount-news/archived"
              className={
                path.pathname === "/myaccount-news/archived"
                  ? "news-catg-tab-show"
                  : "news-catg-tab"
              }
            >
              Archived
            </a>
          </div>
        </div>
      </div>

      <div
        className={
          newsId.newsId === "selling" ? "news-catg-page-show" : "news-catg-page"
        }
      >
        <div className="news-content-box">
          <div className="news-content-box-o">
            <div className="news-content-box-i">
              <div className="news-search-box">
                <div className="news-catg-search-box">
                  <label className="news-catg-search-label">Display</label>
                  <div className="news-catg-search-box-o">
                    <div className="news-catg-search-box-i">
                      <select
                        id="newsfilter1"
                        value={filter1}
                        onChange={(e) => setFilter1(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {NewsFilter1.map(createFilter1list)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="news-catg-search-box">
                  <label className="news-catg-search-label">
                    Reason for Contact
                  </label>
                  <div className="news-catg-search-box-o">
                    <div className="news-catg-search-box-i">
                      <select
                        id="newsfilter2"
                        value={filter2}
                        onChange={(e) => setFilter2(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {NewsFilter2.map(createFilter2list)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="no-result-box">
                <div className="no-result-box-o">
                  <div className="no-result-box-i">
                    <img
                      src="https://statics.otomoto.pl/optimus-storage/a/common/images/no-conversations-found.png"
                      alt="no-result-img"
                    ></img>
                    <h5 className="no-result-heading">No search results</h5>
                    <p className="no-result-para">
                      You haven't set any filters. Select filters to see more
                      results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          newsId.newsId === "buying" ? "news-catg-page-show" : "news-catg-page"
        }
      >
        <div className="news-content-box">
          <div className="news-content-box-o">
            <div className="news-content-box-i">
              <div className="news-search-box">
                <div className="news-catg-search-box">
                  <label className="news-catg-search-label">Display</label>
                  <div className="news-catg-search-box-o">
                    <div className="news-catg-search-box-i">
                      <select
                        id="newsfilter1"
                        value={filter1}
                        onChange={(e) => setFilter1(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {NewsFilter1.map(createFilter1list)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="news-catg-search-box">
                  <label className="news-catg-search-label">
                    Reason for Contact
                  </label>
                  <div className="news-catg-search-box-o">
                    <div className="news-catg-search-box-i">
                      <select
                        id="newsfilter2"
                        value={filter2}
                        onChange={(e) => setFilter2(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {NewsFilter2.map(createFilter2list)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="no-result-box">
                <div className="no-result-box-o">
                  <div className="no-result-box-i">
                    <img
                      src="https://statics.otomoto.pl/optimus-storage/a/common/images/no-conversations-found.png"
                      alt="no-result-img"
                    ></img>
                    <h5 className="no-result-heading">No search results</h5>
                    <p className="no-result-para">
                      You haven't set any filters. Select filters to see more
                      results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          newsId.newsId === "archived"
            ? "news-catg-page-show"
            : "news-catg-page"
        }
      >
        <div className="news-content-box">
          <div className="news-content-box-o">
            <div className="news-content-box-i">
              <div className="news-search-box">
                <div className="news-catg-search-box">
                  <label className="news-catg-search-label">Display</label>
                  <div className="news-catg-search-box-o">
                    <div className="news-catg-search-box-i">
                      <select
                        id="newsfilter1"
                        value={filter1}
                        onChange={(e) => setFilter1(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {NewsFilter1.map(createFilter1list)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="news-catg-search-box">
                  <label className="news-catg-search-label">
                    Reason for Contact
                  </label>
                  <div className="news-catg-search-box-o">
                    <div className="news-catg-search-box-i">
                      <select
                        id="newsfilter2"
                        value={filter2}
                        onChange={(e) => setFilter2(e.target.value)}
                        className="search-form-category-dropdown"
                      >
                        <option value="">Choose</option>
                        {NewsFilter2.map(createFilter2list)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="no-result-box">
                <div className="no-result-box-o">
                  <div className="no-result-box-i">
                    <img
                      src="https://statics.otomoto.pl/optimus-storage/a/common/images/no-conversations-found.png"
                      alt="no-result-img"
                    ></img>
                    <h5 className="no-result-heading">No search results</h5>
                    <p className="no-result-para">
                      You haven't set any filters. Select filters to see more
                      results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Createaccountbanner />
      <Homefooter />
    </div>
  );
}

export default Newspage;
