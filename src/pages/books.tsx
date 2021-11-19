import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { getSession } from 'next-auth/react';
import { isRequestSSR } from '@Lib/utils/ssr.utils';
import MainLayout from '@Components/Layouts/MainLayout';
import BooksList from '@Components/BooksList';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

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
  const props: GSSProps = {};
  const isSSR = isRequestSSR(ctx.req.url);

  if (isSSR) {
    const session = await getSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: MainPaths.INDEX,
          permanent: false,
        },
      };
    }

    props.session = session;
  }

  return {
    props: props,
  };
};

export default BooksPage;
