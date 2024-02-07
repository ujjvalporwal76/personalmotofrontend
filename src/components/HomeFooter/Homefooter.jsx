import React from "react";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import apple from "../../images/apple.png";
import google from "../../images/google.png";
import "./Homefooter.css";

function Homefooter() {
  return (
    <section id="home-footer">
      <section className="home-footer-section">
        <article className="home-footer-social">
          <h6 className="home-footer-social-heading">Find us</h6>
          <p>
            <BsFacebook size={28} />
            <a href="#" className="home-footer-social-link">
              Facebook
            </a>
          </p>
          <p>
            <BsInstagram size={28} />
            <a href="#" className="home-footer-social-link">
              Instagram
            </a>
          </p>
          <p>
            <BsYoutube size={28} />
            <a href="#" className="home-footer-social-link">
              Youtube
            </a>
          </p>
          <p></p>
        </article>

        <article className="home-footer-feature">
          <h6 className="home-footer-feature-heading">PERSONALMOTO</h6>
          <ul>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Help
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Contact
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Advertisement
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Dealer Development Academy
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Press Office
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Privacy policy
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Cookie policy
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Cookie settings
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Personalmoto Regulations
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-feature-name">
                <span className="home-footer-feature-name-span">
                  <a className="home-footer-feature-link" href="#">
                    Regulations for business Customers
                  </a>
                </span>
              </p>
            </li>
          </ul>
        </article>
        <article className="home-footer-services">
          <h6 className="home-footer-services-heading">SERVICES AND TOOLS</h6>
          <ul>
            <li>
              <p className="home-footer-service-name">
                <span className="home-footer-service-name-span">
                  <a className="home-footer-service-link" href="#">
                    Sale and Purchase Agreement
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-service-name">
                <span className="home-footer-service-name-span">
                  <a className="home-footer-service-link" href="#">
                    How much is your car worth?
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-service-name">
                <span className="home-footer-service-name-span">
                  <a className="home-footer-service-link" href="#">
                    Financing on Personalmoto
                  </a>
                </span>
              </p>
            </li>
            <li>
              <div className="home-footer-customer-service-box">
                <h6>CUSTOMER SERVICE</h6>
                <p className="customer-service-detail">+91 849382938</p>
                <p className="customer-service-detail">
                  help@personalmoto.email
                </p>
                <p className="customer-service-detail">
                  (Monday to Friday 8:00 - 17:00)
                </p>
              </div>
            </li>
          </ul>
        </article>

        <article className="home-footer-info">
          <h6 className="home-footer-info-heading">USEFUL INFORMATION</h6>
          <ul>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Price list for individual customers
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Price list for business customers
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Car tests
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Internet car of the year
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Category Map
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Map of the town
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Important Information
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Career
                  </a>
                </span>
              </p>
            </li>
            <li>
              <p className="home-footer-info-name">
                <span className="home-footer-info-name-span">
                  <a className="home-footer-info-link" href="#">
                    Parts - good Practices
                  </a>
                </span>
              </p>
            </li>
          </ul>
        </article>

        <span id="footer-section-divider"></span>
        <article className="home-footer-app-section">
          <p className="home-footer-app-show">Our Application on your tips</p>
          <div className="home-footer-app-box-o">
            <div className="home-footer-app-box">
              <a className="home-footer-app-link" href="#">
                <div>
                  <img
                    src={apple}
                    alt="apple-store-logo"
                    className="home-footer-app-logo"
                  ></img>
                </div>
              </a>
            </div>
            <div className="home-footer-app-box">
              <a className="home-footer-app-link" href="#">
                <div className="home-footer-app-logo">
                  <img
                    src={google}
                    alt="google-playstore-logo"
                    className="home-footer-app-logo"
                  ></img>
                </div>
              </a>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

export default Homefooter;
