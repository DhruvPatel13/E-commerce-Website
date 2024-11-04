import React, { useState, useEffect, useContext } from "react";
import navStyles from "../Navbar/Navbar.module.css";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { ShopContext } from "../../../Context/ShopContext";
import { toast } from "react-toastify";
import { applyDarkTheme, applyLightTheme } from "../../../assets/themeFuncs";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState(sessionStorage.getItem("menu") || "home");

  const {
    showSearchBar,
    setShowSearchBar,
    token,
    setToken,
    getCartCount,
    isDark,
    setIsDark,
  } = useContext(ShopContext);

  const currentLocation = useLocation();
  const navigate = useNavigate();

  const menuHandler = (currMenu) => {
    setMenu(currMenu);
    sessionStorage.setItem("menu", currMenu);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const storedMenu = localStorage.getItem("menu");
    if (storedMenu) setMenu(storedMenu);
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible, menu]);

  useEffect(() => {
    if (isDark) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  }, [isDark]);

  return (
      <nav>
        <div className={navStyles.logo_holder}>
          <Link
            to={"/"}
            onClick={() => menuHandler("home")}
            className={navStyles.logo_holder_link}
          >
            <img
              className={`${isDark ? "invert" : ""}`}
              src={assets.logo_black}
              alt="website logo"
              loading="lazy"
            />
          </Link>
        </div>
        {/* nav-center */}
        <div className={navStyles.nav_menu_holder}>
          <ul className={navStyles.nav_menu}>
            <li
              onClick={() => menuHandler("home")}
              className={menu === "home" ? navStyles.active : ""}
            >
              <NavLink to={"/"}>HOME</NavLink>
              <hr className={menu === "home" ? navStyles.active : ""} />
            </li>
            <li
              onClick={() => menuHandler("collection")}
              className={menu === "collection" ? navStyles.active : ""}
            >
              <NavLink to={"/collection"}>COLLECTION</NavLink>
              <hr className={menu === "collection" ? navStyles.active : ""} />
            </li>
            <li
              onClick={() => menuHandler("about")}
              className={menu === "about" ? navStyles.active : ""}
            >
              <NavLink to={"/about"}>ABOUT</NavLink>
              <hr className={menu === "about" ? navStyles.active : ""} />
            </li>
            <li
              onClick={() => menuHandler("contact")}
              className={menu === "contact" ? navStyles.active : ""}
            >
              <NavLink to={"/contact"}>CONTACT</NavLink>
              <hr className={menu === "contact" ? navStyles.active : ""} />
            </li>
          </ul>
        </div>
        {/* nav-right */}
        <div className={navStyles.nav_icons}>
          <div className={navStyles.icon_holder}>
            {currentLocation.pathname === "/collection" ? (
              <img
                onClick={() => setShowSearchBar(!showSearchBar)}
                src={assets.search_icon}
                alt="search icon"
                loading="lazy"
                className={`${navStyles.icon} ${isDark ? "invert" : ""}`}
              />
            ) : (
              <div className={navStyles.toggle_container}>
                <input
                  className={navStyles.checkbox}
                  type="checkbox"
                  id="theme-btn"
                  onChange={() => setIsDark(!isDark)}
                  checked={isDark}
                />
                <label htmlFor="theme-btn" className={navStyles.toggle_label}>
                  <div className={navStyles.toggle_icon}></div>
                  <img
                    src={isDark ? assets.night_icon : assets.day_icon}
                    alt="day/night img"
                    loading="lazy"
                  />
                </label>
              </div>
            )}
            <div className={navStyles.profile_menu_holder}>
              <img
                loading="lazy"
                src={assets.profile_icon}
                className={`${navStyles.icon}
                   ${navStyles.profile_menu_icon}
                    ${isDark ? "invert" : ""}
                  `}
              />
              <div>
                <div className={navStyles.arrow_holder}>
                  <span className={navStyles.arrow}></span>
                </div>
                <ul className={navStyles.profile_menu}>
                  <li
                    onClick={
                      token
                        ? () => navigate("/profile")
                        : () => toast.error("please Login")
                    }
                  >
                    My Profile
                  </li>
                  <li
                    onClick={
                      token
                        ? () => navigate("/orders")
                        : () => toast.error("please Login")
                    }
                  >
                    Orders
                  </li>
                  {token ? (
                    <li onClick={logout}>Logout</li>
                  ) : (
                    <li onClick={() => navigate("/login")}>Login</li>
                  )}
                </ul>
              </div>
            </div>
            <div
              onClick={() =>
                token ? navigate("/cart") : toast.error("Please Login")
              }
              className={navStyles.cart}
            >
              <img
                src={assets.cart_icon}
                className={`${navStyles.icon} ${isDark ? "invert" : ""}`}
                loading="lazy"
              />
              <div className={navStyles.dot}>{getCartCount()}</div>
            </div>
            <img
              loading="lazy"
              src={assets.nav_dropdown}
              className={`${navStyles.icon}
                 ${navStyles.nav_dropdown}
                  ${isDark ? "invert" : ""}
                `}
              onClick={() => setVisible(!visible)}
            />
          </div>
        </div>

        {/* nav menu for small screens */}
        <div
          className={`${navStyles.dropdown_menu_holder}
             ${visible ? navStyles.on : ""}`}
        >
          <div
            className={navStyles.back_btn}
            onClick={() => setVisible(!visible)}
          >
            <img
              loading="lazy"
              src={isDark ? assets.dropdown_white : assets.dropdown_black}
              alt="dropdown icon"
            />
            <span>Back</span>
          </div>
          <ul className={navStyles.dropdown_menu}>
            <li
              className={menu === "home" ? navStyles.active : ""}
              onClick={() => (menuHandler("home"), setVisible(!visible))}
            >
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li
              className={menu === "collection" ? navStyles.active : ""}
              onClick={() => (menuHandler("collection"), setVisible(!visible))}
            >
              <NavLink to={"/collection"}>COLLECTIONS</NavLink>
            </li>
            <li
              className={menu === "about" ? navStyles.active : ""}
              onClick={() => (menuHandler("about"), setVisible(!visible))}
            >
              <NavLink to={"/about"}>ABOUT</NavLink>
            </li>
            <li
              className={menu === "contact" ? navStyles.active : ""}
              onClick={() => (menuHandler("contact"), setVisible(!visible))}
            >
              <NavLink to={"/contact"}>CONTACT</NavLink>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
