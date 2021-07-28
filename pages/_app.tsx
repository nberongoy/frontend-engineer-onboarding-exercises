import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { store } from '@store/store';
import { client } from 'config/client';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

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
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  </ApolloProvider>
);

export default App;
