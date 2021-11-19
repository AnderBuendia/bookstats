import { useNotifier } from '@Services/notificationAdapter';
import { useBook } from '@Services/bookAdapter';
import { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';
import { AlertMessages } from '@Enums/config/messages.enum';

export function useCreateBook() {
  const { createBookRequest } = useBook();
  const { notifySuccess, notifyError } = useNotifier();

  const createBook = async (
    data: FormValuesCreateBookForm,
    email?: string | null
  ) => {
    try {
      if (!email) throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);

      const response = await createBookRequest(data, email);
      const responseToJson = await response.json();

      if (responseToJson.error) throw new Error(responseToJson.error);

      notifySuccess({ message: AlertMessages.BOOK_CREATED });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        notifyError({ message: error.message });
      }
    }
  };

  return { createBook };
}
