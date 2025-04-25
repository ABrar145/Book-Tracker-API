import { Request, Response, NextFunction } from "express";
import * as bookController from "../src/api/v1/controllers/book.controller";
import * as bookService from "../src/api/v1/services/bookService";

jest.mock("../src/api/v1/services/bookService");

describe("Book Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

 

  it("should create a book successfully", async () => {
    const newBook = { title: "New Book", author: "New Author" };
    (bookService.createBook as jest.Mock).mockResolvedValue(newBook);

    mockReq.body = newBook;
    await bookController.createBook(mockReq as Request, mockRes as Response, mockNext);

    expect(bookService.createBook).toHaveBeenCalledWith(newBook);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();
  });

  it("should update a book successfully", async () => {
    const updatedBook = { title: "Updated Title" };
    (bookService.updateBook as jest.Mock).mockResolvedValue(updatedBook);

    mockReq.params = { id: "1" };
    mockReq.body = updatedBook;
    await bookController.updateBook(mockReq as Request, mockRes as Response, mockNext);

    expect(bookService.updateBook).toHaveBeenCalledWith("1", updatedBook);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });

  it("should delete a book successfully", async () => {
    (bookService.deleteBook as jest.Mock).mockResolvedValue(undefined);

    mockReq.params = { id: "1" };
    await bookController.deleteBook(mockReq as Request, mockRes as Response, mockNext);

    expect(bookService.deleteBook).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });
});
