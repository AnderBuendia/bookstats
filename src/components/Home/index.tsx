import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useAuthenticate } from '@Application/authenticate';
import { useResolution } from '@Lib/hooks/useResolution';
import { HomeBooks } from '@Lib/utils/home-books';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import DarkModeButton from '@Components/generic/DarkModeButton';
import { GithubIcon } from '@Components/Icons/github.icon';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const Home: FC = () => {
  const { session, signIn } = useAuthenticate();
  const isNarrowScreen = useResolution();
  const router = useRouter();

  const handleClick = () => {
    if (session) return router.push(MainPaths.BOOKS);

    signIn('github');
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="index-dark-mode-button mb-16">
        <DarkModeButton />
      </div>

      <h1 className="index-title">Bookstats</h1>

      <div className="index-button my-8">
        <button
          id="github-button"
          className="py-1 font-bold bg-black text-white shadow-lg rounded-lg hover:opacity-60 
          transition-opacity duration-500 ease-out"
          onClick={handleClick}
        >
          {session ? (
            <div className="px-8 py-2">
              <span>Go to your Books</span>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center px-4 p-1">
              <GithubIcon className="mr-3 w-10 h-10" />
              <span>Sign in with GitHub</span>
            </div>
          )}
        </button>
      </div>

      <div className="index-table">
        <div className="flex flex-row justify-start p-3 bg-yellow-100 dark:bg-cyan-700">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 ml-2 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 ml-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex flex-col dark:bg-gray-600 p-6 px-4">
          {isNarrowScreen ? (
            <Card books={HomeBooks} session={session} />
          ) : (
            <Table books={HomeBooks} session={session} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
