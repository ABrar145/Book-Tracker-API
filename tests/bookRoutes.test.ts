import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";

jest.mock("../src/api/v1/controllers/book.controller", () => ({
  getAllBooks: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  createBook: jest.fn((_req: Request, res: Response) => res.status(201).send()),
  updateBook: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  deleteBook: jest.fn((_req: Request, res: Response) => res.status(204).send()),
}));

const bookController = require("../src/api/v1/controllers/book.controller");

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
        genre: "Fiction",
        publishedYear: 2024
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
        author: "Author Name" // <- add required fields if Joi expects them
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