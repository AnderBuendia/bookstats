import type { BookModel } from '@Interfaces/domain/book.interface';

export const createBookModel = (bookData: BookModel) => {
  const { id, title, author, pages, status, rating, readPages } = bookData;

  return {
    id,
    title,
    author,
    pages: Number(pages),
    status,
    rating,
    readPages,
  };
};

export const editBookModel = (bookData: BookModel) => {
  const { id, title, author, pages, status, rating, readPages } = bookData;

  return {
    id,
    title,
    author,
    pages: Number(pages),
    status,
    rating,
    readPages,
  };
};

export const updateReadPages = (
  formReadPages: number,
  bookReadPages: number[]
) => {
  if (bookReadPages[0] === 0 && formReadPages) return [formReadPages];

  return formReadPages ? [...bookReadPages, formReadPages] : bookReadPages;
};
