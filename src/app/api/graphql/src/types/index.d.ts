import type { user } from '@prisma/client';

export type AppContext = YogaInitialContext & {
  account?: { account?: user } | null;
  req: Request;
};

export type PlainContext = {
  account?: user;
};
