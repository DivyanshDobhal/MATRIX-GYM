import mongoose from 'mongoose';
import dotenv from 'dotenv';
import googleSheetsService from './src/services/googleSheetsService.js';

dotenv.config();

const runTest = async () => {
  console.log('--- Google Sheets Integration Test ---');
  
  // 1. Test Registration
  console.log('\\n[1] Testing Registration Sheet...');
  await googleSheetsService.appendRegistration({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    provider: 'Local',
    membership: 'Starter',
    source: 'CLI Test'
  });

  // 2. Test Contact
  console.log('\\n[2] Testing Contact Sheet...');
  await googleSheetsService.appendContact({
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Membership Question',
    message: 'What are your hours?'
  });

  // 3. Test Membership
  console.log('\\n[3] Testing Membership Sheet...');
  await googleSheetsService.appendMembership({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    plan: 'Pro',
    amount: '$59',
    paymentStatus: 'Paid'
  });

  // 4. Test Trainer Booking
  console.log('\\n[4] Testing Trainer Booking Sheet...');
  await googleSheetsService.appendTrainerBooking({
    name: 'Bob Williams',
    email: 'bob@example.com',
    trainer: 'Marcus Vance',
    preferredTime: 'Morning (8am - 10am)'
  });

  console.log('\\n--- Tests Completed ---');
  process.exit(0);
};

runTest();
