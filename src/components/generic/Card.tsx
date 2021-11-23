import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { Book } from '@prisma/client';
import { formatStatusText } from '@Lib/utils/format-text.utils';
import { getColorStatus } from '@Domain/book';
import StarRating from '@Components/generic/StarRating';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type CardProps = {
  books: Book[];
};

const Card: FC<CardProps> = ({ books }) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {books.map((book) => (
        <Link
          key={book.id}
          href={
            pathname !== MainPaths.INDEX && session
              ? `${MainPaths.BOOK}/${book.id}`
              : '#'
          }
          passHref
        >
          <div
            className="w-full mb-3 p-4 bg-white border shadow-lg rounded-lg cursor-pointer
      transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-md hover:opacity-75"
          >
            <div className="flex flex-row justify-between items-center">
              <p className="text-md text-left">{book.name}</p>
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
              <StarRating bookId={book.id} bookRating={book.rating} />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Card;
