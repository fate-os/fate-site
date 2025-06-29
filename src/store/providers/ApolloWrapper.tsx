'use client';
import { initializeApollo } from '@/lib/getApolloClient';
import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren, useMemo } from 'react';

export function ClientApolloProvider({ children }: PropsWithChildren) {
  const client = useMemo(() => initializeApollo(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
