import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { getSession } from 'next-auth/react';
import MainLayout from '@Components/Layouts/MainLayout';
import BooksList from '@Components/BooksList';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { getUserBooksRequest } from '@Services/bookAdapter';

const BooksPage: NextPage = () => {
  return (
    <MainLayout
      title="My Books"
      description="Create a list of your favorite books"
      url={MainPaths.BOOKS}
    >
      <BooksList />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  const props: GSSProps = {};
  const session = await getSession(ctx);

  if (!session) {
    props.dehydratedState = dehydrate(queryClient);

    return {
      redirect: {
        destination: MainPaths.INDEX,
        permanent: false,
      },
      props,
    };
  }

  const userId = session.uid as string;

  await queryClient.prefetchQuery(['books', userId], () =>
    getUserBooksRequest(userId)
  );

  props.dehydratedState = dehydrate(queryClient);

  return { props };
};

export default BooksPage;
