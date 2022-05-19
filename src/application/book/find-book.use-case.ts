import { useQuery } from 'react-query';
import { findBookRequest } from '@Services/book.service';
import type { IBook } from '@Interfaces/domain/book.interface';

export function useFindBookUseCase(bookId: string) {
  return useQuery<IBook, Error>(['book', bookId], () =>
    findBookRequest(bookId)
  );
}
