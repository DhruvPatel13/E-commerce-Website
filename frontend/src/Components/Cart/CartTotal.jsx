import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import totalStyles from "./CartTotal.module.css";
import Title from "../Common/Title/Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className={totalStyles.cart_total_holder}>
      <Title text1={"CART"} text2={"TOTALS"} />
      <div className={totalStyles.content_holder}>
        <div className={totalStyles.box}>
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <div className={totalStyles.box}>
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <div className={totalStyles.box}>
          <p>Subtotal</p>
          <p>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
