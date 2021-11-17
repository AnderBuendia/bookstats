import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import MainLayout from '@Components/Layouts/MainLayout';
import Home from '@Components/Home';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { isRequestSSR } from '@Lib/utils/ssr.utils';

export type HomePageProps = {
  session: Session | null;
};

const HomePage: NextPage<HomePageProps> = () => {
  return (
    <MainLayout
      title="Home"
      description="List your books"
      url={MainPaths.INDEX}
    >
      <Home />
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
    if (session) props.session = session;
  }

  return {
    props: props,
  };
};

export default HomePage;
