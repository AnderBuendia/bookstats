import { useNotifier } from '@Services/notificationAdapter';
import { useBook } from '@Services/bookAdapter';
import { AlertMessages } from '@Enums/config/messages.enum';

export function useDeleteBook() {
  const { deleteBookRequest } = useBook();
  const { notifySuccess, notifyError } = useNotifier();

  const deleteBook = async (bookId: string, email?: string | null) => {
    try {
      if (!email) throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);

      const response = await deleteBookRequest(bookId);
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

  return { deleteBook };
}
