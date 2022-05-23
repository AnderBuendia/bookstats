import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Session } from 'next-auth';
import { formatStatusText } from '@Lib/utils/format-text.utils';
import { urlRedirectBook, getColorStatus } from '@Lib/utils/book.utils';
import StarRating from '@Components/generic/StarRating';
import type { IBook } from '@Interfaces/domain/book.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type CardProps = {
  books: IBook[];
  session: Session | null;
};

const Card: FC<CardProps> = ({ books, session }) => {
  const { pathname } = useRouter();
  const isUrlRedirectBook = session && pathname !== MainPaths.INDEX;

  return (
    <>
      {books.map((book) => (
        <Link
          key={book.id}
          href={urlRedirectBook({ bookId: book.id, isUrlRedirectBook })}
        >
          <a
            className={`w-full ${
              isUrlRedirectBook ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <article
              className="p-4 mb-3 border shadow-lg rounded-lg dark:bg-gray-700 cursor-pointer
            transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-md hover:opacity-75
            dark:border-gray-800"
            >
              <div className="flex flex-row justify-between items-center">
                <p className="text-md text-left">{book.title}</p>
                <p className="text-sm text-left">{book.author}</p>
              </div>

              <div className="mt-4 flex flex-row justify-between items-center">
                <p
                  className={`${getColorStatus(
                    book.status
                  )} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                >
                  {formatStatusText(book.status)}
                </p>
                <StarRating book={book} bookRating={book.rating} />
              </div>
            </article>
          </a>
        </Link>
      ))}
    </>
  );
};

export default Card;
