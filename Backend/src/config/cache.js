import Redis from "ioredis";
import config from "./config.js";
const redis = new Redis({
  host: config.redisHost,
  port: Number(config.redisPort),
  username: config.redisUsername,
  password: config.redisPassword,
});

redis.on("connect", () => {
  console.log("Server is connected to Redis.");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default redis;
