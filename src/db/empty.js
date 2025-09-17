const email = 'emzh57@gmail.com';

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const deleteUsers = async () => {
  await prismaClient.user.delete({ where: { email } });
};

// deleteUsers();

const findUserPaymentHistory = async () => {
  const paymentHistory = await prismaClient.payment_history.findMany({
    where: { user: { email: 'mayhe57@gmail.com' } },
  });
  console.log(paymentHistory);
};

// findUserPaymentHistory();
