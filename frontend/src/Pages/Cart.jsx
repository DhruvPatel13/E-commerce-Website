import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import cartStyles from "./Css/Cart.module.css";
import Title from "../Components/Common/Title/Title";
import CartTotal from "../Components/Cart/CartTotal";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    allProducts,
    currency,
    cartItems,
    token,
    updateQuantity,
    isDark,
    navigate,
    getCartAmount,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, allProducts]);

  const handleNavigate = () => {
    if (getCartAmount() < 101) return toast.error("Cart is empty!");
    if (token) {
      navigate("/place-order");
    } else {
      toast.error("Please login!");
      navigate("/login");
    }
  };
  return (
    <div className={cartStyles.cart}>
      <Title text1={"YOUR"} text2={"CART"} />
      <div className={cartStyles.cart_content}>
        {cartData.map((item, idx) => {
          const productData = allProducts.find(
            (product) => product._id === item._id
          );
          return (
            <div className={cartStyles.product} key={idx}>
              <div className={cartStyles.img_holder}>
                <img src={productData.image[0]} loading="lazy" />
              </div>
              <div className={cartStyles.product_cards}>
                <div className={cartStyles.product_info}>
                  <p>{productData.name}</p>
                  <div className={cartStyles.price_holder}>
                    {productData.offer_price > 0 ? (
                      <p className={cartStyles.price}>
                        {currency}
                        {productData.offer_price}
                      </p>
                    ) : (
                      <p className={cartStyles.price}>
                        {currency}
                        {productData.price}
                      </p>
                    )}
                    <p className={cartStyles.product_size}>{item.size}</p>
                  </div>
                </div>
                <div className={cartStyles.input_box}>
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                </div>
                <div className={cartStyles.delete_icon}>
                  <img
                    className={`${isDark ? "invert" : ""}`}
                    src={assets.bin_icon}
                    loading="lazy"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cartStyles.cart_total_holder}>
        <CartTotal />
        <button onClick={handleNavigate}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
