import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";
import mongoose from "mongoose";
import redis from "./src/config/cache.js";

const server = app.listen(config.PORT, () => {
  connectDB();
  console.log(`Server is running at port ${config.PORT}`);
});

const gracefulShutdown = async () => {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(async () => {
    console.log('Closed out remaining HTTP connections.');
    try {
      await mongoose.connection.close();
      await redis.quit();
      console.log('Database and cache connections closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during graceful shutdown', err);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
