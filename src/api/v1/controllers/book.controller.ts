import { Request, Response, NextFunction } from "express";
import * as bookService from "../services/bookService";
import { Book } from "../models/book.model";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { genre, sort } = req.query;

    let books = await bookService.getAllBooks(); // Get all books first

    // Filtering
      if (genre) {
        books = books.filter(book => 
          book.genre && book.genre.toLowerCase() === (genre as string).toLowerCase()
        );
      }


    // Sorting
    if (sort) {
      books = books.sort((a: any, b: any) => {
        if (sort === "publishedYear") {
          return a.publishedYear - b.publishedYear;
        }
        return 0;
      });
    }

     res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};



export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(HTTP_STATUS.CREATED).json(successResponse(newBook, "Book Created"));
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    res.status(HTTP_STATUS.OK).json(successResponse(updatedBook, "Book Updated"));
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(HTTP_STATUS.OK).json(successResponse("Book Deleted"));
  } catch (err) {
    next(err);
  }
};
