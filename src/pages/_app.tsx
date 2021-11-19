import '@Styles/globals.css';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { GSSProps } from '@Interfaces/props/gss-props.interface';
import { Toaster } from 'react-hot-toast';
const Header = dynamic(import('@Components/Header'));

interface CustomAppProps extends AppProps {
  pageProps: GSSProps;
}

const MyApp: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  const { session, componentProps } = pageProps;
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-100">
        {pathname !== MainPaths.INDEX && <Header />}
        <Component {...componentProps} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
      </div>
    </SessionProvider>
  );
};

export default MyApp;
