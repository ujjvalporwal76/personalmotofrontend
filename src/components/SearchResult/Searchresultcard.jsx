import React from "react";
import "./Searchresultcard.css";
import { Row, Col, Button } from "antd";
import { GiGearStickPattern } from "react-icons/gi";
import { TbRoad } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import { CiCalendar, CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
function Searchresultcard(props) {
  const TimeAgo = ({ timestamp }) => {
    const calculateTimeDifference = (date) => {
      const now = new Date();
      const postDate = new Date(date);
      const timeDifference = now - postDate;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        return `${seconds} seconds ago`;
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else {
        return `${days} days ago`;
      }
    };

    const timeAgo = calculateTimeDifference(timestamp);

    return <span>{timeAgo}</span>;
  };
  return (
    <a className="search-result-card-box" href={`/product/${props.productId}`}>
      <article className="search-card">
        <Row
          gutter={
            {
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }[(8, 8)]
          }
          className="search-card-in-row"
        >
          <Col className="gutter-row search-card-img-box" span={6}>
            <img
              className="search-card-img"
              src={props.image}
              alt="car-img"
            ></img>
          </Col>
          <Col className="gutter-row" span={9}>
            <div className="search-card-heading-box">
              <h1 className="search-card-heading">{props.name}</h1>
              <p className="search-card-feature">
                {props.capacity} ● {props.bodyType} ● {props.power}
              </p>
            </div>
            <div className="search-card-details-box">
              <div className="search-card-type">
                <Button type="primary" className="search-card-type-btn">
                  {props.adType}
                </Button>
              </div>
              <dl className="search-card-details-main">
                <dt className="search-card-details-dt">Mileage</dt>
                <dd className="search-card-details-dd">
                  <TbRoad />
                  {props.mileage}
                </dd>
                <dt className="search-card-details-dt">Fuel Type</dt>
                <dd className="search-card-details-dd">
                  <BsFuelPump />
                  {props.fuelType}
                </dd>
                <dt className="search-card-details-dt">Gear Type</dt>
                <dd className="search-card-details-dd">
                  <GiGearStickPattern />
                  {props.gearBox}
                </dd>
                <dt className="search-card-details-dt">Production Year</dt>
                <dd className="search-card-details-dd">
                  <CiCalendar />
                  {props.productionYear}
                </dd>
              </dl>
              <dl className="search-card-other-dl">
                <dd className="search-card-other-dd">
                  <p>
                    Posted <TimeAgo timestamp={props.updatedAt} />.
                  </p>
                </dd>
                <dd className="search-card-other-dd">
                  <div>
                    <p>
                      <CiUser />
                      Private seller
                    </p>
                  </div>
                </dd>
              </dl>
            </div>
          </Col>
          <Col className="gutter-row search-card-price-col" span={6}>
            <div className="search-card-price-box">
              <div className="search-card-price-box-i">
                <h3 className="search-card-price-heading">{props.price}</h3>
                <p className="search-card-price-currency">PLN</p>
              </div>
            </div>
            <div className="search-card-action-box">
              <button type="button" className="search-card-action-btn">
                <FaRegHeart className="search-card-wishlist-icon" />
              </button>
            </div>
          </Col>
        </Row>
      </article>
    </a>
  );
}

export default Searchresultcard;
