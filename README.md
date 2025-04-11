## Challenges Faced

###  Firebase Authentication in Tests
One of the biggest challenges was handling Firebase authentication inside unit tests. Since our API is protected by Firebase Admin middleware, every test request needed a valid, non-expired ID token. Initially, most tests failed with `401 Unauthorized` due to:

- Tokens being invalid or expired
- The `test-user-id` not existing in the Firestore `users` collection

**Fix:**  
- Created a Firebase user manually with the UID `test-user-id`  
- Generated a fresh ID token using a custom script with the Firebase Admin SDK  
- Updated all test files to use this token in the `Authorization` header

---

###  404 Errors from Firestore
Some tests returned `404 Not Found`, especially for `GET`, `PUT`, or `DELETE` requests.

**Root Cause:**  
The documents were not being created successfully before being queried.

**Fix:**  
- Added `beforeAll()` hooks in tests to create and confirm document creation  
- Used `console.log()` to verify document IDs before proceeding with other steps  
- Ensured all Firestore calls are awaited properly to avoid race conditions


## What's New

-  **Firebase Admin Auth Middleware**  
  Integrated middleware to protect routes using Firebase ID tokens and validate user sessions.

- 🛠 **Token-Based Testing Setup**  
  Added a setup flow to use a valid Firebase token (`test-user-id`) in all API tests for books, reviews, and users.

- 📄 **Full CRUD Implementation**  
  Completed Create, Read, Update, Delete functionality for:
  - Users
  - Books
  - Reviews

-  **Comprehensive Test Coverage**  
  Tests now:
  - Run with Firebase auth
  - Create required documents before dependent operations
  - Clean up created documents after each run

-  **Better Error Handling**  
  Improved error messages from Firestore and auth to aid debugging.

-  **Swagger API Documentation**  
  Implemented Swagger UI to allow easy viewing and interaction with API endpoints.
