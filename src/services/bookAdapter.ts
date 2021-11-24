import { BookService } from '@Interfaces/ports/book.interface';
import { RestEndPoints } from '@Enums/paths/rest-endpoints.enum';
import { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';
import { FormValuesEditBookForm } from '@Types/forms/edit-book-form.type';

export function useBook(): BookService {
  const createBookRequest = async (
    data: FormValuesCreateBookForm,
    email: string
  ) => {
    return await fetch(process.env.NEXT_PUBLIC_SITE_URL + RestEndPoints.BOOK, {
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
    const urlRequest = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOK}/${bookId}`;

    return await fetch(urlRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
  };

  const deleteBookRequest = async (bookId: string) => {
    const urlRequest = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOK}/${bookId}`;

    return await fetch(urlRequest, {
      method: 'DELETE',
    });
  };

  return { createBookRequest, editBookRequest, deleteBookRequest };
}
