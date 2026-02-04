import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth_routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://chat-app-1-ioju.onrender.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log("MongoDB Connected");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

startServer();
