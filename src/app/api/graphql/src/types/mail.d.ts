interface IMailInterface {
  to: string;
  email: string;
  subject: string;
  message: string;
  link: string;
}
export interface IVerifyMail {
  to: string;
  email: string;
  subject: string;
  message: string;
  pin: number;
}

export interface ISimpleMail {
  email: string;
  subject: string;
  message: string;
  template: string;
}
