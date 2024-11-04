import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import listStyles from "./Css/List.module.css";
import { AdminContext } from "../Context/AdminContext";

const List = () => {
  const { token, backendURL, currency, allProducts, fetchProductsList } =
    useContext(AdminContext);

  const removeProduct = async (id) => {
    if (!token) return toast.error("Login To Make Changes");
    try {
      const response = await axios.post(backendURL + "/api/product/remove", {
        id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProductsList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={listStyles.list}>
      <div className={listStyles.list_table}>
        <div className={listStyles.list_table_format}>
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
        {allProducts.map((item, index) => {
          return (
            <div key={index} className={listStyles.list_table_format}>
              <img src={item.image[0]}     loading="lazy" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p className={listStyles.price}>
                {item.offer_price > 0 ? (
                  <>
                    {currency}{item.offer_price}/<span>{item.price}</span>
                  </>
                ) : (
                  <>
                    {currency}{item.price}
                  </>
                )}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className={listStyles.action_btn}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
