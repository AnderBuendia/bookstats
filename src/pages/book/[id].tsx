import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { useRouter } from 'next/router';
import type { Book } from '@prisma/client';
import { prisma } from '@Lib/utils/prisma.utils';
import withCSRRedirect from '@Lib/hoc/with-csr-redirect.hoc';
import BookSection from '@Components/BookSection';
import MainLayout from '@Components/Layouts/MainLayout';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { IRedirect } from '@Interfaces/redirect.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { RestEndPoints } from '@Enums/paths/rest-endpoints.enum';
import { RedirectConditions } from '@Enums/config/redirect-conditions.enum';

interface BookPageProps {
  book: Book;
}

const BookPage: NextPage<BookPageProps> = ({ book }) => {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <MainLayout
      title={book.name}
      description="See more data of your favorite books"
      url={`${MainPaths.BOOK}/${book.id}`}
    >
      <BookSection book={book} />
    </MainLayout>
  );
};

const redirect: IRedirect = {
  href: MainPaths.INDEX,
  statusCode: 302,
  condition: RedirectConditions.REDIRECT_WHEN_USER_NOT_EXISTS,
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany();

  return {
    paths: books.map((book) => ({
      params: { id: book.id },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const props: GSSProps = {};
  const fetchBookUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOK}/${ctx.params?.id}`;
  const response = await fetch(fetchBookUrl);
  const book = await response.json();

  props.componentProps = {
    book,
  };

  return {
    props,
  };
};

export default withCSRRedirect(BookPage, redirect);
