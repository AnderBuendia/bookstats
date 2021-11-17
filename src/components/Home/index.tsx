import { FC } from 'react';
import { useRouter } from 'next/router';
import { useResolution } from '@Lib/hooks/useResolution';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
// import Table from '@Components/generic/Table';
// import Card from '@Components/generic/Card';
import { HomeBooks } from '@Lib/utils/home-books';
import { ResolutionBreakPoints } from '@Enums/config/resolution-breakpoints.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const Home: FC = () => {
  const { data: session, status } = useSession();
  const width = useResolution();
  const router = useRouter();

  console.log({ session, status });

  const handleClick = () => {
    if (session) return router.push(MainPaths.BOOKS);

    signIn();
  };

  return (
    <div className="w-11/12 flex-col mt-28 text-center">
      <div className="overlay"></div>

      <h1 className="index-title">Bookstats</h1>

      <div className="index-button my-8">
        <button
          className="px-6 py-3 font-bold bg-black text-white rounded-lg hover:opacity-60 
          transition-opacity duration-500 ease-out"
          onClick={handleClick}
        >
          {session ? 'Go to your Books' : 'Sign in Bookstats'}
        </button>
      </div>

      <div className="index-table">
        <div className="bg-yellow-100 p-3 flex flex-row justify-start">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 ml-2 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 ml-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-white p-6 px-4">
          {/* {width > ResolutionBreakPoints.SM ? (
            <Table books={HomeBooks} />
          ) : (
            <Card books={HomeBooks} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
