import { ApolloClient } from 'apollo-client';
import { split, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import apolloLogger from 'apollo-link-logger';
import createCache from './createCache';

export default function createApolloClient({ fetch }) {
  const wsLink = new WebSocketLink({
    uri: window.App.wsUrl,
    options: {
      reconnect: true,
      timeout: 1000 * 60 * 60,
    },
  });

  const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
    fetch,
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.warn(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.warn(`[Network error]: ${networkError}`);
      }),
      ...(__DEV__ ? [apolloLogger] : []),
      httpLink,
    ]),
  );
  const cache = createCache();

  return new ApolloClient({
    link,
    cache: cache.restore(window.App.apolloState),
    queryDeduplication: true,
    connectToDevTools: true,
  });
}
