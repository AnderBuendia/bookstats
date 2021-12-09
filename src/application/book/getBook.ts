import { useQuery } from 'react-query';
import { getBookRequest } from '@Services/bookAdapter';
import type { Book } from '@prisma/client';

export function useGetBook(bookId: string) {
  return useQuery<Book, Error>(['book', bookId], () => getBookRequest(bookId));
}
