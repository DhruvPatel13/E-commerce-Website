import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  login,
  register,
  changePass,
  getDetails,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/changepass", changePass);
userRouter.get("/details", authMiddleware, getDetails);

export default userRouter;
