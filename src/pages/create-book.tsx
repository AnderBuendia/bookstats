import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { getSession } from 'next-auth/react';
import MainLayout from '@Components/Layouts/MainLayout';
import CreateBookForm from '@Components/Forms/CreateBookForm';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import type { GSSProps } from '@Interfaces/props/gss-props.interface';

const CreateBookPage: NextPage = () => {
  return (
    <MainLayout
      title="Home"
      description="List your books"
      url={MainPaths.INDEX}
    >
      <CreateBookForm />
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

  props.session = session;

  return { props };
};

export default CreateBookPage;
