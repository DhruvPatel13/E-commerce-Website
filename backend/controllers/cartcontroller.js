import userModel from "../models/userModel.js";

//add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData)
      return res.json({ success: false, message: "User not found" });

    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//update product to cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//get product from cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    return res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
