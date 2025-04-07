import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Get the raw JSON string from .env
const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!raw) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT in .env');
}

// Parse the JSON string from .env
const serviceAccount = JSON.parse(raw);

// Fix the newline characters in the private key
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


export default admin;
export const db = admin.firestore();
