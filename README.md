#  Book Tracker API

A full-featured RESTful API built with **TypeScript**, **Express**, and **Firebase Authentication**, designed to manage books, users, and reviews. This project is part of a capstone demonstrating backend API development, authentication, testing, and API documentation using **Postman** and **Swagger**.

---

##  Features

- User Authentication with Firebase
- Role-based Authorization (admin, manager, user)
- CRUD for:
  -  Books
  -  Users
  -  Reviews
- Swagger/OpenAPI documentation
- Firebase custom claims for roles
- Unit and integration testing with Jest and Supertest
- Environment-based configuration (.env)

---

##  Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Auth:** Firebase Authentication (with custom claims)
- **Database:** Firebase Firestore (can be extended)
- **Validation:** Joi
- **Testing:** Jest, Supertest
- **Documentation:** Swagger (auto or jsdoc-based)
- **Utilities:** Dotenv, Morgan, Helmet

---


##  Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/abrar145/book-tracker-api.git
cd book-tracker-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=4000
FIREBASE_SERVICE_ACCOUNT=YOUR_JSON_STRINGIFIED_CREDENTIALS
```

> Tip: Use `JSON.stringify(serviceAccount)` to paste Firebase service account correctly. Make sure private key uses `\n`.

4. **Run the server**

```bash
npm start
```

---

##  Authentication & Authorization

- **Firebase Authentication** is used.
- After signing in, users get a JWT token which must be included in requests as:
  ```
  Authorization: Bearer <token>
  ```
- Admin roles are set via Firebase custom claims. Use provided script in `src/scripts/setCustomClaims.ts`.

---

##  Testing

```bash
npm test
```

- Includes unit tests for services and controllers.
- Route tests include authentication and validation.

---

##  API Documentation

- Visit Swagger UI:
  ```
  http://localhost:4000/api-docs
  ```
- Or import the Postman collection (optional: add custom).

---

##  Sample Routes

### Books

| Method | Endpoint           | Auth | Role     | Description              |
|--------|--------------------|------|----------|--------------------------|
| GET    | `/books`           | ✅    | any      | Get all books            |
| POST   | `/books`           | ✅    | admin/manager | Create book         |
| PUT    | `/books/:id`       | ✅    | admin/manager | Update book         |
| DELETE | `/books/:id`       | ✅    | admin    | Delete book              |

### Users

| Method | Endpoint           | Auth | Role     | Description              |
|--------|--------------------|------|----------|--------------------------|
| GET    | `/users`           | ✅    | admin    | Get all users            |
| POST   | `/users`           | ✅    | admin    | Create new user          |
| PUT    | `/users/:id`       | ✅    | admin/manager | Update user        |
| DELETE | `/users/:id`       | ✅    | admin    | Delete user              |

### Reviews

| Method | Endpoint           | Auth | Role     | Description              |
|--------|--------------------|------|----------|--------------------------|
| GET    | `/reviews`         | ✅    | any      | Get all reviews          |
| POST   | `/reviews`         | ✅    | user/admin | Create review        |
| PUT    | `/reviews/:id`     | ✅    | owner/admin | Update review      |
| DELETE | `/reviews/:id`     | ✅    | admin    | Delete review            |

---

##  How We Built It

1. **Architecture Design:** Separated concerns (controllers, services, middleware).
2. **Auth Middleware:** Validates JWT and injects `req.user`.
3. **Role Middleware:** Checks for `admin`, `manager`, or same user via UID.
4. **Validation Layer:** Joi used to ensure input correctness.
5. **Testing Setup:** `jest` + `supertest` to cover edge cases and role checks.
6. **Swagger Docs:** Auto-generated or jsdoc-based setup.
7. **Admin Claim Assignment:** Manual script for setting roles.

---

## what is new

##  New Component: express-rate-limit

We implemented `express-rate-limit` to secure the API from abuse and excessive requests.

-  Limits requests to 100 per 15 minutes per IP
-  Returns `429 Too Many Requests` if exceeded
-  Simple to install and configure

```ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP. Try again later.',
});

app.use(limiter);
```

##  Testing

- Run `npm test` to execute all test suites
- Includes test coverage for controllers and routes


##  Credits

This project was developed as part of a full-stack backend learning experience. Special thanks to Firebase for the smooth auth integration.