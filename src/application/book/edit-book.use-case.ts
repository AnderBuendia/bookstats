import { useNotifierService } from '@Services/notification.service';
import { useBookService } from '@Services/book.service';
import { updateReadPages, editBookModel } from '@Domain/book.domain';
import { AlertMessages } from '@Enums/config/messages.enum';
import type { UpdateBookDTO } from '@Application/dto/book.dto';
import type { IBook } from '@Interfaces/domain/book.interface';

export function useUpdateBookUseCase() {
  const { updateBookRequest } = useBookService();
  const { notifySuccess, notifyError } = useNotifierService();

  const updateBook = async (
    data: UpdateBookDTO,
    book: IBook,
    email?: string | null
  ) => {
    try {
      if (!email) throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);

      const dataReadPagesToNum = Number(data.readPages);

      const updatedReadPages = updateReadPages(
        dataReadPagesToNum,
        book.readPages
      );

      const normalizeBook = {
        ...book,
        title: data.title,
        author: data.author,
        readPages: updatedReadPages,
        status: data.status,
        review: data.review ? data.review : null,
      };

      const updatedBook = editBookModel(normalizeBook);
      const response = await updateBookRequest(updatedBook);

      notifySuccess({ message: AlertMessages.BOOK_EDITED });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        notifyError({ message: error.message });
      }
    }
  };

  return { updateBook };
}
