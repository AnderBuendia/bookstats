import { useNotifier } from '@Services/notificationAdapter';
import { useBook } from '@Services/bookAdapter';
import { FormValuesEditBookForm } from '@Types/forms/edit-book-form.type';
import { AlertMessages } from '@Enums/config/messages.enum';

export function useEditBook() {
  const { editBookRequest } = useBook();
  const { notifySuccess, notifyError } = useNotifier();

  const editBook = async (
    data: FormValuesEditBookForm,
    bookId: string,
    email?: string | null
  ) => {
    try {
      if (!email) throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);

      const response = await editBookRequest(data, bookId);
      const responseToJson = await response.json();

      if (responseToJson.error) throw new Error(responseToJson.error);

      notifySuccess({ message: AlertMessages.BOOK_EDITED });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        notifyError({ message: error.message });
      }
    }
  };

  return { editBook };
}
