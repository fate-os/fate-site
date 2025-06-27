import { PrismaClient } from '@prisma/client';

declare global {
  var fateOsClient: PrismaClient | undefined;
}

export const FateOsClient = globalThis.fateOsClient || new PrismaClient();
