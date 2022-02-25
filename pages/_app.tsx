import React from 'react';
import type { AppProps as NextAppProps } from 'next/app';
import type { NextPage } from 'next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import { Header } from '@components/Header';
import Providers from '@/context';

import GlobalStyles from 'styles/global';
import theme from '../styles/theme';

import TimeAgo from 'javascript-time-ago';

import pt from 'javascript-time-ago/locale/pt.json';

TimeAgo.addDefaultLocale(pt);

type AppProps = NextAppProps & {
  Component: NextPage & {
    withHeader?: boolean;
  };
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  const withHeader = Component.withHeader ?? true;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Providers>
          <ThemeProvider theme={theme}>
            {withHeader && <Header />}
            <Component {...pageProps} />
            <Toaster />
            <GlobalStyles />
          </ThemeProvider>
        </Providers>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
