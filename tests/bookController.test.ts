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
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it("getAllBooks - success", async () => {
    const mockBooks = [{ id: "1", title: "Test", author: "Author", createdAt: new Date(), updatedAt: new Date() }];
    (bookService.getAllBooks as jest.Mock).mockResolvedValue(mockBooks);

    await bookController.getAllBooks(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalled();
  });
});
