// import { AppContext, PlainContext } from "../../types";
// import { ThrowError, ThrowRestError } from "../../utils/Error";
// import { MutatePasswordArg, UserSettingArg } from "../../types/req";
// import bcryptjs from "bcryptjs";
// import multer from "multer";
// import { Request, Response } from "express";
// import { getAccount } from "../../helper/account.helper";
// import { Readable } from "stream";
// import path from "path";
// import { uuidV2 } from "../../utils/uuid";
// import { s3, s3BucketName } from "../../db/s3";
// import { Upload } from "@aws-sdk/lib-storage";
// import { storage_keys } from "../../config";
// import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { useProfileParser } from "../../utils/parser";
// import { FateOsClient } from "../../db/prisma";
// import { GraphQLError } from "graphql";

// export const profileMedia = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 100 * 1024 * 1024 },
// });

// const updatePassword = async (
//   _: any,
//   { currentPassword, newPassword }: MutatePasswordArg,
//   cont: AppContext
// ) => {
//   try {
//     if (!cont.account?.account) {
//       return {
//         success: false,
//         message: "Unable to find account, try again",
//       };
//     }

//     const isExixt = await FateOsClient.user.findUnique({
//       where: { id: cont.account.account.id },
//     });

//     if (!isExixt) {
//       return {
//         success: false,
//         message: `We couldn't find an account with this email. Try a different email or sign up`,
//       };
//     }
//     if (
//       isExixt?.account_provider !== "EMAIL" &&
//       newPassword &&
//       !isExixt.password
//     ) {
//       const newUpdatedPassword = await bcryptjs.hash(newPassword, 12);

//       const updatePass = await FateOsClient.user.update({
//         data: {
//           password: newUpdatedPassword,
//           reset_password_expire_date: null,
//         },

//         where: { id: isExixt.id },
//       });
//       if (!updatePass) {
//         return {
//           success: false,
//           message: `Unable to update password`,
//         };
//       }
//       return {
//         success: true,
//         message: "Your new password has been successfully updated.",
//       };
//     }

//     const byres = await bcryptjs.compare(
//       currentPassword,
//       isExixt.password as string
//     );

//     if (!byres) {
//       return {
//         success: false,
//         message: "The current password you provided doesn't match our records.",
//       };
//     }
//     const newUpdatedPassword = await bcryptjs.hash(newPassword, 12);

//     const updatePass = await FateOsClient.user.update({
//       data: {
//         password: newUpdatedPassword,
//         reset_password_expire_date: null,
//       },

//       where: { id: isExixt.id },
//     });
//     if (!updatePass) {
//       return {
//         success: false,
//         message: `Unable to update password`,
//       };
//     }
//     return {
//       success: true,
//       message: `Your new password has been successfully updated.`,
//     };
//   } catch (error: any) {
//     throw new GraphQLError(error.message);
//   }
// };

// const currentUserAccount = async (_: any, __: any, context: AppContext) => {
//   try {
//     if (context?.account?.account) {
//       const isExixt = await FateOsClient.user.findUnique({
//         where: { id: context.account?.account.id },
//       });
//       if (!isExixt) {
//         return {
//           success: false,
//           message: "No account found",
//           account: null,
//         };
//       }
//       return {
//         success: true,
//         message: "account information getting success.",
//         account: useProfileParser(isExixt) ?? null,
//       };
//     }
//     return {
//       success: false,
//       message: "Unable to find user!",
//     };
//   } catch (error: any) {
//     throw new GraphQLError(error.message);
//   }
// };

// export const UPLOAD_PROFILE = async (req: Request, res: Response) => {
//   try {
//     const token = req.headers?.authorization?.split(" ");

//     if (!token) {
//       return res.json({
//         success: false,
//         message: "You are not authorize to take this action.",
//       });
//     }
//     const { account } = getAccount(
//       token ? token[token.length - 1] : ""
//     ) as any as PlainContext;

//     if (!account) {
//       return res.json({
//         success: false,
//         message: "You are not authorize to take this action.",
//       });
//     }

//     if (!req.file) {
//       return res.json({
//         success: false,
//         message: `File is required.`,
//       });
//     }

//     const fileStream = Readable.from(req.file.buffer);

//     const exname = path.extname(req.file.originalname);
//     const key = `${storage_keys.user_profile}/${
//       account.id
//     }/${uuidV2()}${exname}`;

//     const parallelUpload = new Upload({
//       client: s3,
//       params: {
//         Bucket: s3BucketName,
//         Key: key,
//         Body: fileStream,
//       },
//     });

//     await parallelUpload.done();

//     const _url = `https://${s3BucketName}.s3.amazonaws.com/${key}`;

//     const c_id = account.id;

//     const thatUser = await FateOsClient.user.findUnique({
//       where: { id: c_id },
//     });

//     if (!thatUser) {
//       return res.json({
//         success: false,
//         message: `Unable to find kanban. try again`,
//       });
//     }

//     if (thatUser.photo_url) {
//       const obj = await getS3Object(thatUser.photo_url as string);

//       if (obj) {
//         const command = new DeleteObjectCommand({
//           Bucket: s3BucketName,
//           Key: thatUser.photo_url,
//         });
//         await s3.send(command);
//       }
//     }

//     const update = await FateOsClient.user.update({
//       where: { id: c_id },
//       data: {
//         photo_url: key,
//       },
//     });

//     if (!update) {
//       return res.json({
//         success: false,
//         message: `Unable to update`,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       url: _url,
//       message: `Stored successfully`,
//     });
//   } catch (error: any) {
//     return ThrowRestError(error, res);
//   }
// };

// const updateProfile = async (
//   _: any,
//   { input }: UserSettingArg,
//   cont: AppContext
// ) => {
//   try {
//     if (!cont.account?.account) {
//       return {
//         success: false,
//         message: "Unable to find account, try again",
//       };
//     }

//     const isExixt = await FateOsClient.user.findUnique({
//       where: { id: cont.account.account.id },
//     });

//     if (!isExixt) {
//       return {
//         success: false,
//         message: `We couldn't find an account with this email. Try a different email or sign up`,
//       };
//     }

//     if (input.email !== isExixt.email) {
//       const isNewEmialExixt = await FateOsClient.user.findUnique({
//         where: { email: input.email },
//       });

//       if (isNewEmialExixt) {
//         return {
//           success: false,
//           message: `This account is already registered`,
//         };
//       }
//     }

//     const update = await FateOsClient.user.update({
//       where: { id: cont.account.account.id },
//       data: {
//         ...input,
//         verify_status:
//           input.email !== isExixt.email ? false : isExixt.verify_status,
//       },
//     });

//     if (!update) {
//       return {
//         success: false,
//         message: `Unable to update. Try again!`,
//       };
//     }

//     return {
//       success: true,
//       message: `Your profile information has been successfully updated.`,
//       logout: input.email !== isExixt.email ? true : false,
//     };
//   } catch (error: any) {
//     throw new GraphQLError(error.message);
//   }
// };

// const resolver = {
//   Query: {
//     currentUser: currentUserAccount,
//   },
//   Mutation: {
//     updatePassword: updatePassword,
//     updateProfile: updateProfile,
//   },
// };

// export default resolver;

// const getS3Object = async (key: string) => {
//   try {
//     const getCommand = new GetObjectCommand({
//       Bucket: s3BucketName,
//       Key: key,
//     });

//     return await s3.send(getCommand);
//   } catch (error) {
//     return undefined;
//   }
// };
