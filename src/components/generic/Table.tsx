import type { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { Session } from 'next-auth';
import type { Book } from '@prisma/client';
import { getColorStatus, readPagesAvgMins } from '@Domain/book';
import { formatStatusText } from '@Lib/utils/format-text.utils';
import StarRating from '@Components/generic/StarRating';
import { MainPaths } from '@Enums/paths/main-paths.enum';

interface TableProps {
  books?: Book[];
  session: Session | null;
}

const Table: FC<TableProps> = ({ books, session }) => {
  const { pathname } = useRouter();

  return (
    <div className="w-full shadow-sm shadow-gray-800/100 overflow-x-auto rounded-lg">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-indigo-300 dark:bg-indigo-600">
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Time Left</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {books &&
            books.map((book) => (
              <Link
                key={book.id}
                href={
                  session && pathname !== MainPaths.INDEX
                    ? `${MainPaths.BOOK}/${book.id}`
                    : '#'
                }
                passHref
              >
                <tr className="text-center cursor-pointer transition duration-500 ease-in transform hover:scale-95">
                  <td className="p-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {book.title}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {book.author}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`${getColorStatus(
                        book.status
                      )} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                    >
                      {formatStatusText(book.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <StarRating bookId={book.id} bookRating={book.rating} />
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {readPagesAvgMins(
                        book.pages,
                        book.status,
                        book.read_pages
                      )}
                      <span> mins</span>
                    </div>
                  </td>
                </tr>
              </Link>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
