import { BookStatus } from '@prisma/client';

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

export const sumReadPages = (read_pages: number[]): number => {
  if (read_pages.length === 0) {
    return 0;
  } else {
    return read_pages.reduce((acc, el) => acc + el);
  }
};

export const readPagesAvgMins = (
  pages: number,
  status: string,
  totalReadPages: number
): number => {
  if (totalReadPages === 0) {
    return Math.round(pages * 1.15);
  } else if (status === BookStatus.COMPLETED) {
    return 0;
  }

  return Math.round((pages - totalReadPages) * 1.15);
};
