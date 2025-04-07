import admin from 'firebase-admin';

// Service Account JSON
const serviceAccount = {
  type: 'service_account',
  project_id: 'book-tracer',
  private_key_id: '97d85862db7660da1f3549555aa60bae547188d9',
  private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnR7lV8jq5Qr6e\n6YYv5nunIL+3yBxgujhjUda+wZKz2xu8GAcgRCJvKcYZVMTNxMNQ43yvLfbJKTQ8\nLmQap6r1U6aQS6k5c3jaYmX2xFwg2xUDSEiXIJNID7Hab4sh2Lr4I0N3RHVipk7y\n/lnhP9HynVPRyCWM6QJSjd5Pw2mqpfpmLvS3j6ZSkkphygCb7VdB6k/7EwkIC6dY\nP4TjfbM5He7+WSdxU517XU8ItSMkprRVnXAHRWDkGwonD0708xTlswYaYez4xY8n\nW03yfRoBOUcVogyw84MgnRKcju3zGjHdFdyxFSmQ5biN/UIflqhYzt1q5nM24qOU\nFpOm9qCbAgMBAAECggEACZsVbGTTBuDZGBu6IENS6E5VMcCUpJdPPzMZYbb+W0RZ\ni7me7WwMMnFBcbTLzcTV1rcPMs4MZOzwKAVm0AwsoRbTIGf2tvQQxXovLlHNk67a\nGdXLa50ZnuKnQ/hfpQbZits8HFdD08ziCQEeiplC9Ab8o7XsyGAKbgeYheDC4Yfg\nOuYeCHokUe2QXBv9640ZXub/D51qXupF3AYuuwBiF7jeMy3zb13yI9gVutYrQpnA\nv7EoyYPEpbjMNGhjjOSMYq02bwDqplvHCbuKQDjn0XSm/wn8X6/lgUgUUuwn83Sd\nd3QjYjEF5pDa5pEg4vEXuGlMaqkXxrumJRlYGNZKlQKBgQDYfvSFG5bEfb4BfqOU\nobVyqpGtw0vy3Cv9ZZDLdimB8lryFrYutzQq3hNByU+sMzNp6Zw5wDswT430PXfa\nGlojDzczwwGrJhVXwffCGiu1A04z/zlW/LjSr1DmyPGMTIbthw/vWgc6d0yEPikR\n7SuDFeWinAYjnNWnb0Tr3PHvHQKBgQDFzchvxd0BhqXh2kS3BRsUiKDEK0cB5aXv\nrBSAKE931bZz0qGQfzeMG9LWwDoQN74w4Kw7R6/n0bVxkPHUZjXzRnvmz8jTDkXe\nCR+A60CJSZZw4U/27XkKOP3uXw+tBNpANMbCFBOCtPLfWY8pSaZ4oTw7LOFhHEYd\nQTwFweCpFwKBgBXsvXyhb6JUjaJ/HbfWrJaBOaGcTpu4ume+GmzQeaGkVpt/u1F9\n0jWpKdAWwA/TW5iVRPIASr44wEqE0xduZcR5LQD79bZMdArgJOQuXFDHlerkJP1v\nOJR1lr7YiMXJljyF2hJGTscX/9LArM4Y87ghxpCyNljy8Bw1w4gTZxjtAoGAcc9x\nYD5sZxBeKZE4sEWTy0DBn513AbRswXY1ZXfMIZspm4K5yzYnc8oeicmYnvQzzlO3\nRXR91dhnmaxYOGmG6S7I44jyd91ifdqp8bdqLpPUp6Y8KEuCtUsNcDXqAxcjrIWx\nRsHeZ/pNNA2Hva3OxuGekj3Ef+eQwAxkyLtA1IkCgYBpIUqqqBqRgnHl7VerxcbC\nI/91EEDnTd78cufj5l9vc6P76gPFnrM1ehbGBH01oy6IjdF5gS/RmpSNFsR8Hj6o\n6l/9tfw0XF0rX1LIvdnmPDgRaNmcZ8zc4GkHg4VI7evHazpZkU0QXz+cKoqLB/Th\nY9PYQ+Fzq+fHXVbHhza/LQ==\n-----END PRIVATE KEY-----\n`,
  client_email: 'firebase-adminsdk-fbsvc@book-tracer.iam.gserviceaccount.com',
  client_id: '113826057813814598666',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc@book-tracer.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

// 👤 Simulated user ID (must match what your app expects)
const testUid = 'test-user-id';

// 🔑 Generate custom token and exchange for ID token
async function generateToken() {
  try {
    // Optional: Create user if not exists
    const user = await admin.auth().getUser(testUid).catch(async () => {
      return await admin.auth().createUser({ uid: testUid, email: 'test@example.com' });
    });

    // Generate a custom token
    const customToken = await admin.auth().createCustomToken(testUid);

    // Exchange custom token for ID token (this step normally happens client-side)
    console.log('Custom token created ✅\nUse this with Firebase Client SDK to exchange for an ID token.');
    console.log('\nCustom Token:\n', customToken);
  } catch (err) {
    console.error(' Failed to generate token:', err);
  }
}

generateToken();
