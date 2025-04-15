import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../app";

//  USE `require` to align with mocked module
const reviewController = require("../src/api/v1/controllers/review.controller");

//  Ensure ES module support in mocks
jest.mock("../src/api/v1/controllers/review.controller", () => ({
  __esModule: true,
  getReviews: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  getReviewById: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  createReview: jest.fn((_req: Request, res: Response) => res.status(201).send()),
  updateReview: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  deleteReview: jest.fn((_req: Request, res: Response) => res.status(200).send()),
}));

jest.mock("../src/api/v1/middleware/auth.middleware", () =>
  jest.fn((_req: Request, _res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/authorize.middleware", () =>
  jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next())
);

describe("Review Routes", () => {
  it("GET /api/v1/reviews should call controller", async () => {
    await request(app)
      .get("/api/v1/reviews")
      .set("Authorization", "Bearer mockedToken");
    expect(reviewController.getReviews).toHaveBeenCalled();
  });

  it("GET /api/v1/reviews/:id should call controller", async () => {
    await request(app)
      .get("/api/v1/reviews/123")
      .set("Authorization", "Bearer mockedToken");
    expect(reviewController.getReviewById).toHaveBeenCalled();
  });

  it("POST /api/v1/reviews should call controller", async () => {
    await request(app)
      .post("/api/v1/reviews")
      .set("Authorization", "Bearer mockedToken")
      .send({
        book: "507f1f77bcf86cd799439011",
        user: "507f1f77bcf86cd799439012",
        rating: 4,
      });
  
    expect(reviewController.createReview).toHaveBeenCalled(); //  Should now pass
  });
  
  it("PUT /api/v1/reviews/:id should call controller", async () => {
    await request(app)
      .put("/api/v1/reviews/123")
      .set("Authorization", "Bearer mockedToken")
      .send({ rating: 5 });
    expect(reviewController.updateReview).toHaveBeenCalled();
  });

  it("DELETE /api/v1/reviews/:id should call controller", async () => {
    await request(app)
      .delete("/api/v1/reviews/123")
      .set("Authorization", "Bearer mockedToken");
    expect(reviewController.deleteReview).toHaveBeenCalled();
  });
});
