import { FC, ReactNode } from 'react';
import Head from '@Components/generic/Head';

export type MainLayoutProps = {
  title: string;
  description: string;
  url: string;
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({
  title,
  description,
  url,
  children,
}) => {
  return (
    <>
      <Head title={title} description={description} url={url} />

      <main className="container m-auto md:w-10/12 p-8">{children}</main>
    </>
  );
};

export default MainLayout;
