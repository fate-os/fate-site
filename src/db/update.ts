import { FateOsClient } from './prisma';

const updateSupscription = async () => {
  console.log('** update started **');
  const [usageLimitFree] = await FateOsClient.usage_limit.findMany({
    where: { subscriptions: { some: { subscription_plan: 'FREE' } } },
  });

  if (!usageLimitFree) {
    return;
  }
  const updateLimit = await FateOsClient.usage_limit.update({
    where: { id: usageLimitFree.id },
    data: { image_deck: 6, total_user_track: 1 },
  });

  console.log(updateLimit);
  console.log('** update end **');
};

updateSupscription();

// const updateToSuperAdmin = async () => {
//   console.log("** update started **");
//   const updateUsers = await FateOsClient.user.updateMany({
//     where: {
//       email: {
//         in: ["mr.jocker909@gmail.com", "Nigel@ukhypnosisandcoaching.co.uk"],
//       },
//     },
//     data: { super_admin: true },
//   });

//   if (!updateUsers) {
//     return;
//   }

//   console.log(updateUsers);
//   console.log("** update end **");
// };

// updateToSuperAdmin();
