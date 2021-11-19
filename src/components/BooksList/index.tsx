import { FC } from 'react';
import Link from 'next/link';
import { useResolution } from '@Lib/hooks/useResolution';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const BooksList: FC = () => {
  const width = useResolution();
  return (
    <Link href={MainPaths.CREATE_BOOK}>
      <a
        className="w-6/12 p-3 font-bold bg-green-500 text-white rounded-md hover:opacity-70 
          transition-opacity duration-500 ease-out text-center"
      >
        Add New Book
      </a>
    </Link>
  );
};

export default BooksList;
