import { FC } from 'react';
import Link from 'next/link';
import { useGetUserBooks } from '@Application/book/getUserBooks';
import { useAuthenticate } from '@Application/authenticate';
import { useResolution } from '@Lib/hooks/useResolution';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataStatus } from '@Enums/data-status.enum';
import { LoadingIcon } from '@Components/Icons/loading.icon';

const BooksList: FC = () => {
  const isNarrowScreen = useResolution();
  const { session } = useAuthenticate();
  const { data, status, fetchNextPage, hasNextPage } = useGetUserBooks({
    userId: session?.uid as string,
  });

  if (status === DataStatus.LOADING) return <LoadingIcon />;

  const userBooks = data?.pages.map((group) => group.books).flat();

  return (
    <div className="w-11/12 lg:w-8/12 flex flex-col items-center">
      <Link href={MainPaths.CREATE_BOOK}>
        <a className="btn-menu mb-4">ADD NEW BOOK</a>
      </Link>

      {isNarrowScreen ? (
        <Card books={userBooks} session={session} />
      ) : (
        <Table books={userBooks} session={session} />
      )}

      {hasNextPage && (
        <button
          className="w-4/12 p-1 mt-6 font-bold bg-indigo-600 shadow-indigo-600/50 text-white shadow-md 
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
