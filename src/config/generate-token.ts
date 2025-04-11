// src/config/generate-token.ts
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT in .env');
}

// Parse the service account JSON from env
const rawServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Fix newlines in the private key
rawServiceAccount.private_key = rawServiceAccount.private_key.replace(/\\n/g, '\n');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(rawServiceAccount),
  });
}

// Generate a custom token
const generateToken = async () => {
  const uid = 'test-user-id'; // Replace with an actual UID or create a user first

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    console.log('✅ Custom Token:', customToken);
  } catch (error) {
    console.error('❌ Error generating token:', error);
  }
};

generateToken();
