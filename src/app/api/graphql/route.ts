// app/api/graphql/route.ts
import { createYoga, createSchema } from 'graphql-yoga';
import { NextRequest } from 'next/server';
import { AppContext } from './src/types';
import resolvers from './src/graphql/resolvers';
import typeDefs from './src/graphql/typedefs';
import { getAccount } from './src/helper/account.helper';

const yoga = createYoga<{
  req: NextRequest;
  context: AppContext;
}>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),

  context: async ({ request }) => {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.split(' ').pop() || '';
    const account = getAccount(token); // Your existing logic
    return {
      account,
      req: request, // optional if you want to pass it down
      res: undefined, // Next.js App Router doesn't expose response directly
    };
  },

  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
});

// This wrapper matches Next.js App Router's expected signature
export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, { req: request, context: {} });
}
export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, { req: request, context: {} });
}
