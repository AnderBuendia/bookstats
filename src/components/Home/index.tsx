import { FC } from 'react';
import { useRouter } from 'next/router';
import { useAuthenticate } from '@Application/authenticate';
import { useResolution } from '@Lib/hooks/useResolution';
import { HomeBooks } from '@Lib/utils/home-books';
import Table from '@Components/generic/Table';
import Card from '@Components/generic/Card';
import { GithubIcon } from '@Components/Icons/github.icon';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const Home: FC = () => {
  const { session, signIn } = useAuthenticate();
  const width = useResolution();
  const router = useRouter();

  const handleClick = () => {
    if (session) return router.push(MainPaths.BOOKS);

    signIn('github');
  };

  return (
    <div className="w-11/12 lg:w-8/12 flex-col mt-28 text-center">
      <div className="overlay"></div>

      <h1 className="index-title">Bookstats</h1>

      <div className="index-button my-8">
        <button
          className="py-1 font-bold bg-black text-white rounded-lg hover:opacity-60 
          transition-opacity duration-500 ease-out"
          onClick={handleClick}
        >
          {session ? (
            <span>Go to your Books</span>
          ) : (
            <div className="flex flex-row justify-between items-center px-4">
              <GithubIcon className="mr-2 w-12 h-12 bg-white text-black fill-current" />
              <span>Sign in with Github</span>
            </div>
          )}
        </button>
      </div>

      <div className="index-table">
        <div className="bg-yellow-100 p-3 flex flex-row justify-start">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 ml-2 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 ml-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-white p-6 px-4">
          {width > ResolutionBreakPoints.SM ? (
            <Table books={HomeBooks} session={session} />
          ) : (
            <Card books={HomeBooks} session={session} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
