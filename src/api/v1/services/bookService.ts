import { Book } from "../models/book.model";

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    console.log("📚 getAllBooks called"); // <- Add this
    return [
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
    ];
  } catch (error) {
    console.error(" Error in bookService.getAllBooks:", error);
    throw new Error("Could not fetch books");
  }
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
