import { BookStatus } from '@prisma/client';

export type FormValuesEditBookForm = {
  title: string;
  author: string;
  readPages: number;
  status: BookStatus;
  review: string | null;
};
