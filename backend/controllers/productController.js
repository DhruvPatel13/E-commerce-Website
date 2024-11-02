import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

//  to add products working
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      offer_price,
      category,
      subcategory,
      featured_product,
      sizes,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subcategory,
      price: Number(price),
      offer_price: Number(offer_price),
      featured_product: featured_product === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    return res.json({ success: true, message: "product added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);
    return res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
