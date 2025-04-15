import { Request, Response } from "express";
import * as reviewController from "../src/api/v1/controllers/review.controller";
import * as reviewService from "../src/api/v1/services/reviewService";

jest.mock("../src/api/v1/services/reviewService");

describe("Review Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it("getReviews - returns list of reviews", async () => {
    const mockData = [{ id: "1", book: "book1", user: "user1", rating: 4, createdAt: new Date(), updatedAt: new Date() }];
    (reviewService.getReviews as jest.Mock).mockResolvedValue(mockData);
    await reviewController.getReviews(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("getReviewById - returns review", async () => {
    const mockReview = { id: "1", book: "book1", user: "user1", rating: 5, createdAt: new Date(), updatedAt: new Date() };
    req.params = { id: "1" };
    (reviewService.getReviewById as jest.Mock).mockResolvedValue(mockReview);
    await reviewController.getReviewById(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReview);
  });

  it("createReview - creates and returns review", async () => {
    const mockReview = { id: "2", book: "book2", user: "user2", rating: 3, createdAt: new Date(), updatedAt: new Date() };
    req.body = mockReview;
    (reviewService.createReview as jest.Mock).mockResolvedValue(mockReview);
    await reviewController.createReview(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockReview);
  });

  it("deleteReview - returns success message", async () => {
    req.params = { id: "1" };
    (reviewService.deleteReview as jest.Mock).mockResolvedValue({ id: "1" });
    await reviewController.deleteReview(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Review deleted successfully" });
  });
});