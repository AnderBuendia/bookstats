import { useInfiniteQuery } from 'react-query';
import { getUserBooksRequest } from '@Services/bookAdapter';
import { FetchDataBook } from '@Types/api-request/get-user-books.type';

export function useGetUserBooks({ userId }: { userId: string }) {
  return useInfiniteQuery<FetchDataBook, Error>(
    ['books', { userId }],
    async ({ pageParam = '' }) => {
      const res = await getUserBooksRequest(userId, pageParam);
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.cursorBooks ? lastPage.cursorBooks : false;
      },
    }
  );
}
