import { AppContext } from '../../types';
import {
  ForgotArg,
  LoginArg,
  RegisterArg,
  UpdateArg,
  SendVerifyArg,
  VerifyArg,
} from '../../types/req';
import jwt from 'jsonwebtoken';

import { useToVerify } from '../../helper/account.helper';
import bcryptjs from 'bcryptjs';
import { createHashPassword, getResetPasswordToken } from '../../helper/auth';
import { UseSendEmail } from '../../helper/sendMail';
import { useProfileParser } from '../../utils/parser';
import { GraphQLError } from 'graphql';
import { generateResetPinEmail, generateWelcomeEmail } from '../../helper/emialTemplatte';
import { FateOsClient } from '@/db/prisma';

const currentAccount = async (_: any, __: any, context: AppContext) => {
  try {
    if (context?.account?.account) {
      const isExixt = await FateOsClient.user.findUnique({
        where: { id: context.account?.account.id },
      });

      if (!isExixt) {
        return {
          success: false,
          message: 'No account found',
          account: null,
        };
      }

      return {
        success: true,
        message: 'account initialize.',
        account: useProfileParser(isExixt as any) ?? null,
      };
    }
    return {
      success: false,
      message: 'user not login',
    };
  } catch (error: any) {
    throw new GraphQLError('Unable to get user');
  }
};

