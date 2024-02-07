import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillPrinter } from "react-icons/ai";
import { BiSolidDownload, BiSolidCalendar } from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
// import axios from "../../../axios/axios.config";
// import useRefreshToken from "../../../Hooks/useRefreshToken";
// import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file

import Navbar from "../../NavBar/Navbar";
import Createaccountbanner from "../../CreateAccountBanner/Createaccountbanner";
import Homefooter from "../../HomeFooter/Homefooter";
// import "./Statisticspage.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Statisticspage() {
  const axiosPrivate = useAxiosPrivate();
  // const refresh = useRefreshToken();
  const navigate = useNavigate();
  const [dropdown, setdropdown] = useState(0);
  const path = useLocation();
  const [openCalendar, setOpenCalendar] = useState(false);
  //   const [openCalendarBox, setOpenCalendarBox] = useState(false)  need to find a way to close the calendar on input click and on outside click separately
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const refOne = useRef(null);
  const [userData, setUserData] = useState({
    points: 0,
    userData: {},
  });
  const [helpBox, setHelpbox] = useState(false);
  const [showStats, setShowStats] = useState("views");

  const userAuthenticate = async () => {
    try {
      const response = await axiosPrivate.get("/pages/myaccount-statistics", {
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
      // console.log(data);
      setUserData({
        points: data.points.toFixed(2),
        userData: data.userData,
      });

      if (response.status === 401) {
        // console.log("Status");
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideCalendarOnClickOutside, true);

    userAuthenticate();
  }, []);

  function hideCalendarOnClickOutside(e) {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenCalendar(false);
    }
  }

  function handleDateRangeSelect(e) {
    // setSelectDate([item.seletion])

    setRange([e.selection]);
  }
  function handleOpenCalendar() {
    setOpenCalendar(!openCalendar);
  }
  function handletopupdropdown() {
    setdropdown(!dropdown);
  }

  function handleStatsShow(id) {
    setShowStats(id);
  }

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Views",
        data: [0, 2, 4, 6, 8, 10],
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    // <div className="statistics-page">
    //   <Navbar />

    // <div className="user-pages-header-section">
    //   <div className="user-pages-header-box">
    //     <div className="user-pages-header">
    //       <h1>{userData.userData.email}</h1>
    //       {/* <button onClick={() => refresh()}>refresh</button> */}
    //       <div className="user-wallet-topup">
    //         <div className="user-wallet-box">
    //           <div className="user-wallet">
    //             <div className="user-wallet-funds-box">
    //               <span className="user-wallet-funds">
    //                 Funds for Personalmoto: {userData.points} points
    //               </span>
    //             </div>
    //             <div className="user-wallet-topup topup-dropdown">
    //               <button
    //                 type="button"
    //                 className="wallet-topup-btn"
    //                 onClick={handletopupdropdown}
    //               >
    //                 <span className="topup-btn-name">Top up</span>
    //               </button>

    //               <ul
    //                 className={
    //                   dropdown ? "wallet-topup-menu" : "topup-dropdown-menu"
    //                 }
    //               >
    //                 <li className="topup-dropdown-label">
    //                   Top up Funds on Personalmoto
    //                 </li>
    //                 <li>
    //                   <a href="#" className="wallet-topup-link">
    //                     From 50 to 149 Points + 0% free
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" className="wallet-topup-link">
    //                     From 150 to 299 Points + 5% free
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" className="wallet-topup-link">
    //                     From 300 to 499 Points + 10% free
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#" className="wallet-topup-link">
    //                     From 500 to 3000 Points + 15% free
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <ul className="user-pages-header-btns">
    //       <li className="col-md-2">
    //         <a
    //           href="/myaccount-statistics"
    //           className={
    //             path.pathname === "/myaccount-statistics"
    //               ? "myaccount-active-link"
    //               : "myaccount-link"
    //           }
    //         >
    //           Statistics
    //         </a>
    //       </li>
    //       <li className="col-md-2">
    //         <a
    //           href="/myaccount-advertisements"
    //           className={
    //             path.pathname === "/myaccount-advertisements"
    //               ? "myaccount-active-link"
    //               : "myaccount-link"
    //           }
    //         >
    //           Advertisements
    //         </a>
    //       </li>
    //       <li className="col-md-2">
    //         <a
    //           href="/myaccount-news/selling"
    //           className={
    //             path.pathname === "/myaccount-news/selling"
    //               ? "myaccount-active-link"
    //               : "myaccount-link"
    //           }
    //         >
    //           The news
    //         </a>
    //       </li>
    //       <li className="col-md-2">
    //         <a
    //           href="/myaccount-payments/wallet"
    //           className={
    //             path.pathname === "/myaccount-payments/wallet"
    //               ? "myaccount-active-link"
    //               : "myaccount-link"
    //           }
    //         >
    //           Payments
    //         </a>
    //       </li>
    //       <li className="col-md-2">
    //         <a
    //           href="/myaccount-settings"
    //           className={
    //             path.pathname === "/myaccount-settings"
    //               ? "myaccount-active-link"
    //               : "myaccount-link"
    //           }
    //         >
    //           Settings
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>

    // <section className="user-statistics-section">
    //   <div className="user-statistics-box-o">
    //     <div className="user-statistics-box-i">
    //       <header className="user-statistics-header">
    //         <h1 className="user-statistics-heading">Your overall activity</h1>
    //         <div className="user-statistics-download-box">
    //           <div className="user-statistics-download-opts">
    //             <div className="user-statistics-download-btn">
    //               <a href="#">
    //                 <AiFillPrinter
    //                   className="user-statistics-download-icon"
    //                   size={16}
    //                 />
    //                 <span>Print</span>
    //               </a>
    //             </div>
    //             <div className="user-statistics-download-btn">
    //               <a href="#">
    //                 <BiSolidDownload
    //                   className="user-statistics-download-icon"
    //                   size={16}
    //                 />
    //                 <span>Export to CSV file</span>
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </header>

    //       <div className="user-statistics-period-box">
    //         <div className="user-statistics-period-calendar">
    //           <div>
    //             <div className="statistics-period-input-box-o">
    //               <label className="statistics-period-label">
    //                 Select a period
    //               </label>
    //               <div className="statistics-period-input-box">
    //                 <div className="statistics-period-input-box-i">
    //                   <input
    //                     value={`${format(
    //                       range[0].startDate,
    //                       "dd/MM/yyyy"
    //                     )} - ${format(range[0].endDate, "dd/MM/yyyy")}`}
    //                     className="statistics-period-input"
    //                     readOnly
    //                     onClick={handleOpenCalendar}
    //                   ></input>
    //                   <div
    //                     onClick={handleOpenCalendar}
    //                     className="statistics-period-input-icon"
    //                   >
    //                     <span>
    //                       <BiSolidCalendar />
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //               {openCalendar && (
    //                 <div ref={refOne}>
    //                   <DateRangePicker
    //                     editableDateInputs={true}
    //                     onChange={handleDateRangeSelect}
    //                     showSelectionPreview={true}
    //                     moveRangeOnFirstSelection={false}
    //                     months={2}
    //                     ranges={range}
    //                     direction="horizontal"
    //                   ></DateRangePicker>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="user-stats-box">
    //         <div className="user-stats-box-o">
    //           <div className="user-stats-tabs-list">
    //             <div className="user-stats-tabs-box">
    //               <div
    //                 role="tab"
    //                 className="user-stats-tab"
    //                 id="offer-views-panel"
    //                 aria-selected={showStats === "views" ? true : false}
    //                 aria-controls="offer-views-content-panel"
    //                 onClick={() => handleStatsShow("views")}
    //               >
    //                 <div className="stats-tab-content-box">
    //                   <div className="stats-tab-content-box-i">
    //                     <div className="stats-tab-heading">
    //                       <span>Total offer Views</span>
    //                       <div className="stats-tab-help-box">
    //                         <button
    //                           type=" button"
    //                           className="stats-tab-help-btn"
    //                           onClick={() => setHelpbox(!helpBox)}
    //                         >
    //                           <BsFillQuestionCircleFill size={16} />
    //                         </button>
    //                         <div
    //                           className={
    //                             helpBox
    //                               ? "tab-help-message-box-active"
    //                               : "tab-help-message-box"
    //                           }
    //                         >
    //                           <button
    //                             className="help-message-close-btn"
    //                             type="button"
    //                             onClick={() => setHelpbox(!helpBox)}
    //                           >
    //                             <RxCross2 size={16}></RxCross2>
    //                           </button>
    //                           <p>
    //                             The total number of views indicates the number
    //                             of times ads appeared in Users' search results
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="stats-tab-value-box">
    //                       <span className="stats-tab-value">0</span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div
    //                 role="tab"
    //                 className="user-stats-tab"
    //                 id="offer-visit-panel"
    //                 aria-selected={showStats === "visit" ? true : false}
    //                 aria-controls="offer-visit-content-panel"
    //                 onClick={() => handleStatsShow("visit")}
    //               >
    //                 <div className="stats-tab-content-box">
    //                   <div className="stats-tab-content-box-i">
    //                     <div className="stats-tab-heading">
    //                       <span>Total visits to the offers</span>
    //                       <div className="stats-tab-help-box">
    //                         <button
    //                           type=" button"
    //                           className="stats-tab-help-btn"
    //                           onClick={() => setHelpbox(!helpBox)}
    //                         >
    //                           <BsFillQuestionCircleFill size={16} />
    //                         </button>
    //                         <div
    //                           className={
    //                             helpBox
    //                               ? "tab-help-message-box-active"
    //                               : "tab-help-message-box"
    //                           }
    //                         >
    //                           <button
    //                             className="help-message-close-btn"
    //                             type="button"
    //                             onClick={() => setHelpbox(!helpBox)}
    //                           >
    //                             <RxCross2 size={16}></RxCross2>
    //                           </button>
    //                           <p>
    //                             The total number of views of the advertisement
    //                             page by potential buyers
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="stats-tab-value-box">
    //                       <span className="stats-tab-value">0</span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div
    //                 role="tab"
    //                 className="user-stats-tab"
    //                 id="watched-panel"
    //                 aria-selected={showStats === "watched" ? true : false}
    //                 aria-controls="watched-content-panel"
    //                 onClick={() => handleStatsShow("watched")}
    //               >
    //                 <div className="stats-tab-content-box">
    //                   <div className="stats-tab-content-box-i">
    //                     <div className="stats-tab-heading">
    //                       <span>Watched</span>
    //                       <div className="stats-tab-help-box">
    //                         <button
    //                           type=" button"
    //                           className="stats-tab-help-btn"
    //                           onClick={() => setHelpbox(!helpBox)}
    //                         >
    //                           <BsFillQuestionCircleFill size={16} />
    //                         </button>
    //                         <div
    //                           className={
    //                             helpBox
    //                               ? "tab-help-message-box-active"
    //                               : "tab-help-message-box"
    //                           }
    //                         >
    //                           <button
    //                             className="help-message-close-btn"
    //                             type="button"
    //                             onClick={() => setHelpbox(!helpBox)}
    //                           >
    //                             <RxCross2 size={16}></RxCross2>
    //                           </button>
    //                           <p>
    //                             The total number of times your ads have been
    //                             marked as favorites. Percentage of change
    //                             compared to the previous period (7 or 30 days,
    //                             as selected).
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="stats-tab-value-box">
    //                       <span className="stats-tab-value">0</span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div
    //                 role="tab"
    //                 className="user-stats-tab"
    //                 id="phone-views-panel"
    //                 aria-selected={showStats === "phone" ? true : false}
    //                 aria-controls="phone-views-content-panel"
    //                 onClick={() => handleStatsShow("phone")}
    //               >
    //                 <div className="stats-tab-content-box">
    //                   <div className="stats-tab-content-box-i">
    //                     <div className="stats-tab-heading">
    //                       <span>Phone Views</span>
    //                       <div className="stats-tab-help-box">
    //                         <button
    //                           type=" button"
    //                           className="stats-tab-help-btn"
    //                           onClick={() => setHelpbox(!helpBox)}
    //                         >
    //                           <BsFillQuestionCircleFill size={16} />
    //                         </button>
    //                         <div
    //                           className={
    //                             helpBox
    //                               ? "tab-help-message-box-active"
    //                               : "tab-help-message-box"
    //                           }
    //                         >
    //                           <button
    //                             className="help-message-close-btn"
    //                             type="button"
    //                             onClick={() => setHelpbox(!helpBox)}
    //                           >
    //                             <RxCross2 size={16}></RxCross2>
    //                           </button>
    //                           <p>
    //                             This is the number of Users clicking on the
    //                             telephone numbers available on the
    //                             advertisement page
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="stats-tab-value-box">
    //                       <span className="stats-tab-value">0</span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div
    //                 role="tab"
    //                 className="user-stats-tab"
    //                 id="the-news-panel"
    //                 aria-selected={showStats === "news" ? true : false}
    //                 aria-controls="the-news-content-panel"
    //                 onClick={() => handleStatsShow("news")}
    //               >
    //                 <div className="stats-tab-content-box">
    //                   <div className="stats-tab-content-box-i">
    //                     <div className="stats-tab-heading">
    //                       <span>The News</span>
    //                       <div className="stats-tab-help-box">
    //                         <button
    //                           type=" button"
    //                           className="stats-tab-help-btn"
    //                           onClick={() => setHelpbox(!helpBox)}
    //                         >
    //                           <BsFillQuestionCircleFill size={16} />
    //                         </button>
    //                         <div
    //                           className={
    //                             helpBox
    //                               ? "tab-help-message-box-active"
    //                               : "tab-help-message-box"
    //                           }
    //                         >
    //                           <button
    //                             className="help-message-close-btn"
    //                             type="button"
    //                             onClick={() => setHelpbox(!helpBox)}
    //                           >
    //                             <RxCross2 size={16}></RxCross2>
    //                           </button>
    //                           <p>
    //                             The total number of SMS messages sent from the
    //                             mobile application and messages sent via the
    //                             contact form.
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="stats-tab-value-box">
    //                       <span className="stats-tab-value">0</span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div
    //             className={
    //               showStats === "views"
    //                 ? "user-stats-show-box"
    //                 : "user-stats-hide"
    //             }
    //             id="offer-views-content-panel"
    //             role="tabpanel"
    //           >
    //             <div className="user-stats-graph-box">
    //               <div className="stats-graph-box-o">
    //                 <div>
    //                   <div className="stats-graph-box-i">
    //                     <Line data={chartData} options={options} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div
    //             className={
    //               showStats === "visit"
    //                 ? "user-stats-show-box"
    //                 : "user-stats-hide"
    //             }
    //             id="offer-visit-content-panel"
    //             role="tabpanel"
    //           >
    //             <div className="user-stats-graph-box">
    //               <div className="stats-graph-box-o">
    //                 <div>
    //                   <div className="stats-graph-box-i">
    //                     <Line data={chartData} options={options} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className={
    //               showStats === "watched"
    //                 ? "user-stats-show-box"
    //                 : "user-stats-hide"
    //             }
    //             id="watched-content-panel"
    //             role="tabpanel"
    //           >
    //             <div className="user-stats-graph-box">
    //               <div className="stats-graph-box-o">
    //                 <div>
    //                   <div className="stats-graph-box-i">
    //                     <Line data={chartData} options={options} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div
    //             className={
    //               showStats === "phone"
    //                 ? "user-stats-show-box"
    //                 : "user-stats-hide"
    //             }
    //             id="phone-views-content-panel"
    //             role="tabpanel"
    //           >
    //             <div className="user-stats-graph-box">
    //               <div className="stats-graph-box-o">
    //                 <div>
    //                   <div className="stats-graph-box-i">
    //                     <Line data={chartData} options={options} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div
    //             className={
    //               showStats === "news"
    //                 ? "user-stats-show-box"
    //                 : "user-stats-hide"
    //             }
    //             id="the-news-content-panel"
    //             role="tabpanel"
    //           >
    //             <div className="user-stats-graph-box">
    //               <div className="stats-graph-box-o">
    //                 <div>
    //                   <div className="stats-graph-box-i">
    //                     <Line data={chartData} options={options} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    //   <Createaccountbanner />
    //   <Homefooter />
    // </div>
    <div className="statistics-page">
      <Navbar></Navbar>
      <div className="user-pages-header-section">
        <div className="user-pages-header-box">
          <div className="user-pages-header">
            <h1>{userData.userData.email}</h1>
            {/* <button onClick={() => refresh()}>refresh</button> */}
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
                href="/myaccount-advertisements/seller"
                className={
                  path.pathname === "/myaccount-advertisements/seller"
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
                href="/myaccount-settings"
                className={
                  path.pathname === "/myaccount-settings"
                    ? "myaccount-active-link"
                    : "myaccount-link"
                }
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="user-statistics-section">
        <div className="user-statistics-box-o">
          <div className="user-statistics-box-i">
            <header className="user-statistics-header">
              <h1 className="user-statistics-heading">Your overall activity</h1>
              <div className="user-statistics-download-box">
                <div className="user-statistics-download-opts">
                  <div className="user-statistics-download-btn">
                    <a href="#">
                      <AiFillPrinter
                        className="user-statistics-download-icon"
                        size={16}
                      />
                      <span>Print</span>
                    </a>
                  </div>
                  <div className="user-statistics-download-btn">
                    <a href="#">
                      <BiSolidDownload
                        className="user-statistics-download-icon"
                        size={16}
                      />
                      <span>Export to CSV file</span>
                    </a>
                  </div>
                </div>
              </div>
            </header>
            <div className="user-statistics-period-box">
              <div className="user-statistics-period-calendar">
                <div>
                  <div className="statistics-period-input-box-o">
                    <label className="statistics-period-label">
                      Select a period
                    </label>
                    <div className="statistics-period-input-box">
                      <div className="statistics-period-input-box-i">
                        <input
                          value={`${format(
                            range[0].startDate,
                            "dd/MM/yyyy"
                          )} - ${format(range[0].endDate, "dd/MM/yyyy")}`}
                          className="statistics-period-input"
                          readOnly
                          onClick={handleOpenCalendar}
                        ></input>
                        <div
                          onClick={handleOpenCalendar}
                          className="statistics-period-input-icon"
                        >
                          <span>
                            <BiSolidCalendar />
                          </span>
                        </div>
                      </div>
                    </div>
                    {openCalendar && (
                      <div ref={refOne}>
                        <DateRangePicker
                          editableDateInputs={true}
                          onChange={handleDateRangeSelect}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          months={2}
                          ranges={range}
                          direction="horizontal"
                        ></DateRangePicker>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="user-stats-box">
              <div className="user-stats-box-o">
                <div className="user-stats-tabs-list">
                  <div className="user-stats-tabs-box">
                    <div
                      role="tab"
                      className="user-stats-tab"
                      id="offer-views-panel"
                      aria-selected={showStats === "views" ? true : false}
                      aria-controls="offer-views-content-panel"
                      onClick={() => handleStatsShow("views")}
                    >
                      <div className="stats-tab-content-box">
                        <div className="stats-tab-content-box-i">
                          <div className="stats-tab-heading">
                            <span>Total offer Views</span>
                            <div className="stats-tab-help-box">
                              <button
                                type=" button"
                                className="stats-tab-help-btn"
                                onClick={() => setHelpbox(!helpBox)}
                              >
                                <BsFillQuestionCircleFill size={16} />
                              </button>
                              <div
                                className={
                                  helpBox
                                    ? "tab-help-message-box-active"
                                    : "tab-help-message-box"
                                }
                              >
                                <button
                                  className="help-message-close-btn"
                                  type="button"
                                  onClick={() => setHelpbox(!helpBox)}
                                >
                                  <RxCross2 size={16}></RxCross2>
                                </button>
                                <p>
                                  The total number of views indicates the number
                                  of times ads appeared in Users' search results
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="stats-tab-value-box">
                            <span className="stats-tab-value">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      role="tab"
                      className="user-stats-tab"
                      id="offer-visit-panel"
                      aria-selected={showStats === "visit" ? true : false}
                      aria-controls="offer-visit-content-panel"
                      onClick={() => handleStatsShow("visit")}
                    >
                      <div className="stats-tab-content-box">
                        <div className="stats-tab-content-box-i">
                          <div className="stats-tab-heading">
                            <span>Total visits to the offers</span>
                            <div className="stats-tab-help-box">
                              <button
                                type=" button"
                                className="stats-tab-help-btn"
                                onClick={() => setHelpbox(!helpBox)}
                              >
                                <BsFillQuestionCircleFill size={16} />
                              </button>
                              <div
                                className={
                                  helpBox
                                    ? "tab-help-message-box-active"
                                    : "tab-help-message-box"
                                }
                              >
                                <button
                                  className="help-message-close-btn"
                                  type="button"
                                  onClick={() => setHelpbox(!helpBox)}
                                >
                                  <RxCross2 size={16}></RxCross2>
                                </button>
                                <p>
                                  The total number of views of the advertisement
                                  page by potential buyers
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="stats-tab-value-box">
                            <span className="stats-tab-value">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      role="tab"
                      className="user-stats-tab"
                      id="watched-panel"
                      aria-selected={showStats === "watched" ? true : false}
                      aria-controls="watched-content-panel"
                      onClick={() => handleStatsShow("watched")}
                    >
                      <div className="stats-tab-content-box">
                        <div className="stats-tab-content-box-i">
                          <div className="stats-tab-heading">
                            <span>Watched</span>
                            <div className="stats-tab-help-box">
                              <button
                                type=" button"
                                className="stats-tab-help-btn"
                                onClick={() => setHelpbox(!helpBox)}
                              >
                                <BsFillQuestionCircleFill size={16} />
                              </button>
                              <div
                                className={
                                  helpBox
                                    ? "tab-help-message-box-active"
                                    : "tab-help-message-box"
                                }
                              >
                                <button
                                  className="help-message-close-btn"
                                  type="button"
                                  onClick={() => setHelpbox(!helpBox)}
                                >
                                  <RxCross2 size={16}></RxCross2>
                                </button>
                                <p>
                                  The total number of times your ads have been
                                  marked as favorites. Percentage of change
                                  compared to the previous period (7 or 30 days,
                                  as selected).
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="stats-tab-value-box">
                            <span className="stats-tab-value">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      role="tab"
                      className="user-stats-tab"
                      id="phone-views-panel"
                      aria-selected={showStats === "phone" ? true : false}
                      aria-controls="phone-views-content-panel"
                      onClick={() => handleStatsShow("phone")}
                    >
                      <div className="stats-tab-content-box">
                        <div className="stats-tab-content-box-i">
                          <div className="stats-tab-heading">
                            <span>Phone Views</span>
                            <div className="stats-tab-help-box">
                              <button
                                type=" button"
                                className="stats-tab-help-btn"
                                onClick={() => setHelpbox(!helpBox)}
                              >
                                <BsFillQuestionCircleFill size={16} />
                              </button>
                              <div
                                className={
                                  helpBox
                                    ? "tab-help-message-box-active"
                                    : "tab-help-message-box"
                                }
                              >
                                <button
                                  className="help-message-close-btn"
                                  type="button"
                                  onClick={() => setHelpbox(!helpBox)}
                                >
                                  <RxCross2 size={16}></RxCross2>
                                </button>
                                <p>
                                  This is the number of Users clicking on the
                                  telephone numbers available on the
                                  advertisement page
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="stats-tab-value-box">
                            <span className="stats-tab-value">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      role="tab"
                      className="user-stats-tab"
                      id="the-news-panel"
                      aria-selected={showStats === "news" ? true : false}
                      aria-controls="the-news-content-panel"
                      onClick={() => handleStatsShow("news")}
                    >
                      <div className="stats-tab-content-box">
                        <div className="stats-tab-content-box-i">
                          <div className="stats-tab-heading">
                            <span>The News</span>
                            <div className="stats-tab-help-box">
                              <button
                                type=" button"
                                className="stats-tab-help-btn"
                                onClick={() => setHelpbox(!helpBox)}
                              >
                                <BsFillQuestionCircleFill size={16} />
                              </button>
                              <div
                                className={
                                  helpBox
                                    ? "tab-help-message-box-active"
                                    : "tab-help-message-box"
                                }
                              >
                                <button
                                  className="help-message-close-btn"
                                  type="button"
                                  onClick={() => setHelpbox(!helpBox)}
                                >
                                  <RxCross2 size={16}></RxCross2>
                                </button>
                                <p>
                                  The total number of SMS messages sent from the
                                  mobile application and messages sent via the
                                  contact form.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="stats-tab-value-box">
                            <span className="stats-tab-value">0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    showStats === "views"
                      ? "user-stats-show-box"
                      : "user-stats-hide"
                  }
                  id="offer-views-content-panel"
                  role="tabpanel"
                >
                  <div className="user-stats-graph-box">
                    <div className="stats-graph-box-o">
                      <div>
                        <div className="stats-graph-box-i">
                          <Line data={chartData} options={options} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    showStats === "visit"
                      ? "user-stats-show-box"
                      : "user-stats-hide"
                  }
                  id="offer-visit-content-panel"
                  role="tabpanel"
                >
                  <div className="user-stats-graph-box">
                    <div className="stats-graph-box-o">
                      <div>
                        <div className="stats-graph-box-i">
                          <Line data={chartData} options={options} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    showStats === "watched"
                      ? "user-stats-show-box"
                      : "user-stats-hide"
                  }
                  id="watched-content-panel"
                  role="tabpanel"
                >
                  <div className="user-stats-graph-box">
                    <div className="stats-graph-box-o">
                      <div>
                        <div className="stats-graph-box-i">
                          <Line data={chartData} options={options} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    showStats === "phone"
                      ? "user-stats-show-box"
                      : "user-stats-hide"
                  }
                  id="phone-views-content-panel"
                  role="tabpanel"
                >
                  <div className="user-stats-graph-box">
                    <div className="stats-graph-box-o">
                      <div>
                        <div className="stats-graph-box-i">
                          <Line data={chartData} options={options} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    showStats === "news"
                      ? "user-stats-show-box"
                      : "user-stats-hide"
                  }
                  id="the-news-content-panel"
                  role="tabpanel"
                >
                  <div className="user-stats-graph-box">
                    <div className="stats-graph-box-o">
                      <div>
                        <div className="stats-graph-box-i">
                          <Line data={chartData} options={options} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Createaccountbanner></Createaccountbanner>
      <Homefooter></Homefooter>
    </div>
  );
}

export default Statisticspage;
