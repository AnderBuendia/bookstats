import uuid from 'uuid-random';
import { useNotifierService } from '@Services/notification.service';
import { useBookService } from '@Services/book.service';
import { CreateBookDTO } from '@Application/dto/book.dto';
import { AlertMessages } from '@Enums/config/messages.enum';
import { createBookModel } from '@Domain/book.domain';

export function useCreateBookUseCase() {
  const { createBookRequest } = useBookService();
  const { notifySuccess, notifyError } = useNotifierService();

  const createBook = async (data: CreateBookDTO, email?: string | null) => {
    try {
      if (!email) throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);

      const { title, author, pages, status } = data;
      const normalizeBook = {
        id: uuid(),
        title,
        author,
        pages: Number(pages),
        status,
        rating: 0,
        readPages: [0],
      };

      const book = createBookModel(normalizeBook);
      const response = await createBookRequest(book, email);

      notifySuccess({ message: AlertMessages.BOOK_CREATED });

      return response;
    } catch (error: any) {
      if (error instanceof Error) {
        notifyError({ message: error.message });
      }
    }
  };

  return { createBook };
}
