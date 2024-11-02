import React, { useContext } from "react";
import serviceStyles from "./ServiceCards.module.css";
import { ShopContext } from "../../../Context/ShopContext";

const ServiceCards = ({ contentInfo }) => {
  const { isDark } = useContext(ShopContext);
  const getRadiusClass = (index) => {
    if (index === 0) return serviceStyles.radius1;
    if (index === 1) return serviceStyles.radius2;
    return serviceStyles.radius3;
  };
  return (
    <div className={serviceStyles.info}>
      {contentInfo.map((item, idx) => (
        <div className={serviceStyles.box} key={idx}>
          <div
            className={`${serviceStyles.box_icon_holder} ${getRadiusClass(
              idx
            )}`}
          >
            <img src={item.url} className={`${isDark ? "invert" : ""}`} loading="lazy"/>
          </div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
