import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // We'll need to create a GraphQL server
});

// Optional: Add auth headers if needed
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Add any auth headers here if needed
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
