import { Book } from "../models/book.model";

export const getAllBooks = async (): Promise<Book[]> => {
  return []; // Replace with real DB call
};

export const createBook = async (data: Partial<Book>): Promise<Book> => {
  return { ...data, id: "book1", createdAt: new Date(), updatedAt: new Date() } as Book;
};

export const updateBook = async (id: string, data: Partial<Book>): Promise<Book> => {
  return { ...data, id, createdAt: new Date(), updatedAt: new Date() } as Book;
};

export const deleteBook = async (id: string): Promise<void> => {
  return;
};
