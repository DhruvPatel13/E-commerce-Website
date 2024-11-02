import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import "dotenv/config.js";
import adminRouter from "./routes/adminRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// app config
app.use(express.json());
app.use(cors({ origin: "*" }));
connectDb();
connectCloudinary();

//API Endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is live :)");
});

// port
app.listen(port, "0.0.0.0", () => {
  console.log(`Server Running at http://localhost:${port}`);
});
