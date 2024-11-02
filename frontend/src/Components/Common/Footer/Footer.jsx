import React, { useContext } from "react";
import footerStyles from "../Footer/Footer.module.css";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../Context/ShopContext";

const Footer = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ShopContext);
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer_content_holder}>
        <div className={footerStyles.footer_left}>
          <img
            src={assets.logo_black}
            className={`${isDark ? "invert" : ""}`}
            loading="lazy"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit Lorem ipsum
            dolor sit amet adipisicing elit. Lorem ipsum dolor sit.
          </p>
          <div
            className={`${footerStyles.social_icons_holder}
               ${isDark ? "invert" : ""}
               `}
          >
            <img src={assets.linkedin_icon} alt="facebook icon"loading="lazy" />
            <img src={assets.twitter_icon} alt="twitter icon" loading="lazy"/>
            <img src={assets.facebook_icon} alt="linkedin icon"loading="lazy" />
          </div>
        </div>
        <div className={footerStyles.footer_center}>
          <h3>COMPANY</h3>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className={footerStyles.footer_right}>
          <h3>GET IN TOUCH</h3>
          <p>+91 12345-67890</p>
          <p>dhruvpatel425122@gmail.com</p>
        </div>
      </div>
      <hr />
      <div className={footerStyles.copyright_section}>
        <p>Copyright 2024 &copy; Trendix.com - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
