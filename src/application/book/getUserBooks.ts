import { useInfiniteQuery } from 'react-query';
import { getUserBooksRequest } from '@Services/bookAdapter';

export function useGetUserBooks({ userId }: { userId: string }) {
  return useInfiniteQuery(
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
