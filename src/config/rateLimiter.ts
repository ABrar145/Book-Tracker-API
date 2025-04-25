// src/config/rateLimiter.ts

import rateLimit from "express-rate-limit";

/**
 * Rate Limiter: Limits each IP to 100 requests per 15 minutes.
 */
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // use `RateLimit-*` headers
  legacyHeaders: false, // disable `X-RateLimit-*` headers
  message: {
    error: "Too many requests, please try again after 15 minutes.",
  },
});
