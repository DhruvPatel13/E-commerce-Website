import React, { useContext } from "react";
import barStyles from "./SearchBar.module.css";
import { assets } from "../../../assets/assets";
import { ShopContext } from "../../../Context/ShopContext";

const SearchBar = () => {
  const { showSearchBar, setShowSearchBar, search, setSearch, isDark } =
    useContext(ShopContext);

  return (
    <div
      className={`${barStyles.search_bar} ${
        showSearchBar ? barStyles.active : ""
      }`}
    >
      <div
        className={`${barStyles.holder} 
            ${showSearchBar ? barStyles.active : ""}`}
      >
        <div className={barStyles.input_box}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <img
            src={assets.search_icon}
            className={`${isDark ? "invert" : ""}`}
            loading="lazy"
            />
        </div>
        <img
            className={`${isDark ? "invert" : ""}`}
            loading="lazy"
          src={assets.cross_icon}
          alt="cross icon"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
