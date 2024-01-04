import { configDotenv } from "dotenv";
configDotenv();
import { createApp } from "./app";
import mongoose from "mongoose";
import { UserService } from "./service/UserService";
import { TokenService } from "./service/TokenService";
import { TaskService } from "./service/TaskService";

const port = process.env.PORT || 3000;
const app = createApp(new UserService(), new TokenService(), new TaskService());
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

mongoose
  .connect(process.env.MONGODB_URL!, {
    dbName: "task_managament_system",
  })
  .then(() => {
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION err", err);
    process.kill(process.pid);
  });
