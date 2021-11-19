import { RestEndPoints } from '@Enums/paths/rest-endpoints.enum';
import { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';

export interface BookService {
  createBookRequest: () => void;
}

export function useBook() {
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

  return { createBookRequest };
}
