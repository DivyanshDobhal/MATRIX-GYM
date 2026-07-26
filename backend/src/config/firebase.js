import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

let firebaseAdmin = null;

if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
  try {
    // Format private key properly to handle potential escaped newlines from environment files
    const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '');

    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log('[Firebase Config] Firebase Admin SDK successfully initialized.');
  } catch (error) {
    console.error('[Firebase Config] Failed to initialize Firebase Admin SDK:', error.message);
  }
} else {
  console.warn('[Firebase Config] Firebase environment credentials missing. Firebase token verification will be unavailable.');
}

export default firebaseAdmin;
