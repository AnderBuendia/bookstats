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

      <div className="container mx-auto w-full flex justify-center items-center my-5">
        {children}
      </div>
    </>
  );
};

export default MainLayout;
