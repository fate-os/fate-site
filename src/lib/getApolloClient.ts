'use client';

import { ACCESS_TOKEN } from '@/config-global';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL + '/api/graphql',
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    // Read cookie from browser
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith(ACCESS_TOKEN))
      ?.split('=')[1];

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink as any) as any,
    cache: new InMemoryCache(),
  });
};

let apolloClient: ApolloClient<any>;

export function initializeApollo() {
  // Create new client if no existing client or on server
  if (typeof window === 'undefined') return createApolloClient();
  if (!apolloClient) apolloClient = createApolloClient();

  return apolloClient;
}
