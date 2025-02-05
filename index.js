import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import userRouter from "./routes/user.routes.js";
import { connectDB } from "./utils/mongo_connection.js";
import noteRouter from "./routes/note.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*", // Your frontend URL
    credentials: true, // Allow sending cookies with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);
app.use(bodyparser.json());
app.use(express.json());
app.use(cookieParser());
await connectDB();

app.use("/api/v1/user-auth", userRouter);
app.use("/api/v1", noteRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
