import React, { useContext, useState, useEffect } from "react";
import collStyles from "./Css/Collection.module.css";
import SearchBar from "../Components/Collection/SearchBar/SearchBar";
import Filter from "../Components/Collection/Filter/Filter";
import ProductCard from "../Components/Common/ProductCard/ProductCard";
import Title from "../Components/Common/Title/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";

const Collection = () => {
  const { filteredProducts, setFilteredProducts, applyFilter, isDark } =
    useContext(ShopContext);
  const [sortType, setSortType] = useState("relevant");

  const toggleShowFilter = () => {
    if (window.innerWidth > 750) return;
    document.getElementById("arrow_image").classList.toggle(collStyles.active);
    document
      .getElementById("filter_holder")
      .classList.toggle(collStyles.active);
  };

  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <SearchBar />
      <section className={collStyles.collection_content}>
        <Title text1={"ALL"} text2={"COLLECTION"} />
        <div className={collStyles.titles_holder}>
          <div className={collStyles.filter_title} onClick={toggleShowFilter}>
            <Title text1={"FILTER"} line={false} />
            <img
            loading="lazy"
              src={assets.dropdown_black}
              id="arrow_image"
              className={`${isDark ? "invert" : ""}`}
            />
          </div>
          <div className={collStyles.sort_holder}>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="low-high">SORT by: Low to High</option>
              <option value="high-low">SORT by: High to Low</option>
              <option value="offer-only">SORT by: Relevant</option>
            </select>
          </div>
        </div>
        <div className={collStyles.content_holder}>
          <div className={collStyles.filter_holder} id="filter_holder">
            <Filter />
          </div>
          <div className={collStyles.collection_items}>
            <div className={collStyles.card_holder}>
              {filteredProducts &&
                filteredProducts.map((product, idx) => (
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
