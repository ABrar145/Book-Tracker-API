import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!rawKey) {
  throw new Error(" Missing FIREBASE_SERVICE_ACCOUNT in .env");
}

const serviceAccount = JSON.parse(rawKey);
//  Fix the escaped newlines in the private key
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const setCustomUserClaims = async () => {
  const uid = 'd07BoZV3wDagIkvyxxt2zYLTA962'; // Replace with your actual UID

  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log(` Custom claims set for UID ${uid}`);
  } catch (error) {
    console.error(' Failed to set custom claims:', error);
  }
};

setCustomUserClaims();
