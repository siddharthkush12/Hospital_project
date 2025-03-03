import express from "express";
import dotenv from "dotenv";  // ✅ Use import instead of require
import "./db/connection.js";
import v1Router from "./routes/v1/v1Router.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "DEV"; // Default to DEV if undefined
const PORT = process.env[`${NODE_ENV}_PORT`] || 6050;

const server = express();

server.use(cors());
server.use(express.json());  // ✅ FIXED: Enables JSON request body parsing
server.use(express.urlencoded({ extended: true })); // ✅ FIXED: Handles URL-encoded form data

server.use("/api/v1", v1Router);

server.listen(PORT, () => console.log(`✅ Server running on PORT ${PORT}`));