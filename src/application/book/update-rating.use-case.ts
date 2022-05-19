import { useSession } from 'next-auth/react';
import { useNotifierService } from '@Services/notification.service';
import { useBookService } from '@Services/book.service';
import { editBookModel } from '@Domain/book.domain';
import { AlertMessages } from '@Enums/config/messages.enum';
import type { UpdateRatingBookDTO } from '@Application/dto/book.dto';
import type { IBook } from '@Interfaces/domain/book.interface';

export function useUpdateRatingUseCase() {
  const { data: session } = useSession();
  const { updateBookRequest } = useBookService();
  const { notifySuccess, notifyError } = useNotifierService();

  const updateRating = async (data: UpdateRatingBookDTO, book: IBook) => {
    try {
      if (!session?.user?.email) {
        throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);
      }

      const normalizeBook = {
        ...book,
        rating: Number(data.rate),
      };

      const updatedBook = editBookModel(normalizeBook);

      const response = await updateBookRequest(updatedBook);

      notifySuccess({ message: AlertMessages.BOOK_VOTED });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        notifyError({ message: error.message });
      }
    }
  };

  return { updateRating };
}
