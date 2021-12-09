import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { useGetBook } from '@Application/book/getBook';
import prisma from '@Lib/utils/prisma.utils';
import withCSRRedirect from '@Lib/hoc/with-csr-redirect.hoc';
import { getBookRequest } from '@Services/bookAdapter';
import BookSection from '@Components/BookSection';
import MainLayout from '@Components/Layouts/MainLayout';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { IRedirect } from '@Interfaces/redirect.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { RedirectConditions } from '@Enums/config/redirect-conditions.enum';

const BookPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const bookId = typeof query?.id === 'string' ? query?.id : '';

  const { data: book, isLoading } = useGetBook(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (!book) return null;

  return (
    <MainLayout
      title={book.title}
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
  const queryClient = new QueryClient();
  const props: GSSProps = {};
  const bookId = ctx.params?.id as string;

  await queryClient.prefetchQuery(['book', bookId], () =>
    getBookRequest(bookId)
  );

  props.dehydratedState = dehydrate(queryClient);

  return {
    props,
  };
};

export default withCSRRedirect(BookPage, redirect);
