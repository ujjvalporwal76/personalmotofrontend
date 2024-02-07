import React from "react";
import { BsChatFill, BsPersonFill, BsCheckCircleFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import "./Sellercard.css";

function Sellercard(props) {
  return (
    <div className="seller-card">
      <section className="seller-card-section">
        <div className="seller-heading">
          <h2 className="seller-name">{props.sellerName}</h2>
        </div>
        <section className="seller-features">
          <article className="seller-feature-type">
            <BsCheckCircleFill className="seller-feature-icons" size={25} />
            <span>Private Person</span>
          </article>
          <article className="seller-feature-reply">
            <BsChatFill className="seller-feature-icons" size={25} />
            <span>He responds very efficiently</span>
          </article>
          <article className="seller-feature-registration-date">
            <BsPersonFill className="seller-feature-icons" size={30} />
            <span>Seller on OTOMOTO since 2020</span>
          </article>
        </section>
        <section className="seller-card-contact">
          <div className="seller-email-contact">
            <button className="seller-email-send-btn">
              <GrMail className="seller-contact-icons" size={25} />
              Contact the seller
            </button>
          </div>
        </section>
        <section className="seller-card-contact">
          <div className="seller-phone-contact">
            <button className="seller-phone-call-btn">
              <IoMdCall className="seller-contact-icons" size={25} />
              {props.telePhone}
            </button>
          </div>
        </section>
        <section className="seller-card-links">
          <article className="seller-card-location">
            <CiLocationOn className="seller-card-link-icons" size={25} />
            <a className="seller-location-link" href="#">
              Tarnowskie Góry, Tarnowskie Góry, Silesia
            </a>
          </article>
        </section>
      </section>
    </div>
  );
}

export default Sellercard;
