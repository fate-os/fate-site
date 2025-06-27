import { PrismaClient } from '@prisma/client';
import { FateOsClient } from './prisma';
import { HandleError } from '@/app/api/graphql/src/utils/Error';

// const prismaClient = new PrismaClient();

const connectDb = async () => {
  try {
    await FateOsClient.$connect();
    console.log('[additional]: Conneteted successfullly');
  } catch (error: any) {
    console.log(error.message);

    return HandleError();
  }
};

connectDb();
