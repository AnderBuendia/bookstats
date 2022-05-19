import type { FC } from 'react';
import Link from 'next/link';
import { useFindUserBooksUseCase } from '@Application/book/find-user-books.use-case';
import { useAuthenticate } from '@Application/authenticate';
import { useResolution } from '@Lib/hooks/useResolution';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { LoadingIcon } from '@Components/Icons/loading.icon';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataStatus } from '@Enums/data-status.enum';

const BooksList: FC = () => {
  const isNarrowScreen = useResolution();
  const { session } = useAuthenticate();
  const { data, status, fetchNextPage, hasNextPage } = useFindUserBooksUseCase({
    userId: session?.uid as string,
  });

  if (status === DataStatus.LOADING)
    return (
      <div className="flex flex-col justify-center items-center">
        <LoadingIcon />
      </div>
    );
  else if (!data) return null;

  const userBooks = data.pages.map((group) => group.books).flat();

  const isMobile = isNarrowScreen ? (
    <Card books={userBooks} session={session} />
  ) : (
    <Table books={userBooks} session={session} />
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={MainPaths.CREATE_BOOK}>
        <a className="btn-menu mb-4">ADD NEW BOOK</a>
      </Link>

      {!userBooks.length ? <div>There is no books yet</div> : <>{isMobile}</>}

      {hasNextPage && (
        <button
          className="md:w-4/12 p-3 mt-6 font-bold bg-indigo-600 shadow-indigo-600/50 text-white shadow-md 
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
