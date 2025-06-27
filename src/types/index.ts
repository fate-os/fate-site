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

export interface EditClientSessionResponse {
  editClientSession: DefaultResponse;
}
export interface AddClientSessionResponse {
  addClientSession: DefaultResponse;
}
export interface SingleSubscriptionDataResponse {
  subscriptionById: {
    message: string;
    success: boolean;
    subscription: SubscriptionType;
    clientSecret: string;
  };
}

export interface CurrentSubscriptionResponse {
  currentSubscription: {
    message: string;
    success: boolean;
    purchased_subscription: PurchasedSubscription;
    usage_count: UsageCount;
    free_subscription: SubscriptionType;
  };
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
export interface SubscriptionHistoryResponse {
  subscriptionHistory: {
    message: string;
    success: boolean;
    result: SubscriptionHistory[];
  };
}

export interface CanceledSubscriptionResponse {
  cancelSubscription: {
    message: string;
    success: boolean;
  };
}

export interface VerifyPaymentResult {
  status: string;
  amount: number;
  currency: string;
}

export interface SubscriptionDataResponse {
  subscriptions: SubscriptionsRestype;
}

export interface SubscriptionsRestype {
  message: string;
  success: boolean;
  subscriptions: SubscriptionType[];
}

export interface PurchasedSubscription {
  id: string;
  subscription_id: string;
  subscription: SubscriptionType;
  created_at: Date;
  updated_at: Date;
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

export interface SubscriptionType {
  id: string;
  usd_amount: number;
  gbp_amount: number;
  subscription_plan: SubscriptionPlan;
  subscription_name: string;
  usage_limit: UsageLimit;
  created_at: string;
}

export interface UsageLimit {
  id: string;
  total_user_track: number;
  image_deck: number;
  custom_deck: boolean;
  advanced_analytics: boolean;
  export_feature: boolean;
  note: boolean;
}
export interface UsageCount {
  total_user_track: number;
  image_deck: number;
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  LIFE_TIME = 'LIFE_TIME',
}

export type PriceMode = 'gbp' | 'usd';

export type ImageDeckResponseType = {
  adminImageDeck: ImageDeckType;
};
export type UserListResponseType = {
  adminUserList: UserListType;
};
export type SwipeImageDeckResponseType = {
  swipeImageDeck: ImageDeckType;
};
export type SelectedImageDeckResponseType = {
  selectedImageDeck: ImageDeckType;
};

export type UserListType = {
  message?: string;
  success: boolean;
  result?: AccountModel[];
  total?: number;
  hasNextPage?: boolean;
  cursor?: string;
};
export type ImageDeckType = {
  message?: string;
  success: boolean;
  result?: ImageDeck[];
  total?: number;
  hasNextPage?: boolean;
  cursor?: string;
};

export type ClientSessionResponse = {
  clientSessionList: {
    message?: string;
    success: boolean;
    result?: ClientSession[];
    total?: number;
    hasNextPage?: boolean;
    cursor?: string;
  };
};
export type ClientSessionDetailsResponse = {
  singleClientSession: {
    message?: string;
    success: boolean;
    result: ClientSession;
  };
};

export type ClientSession = {
  id: string;
  note?: string;
  image_group: ImageGroup[];
  created_at?: Date;
  updated_at?: Date;
};

export type ImageGroup = {
  id: string;
  group_id?: string;
  group_name?: string;
  group_images: SessionGroupImageDeck[];
  client_session_id?: string;
};

export type SessionGroupImageDeck = {
  id: string;
  image_name: string;
  image_deck_id: string;
  // image_group?: ImageGroup;
  image_group_id: string;
  image_deck: ImageDeck;
};

export type ImageDeck = {
  id: string;
  versionize?: string;
  media: Media;
  created_at?: Date;
  updated_at?: Date;
};

// export type GroupImageDeck = ImageDeck & {
//   image_name?: '';
// };

export type Media = {
  id: string;
  url: string;
  file_name?: string;
  size?: number;
  meme_type?: string;
  created_at?: Date;
};

export type CouponListType = {
  message?: string;
  success: boolean;
  result?: CouponObject[];
};

export interface CouponObject {
  id: string;
  object: string;
  amount_off: null | number;
  created: number;
  currency: null | string;
  duration: string;
  duration_in_months: number;
  livemode: boolean;
  max_redemptions: any;
  metadata: any;
  name: null | string;
  percent_off: number;
  redeem_by: null | string;
  times_redeemed: number;
  valid: boolean;
}

export type AdminListResponseType = {
  adminCouponList: CouponListType;
};
export type DahsboardInfoResponseType = {
  dashboard: DashboardResponse;
};

export type DashboardResponse = {
  message?: string;
  success: boolean;
  result: DashboardInfoType;
};

export type DashboardInfoType = {
  totalSessionCount: number;
};
