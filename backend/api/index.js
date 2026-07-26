import app from '../src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in Vercel Environment Variables!");
    return null;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedDb = db;
    return db;
  } catch (err) {
    console.error("MongoDB Vercel Connection Error:", err.message);
    return null;
  }
}

// Ensure DB connects on serverless cold start before exporting
await connectToDatabase();

export default app;
