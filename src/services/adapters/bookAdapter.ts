import type { IBook } from '@Interfaces/domain/book.interface';
import type { EndpointBook } from '@Interfaces/ports/endpoint-book.interface';

export const createAdaptedBook = (book: EndpointBook) => {
  const {
    author,
    createdAt,
    id,
    image,
    pages,
    rating,
    readPages,
    review,
    status,
    title,
    updatedAt,
  } = book;

  const formattedBook: IBook = {
    author,
    createdAt,
    id,
    image,
    pages,
    rating,
    readPages,
    review,
    status,
    title,
    updatedAt,
  };

  return formattedBook;
};
