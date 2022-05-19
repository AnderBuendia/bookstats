import type { BookModel } from '@Interfaces/domain/book.interface';
import type { IBook } from '@Interfaces/domain/book.interface';

export interface BookService {
  createBookRequest: (data: BookModel, email: string) => Promise<IBook>;

  updateBookRequest: (book: BookModel) => Promise<IBook>;

  deleteBookRequest: (bookId: string) => Promise<Boolean>;
}
