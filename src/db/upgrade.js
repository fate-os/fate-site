import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const updateToSuperAdmin = async () => {
  const updateCount = await prismaClient.user.updateMany({
    where: {
      email: {
        in: ['mr.jocker909@gmail.com', 'emzh57@gmail.com', 'founder@fate-os.com'],
      },
    },
    data: { super_admin: true },
  });
  console.log(updateCount, '--- updateCount ---');
};

updateToSuperAdmin();
