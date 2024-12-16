import React, {  useEffect } from "react";
import appStyles from "./App.module.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Spinner from "./Components/Spinner/Spinner";
import { useContext } from "react";
import { AdminContext } from "./Context/AdminContext";

const App = () => {
  const { loading, showLogin } = useContext(AdminContext);

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLogin, loading]);

  if (loading) return <Spinner />;

  return (
    <>
      {showLogin ? <Login /> : <></>}
      <div className={`${appStyles.app} ${showLogin ? "blur" : ""}`}>
        <Navbar />
        <div className={appStyles.app_content}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
