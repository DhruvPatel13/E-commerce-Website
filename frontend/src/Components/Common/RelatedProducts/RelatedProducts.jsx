import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../../Context/ShopContext";
import relatedStyles from "./RelatedProducts.module.css";
import Title from "../Title/Title";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ category, subCategory }) => {
  const { allProducts } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let productCopy = allProducts.slice();
    productCopy = productCopy.filter(
      (product) => category === product.category
    );
    productCopy = productCopy.filter(
      (product) => subCategory === product.subCategory
    );
    productCopy = productCopy.slice(0, 4);
    setFilteredProducts(productCopy);
  }, [allProducts]);

  return (
    <>
      <Title text1={"RELATED"} text2={"PRODUCTS"} />
      <div className={relatedStyles.card_holder}>
        {filteredProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            id={product._id}
            name={product.name}
            desc={product.description}
            price={product.price}
            image={product.image[0]}
            offer_price={product.offer_price}
          />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
