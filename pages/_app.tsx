import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { client } from 'config/client';
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
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </ApolloProvider>
);

export default App;
