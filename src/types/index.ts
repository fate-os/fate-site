import { AccountModel } from './app';

export enum AccountProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
}

export interface SubscriptionSessionResponse {
  createSession: {
    message: string;
    success: boolean;
    result: string;
  };
}
export interface DefaultResponse {
  message: string;
  success: boolean;
}

export interface CurrentUserResponse {
  currentUser: {
    message: string;
    success: boolean;
    account: AccountModel;
  };
}

export interface VerifyPaymentResponse {
  verifyPayment: {
    message: string;
    success: boolean;
    result: VerifyPaymentResult;
  };
}

export interface VerifyPaymentResult {
  status: string;
  amount: number;
  currency: string;
}

export interface SubscriptionHistory {
  id: string;
  invoice_number?: string;
  summery?: string;
  invoice_url?: string;
  currency?: string;
  status?: string;
  amount?: number;
  billing_month?: Date;
  created_at?: Date;
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  LIFE_TIME = 'LIFE_TIME',
}

export type PriceMode = 'gbp' | 'usd';

export type UserListResponseType = {
  adminUserList: UserListType;
};

export type UserListType = {
  message?: string;
  success: boolean;
  result?: AccountModel[];
  total?: number;
  hasNextPage?: boolean;
  cursor?: string;
};

export type Media = {
  id: string;
  url: string;
  file_name?: string;
  size?: number;
  meme_type?: string;
  created_at?: Date;
};

export type DestinyFormValues = {
  year: string | null;
  month: string | null;
  day: string | null;
  time: string | null;
};
