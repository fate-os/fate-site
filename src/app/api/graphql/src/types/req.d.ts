import { AccountProvider } from '@prisma/client';

export type RegisterArg = {
  input: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    provider: AccountProvider;
    credential?: string;
  };
};

export type UserSettingArg = {
  input: {
    first_name: string;
    last_name: string;
    email: string;
    country_name?: string | null;
    phone_number?: string | null;
    zip_code?: string | null;
    primary_address?: string | null;
    primary_city?: string | null;
    primary_state?: string | null;
    about_description?: string | null;
  };
};
export type LoginArg = {
  input: {
    email: string;
    password: string;
  };
};

export type VerifyArg = {
  email: string;
  pin: string;
};
export type SendVerifyArg = {
  email: string;
};

export type ForgotArg = {
  email: string;
};
export type SessionArg = {
  years: number;
  shine?: boolean;
};

export type VerifyPaymentArg = {
  sessionId: string;
};

export type UpdateArg = {
  password: string;
  email: string;
  pin: string;
};

export type IdParams = {
  id: string;
};

export type MutatePasswordArg = {
  newPassword: string;
  currentPassword: string;
};

export type SubscriptionHistoryArg = {
  status?: string;
  size?: string;
  page?: string;
};

export type ListQuerykArg = {
  size?: string;
  page?: string;
  cursor?: string;
  sortBy?: string;
};
export type UserListQuerykArg = {
  size?: string;
  page?: string;
  cursor?: string;
  sortBy?: string;
  firstName: string;
  lastName: string;
  email: string;
};
