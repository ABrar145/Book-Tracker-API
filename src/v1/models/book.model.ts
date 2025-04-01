export interface Book {
    id?: string;
    title: string;
    author: string;
    status: 'read' | 'reading' | 'want-to-read';
    notes?: string;
    userId?: string;
    createdAt?: string;
  }
  