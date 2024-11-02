import React, { useContext, useState, useEffect } from "react";
import latestStyles from "./LatestCollection.module.css";
import ProductCard from "../../Common/ProductCard/ProductCard";
import { ShopContext } from "../../../Context/ShopContext";
import Title from "../../Common/Title/Title";

const LatestCollection = () => {
  const { allProducts } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(allProducts.slice(0, 8));
  }, [allProducts]);

  return (
    <section className={latestStyles.latest_collection}>
      <div className={latestStyles.title_holder}>
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit program
          temporizes.
        </p>
      </div>
      <div className={latestStyles.card_holder}>
        {latestProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            id={product._id}
            name={product.name}
            image={product.image[0]}
            desc={product.description}
            price={product.price}
            offer_price={product.offer_price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
