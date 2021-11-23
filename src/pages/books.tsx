import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { getSession } from 'next-auth/react';
import type { Book } from '@prisma/client';
import { prisma } from '@Lib/utils/prisma.utils';
import MainLayout from '@Components/Layouts/MainLayout';
import BooksList from '@Components/BooksList';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type BookPageProps = {
  books: Book[];
};

const BooksPage: NextPage<BookPageProps> = ({ books }) => {
  return (
    <MainLayout
      title="My Books"
      description="Create a list of your favorite books"
      url={MainPaths.BOOKS}
    >
      <BooksList books={books} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const props: GSSProps = {};
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: MainPaths.INDEX,
        permanent: false,
      },
    };
  }

  const data = await prisma.user
    .findUnique({ where: { email: session.user?.email as string } })
    .books();

  const books = JSON.parse(JSON.stringify(data));

  props.componentProps = {
    books,
  };

  return { props };
};

export default BooksPage;
