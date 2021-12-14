import type { Book } from '@prisma/client';

export type FetchDataBook = {
  books: Book[];
  cursorBooks: string;
};
