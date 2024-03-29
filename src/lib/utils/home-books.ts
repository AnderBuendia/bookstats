import { Book, BookStatus } from '@prisma/client';
import { IBook } from '@Interfaces/domain/book.interface';

const date = new Date('2021');
export const HomeBooks: IBook[] = [
  {
    id: '1',
    title: 'The Brothers Karamazov',
    author: 'Dostoievsky',
    status: BookStatus.COMPLETED,
    rating: 4,
    pages: 0,
    image: null,
    review: null,
    readPages: [0],
    createdAt: date,
    updatedAt: date,
  },
  {
    id: '2',
    title: 'Steppenwolf',
    author: 'Hesse',
    status: BookStatus.READING,
    rating: 0,
    pages: 20,
    image: null,
    review: null,
    readPages: [0],
    createdAt: date,
    updatedAt: date,
  },
  {
    id: '3',
    title: 'One hundred years of solitude',
    author: 'Márquez',
    status: BookStatus.READY,
    rating: 0,
    pages: 417,
    image: null,
    review: null,
    readPages: [0],
    createdAt: date,
    updatedAt: date,
  },
  {
    id: '4',
    title: 'The Symposium',
    author: 'Plato',
    status: BookStatus.TO_READ,
    rating: 0,
    pages: 111,
    image: null,
    review: null,
    readPages: [0],
    createdAt: date,
    updatedAt: date,
  },
];
