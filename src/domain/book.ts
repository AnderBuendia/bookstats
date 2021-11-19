import { BookStatus } from '@Enums/book-status.enum';

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

export const readPagesAvgMins = (
  pages: number,
  status: string,
  read_pages?: number[]
) => {
  if (status === BookStatus.COMPLETED) return '0';

  if (!read_pages) return Math.round(pages * 1.15);

  const sumReadPages = read_pages.reduce((acc, el) => acc + el, 0);
  return Math.round((pages - sumReadPages) * 1.15);
};
