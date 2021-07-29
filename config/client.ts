import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, Observable, Operation } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { appConsole } from '@utils/consoleUtils';
import { getAccessToken, isLoggedIn } from '@utils/helper/auth';

const request = (operation: Operation) => {
  operation.setContext({
    ...(isLoggedIn() && {
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    }),
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        try {
          handle.unsubscribe();
        } catch (error) {}
      };
    })
);

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      appConsole(message);
    });
  }
});

const link = from([errorLink, requestLink, new HttpLink({ uri: 'http://localhost:4002/graphql' })]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  credentials: 'same-origin',
});
