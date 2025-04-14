import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!raw) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT in .env');
}

const serviceAccount = JSON.parse(raw);
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

// Initialize Firebase only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth(); // ✅ Extract auth instance

export default auth; // ✅ Default export now is auth
export const db = admin.firestore();
