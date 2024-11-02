import React, { useContext, useEffect } from "react";
import filterStyles from "./Filter.module.css";
import { ShopContext } from "../../../Context/ShopContext";

const Filter = () => {
  const {
    category,
    setCategory,
    allProducts,
    subCategory,
    setSubCategory,
    applyFilter,
    search,
    showSearchBar,
  } = useContext(ShopContext);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearchBar, allProducts, applyFilter]);

  return (
    <div className={filterStyles.filter}>
      <div className={filterStyles.filter_content}>
        <div className={filterStyles.left_content}>
          <h3>CATEGORIES</h3>
          <div className={filterStyles.input_box}>
            <label htmlFor="men">
              <input
                type="checkbox"
                id="men"
                value={"Men"}
                onChange={(e) => toggleCategory(e)}
              />
              Men
            </label>
            <label htmlFor="women">
              <input
                type="checkbox"
                id="women"
                value={"Women"}
                onChange={(e) => toggleCategory(e)}
              />
              Women
            </label>
            <label htmlFor="kids">
              <input
                type="checkbox"
                id="kids"
                value={"Kids"}
                onChange={(e) => toggleCategory(e)}
              />
              Kids
            </label>
          </div>
        </div>
        <div className={filterStyles.right_content}>
          <h3>SUB CATEGORIES</h3>
          <div className={filterStyles.input_box}>
            <label htmlFor="topwear">
              <input
                type="checkbox"
                id="topwear"
                value={"Topwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Top Wear
            </label>
            <label htmlFor="bottomwear">
              <input
                type="checkbox"
                id="bottomwear"
                value={"Bottomwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Bottom Wear
            </label>
            <label htmlFor="winterwear">
              <input
                type="checkbox"
                id="winterwear"
                value={"Winterwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Winter Wear
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
