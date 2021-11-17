import { BookStatus } from '@Enums/book-status.enum';

export interface IBook {
  id: string; // CHECK IN AWS APPSYNC BOOKSTATS
  name: string;
  author: string;
  status: BookStatus;
  rating: number;
  pages: number;
  image?: string;
  review?: string;
  read_pages?: number[];
}
