import React, { useEffect, useContext } from "react";
import navStyles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { applyDarkTheme, applyLightTheme } from "../../assets/themeFuncs";
import { AdminContext } from "../../Context/AdminContext";

const Navbar = () => {
  const { isDark, setIsDark, setShowLogin, token, setToken } =
    useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("menu");
    setToken("");
    navigate("/");
  };

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
          <Link to="/">
            <img     loading="lazy"
              className={`${isDark ? "invert" : ""}`}
              src={assets.logo_black}
              alt="website logo"
            />
          </Link>
        </div>
        <div className={navStyles.icons_holder}>
          <div className={navStyles.toggle_container}>
            <input
              className={navStyles.checkbox}
              type="checkbox"
              id="theme-btn"
              onChange={() => setIsDark((prev) => !prev)}
              checked={isDark}
            />
            <label htmlFor="theme-btn" className={navStyles.toggle_label}>
              <div className={navStyles.toggle_icon}></div>
              <img
                  loading="lazy"
                src={isDark ? assets.night_icon : assets.day_icon}
                alt="day/night img"
              />
            </label>
          </div>
          <div className={navStyles.login_toggler}>
            {token ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <button onClick={() => setShowLogin(true)}>Login</button>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
