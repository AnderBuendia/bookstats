import { FC } from 'react';
import Link from 'next/link';
import { useAuthenticate } from '@Application/authenticate';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { BooksIcon } from '@Components/Icons/books.icon';

const url = process.env.NEXT_PUBLIC_SITE_URL;

const Header: FC = () => {
  const { signOut } = useAuthenticate();

  return (
    <nav className="flex flex-row justify-between items-center border-b border-gray-300 shadow-sm px-3 py-1">
      <Link href={MainPaths.BOOKS}>
        <a className="px-2 py-1 rounded-lg hover:bg-gray-700" id="icon-books">
          <BooksIcon w={38} h={38} />
        </a>
      </Link>

      <h1 className="text-lg md:text-2xl font-bold">Bookstats</h1>

      <button
        className="px-3 py-2 rounded-lg bg-black text-white hover:opacity-60 
                transition-opacity duration-500 ease-out"
        onClick={() => signOut({ callbackUrl: `${url}` })}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Header;
