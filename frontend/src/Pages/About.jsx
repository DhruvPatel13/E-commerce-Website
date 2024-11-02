import React from "react";
import aboutStyles from "./Css/About.module.css";
import { assets } from "../assets/assets";
import Subscribe from "../Components/Common/Subscribe/Subscribe";
import ServiceCards from "../Components/Common/ServiceCards/ServiceCards";
import Title from "../Components/Common/Title/Title";

const About = () => {
  return (
    <section className={aboutStyles.about}>
      <div className={aboutStyles.about_content}>
        <Title text1={"ABOUT"} text2={"US"} />
        <div className={aboutStyles.about_hero}>
          <img src={assets.about_img} loading="lazy" />
          <div className={aboutStyles.hero_text_holder}>
            <p>
              Trendix was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes
            </p>
            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <p>
              <strong className="text-gray-800">OUR MISSION:</strong>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>

        <div className={aboutStyles.perks_holder}>
          <Title text1={"PERKS &"} text2={"BENEFITS"} />
          <ServiceCards contentInfo={assets.aboutServiceData} />
        </div>
        <div className={aboutStyles.info_holder}>
          <div className={aboutStyles.info_left}>
            <div className={aboutStyles.info}>
              <h4>5</h4>
              <p>Years Experience</p>
            </div>
            <div className={aboutStyles.info}>
              <h4>50+</h4>
              <p>Products</p>
            </div>
          </div>
          <div className={aboutStyles.info_right}>
            <div className={aboutStyles.info}>
              <h4>1k+</h4>
              <p>Happy Customers</p>
            </div>
            <div className={aboutStyles.info}>
              <h4>10</h4>
              <p>Outlet</p>
            </div>
          </div>
        </div>
        <Subscribe />
      </div>
    </section>
  );
};

export default About;
