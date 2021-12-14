import { useQuery } from 'react-query';
import type { Book } from '@prisma/client';
import { getBookRequest } from '@Services/bookAdapter';

export function useGetBook(bookId: string) {
  return useQuery<Book, Error>(['book', bookId], () => getBookRequest(bookId));
}
