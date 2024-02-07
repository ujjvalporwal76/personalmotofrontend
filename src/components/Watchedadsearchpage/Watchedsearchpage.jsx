import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Watchedadspage.css";
import Navbar from "../NavBar/Navbar";
import Homefooter from "../HomeFooter/Homefooter";
// import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import watchedsearchesnoneimg from "../../images/watchedsearchesnoneimg.svg";

function Watchedsearchpage() {
  // const axiosPrivate = useAxiosPrivate();

  const [active, setActive] = useState("1");
  const navigate = useNavigate();
  function handleadsearchpage(e) {
    const id = e.target.id;
    setActive(id);

    if (id === "1") {
      navigate("/watched-page-ads");
    } else if (id === "2") {
      navigate("/watched-page-searches");
    }
  }
  return (
    <div className="watched-page">
      <Navbar />
      <section className="watched-page-header-section">
        <div className="watched-page-header-box">
          <div className="watched-page-header">
            <h3 className="watched-page-heading">Your followed searches</h3>
          </div>
          <div className="ads-search-tabs-box">
            <button
              className={
                active === "1" ? "ad-search-btn-active" : "ad-search-btn"
              }
              role="tab"
              key={1}
              id={"1"}
              onClick={handleadsearchpage}
            >
              Watched ads (0)
            </button>
            <button
              className={
                active === "2" ? "ad-search-btn-active" : "ad-search-btn"
              }
              role="tab"
              key={2}
              id={"2"}
              onClick={handleadsearchpage}
            >
              Watched searches (0)
            </button>
          </div>
        </div>
      </section>
      <section className="watched-ads-show-section">
        <div className="watched-ads-show-box">
          <div className="watched-ads-content">
            <figure className="watched-ads-none-box">
              <img src={watchedsearchesnoneimg} alt="no-ads-img"></img>
            </figure>
            <h5 className="watched-ads-none-heading">
              Here you will see the observed vehicles
            </h5>
            <p className="watched-ads-none-para">
              Add the ad to your watch list in the search results or directly on
              the ad page. Thanks to this, you can browse and compare vehicles
              that interest you.
            </p>
          </div>
        </div>
      </section>

      <Homefooter />
    </div>
  );
}

export default Watchedsearchpage;
