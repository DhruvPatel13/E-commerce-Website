import React, { useContext, useEffect, useState } from "react";
import appStyles from "./App.module.css";
import Navbar from "./Components/Common/Navbar/Navbar";
import Footer from "./Components/Common/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import ViewProduct from "./Pages/ViewProduct";
import Cart from "./Pages/Cart";
import Profile from "./Components/Common/Profile/Profile";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Verify from "./Pages/Verify";
import Spinner from "./Components/Common/Spinner/Spinner";
import { ShopContext } from "./Context/ShopContext";

const App = () => {
  const { loading } = useContext(ShopContext);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setPageReady(true);
    } else {
      const handleLoad = () => setPageReady(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = loading || !pageReady ? "hidden" : "auto";
  }, [loading, pageReady]);

  if (loading || !pageReady) return <Spinner />;

  return (
    <div className={appStyles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<ViewProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
