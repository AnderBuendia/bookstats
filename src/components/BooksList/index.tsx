import { FC, useState } from 'react';
import Link from 'next/link';
import { useGetUserBooks } from '@Application/book/getUserBooks';
import { useAuthenticate } from '@Application/authenticate';
import { useResolution } from '@Lib/hooks/useResolution';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { RestEndPoints } from '@Enums/paths/rest-endpoints.enum';

const BooksList: FC = () => {
  // const [moreBooks, setMoreBooks] = useState<Book[]>();
  const width = useResolution();
  const { session } = useAuthenticate();
  const { books, cursorBooks } = useGetUserBooks({
    userId: session?.uid as string,
  });

  console.log('BOOKS:', { books, cursorBooks });

  // console.log({ moreBooks });

  // const handleClickMoreBooks = async (cursorBooks: string) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOKS}?uid=${session?.uid}`
  //   );
  //   const books = await response.json();

  //   setMoreBooks(books);
  // };

  return (
    <div className="w-11/12 lg:w-9/12 flex flex-col items-center">
      <Link href={MainPaths.CREATE_BOOK}>
        <a className="btn-menu mb-4">ADD NEW BOOK</a>
      </Link>

      {width > ResolutionBreakPoints.SM ? (
        <Table books={books} session={session} />
      ) : (
        <Card books={books} session={session} />
      )}

      {/* {cursorBooks && (
        <button
          className="w-4/12 p-1 mt-2 font-bold bg-indigo-300 shadow-md border border-indigo-500 text-indigo-800 
          rounded-sm hover:opacity-70 transition-opacity duration-500 ease-out"
          onClick={() => handleClickMoreBooks(cursorBooks)}
        >
          <span>MORE BOOKS</span>
        </button>
      )} */}
    </div>
  );
};

export default BooksList;
