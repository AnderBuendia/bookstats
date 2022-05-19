import { useInfiniteQuery } from 'react-query';
import { findUserBooksRequest } from '@Services/book.service';
import type { UserBooks } from '@Interfaces/domain/book.interface';

export function useFindUserBooksUseCase({ userId }: { userId: string }) {
  return useInfiniteQuery<UserBooks, Error>(
    ['books', { userId }],
    async ({ pageParam = '' }) => {
      const res = await findUserBooksRequest(userId, pageParam);

      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.cursorBooks ? lastPage.cursorBooks : false;
      },
    }
  );
}
