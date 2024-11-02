import express from "express";
import { adminRegister, adminLogin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);

export default adminRouter;
