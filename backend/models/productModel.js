import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: Array, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  offer_price: { type: Number, required: false },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  featured_product: { type: Boolean, required:false, default:false },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
