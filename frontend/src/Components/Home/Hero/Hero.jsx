import React, { useState, useEffect, useContext } from "react";
import heroStyles from "./Hero.module.css";
import { heroAssets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../Context/ShopContext";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(heroAssets.model1);
  const [fade, setFade] = useState(true);
  const { isDark } = useContext(ShopContext);

  const navigate = useNavigate();

  const getRandomImage = () => {
    const images = [];
    for (const img in heroAssets) {
      if (heroAssets[img].includes("model")) images.push(heroAssets[img]);
    }
    return images[Math.floor(Math.random() * images.length)];
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage(getRandomImage());
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <section className={heroStyles.hero}>
      {/* hero left */}
      <article className={heroStyles.hero_left}>
        <div className={heroStyles.left_content}>
          <h1 className={heroStyles.left_title}>
            EXPLORE YOUR TRUE <span>CREATIVE </span>
            FASHION
          </h1>
          <p className={heroStyles.left_text}>
            Elevate your wardrobe with the latest trends and timeless pieces
            designed for every occasion.
          </p>
          <div>
            <img
              loading="lazy"
              src={heroAssets.arrow_animation}
              className={heroStyles.video}
            />
          </div>
          <button onClick={() => navigate("/collection")}>Shop &#10132;</button>
        </div>
      </article>

      {/* hero center */}
      <figure
        className={heroStyles.hero_center}
        style={{
          background: isDark ? "var(--gradientDark)" : "var(--gradientLight)",
          opacity: isDark ? "0.7" : "1",
        }}
      >
        <img
          loading="lazy"
          src={currentImage}
          alt="fashion models"
          className={` ${fade ? heroStyles.fade_in : heroStyles.fade_out}`}
        />
      </figure>

      {/* hero right  */}
      <aside className={heroStyles.hero_right}>
        <div className={heroStyles.right_content}>
          <div className={heroStyles.right_info}>
            <div className={heroStyles.right_img_holder}>
              <img
                loading="lazy"
                src={
                  isDark
                    ? heroAssets.location_icon_dark
                    : heroAssets.location_icon
                }
              />
            </div>
            <h2 className={heroStyles.right_title}>100+</h2>
            <p className={heroStyles.right_text}>Cities & Areas</p>
          </div>
          <div className={heroStyles.right_info}>
            <div className={heroStyles.right_img_holder}>
              <img
                loading="lazy"
                src={
                  isDark
                    ? heroAssets.delivery_icon_dark
                    : heroAssets.delivery_icon
                }
              />
            </div>
            <h2 className={heroStyles.right_title}>650k+</h2>
            <p className={heroStyles.right_text}>Products Delivered</p>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Hero;
