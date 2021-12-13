import { FC } from 'react';
import Link from 'next/link';
import { useGetUserBooks } from '@Application/book/getUserBooks';
import { useAuthenticate } from '@Application/authenticate';
import { useResolution } from '@Lib/hooks/useResolution';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataStatus } from '@Enums/data-status.enum';

const BooksList: FC = () => {
  const width = useResolution();
  const { session } = useAuthenticate();
  const { data, status, fetchNextPage, hasNextPage } = useGetUserBooks({
    userId: session?.uid as string,
  });

  if (status === DataStatus.LOADING) return <div>Loading...</div>;

  const userBooks = data?.pages.map((group) => group.books).flat();

  return (
    <div className="w-11/12 lg:w-8/12 flex flex-col items-center">
      <Link href={MainPaths.CREATE_BOOK}>
        <a className="btn-menu mb-4">ADD NEW BOOK</a>
      </Link>

      {status === DataStatus.SUCCESS && width > ResolutionBreakPoints.SM ? (
        <Table books={userBooks} session={session} />
      ) : (
        <Card books={userBooks} session={session} />
      )}

      {hasNextPage && (
        <button
          className="w-4/12 p-1 mt-6 font-bold bg-indigo-300 shadow-indigo-300/50 shadow-md border border-indigo-300 text-indigo-600 
          rounded-sm hover:opacity-70 transition-opacity duration-500 ease-out"
          onClick={() => fetchNextPage()}
        >
          <span>MORE BOOKS</span>
        </button>
      )}
    </div>
  );
};

export default BooksList;
