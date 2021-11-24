import { BookStatus } from '@prisma/client';

export type FormValuesEditBookForm = {
  title: string;
  author: string;
  read_pages: number;
  status: BookStatus;
  review: string | null;
};
