import type { AppProps as NextAppProps } from 'next/app';
import type { NextPage } from 'next';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import Providers from '@/context';

import GlobalStyles from 'styles/global';
import theme from '../styles/theme';

type AppProps = NextAppProps & {
  Component: NextPage & {
    withHeader?: boolean;
  };
};

function MyApp({ Component, pageProps }: AppProps) {
  const withHeader = Component.withHeader ?? true;

  return (
    <Providers>
      <ThemeProvider theme={theme}>
        {withHeader && <Header />}
        <Component {...pageProps} />
        <Toaster />
        <GlobalStyles />
      </ThemeProvider>
    </Providers>
  );
}

export default MyApp;
