import express from "express";
import { config } from "dotenv";
import UserRouter from "./routes/user.js"
import TaskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errormiddlewares } from "./middlewares/err.js";
import cors from "cors"

export const app = express();

config({
  path: "./data/config.env",
});

// using middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/v5/users",UserRouter)
app.use("/api/v5/tasks",TaskRouter)
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
})
);




app.get("/", (req, res) => {
  res.send("Server Working");
});
app.use(errormiddlewares)