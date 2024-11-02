import React, { useState, useEffect, useContext } from "react";
import sideStyles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";

const Sidebar = () => {
  const { isDark } = useContext(AdminContext);
  const [menu, setMenu] = useState(sessionStorage.getItem("menu") || "");
  const menuHandler = (currMenu) => {
    setMenu(currMenu);
    sessionStorage.setItem("menu", currMenu);
  };

  useEffect(() => {
    const storedMenu = localStorage.getItem("menu");
    if (storedMenu) setMenu(storedMenu);
  }, []);

  return (
    <div className={sideStyles.sidebar}>
      <div className={sideStyles.option_holder}>
        <NavLink
          to={"/add"}
          onClick={() => menuHandler("add")}
          className={`${sideStyles.option}
            ${menu === "add" ? sideStyles.active : ""}
            `}
        >
          <img
            src={assets.add_icon}
            className={`${isDark ? "invert" : ""}`}
            loading="lazy"
          />
          <span>Add Items</span>
        </NavLink>
        <NavLink
          to={"/list"}
          onClick={() => menuHandler("list")}
          className={`${sideStyles.option}
             ${menu === "list" ? sideStyles.active : ""}
             `}
        >
          <img
            src={assets.list_icon}
            className={`${isDark ? "invert" : ""}`}
            loading="lazy"
          />
          <span>List Items</span>
        </NavLink>
        <NavLink
          to={"/orders"}
          onClick={() => menuHandler("orders")}
          className={`${sideStyles.option}
            ${menu === "orders" ? sideStyles.active : ""}
            `}
        >
          <img
            src={assets.order_icon}
            className={`${isDark ? "invert" : ""}`}
            loading="lazy"
          />
          <span>All Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
