import mongoose from "mongoose";
import "dotenv/config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection with DB Successful!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
