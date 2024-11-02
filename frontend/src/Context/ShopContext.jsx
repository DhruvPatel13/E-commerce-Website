import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "₹";
  const delivery_fee = 100;
  const navigate = useNavigate();

  // get all products
  const getProductsList = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/product/list");
      if (data.success) {
        setLoading(false);
        setAllProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // saving token to localStorage
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    getProductsList();
  }, []);

  // to apply filter
  const applyFilter = useCallback(() => {
    let productCopy = [...allProducts];
    if (category.length > 0) {
      productCopy = productCopy.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((product) =>
        subCategory.includes(product.subcategory)
      );
    }
    if (showSearchBar && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(productCopy);
  }, [category, subCategory, search, showSearchBar, allProducts]);

  // get user cart
  const getUserCart = async (token) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (data.success) {
        setCartItems(data.cartData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      }
    }
  };

  // get cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId]) {
        for (const size in cartItems[itemId]) {
          const count = cartItems[itemId][size];
          if (typeof count === "number" && count > 0) {
            totalCount += count;
          }
        }
      }
    }
    return totalCount;
  };

  // update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      }
    }
  };

  // get cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = allProducts.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          totalAmount +=
            (itemInfo.offer_price > 0 ? itemInfo.offer_price : itemInfo.price) *
            cartItems[items][item];
        } catch (e) {
          console.log(e);
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    allProducts,
    backendUrl,
    token,
    setToken,
    showSearchBar,
    setShowSearchBar,
    search,
    setSearch,
    filteredProducts,
    setFilteredProducts,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    applyFilter,
    addToCart,
    getCartAmount,
    updateQuantity,
    getCartCount,
    currency,
    cartItems,
    setCartItems,
    delivery_fee,
    isDark,
    setIsDark,
    loading,
    navigate,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
