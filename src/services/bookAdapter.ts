import type { Book } from '@prisma/client';
import type { BookService } from '@Interfaces/ports/book.interface';
import { RestEndPoints } from '@Enums/paths/rest-endpoints.enum';
import { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';
import { FormValuesEditBookForm } from '@Types/forms/edit-book-form.type';
import { FetchDataBook } from '@Types/api-request/get-user-books.type';

const API_BOOK_URL = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOK}`;
const API_BOOKS_URL = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOKS}`;

export function useBook(): BookService {
  const createBookRequest = async (
    data: FormValuesCreateBookForm,
    email: string
  ) => {
    return await fetch(API_BOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, email }),
    });
  };

  const editBookRequest = async (
    data: FormValuesEditBookForm,
    bookId: string
  ) => {
    const urlRequest = `${API_BOOK_URL}/${bookId}`;

    return await fetch(urlRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
  };

  const deleteBookRequest = async (bookId: string) => {
    const urlRequest = `${API_BOOK_URL}/${bookId}`;

    return await fetch(urlRequest, {
      method: 'DELETE',
    });
  };

  const updateRatingRequest = async (rate: number, bookId: string) => {
    const urlRequest = `${API_BOOK_URL}/${bookId}`;

    return await fetch(urlRequest, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rate }),
    });
  };

  return {
    createBookRequest,
    editBookRequest,
    deleteBookRequest,
    updateRatingRequest,
  };
}

export const getUserBooksRequest = async (
  userId: string,
  pageParam = ''
): Promise<FetchDataBook> => {
  const fetchBooksUrl = `${API_BOOKS_URL}?uid=${userId}&cursor=${pageParam}`;
  const response = await fetch(fetchBooksUrl);

  return await response.json();
};

export const getBookRequest = async (bookId: string): Promise<Book> => {
  const fetchBookUrl = `${API_BOOK_URL}/${bookId}`;
  const response = await fetch(fetchBookUrl);

  return await response.json();
};
