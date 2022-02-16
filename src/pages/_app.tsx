import '@Styles/globals.css';
import { useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import Header from '@Components/Header';
import type { GSSProps } from '@Interfaces/props/gss-props.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

interface CustomAppProps extends AppProps {
  pageProps: GSSProps;
}

const MyApp: NextPage<CustomAppProps> = ({ Component, pageProps }) => {
  const { dehydratedState, session, componentProps } = pageProps;
  const [queryClient] = useState(() => new QueryClient());
  const { pathname } = useRouter();

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <div className="min-h-screen">
              {pathname !== MainPaths.INDEX && <Header />}
              <Component {...componentProps} />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                }}
              />
            </div>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default MyApp;
