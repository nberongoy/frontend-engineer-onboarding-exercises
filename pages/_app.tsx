import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { AppProps } from 'next/app';
import React, { FC } from 'react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
