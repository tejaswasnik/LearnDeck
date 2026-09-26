import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";
app.listen(config.PORT, () => {
  connectDB();
  console.log(`Server is running at port ${config.PORT}`);
});
