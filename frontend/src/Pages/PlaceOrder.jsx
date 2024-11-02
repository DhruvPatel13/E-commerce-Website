import React, { useContext, useState } from "react";
import placeStyles from "./Css/PlaceOrder.module.css";
import axios from "axios";
import CartTotal from "../Components/Cart/CartTotal";
import Title from "../Components/Common/Title/Title";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    allProducts,
    isDark,
    navigate,
  } = useContext(ShopContext);

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: (response) => {
        const { razorpay_order_id } = response;
        verifyRazorpay(razorpay_order_id);
      },
      modal: {
        ondismiss: () => {
          verifyRazorpay(order.id);
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyRazorpay = async (orderId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/order/verifyrazorpay",
        { orderId },
        { headers: { token } }
      );
      if (data.success) {
        navigate("/orders");
        setCartItems({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              allProducts.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      //API calls according to payment method
      switch (paymentMethod) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const stripeResponse = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (stripeResponse.data.success) {
            const { session_url } = stripeResponse.data;
            window.location.replace(session_url);
          } else {
            toast.error(stripeResponse.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className={placeStyles.place_order_holder}
      >
        <div className={placeStyles.holder_left}>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          <div className={placeStyles.delivery_form}>
            <div className={placeStyles.input_half}>
              <input
                type="text"
                placeholder="First Name"
                required
                onChange={onChangeHandler}
                value={formData.firstName}
                name="firstName"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                onChange={onChangeHandler}
                value={formData.lastName}
                name="lastName"
              />
            </div>
            <div className={placeStyles.input_full}>
              <input
                type="email"
                placeholder="Email Address"
                onChange={onChangeHandler}
                value={formData.email}
                required
                name="email"
              />
              <input
                type="text"
                placeholder="Street"
                onChange={onChangeHandler}
                value={formData.street}
                required
                name="street"
              />
            </div>
            <div className={placeStyles.input_half}>
              <input
                type="text"
                placeholder="City"
                onChange={onChangeHandler}
                value={formData.city}
                required
                name="city"
              />
              <input
                type="text"
                placeholder="State"
                onChange={onChangeHandler}
                value={formData.state}
                required
                name="state"
              />
            </div>
            <div className={placeStyles.input_half}>
              <input
                type="text"
                placeholder="Zipcode"
                onChange={onChangeHandler}
                value={formData.zipcode}
                required
                name="zipcode"
              />
              <input
                type="text"
                placeholder="Country"
                onChange={onChangeHandler}
                value={formData.country}
                required
                name="country"
              />
            </div>
            <div className={placeStyles.input_full}>
              <input
                type="number"
                placeholder="Phone Number"
                onChange={onChangeHandler}
                value={formData.phone}
                required
                name="phone"
              />
            </div>
          </div>
        </div>
        <div className={placeStyles.holder_right}>
          <div className={placeStyles.cart_total_holder}>
            <CartTotal />
          </div>
          <div className={placeStyles.payment_methods}>
            <div className={placeStyles.title}>
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>
            <div className={placeStyles.payment_method_content}>
              <div
                onClick={() => setPaymentMethod("stripe")}
                className={`${placeStyles.payment_method} 
                  ${isDark ? placeStyles.active : ""}
                  `}
              >
                <span
                  className={
                    paymentMethod === "stripe" ? placeStyles.circle : ""
                  }
                ></span>
                <img src={assets.stripe_logo} loading="lazy" />
              </div>
              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={placeStyles.payment_method}
              >
                <span
                  className={
                    paymentMethod === "razorpay" ? placeStyles.circle : ""
                  }
                ></span>
                <img src={assets.razorpay_logo} loading="lazy" />
              </div>
              <div
                onClick={() => setPaymentMethod("cod")}
                className={placeStyles.payment_method}
              >
                <span
                  className={paymentMethod === "cod" ? placeStyles.circle : ""}
                ></span>
                <p>CASH ON DELIVERY</p>
              </div>
            </div>
          </div>
          <button type="submit">PLACE ORDER</button>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
