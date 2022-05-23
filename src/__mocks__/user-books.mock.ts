import type { IBook } from '@Interfaces/domain/book.interface';
import { BookStatus } from '@prisma/client';

export const mockedUserBooks: IBook[] = [
  {
    author: 'Author Test',
    title: 'Title Test',
    id: 'cl3d2zrvg0147pqjsozbw7qiq',
    image: null,
    pages: 44,
    status: BookStatus.TO_READ,
    rating: 0,
    readPages: [0],
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];
