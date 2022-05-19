import { BookStatus } from '@prisma/client';

export type FormValuesCreateBookForm = {
  title: string;
  author: string;
  pages: number;
  status: BookStatus;
};
