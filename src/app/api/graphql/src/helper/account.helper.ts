import jwt from 'jsonwebtoken';

import { SendVerifyEmail } from './sendMail';
import { getVerifyPIN } from './auth';
import { FateOsClient } from '@/db/prisma';

export const getAccount = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    }
    return null;
  } catch (err) {
    return null;
  }
};

/*
<- --------------------- 
 ** After getting verfity code, it will validate the code **
--------------------- ->
*/

const sendGetVerified = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: `Incorrect information! Try again`,
        pin: null,
        account: null,
      };
    }
    /*
      <- --------------------- finding user by id --------------------- ->
    */
    const user = await FateOsClient.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return {
        success: false,
        message: `No User found! Try to register.`,
        pin: null,
        account: null,
      };
    }
    const { verifyPIN, verifyPINExpireDate } = getVerifyPIN();

    const udateUser = await FateOsClient.user.update({
      data: {
        verify_pin: verifyPIN,
        verify_pin_expire_date: verifyPINExpireDate,
      },
      where: {
        id: user.id,
      },
    });

    if (!udateUser) {
      return {
        success: false,
        message: `Unable to set verify token`,
        pin: null,
        account: null,
      };
    }
    return {
      success: true,
      message: `Successfully sended the verify token`,
      pin: verifyPIN,
      account: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      pin: null,
      account: null,
    };
  }
};

export const useToVerify = async (id: string) => {
  try {
    const { message, success, account, pin } = await sendGetVerified(id);

    if (!success) {
      return {
        success: false,
        message: message,
        account: null,
      };
    }
    if (!pin) {
      return {
        success: false,
        message: message,
        account: null,
      };
    }
    const sendMail = await SendVerifyEmail({
      email: account.email,
      subject: 'Verify Your Email',
      message: `Please verify your account`,
      pin: pin as number,
      to: `${account.first_name} ${account.last_name}`,
    });

    if (!sendMail) {
      return {
        success: false,
        message: `Unable to validate email. Try again.`,
        account: null,
      };
    }
    return {
      success: true,
      message: `A verification code has been sent to ${account.email}. Please check your inbox and enter the code to proceed`,
      account: null,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
