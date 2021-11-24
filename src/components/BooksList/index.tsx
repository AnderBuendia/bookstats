import { FC } from 'react';
import Link from 'next/link';
import type { Book } from '@prisma/client';
import { useResolution } from '@Lib/hooks/useResolution';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type BooksListProps = {
  books: Book[];
};

const BooksList: FC<BooksListProps> = ({ books }) => {
  const width = useResolution();

  return (
    <div className="w-11/12 lg:w-9/12 flex flex-col items-center">
      <Link href={MainPaths.CREATE_BOOK}>
        <a className="btn-menu mb-4">ADD NEW BOOK</a>
      </Link>

      {width > ResolutionBreakPoints.SM ? (
        <Table books={books} />
      ) : (
        <Card books={books} />
      )}
    </div>
  );
};

export default BooksList;
