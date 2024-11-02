import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import mongoose from "mongoose";
import "dotenv/config.js";

const register = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if user already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exist" });
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // check password strong
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    // generating token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: "Error" });
  }
};

// to update login/register details
const changePass = async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await userModel.updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );
      return res.json({ success: true, message: "Password Update Successful" });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: "Error" });
  }
};

const getDetails = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.json({ success: false, message: "Invalid Token" });
    }
    const user = await userModel.findById(userId).select("name email");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: e.message });
  }
};

export { register, login, changePass, getDetails };
