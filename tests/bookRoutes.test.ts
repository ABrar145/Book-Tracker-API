import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../app";

// ✅ Mock controller
jest.mock("../src/api/v1/controllers/book.controller", () => ({
  __esModule: true,
  getAllBooks: jest.fn((_req, res) => res.status(200).send()),
  createBook: jest.fn((_req, res) => res.status(201).send()),
  updateBook: jest.fn((_req, res) => res.status(200).send()),
  deleteBook: jest.fn((_req, res) => res.status(204).send()),
}));

// ✅ Must use require here after mocking
const bookController = require("../src/api/v1/controllers/book.controller");

// ✅ Mock middleware
jest.mock("../src/api/v1/middleware/auth.middleware", () =>
  jest.fn((_req: Request, _res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/authorize.middleware", () =>
  jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next())
);

describe("Book Routes", () => {
  it("GET /api/v1/books should call controller", async () => {
    await request(app)
      .get("/api/v1/books")
      .set("Authorization", "Bearer mockedToken");

    expect(bookController.getAllBooks).toHaveBeenCalled();
  });

  it("POST /api/v1/books should call controller", async () => {
    await request(app)
      .post("/api/v1/books")
      .set("Authorization", "Bearer mockedToken")
      .send({
        title: "Test Book",
        author: "Test Author",
        status: "available", // ✅ required field
        genre: "Fiction",
        publishedYear: 2024,
      });

    expect(bookController.createBook).toHaveBeenCalled();
  });

  it("PUT /api/v1/books/:id should call controller", async () => {
    const bookId = "123";
    await request(app)
      .put(`/api/v1/books/${bookId}`)
      .set("Authorization", "Bearer mockedToken")
      .send({
        title: "Updated Title",
        author: "Updated Author",
        status: "unavailable", // ✅ required field
        genre: "Biography",
        publishedYear: 2023,
      });

    expect(bookController.updateBook).toHaveBeenCalled();
  });

  it("DELETE /api/v1/books/:id should call controller", async () => {
    const bookId = "123";
    await request(app)
      .delete(`/api/v1/books/${bookId}`)
      .set("Authorization", "Bearer mockedToken");

    expect(bookController.deleteBook).toHaveBeenCalled();
  });
});
