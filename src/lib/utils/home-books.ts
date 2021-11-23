import { Book, BookStatus } from '@prisma/client';

export const HomeBooks: Book[] = [
  {
    id: '1',
    name: 'The Brothers Karamazov',
    author: 'Dostoievsky',
    status: BookStatus.COMPLETED,
    rating: 4,
    pages: 0,
    userId: 'user1',
    image: null,
    review: null,
    read_pages: [],
  },
  {
    id: '2',
    name: 'Steppenwolf',
    author: 'Hesse',
    status: BookStatus.READING,
    rating: 0,
    pages: 20,
    userId: 'user2',
    image: null,
    review: null,
    read_pages: [],
  },
  {
    id: '3',
    name: 'One hundred years of solitude',
    author: 'Márquez',
    status: BookStatus.READY,
    rating: 0,
    pages: 417,
    userId: 'user3',
    image: null,
    review: null,
    read_pages: [],
  },
  {
    id: '4',
    name: 'The Symposium',
    author: 'Plato',
    status: BookStatus.TO_READ,
    rating: 0,
    pages: 111,
    userId: 'user4',
    image: null,
    review: null,
    read_pages: [],
  },
];
