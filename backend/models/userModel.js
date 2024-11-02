import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now() },
  },
  { minimize: false }
);
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
