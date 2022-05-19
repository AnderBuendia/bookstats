import { BookStatus } from '@prisma/client';

export interface IBook {
  author: string;
  id: string;
  image: string | null;
  pages: number;
  status: BookStatus;
  rating: number;
  readPages: number[];
  review?: string | null;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookModel {
  id: string;
  author: string;
  pages: number;
  status: BookStatus;
  title: string;
  rating: number;
  readPages: number[];
  review?: string | null;
  image?: string | null;
}

export interface UserBooks {
  books: IBook[];
  cursorBooks: string;
}
