import { ACCESS_TOKEN } from '@/config-global';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { cookies } from 'next/headers';

const getCookies = async () => {
  const cookieList = await cookies();
  const _cookies = cookieList.get(ACCESS_TOKEN) || '';
  return {
    authorization: _cookies ? `Bearer ${_cookies.value}` : '',
  };
};

export const { getClient } = registerApolloClient(async () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL + '/api/graphql',
    credentials: 'include',
    headers: typeof window === 'undefined' ? await getCookies() : undefined,
    fetchOptions: {
      cache: 'no-store',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([httpLink]),

    credentials: 'include',
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });
});
