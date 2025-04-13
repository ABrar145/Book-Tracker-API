import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// ✅ Your Firebase Web Config
const firebaseConfig = {
  apiKey: "AIzaSyBTXsHvZM_cwIRdgSwqz_VeXGFCHAkdFXU",
  authDomain: "book-tracer.firebaseapp.com",
  projectId: "book-tracer",
  storageBucket: "book-tracer.firebasestorage.app",
  messagingSenderId: "163817679880",
  appId: "1:163817679880:web:8e81d943799b8224f0f5bd",
  measurementId: "G-PB6YGLME39"
};

// Replace with your actual test user credentials
const email = "ompatel@gmail.com";
const password = "123456";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const getIdToken = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    console.log("\n Firebase ID Token:\n");
    console.log(idToken);
  } catch (error: any) {
    console.error("\n Error signing in or getting ID token:\n", error.message);
  }
};

getIdToken();
