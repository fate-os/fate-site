const email = 'emzh57@gmail.com';

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const deleteUsers = async () => {
  await prismaClient.user.delete({ where: { email } });
};

deleteUsers();
