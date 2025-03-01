import express from "express";
import { config } from "dotenv";
import UserRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errormiddlewares } from "./middlewares/err.js";
import cors from "cors";

export const app = express();

// Load environment variables
config({
  path: "./data/config.env",
});

// ✅ Apply CORS Middleware at the top
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// // ✅ Handle preflight requests
// app.options("*", cors());


// Middlewares
app.use(cookieParser());
app.use(express.json());

// Define Routes
app.use("/api/v5/users", UserRouter);
app.use("/api/v5/tasks", TaskRouter);

app.get("/", (req, res) => {
  res.send("Server Working");
});

// Error Handling Middleware
app.use(errormiddlewares);
