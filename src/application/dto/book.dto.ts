import { BookStatus } from '@prisma/client';

export interface CreateBookDTO {
  author: string;
  pages: number;
  status: BookStatus;
  title: string;
}

export interface UpdateBookDTO {
  title: string;
  author: string;
  readPages: number;
  status: BookStatus;
  review: string | null;
  image?: string | null;
}

export interface UpdateRatingBookDTO {
  rate: number;
}

export interface DeleteBookDTO {
  bookId: string;
}
