import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Title from "../Components/Common/Title/Title";
import orderStyles from "./Css/Orders.module.css";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;
      const { data } = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (data.success) {
        let allOrderItem = [];
        data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["permission"] = order.permission;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });

        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <div className={orderStyles.orders_page}>
      <Title text1={"MY"} text2={"ORDERS"} />
      <div className={orderStyles.order_container}>
        {orderData.map((item, idx) => (
          <div key={idx} className={orderStyles.order}>
            <div className={orderStyles.order_left}>
              <img src={item.image[0]} loading="lazy" />
              <div className={orderStyles.order_info}>
                <p>{item.name}</p>
                <div className={orderStyles.order_small_info}>
                  <p>
                    {currency}
                    {item.offer_price > 0 ? item.offer_price : item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>
                  Date: <span>{new Date(item.date).toDateString()}</span>
                </p>
                <p>
                  payment Method: <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className={orderStyles.column}>
              <div className={orderStyles.order_center}>
                {item.permission === null && (
                  <>
                    <span className={orderStyles.orange}></span>
                    <strong className={orderStyles.approval}>
                      In Approval Queue
                    </strong>
                  </>
                )}
                {item.permission == true && (
                  <>
                    <span></span>
                    <strong>{item.status}</strong>
                  </>
                )}
                {item.permission === false && (
                  <>
                    <span className={`${orderStyles.red}`}></span>
                    <strong>Order Rejected</strong>
                  </>
                )}
              </div>
              <div className={orderStyles.order_right}>
                <button onClick={loadOrderData}>TRACK ORDER</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
