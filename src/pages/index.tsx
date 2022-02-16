import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { getSession } from 'next-auth/react';
import MainLayout from '@Components/Layouts/MainLayout';
import Home from '@Components/Home';
import type { GSSProps } from '@Interfaces/props/gss-props.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const HomePage: NextPage = () => {
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
  const session = await getSession(ctx);

  if (session) {
    props.session = session;
  }

  return { props };
};

export default HomePage;
