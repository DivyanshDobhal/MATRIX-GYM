import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('[MATRIX SERVER] MongoDB Connected Successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`[MATRIX SERVER] MongoDB Connection Error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MATRIX SERVER] MongoDB Disconnected. Reconnecting...');
    });

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

  } catch (error) {
    console.error(`[MATRIX SERVER] Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
