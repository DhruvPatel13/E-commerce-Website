import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import Stripe from "stripe";

//global variable
const currency = "inr";
const deliveryCharge = 100;

// gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing orders using cod method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//placing orders using cod method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });
    return res.json({ success: true, session_url: session.url });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};

// verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

//placing orders using cod method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      } else {
        return res.json({ success: true, order });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//verify razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(orderId);

    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Payment successful" });
    } else if (orderInfo.status === "created" || "cancelled") {
      await orderModel.findByIdAndDelete(orderInfo.receipt.toString());
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//placing orders using cod method
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//placing orders using cod method
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// permission from admin for order
const orderPermission = async (req, res) => {
  const { permission, orderId } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { permission });
    if (permission === true) {
      return res.json({ success: true, message: "Order Accepted" });
    } else {
      return res.json({ success: false, message: "Order Rejected" });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
};

//placing orders using cod method
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  verifyStripe,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  orderPermission,
};
