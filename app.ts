console.log(" app.ts loaded");


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './src/api/v1/routes/user.routes';
import bookRoutes from './src/api/v1/routes/book.routes';
import reviewRoutes from './src/api/v1/routes/review.routes';
import authMiddleware from './src/api/v1/middleware/auth.middleware';
import authRoutes from "./src/api/v1/routes/auth.routes";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authMiddleware);


app.use('/api/v1/auth', authRoutes); // auth is public



// Apply auth only to protected APIs
app.use('/api/v1/users', authMiddleware, userRoutes);
app.use('/api/v1/books', authMiddleware, bookRoutes);
app.use('/api/v1/reviews', authMiddleware, reviewRoutes);

app.use(express.static(path.join(__dirname, "../public")));

// Health Check
app.get('/', (_req, res) => {
  res.send(' Book Tracker API is running');
});

app.get('/debug', (_req, res) => {
    console.log(" /debug hit");
    res.send("It works");
  });
  

export default app;
if (require.main === module) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(` App is now running directly on http://localhost:${PORT}`);
    });
  }
  