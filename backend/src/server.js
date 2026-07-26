import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5050;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`[MATRIX SERVER] Running in ${process.env.NODE_ENV || 'development'} mode.`);
  console.log(`[MATRIX SERVER] Access locally: http://localhost:${PORT}`);
  console.log(`[MATRIX SERVER] Documentation available at: http://localhost:${PORT}/api/docs`);
});

/**
 * Handle Graceful Shutdowns
 */
const shutdown = (signal) => {
  console.log(`\n[MATRIX SERVER] Received ${signal}. Initiating graceful shutdown...`);
  
  // Stop accepting new connections
  server.close(() => {
    console.log('[MATRIX SERVER] Closed all active connections.');
    
    // Perform cleanups (e.g. database disconnects or connections closures if any exist)
    console.log('[MATRIX SERVER] Service cleaned up successfully. Exiting process.');
    process.exit(0);
  });

  // Force close after 10 seconds if connections are hanging
  setTimeout(() => {
    console.error('[MATRIX SERVER] Force shutdown initiated after timeout.');
    process.exit(1);
  }, 10000);
};

// Listen for process termination events
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Capture uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('[MATRIX SERVER] Critical Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[MATRIX SERVER] Critical Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
