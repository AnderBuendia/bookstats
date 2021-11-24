import { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';
import { FormValuesEditBookForm } from '@Types/forms/edit-book-form.type';

export interface BookService {
  createBookRequest: (
    data: FormValuesCreateBookForm,
    email: string
  ) => Promise<Response>;

  editBookRequest: (
    data: FormValuesEditBookForm,
    bookId: string
  ) => Promise<Response>;

  deleteBookRequest: (bookId: string) => Promise<Response>;
}
