import nodemailer from "nodemailer";

import { generateOTPEmail } from "./emialTemplatte";
import { ISimpleMail, IVerifyMail } from "../types/mail";

let HOST = process.env.SMTP_EMAIL_HOST;
let PORT = Number(process.env.SMTP_EMAIL_PORT);
let SECURE = false;

export const SendVerifyEmail = async ({
  email,
  subject,
  pin,
  message,
  to,
}: IVerifyMail) => {
  try {
    let transpoter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: SECURE,
      auth: {
        user: process.env.SMTP_EMAIL_ADDRESS as string,
        pass: process.env.SMTP_EMAIL_PASSWORD as string,
      },
    });

    // ------------- sending mail ----------
    await transpoter.sendMail({
      from: `<${process.env.SMTP_EMAIL_ADDRESS as string}>`, // sender
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: generateOTPEmail({ otp: pin?.toString(), recipientName: to }),
    });
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export const UseSendEmail = async ({
  email,
  subject,
  message,
  template,
}: ISimpleMail) => {
  try {
    let transpoter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: SECURE,
      auth: {
        user: process.env.SMTP_EMAIL_ADDRESS as string,
        pass: process.env.SMTP_EMAIL_PASSWORD as string,
      },
    });

    // ------------- sending mail ----------
    await transpoter.sendMail({
      from: `<${process.env.SMTP_EMAIL_ADDRESS as string}>`, // sender
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: template,
    });
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};
