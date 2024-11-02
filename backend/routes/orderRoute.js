import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
  orderPermission,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

//admin feature
orderRouter.post("/list", allOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/permission", orderPermission);

//payment features
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/stripe", authMiddleware, placeOrderStripe);
orderRouter.post("/razorpay", authMiddleware, placeOrderRazorpay);

// verify payments
orderRouter.post("/verifyrazorpay", authMiddleware, verifyRazorpay);
orderRouter.post("/verifystripe", authMiddleware, verifyStripe);

//user features
orderRouter.post("/userorders", authMiddleware, userOrders);

export default orderRouter;
