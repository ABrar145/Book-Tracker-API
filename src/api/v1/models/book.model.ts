export type Book = {
    id: string;
    title: string;
    author: string;
    status: "available" | "unavailable"
    genre?: string;
    publishedYear?: number;
    createdAt: Date;
    updatedAt: Date;
  };
  