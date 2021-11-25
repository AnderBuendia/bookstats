import { useSession } from 'next-auth/react';
import { useNotifier } from '@Services/notificationAdapter';
import { useBook } from '@Services/bookAdapter';
import { AlertMessages } from '@Enums/config/messages.enum';

export function useUpdateRating() {
  const { data: session } = useSession();
  const { updateRatingRequest } = useBook();
  const { notifySuccess, notifyError } = useNotifier();

  const updateRating = async (rate: number, bookId: string) => {
    try {
      if (!session?.user?.email) {
        throw new Error(AlertMessages.USER_NOT_AUTHENTICATED);
      }

      const response = await updateRatingRequest(rate, bookId);
      const responseToJson = await response.json();

      if (responseToJson.error) throw new Error(responseToJson.error);

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
