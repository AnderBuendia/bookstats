import { useNotifierService } from '@Services/notification.service';
import { useBookService } from '@Services/book.service';
import { AlertMessages } from '@Enums/config/messages.enum';
import { DeleteBookDTO } from '@Application/dto/book.dto';

export function useDeleteBookUseCase() {
  const { deleteBookRequest } = useBookService();
  const { notifySuccess, notifyError } = useNotifierService();

  const deleteBook = async (data: DeleteBookDTO, email?: string | null) => {
    try {
      if (!email) throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);

      const response = await deleteBookRequest(data.bookId);

      notifySuccess({ message: AlertMessages.BOOK_DELETED });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        notifyError({ message: error.message });
      }
    }
  };

  return { deleteBook };
}
