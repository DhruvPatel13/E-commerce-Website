import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const currency = "₹";

  const fetchProductsList = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.data.success) {
        setAllProducts(response.data.products);
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchProductsList();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  const contextValue = {
    backendURL,
    token,
    setToken,
    loading,
    setLoading,
    isDark,
    setIsDark,
    showLogin,
    setShowLogin,
    allProducts,
    currency,
    fetchProductsList
  };
  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
