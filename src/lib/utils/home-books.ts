import { BookStatus } from '@Enums/book-status.enum';
export const HomeBooks = [
  {
    id: '1',
    name: 'The Brothers Karamazov',
    author: 'Dostoievsky',
    status: BookStatus.COMPLETED,
    rating: 4,
    pages: 0,
  },
  {
    id: '2',
    name: 'Steppenwolf',
    author: 'Hesse',
    status: BookStatus.READING,
    rating: 0,
    pages: 20,
  },
  {
    id: '3',
    name: 'One hundred years of solitude',
    author: 'Márquez',
    status: BookStatus.READY,
    rating: 0,
    pages: 417,
  },
  {
    id: '4',
    name: 'The Symposium',
    author: 'Plato',
    status: BookStatus.TO_READ,
    rating: 0,
    pages: 111,
  },
];
