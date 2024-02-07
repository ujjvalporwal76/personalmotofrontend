import React from "react";
import { AiFillCar, AiTwotoneSetting } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";

import "./Searchform.css";
import Test from "./Test";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import { useParams } from "react-router-dom";

function Searchform() {
  const categoryName = useParams();

  return (
    <article id="search-form-section" className="product-search-form-section">
      <ul className="search-form-category-list">
        <li className="search-form-category-list-item">
          <a className="category-nav-item" href="/category/personal">
            <span
              className={`category-nav-item-detail ${
                categoryName.categoryName === "personal"
                  ? "category-nav-item-detail-active"
                  : ""
              }`}
            >
              <i>
                <AiFillCar size={32} />
              </i>
              <div className="category-nav-item-name-box">
                <p className="category-nav-item-name">Personal</p>
              </div>
            </span>
          </a>
        </li>
        <li className="search-form-category-list-item">
          <a className="category-nav-item" href="/category/parts">
            <span
              className={`category-nav-item-detail ${
                categoryName.categoryName === "parts"
                  ? "category-nav-item-detail-active"
                  : ""
              }`}
            >
              <i>
                <AiTwotoneSetting size={32} />
              </i>
              <div>
                <p>Parts</p>
              </div>
            </span>
          </a>
        </li>
        <li className="search-form-category-list-item">
          <a className="category-nav-item" href="/category/motorcycle">
            <span
              className={`category-nav-item-detail ${
                categoryName.categoryName === "motorcycle"
                  ? "category-nav-item-detail-active"
                  : ""
              }`}
            >
              <i>
                <FaMotorcycle size={32} />
              </i>
              <div>
                <p>Motocycle</p>
              </div>
            </span>
          </a>
        </li>
        <li className="search-form-category-list-item">
          {/* <a className="category-nav-item" href="/category/personal-categories">
            <span
              className={`category-nav-item-detail ${
                categoryName.categoryName === "personal-categories"
                  ? "category-nav-item-detail-active"
                  : ""
              }`}
            >
              <i>
                <BiCategoryAlt size={32} />
              </i>
              <div>
                <p>Personal Categories</p>
              </div>
            </span>
          </a> */}
          <div className="category-nav-item" id="personal-categories">
            <span
              className={`category-nav-item-detail ${
                categoryName.categoryName === "personal-categories"
                  ? "category-nav-item-detail-active"
                  : ""
              }`}
            >
              <i>
                <BiCategoryAlt size={32} />
              </i>
              <div>
                <p>Personal Categories</p>
              </div>
              {/* Dropdown menu */}
              <ul className="dropdown-menu-personal-category">
                <li>
                  <a href="/category/delivery">Delivery Vehicles</a>
                </li>
                <li>
                  <a href="/category/trucks">Trucks</a>
                </li>
                <li>
                  <a href="/category/construction">Construction</a>
                </li>
                <li>
                  <a href="/category/trailers">Trailers</a>
                </li>
                <li>
                  <a href="/category/agricultural">Agricultural</a>
                </li>
              </ul>
            </span>
          </div>
        </li>
      </ul>
      {/* <Test /> */}
      {categoryName.categoryName === "personal" ? <Test /> : ""}
      {categoryName.categoryName === "parts" ? <Test1 /> : ""}
      {categoryName.categoryName === "motorcycle" ? <Test2 /> : ""}
      {categoryName.categoryName === "trucks" ? <Test3 /> : ""}
      {categoryName.categoryName === "delivery" ? <Test3 /> : ""}
      {categoryName.categoryName === "construction" ? <Test3 /> : ""}
      {categoryName.categoryName === "trailers" ? <Test3 /> : ""}
      {categoryName.categoryName === "agricultural" ? <Test3 /> : ""}
    </article>
  );
}

export default Searchform;
