import React from "react";
import calloutStyles from "../CalloutBanners/CalloutBanners.module.css";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const CalloutBanners = () => {
  const navigate = useNavigate();
  return (
    <section className={calloutStyles.callout_banners}>
      <div className={calloutStyles.callout_left}>
        <div className={calloutStyles.men_banner}>
          <div className={calloutStyles.left_img_holder}>
            <img src={assets.men_banner} alt="" loading="lazy" />
          </div>
          <div className={calloutStyles.left_box}>
            <p>Explore Men's Fashion</p>
            <button onClick={() => navigate("/collection")}>Shop now</button>
          </div>
        </div>
        <div className={calloutStyles.women_banner}>
          <div className={calloutStyles.left_img_holder}>
            <img src={assets.women_banner} alt="" loading="lazy" />
          </div>
          <div className={calloutStyles.left_box}>
            <p>Elegant Styles Await</p>
            <button onClick={() => navigate("/collection")}>Shop now</button>
          </div>
        </div>
      </div>
      <div className={calloutStyles.callout_right}>
        <div className={calloutStyles.kids_girl_banner}>
          <div className={calloutStyles.right_img_holder}>
            <img src={assets.kid_girl} alt="" loading="lazy" />
          </div>
          <div className={calloutStyles.right_box}>
            <p>Adorable & Playful Picks </p>
            <button onClick={() => navigate("/collection")}>Shop now</button>
          </div>
        </div>
        <div className={calloutStyles.kids_boy_banner}>
          <div className={calloutStyles.right_img_holder}>
            <img src={assets.kid_boy} alt="" loading="lazy" />
          </div>
          <div className={calloutStyles.right_box}>
            <p>Kids' Fashion Favorites</p>
            <button onClick={() => navigate("/collection")}>Shop now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalloutBanners;
