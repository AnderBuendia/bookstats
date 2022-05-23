import type { Session } from 'next-auth';
import { BookStatus } from '@prisma/client';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const ACTIONS_COLOR_STATUS: {
  [x: string]: () => string;
} = {
  [BookStatus.TO_READ]: () => 'bg-blue-100 text-blue-500',
  [BookStatus.READING]: () => 'bg-red-100 text-red-500',
  [BookStatus.READY]: () => 'bg-yellow-100 text-yellow-500',
  [BookStatus.COMPLETED]: () => 'bg-green-100 text-green-500',
};

export const getColorStatus = (status: string): string => {
  const actionColorStatus = ACTIONS_COLOR_STATUS[status];
  return actionColorStatus();
};

export const sumReadPages = (readPages: number[]): number => {
  return readPages.reduce((acc, el) => acc + el, 0);
};

export const readPagesAvgMins = (
  pages: number,
  status: string,
  readPages: number[]
): number => {
  const totalReadPages = sumReadPages(readPages);

  if (status === BookStatus.COMPLETED) {
    return 0;
  } else if (totalReadPages === 0) {
    return Math.round(pages * 1.15);
  }

  return Math.round((pages - totalReadPages) * 1.15);
};

export const urlRedirectBook = ({
  bookId,
  isUrlRedirectBook,
}: {
  bookId: string;
  isUrlRedirectBook: boolean | null;
}) => {
  return isUrlRedirectBook ? `${MainPaths.BOOK}/${bookId}` : MainPaths.INDEX;
};
