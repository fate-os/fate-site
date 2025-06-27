import { AccountProvider } from "@prisma/client";

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
export type AddClientSessionArg = {
  input: ClientSessionInput;
};

export type EditClientSessionArg = {
  input: ClientSessionInput;
  id: string;
};

export type ClientSessionInput = {
  groups: [
    {
      name: string;
      id: string; // uid
      group_id: string;

      images: [
        {
          id: string; // image_deck id
          image_name?: string; // image_deck it
          image_deck_id?: string; // deck id
          image_group_id?: string; // group id
        }
      ];
    }
  ];
  note: string;
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
  subscriptionId: string;
  currency: string;
  couponId?: string;
  annually?: boolean;
  freeTrial?: boolean;
};

export type SingleSubscriptionArg = {
  id: string;
  currency: string;
};
export type verifyPaymentArg = {
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

export type CancelCurrentSubscriptionArg = {
  currentSubscriptionId: string;
};

export type SubscriptionHistoryArg = {
  status?: string;
  size?: string;
  page?: string;
};

export type ImageDeckArg = {
  size?: string;
  page?: string;
  cursor?: string;
  sortBy?: string;
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
export type CouponListQuerykArg = {
  size?: string;
  page?: string;
  sortBy?: string;
  name?: string;
};

export type ClientSessionListArg = {
  size?: string;
  page?: string;
  cursor?: string;
  sortBy?: string;
};

export type SelectedDeckArg = {
  idsStr: string;
};

export type AdminCouponArg = {
  name: string;
  percentOff: number;
  limit: number;
  subscriptionFor?: [{ id: string }];
};

export type CouponApplyArg = {
  code: string;
  subscriptionId: string;
};
