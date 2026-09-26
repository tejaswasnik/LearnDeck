import mongoose from "mongoose";
import config from "./config.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI).then(() => {
      console.log(`MongoDB connected: ${mongoose.connection.host}`);
    });
  } catch (error) {
    throw new Error(`Error connecting to database: ${error.message}`);
  }
};
