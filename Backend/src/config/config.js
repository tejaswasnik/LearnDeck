import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
};

export default config;