const singUp = async (_: any, { input }: RegisterArg, cont: AppContext) => {
  try {
    const { email, password, first_name, last_name, provider, credential } = input;

    if (!email || !password || !first_name || !last_name || !provider) {
      return { success: false, message: 'Please fill out all the fields.' };
    }

    const isExixt = await FateOsClient.user.findUnique({ where: { email } });

    if (isExixt) {
      return {
        success: false,
        message: `This account is already registered`,
      };
    }
    const hashPass = await createHashPassword(password);

    const newAcc = await FateOsClient.user.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashPass,
      },
      select: {
        id: true,
        first_name: true,
        created_at: true,
        last_name: true,
        email: true,
        verify_status: true,
        photo_url: true,
        super_admin: true,
      },
    });

    if (!newAcc) {
      return {
        success: false,
        message: `Unable to create account`,
        account: null,
      };
    }

    // await UseSendEmail({
    //   email: newAcc.email,
    //   message: 'Welcome to fateOs',
    //   subject: 'Welcome to fateOs',
    //   template: generateWelcomeEmail({
    //     quickStartLink: 'https://fate-os.com/',
    //     recipientEmail: newAcc.email,
    //     recipientName: `${newAcc.first_name} ${newAcc.last_name}`,
    //   }),
    // });
    // return await useToVerify(newAcc.id);

    // <- --------- creating JWT for 7 day ----------- ->
    const token = jwt.sign({ account: newAcc }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '7d',
    });

    return {
      success: true,
      message: `Signup success`,
      account: useProfileParser(newAcc as any) ?? null,
      token,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const login = async (_: any, { input }: LoginArg, cont: AppContext) => {
  try {
    const { email, password } = input;

    if (!email || !password) {
      return { success: false, message: 'Please fill out all the fields.' };
    }

    const isExixt = await FateOsClient.user.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        created_at: true,
        last_name: true,
        email: true,
        verify_status: true,
        photo_url: true,
        super_admin: true,
        password: true,
      },
    });

    if (!isExixt) {
      return {
        success: false,
        message: `We couldn't find an account with this email. Try a different email or sign up`,
      };
    }

    if (email && password && !isExixt.password) {
      return {
        success: false,
        message: `Set a new password by resetting it through the Forgot Password option.`,
      };
    }

    if (isExixt.password) {
      const byres = await bcryptjs.compare(password, isExixt.password as string);

      if (!byres) {
        return {
          success: false,
          message:
            "The password you entered is incorrect. Please double-check and try again or reset your password if you've forgotten it",
        };
      }
    }

    if (!isExixt?.verify_status) {
      await useToVerify(isExixt.id);
      return {
        success: false,
        message: `Your account is not verified. We've sent a 6-digit verification code to your registered email ${isExixt.email}. Please enter the code to complete the verification process.`,
        verify: false,
        email: isExixt.email,
      };
    }

    const { password: dpass, ...others } = isExixt;

    // <- --------- creating JWT for 7 day ----------- ->
    const token = jwt.sign({ account: others }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '7d',
    });

    return {
      success: true,
      message: `Login success`,
      account: useProfileParser(isExixt as any) ?? null,
      token,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const verifyAccount = async (_: any, arg: VerifyArg, cont: AppContext) => {
  try {
    const { pin, email } = arg;
    if (!pin || !email) {
      return { success: false, message: 'Please fill out all the fields.' };
    }

    /*
    <- --------------------- finding user by email --------------------- ->
    */

    const user = await FateOsClient.user.findUnique({
      where: {
        email: email,
        verify_pin_expire_date: {
          gt: new Date(Date.now()),
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: `Your request could not be processed due to an invalid or expired OTP, incorrect email, or expired session. Please verify your details and try again.`,
      };
    }

    const isVerified = await FateOsClient.user.findUnique({
      where: { id: user.id, verify_status: true },
    });

    if (isVerified) {
      return {
        success: false,
        message: `You already verified! please login.`,
      };
    }
    /*
    <- --------------------- check the pin --------------------- ->
    */

    if (user.verify_pin !== Number(pin)) {
      return {
        success: false,
        message: `Invalid verification code.`,
      };
    }
    const updateStatus = await FateOsClient.user.update({
      data: {
        verify_pin: null,
        verify_pin_expire_date: null,
        verify_status: true,
      },

      where: { id: user.id },
    });
    if (!updateStatus) {
      return {
        success: false,
        message: `Unable to update status`,
      };
    }
    const finalUser = await FateOsClient.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        first_name: true,
        created_at: true,
        last_name: true,
        email: true,
        super_admin: true,
        verify_status: true,

        photo_url: true,
      },
    });

    // <- --------- creating JWT ----------- ->
    const token = jwt.sign({ account: finalUser }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '7d',
    });

    return {
      success: true,
      message: `Your email address has been successfully verified. Your account is now secure.`,
      account: finalUser,
      token,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const sendVerificationMail = async (_: any, arg: SendVerifyArg) => {
  try {
    const { email } = arg;
    if (!email) {
      return { success: false, message: 'Please fill out all the fields.' };
    }
    const isExixt = await FateOsClient.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (!isExixt) {
      return {
        success: false,
        message: `We couldn't find an account with this email. Try a different email or sign up`,
      };
    }

    return await useToVerify(isExixt.id);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const forgotPassword = async (_: any, arg: ForgotArg, cont: AppContext) => {
  try {
    const { email } = arg;
    if (!email) {
      return { success: false, message: 'Please fill out all the fields.' };
    }

    const isExixt = await FateOsClient.user.findUnique({ where: { email } });
    if (!isExixt) {
      return {
        success: false,
        message: `We couldn't locate an account under that email address. Please check the spelling or sign up if you don't already have an account.`,
      };
    }
    if (!isExixt?.verify_status) {
      return {
        success: false,
        message: `We're unable to reset your password until your email address is verified. Please check your inbox (and your spam/junk folder) for our verification email, and follow the instructions provided to complete the process. If you haven't received the email, please request a new verification email.`,
      };
    }
    const { resetExpireDate, resetPIN } = getResetPasswordToken();

    const updateReset = await FateOsClient.user.update({
      where: { id: isExixt.id },
      data: {
        reset_password_expire_date: resetExpireDate,
        reset_password_pin: resetPIN,
      },
    });
    if (!updateReset) {
      return {
        success: false,
        message: `Unable to proceed. Try again later`,
      };
    }

    const sendMail = await UseSendEmail({
      email: isExixt.email,
      subject: 'Use this OTP to reset you password',
      message: `Almost there! Choose a new password to get back in.`,
      template: generateResetPinEmail({
        otp: resetPIN?.toString(),
        recipientName: `${updateReset.first_name} ${updateReset.last_name}`,
      }),
    });

    if (!sendMail) {
      return { success: false, message: `Error occur to processed email.` };
    }
    return {
      success: true,
      message: `Reset otp send successfully`,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const updatePassword = async (_: any, arg: UpdateArg, cont: AppContext) => {
  try {
    const { email, password, pin } = arg;

    if (!email || !password || !pin) {
      return { success: false, message: `Incorrect informations! Try again.` };
    }

    const user = await FateOsClient.user.findUnique({
      where: {
        email,
        reset_password_expire_date: {
          gt: new Date(Date.now()),
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: `The password reset OTP has expired or is no longer valid. Please request a new one to proceed with resetting your password`,
      };
    }
    const newPassword = await bcryptjs.hash(password, 12);

    const updatePass = await FateOsClient.user.update({
      data: {
        password: newPassword,
        reset_password_expire_date: null,
      },
      where: { id: user.id },
    });

    if (!updatePass) {
      return {
        success: false,
        message: `Unable to update password`,
      };
    }

    return {
      success: true,
      message: `Your password has been updated successfully. You can now log in with your new password.`,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const resolver = {
  Query: {
    account: currentAccount,
  },
  Mutation: {
    register: singUp,
    login: login,
    // verify: verifyAccount,
    // sendVerification: sendVerificationMail,
    forgotPassword: forgotPassword,
    updateResetPassword: updatePassword,
  },
};

export default resolver;

const lastActiveLog = (id: string, verify_status?: boolean) => {
  FateOsClient.user
    .update({
      where: { id: id },
      data: {
        last_login_at: new Date(Date.now()),
        ...(verify_status === true && { verify_status: true }),
      },
    })
    .then((e) => {})
    .catch((e) => {
      console.log(e);
    });
};
