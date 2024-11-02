import React, { useContext } from "react";
import cardStyles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../../Context/ShopContext";

const ProductCard = ({ id, name, desc, image, price, offer_price }) => {
  const { currency } = useContext(ShopContext);
  const descTrimmer = (text = "text", maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? `${words.slice(0, maxWords).join(" ")}...`
      : text;
  };
  return (
    <>
      <Link to={`/product/${id}`} className={cardStyles.card_link}>
        <div className={cardStyles.img_holder}>
          <img src={image} alt="" className={cardStyles.product_image} loading="lazy" />
        </div>
        <div className={cardStyles.text_holder}>
          <h6 className={cardStyles.product_name}>
            {window.innerWidth > 600 ? name : descTrimmer(name, 4)}
          </h6>
          <p className={cardStyles.product_desc}>
            {window.innerWidth > 600
              ? descTrimmer(desc, 6)
              : descTrimmer(desc, 3)}
            <span className={cardStyles.see_more}>See more</span>
          </p>
          <div className={cardStyles.price_holder}>
            {offer_price > 0 ? (
              <>
                <p className={cardStyles.offer_price}>
                  {currency}
                  {price}
                </p>
                <p className={cardStyles.price}>
                  {currency}
                  {offer_price}
                </p>
              </>
            ) : (
              <p className={cardStyles.price}>
                {currency}
                {price}
              </p>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
