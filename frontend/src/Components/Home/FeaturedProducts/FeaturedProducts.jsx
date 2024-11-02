import React, { useEffect, useContext, useState } from "react";
import featuredStyles from "./FeaturedProducts.module.css";
import Title from "../../Common/Title/Title";
import { ShopContext } from "../../../Context/ShopContext";

const FeaturedProducts = () => {
  const { allProducts, currency, navigate } = useContext(ShopContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const filteredProd = allProducts.filter(
      (product) => product.featured_product
    );
    setFeaturedProducts(filteredProd);
  }, [allProducts]);

  return (
    <section className={featuredStyles.featured_products}>
      <div className={featuredStyles.featured_products_holder}>
        <Title text1={"FEATURED"} text2={"PRODUCTS"} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit program
          temporizes.
        </p>
      </div>
      <div className={featuredStyles.card_holder}>
        {featuredProducts.map((product, idx) => (
          <div className={featuredStyles.card_link} key={idx}>
            <div className={featuredStyles.img_holder}>
              <img
              loading="lazy"
                src={product.image[0]}
                alt=""
                className={featuredStyles.product_image}
              />
            </div>
            <div className={featuredStyles.text_holder}>
              <h6 className={featuredStyles.product_name}>{product.name}</h6>
              <div className={featuredStyles.price_holder}>
                {product.offer_price > 0 ? (
                  <>
                    <p className={featuredStyles.offer_price}>
                      {currency}
                      {product.price}
                    </p>
                    <p className={featuredStyles.price}>
                      {currency}
                      {product.offer_price}
                    </p>
                  </>
                ) : (
                  <p className={featuredStyles.price}>
                    {currency}
                    {product.price}
                  </p>
                )}
              </div>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className={featuredStyles.view_button}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
