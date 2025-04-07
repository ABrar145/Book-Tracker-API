import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!raw) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT in .env');
}

const serviceAccount = JSON.parse(raw);
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
