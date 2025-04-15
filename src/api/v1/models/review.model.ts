export type Review = {
  id: string;
  book: string;
  user: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};

const reviews: Review[] = [];

export default {
  find: async (): Promise<Review[]> => reviews,

  findById: async (id: string): Promise<Review | undefined> =>
    reviews.find((r) => r.id === id),

  create: async (data: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<Review> => {
    const timestamp = new Date();
    const newReview: Review = {
      ...data,
      id: Date.now().toString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    reviews.push(newReview);
    return newReview;
  },

  update: async (id: string, data: Partial<Review>): Promise<Review | null> => {
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) return null;
    reviews[index] = {
      ...reviews[index],
      ...data,
      updatedAt: new Date(),
    };
    return reviews[index];
  },

  delete: async (id: string): Promise<Review | null> => {
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) return null;
    const deleted = reviews.splice(index, 1)[0];
    return deleted;
  },
};