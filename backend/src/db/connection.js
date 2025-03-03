import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "DEV"; // Default to DEV if undefined
const MONGODB_URI = process.env[`${NODE_ENV}_MONGODB_URI`];

if (!MONGODB_URI) {
  console.error(`❌ ERROR: MONGODB_URI is not defined for environment: ${NODE_ENV}`);
  process.exit(1); // Stop execution if no URI is provided
}

connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ Successfully connected to ${NODE_ENV} MongoDB`);
  })
  .catch((err) => {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
  });

