import { createAdaptedBook } from '@Services/adapters/bookAdapter';
import { _handleError, _throwSpecificError } from '@Services/error.service';
import { API_BOOK_URL, API_BOOKS_URL } from '@Lib/constants/index';
import type { BookService } from '@Interfaces/ports/book-service.interface';
import type { BookModel } from '@Interfaces/domain/book.interface';
import type { IBook } from '@Interfaces/domain/book.interface';
import type { EndpointBook } from '@Interfaces/ports/endpoint-book.interface';
import type { UserBooks } from '@Interfaces/domain/book.interface';

export function useBookService(): BookService {
  const createBookRequest = async (book: BookModel, email: string) => {
    try {
      const response = await fetch(API_BOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book, email }),
      });

      if (!response.ok) _handleError(response.status);

      const responseToJson = await response.json();

      return createAdaptedBook(responseToJson);
    } catch (error: any) {
      throw _throwSpecificError(error);
    }
  };

  const updateBookRequest = async (book: BookModel) => {
    try {
      const urlRequest = `${API_BOOK_URL}/${book.id}`;

      const response = await fetch(urlRequest, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: book }),
      });

      if (!response.ok) _handleError(response.status);

      const responseToJson = await response.json();

      return createAdaptedBook(responseToJson);
    } catch (error: any) {
      throw _throwSpecificError(error);
    }
  };

  const deleteBookRequest = async (bookId: string) => {
    try {
      const urlRequest = `${API_BOOK_URL}/${bookId}`;

      const response = await fetch(urlRequest, {
        method: 'DELETE',
      });

      if (!response.ok) _handleError(response.status);

      return true;
    } catch (error: any) {
      throw _throwSpecificError(error);
    }
  };

  return {
    createBookRequest,
    updateBookRequest,
    deleteBookRequest,
  };
}

export const findUserBooksRequest = async (
  userId: string,
  pageParam: string = ''
): Promise<UserBooks> => {
  const fetchBooksUrl = `${API_BOOKS_URL}?uid=${userId}&cursor=${pageParam}`;
  const response = await fetch(fetchBooksUrl);
  const responseToJson = await response.json();
  const books = responseToJson.books.map((book: EndpointBook) =>
    createAdaptedBook(book)
  );

  return { books, cursorBooks: responseToJson.cursorBooks };
};

export const findBookRequest = async (bookId: string): Promise<IBook> => {
  const fetchBookUrl = `${API_BOOK_URL}/${bookId}`;
  const response = await fetch(fetchBookUrl);
  const responseToJson = await response.json();

  return createAdaptedBook(responseToJson);
};
