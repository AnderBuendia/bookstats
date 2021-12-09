import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import type { Book } from '@prisma/client';
import { getUserBooksRequest } from '@Services/bookAdapter';

export function useGetUserBooks({ userId }: { userId: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [cursorBooks, setCursorBooks] = useState<string>('');
  const { data } = useQuery<Book[], Error>(['books', userId], () =>
    getUserBooksRequest(userId)
  );

  useEffect(() => {
    if (data && data.length > 0 && books.length === 0) {
      fetchUserBooks(data);
    }
  }, [data, books]);

  function fetchUserBooks(data: Book[]) {
    setBooks(data);

    if (data.length >= 2) {
      const lastPost = data[1];
      setCursorBooks(lastPost.id);
    }
  }

  return { books, cursorBooks };
}
