import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Admin Doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: "Error" });
  }
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// admin register
const adminRegister = async (req, res) => {
  const { name, key, password, email } = req.body;
  try {
    // checking if admin is eligible to register
    if (key !== process.env.ADMIN_REGISTRATION_KEY) {
      return res.json({ success: false, message: "False Admin key" });
    }
    // checking if admin already exist
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Admin already exist" });
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
    const newAdmin = new adminModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const admin = await newAdmin.save();
    // generating token
    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};

export { adminRegister, adminLogin };