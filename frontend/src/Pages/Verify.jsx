import React, { useContext, useEffect } from "react";
import axios from "axios";
import verifyStyles from "./Css/Verify.module.css";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const { token, setCartItems, backendUrl, navigate } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!orderId) return;
      const { data } = await axios.post(
        backendUrl + "/api/order/verifystripe",
        { success, orderId },
        { headers: { token } }
      );
      if (data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className={verifyStyles.verify_page}>
      <div className={verifyStyles.spinner_wrapper}>
        <div className={verifyStyles.spinner}>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
