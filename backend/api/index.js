import app from '../src/app.js';
import connectDB from '../src/config/db.js';

// Initialize database connection for serverless environment
connectDB();

// Vercel serverless expects the Express app to be exported directly
export default app;
