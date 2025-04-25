import { Book } from "../models/book.model"; // Book is only a Type!

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    status: "available",
    genre: "Self-help",
    publishedYear: 2018,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    status: "available",
    genre: "Fantasy",
    publishedYear: 1937,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Now fix getBooks to return from mock array
export const getBooks = async (): Promise<Book[]> => {
  return mockBooks;
};

export const getAllBooks = async (): Promise<Book[]> => {
  console.log(" getAllBooks called");
  return mockBooks;
};

export const createBook = async (data: Partial<Book>): Promise<Book> => {
  const newBook: Book = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Book;
  mockBooks.push(newBook);
  return newBook;
};

export const updateBook = async (id: string, data: Partial<Book>): Promise<Book | undefined> => {
  const bookIndex = mockBooks.findIndex((book) => book.id === id);
  if (bookIndex === -1) return undefined;
  mockBooks[bookIndex] = { ...mockBooks[bookIndex], ...data, updatedAt: new Date() };
  return mockBooks[bookIndex];
};

export const deleteBook = async (id: string): Promise<void> => {
  const index = mockBooks.findIndex((book) => book.id === id);
  if (index !== -1) {
    mockBooks.splice(index, 1);
  }
};
