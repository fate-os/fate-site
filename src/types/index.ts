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
  history_id: string;
}

export interface CheckUserPurchaseResult {
  has_purchased: boolean;
  history_id: string | null;
  paid_amount: number;
  year_count: number;
  is_credit_used: boolean | null;
  used_date: string | null;
}

export interface CheckUserPurchaseResponse {
  checkUserPurchase: {
    success: boolean;
    message: string;
    result: CheckUserPurchaseResult;
  };
}

export interface PaymentHistory {
  id: string;
  stripe_payment_id?: string;
  stripe_session_id?: string;
  metadata?: string;
  paid_amount: number;
  year_count: number;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  fate_quote_id?: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  fate_quote?: {
    id: string;
    year_count: number;
    date: Date;
    gender?: string;
  };
}

export interface PaymentHistoryResponse {
  paymentHistory: {
    success: boolean;
    message: string;
    result: PaymentHistory[];
  };
}

export interface HasPurchaseHistory {
  has_purchase_history: boolean;
  total_purchases: number;
  total_amount: number;
}

export interface HasPurchaseHistoryResponse {
  hasPurchaseHistory: {
    success: boolean;
    message: string;
    result: HasPurchaseHistory;
  };
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
  gender: string;
};

export interface FateQuoteResponse {
  getFateQuote: {
    success: boolean;
    message: string;
    result: FateQuoteResult | null;
  };
}

export interface FateQuoteResult {
  id: string;
  year_count: number;
  date: string;
  gender: string;
  quote_parameters: QuoteParameter;
}

export type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'both_left_and_right'
  | 'both_up_and_down';

export interface QuoteParameter {
  id: string;
  shine?: Direction;
  straight_left?: Direction;
  straight_right?: Direction;
  straight_bottom?: Direction;
  top_number?: number;
  right_side_number?: number;
  bottom_right_number?: number;
  bottom_left_number?: number;
  left_side_number?: number;
  right_side_arrow?: Direction;
  left_side_arrow?: Direction;
  bottom_arrow?: Direction;
  perpendicular?: Direction;
  has_circle?: boolean;
  created_at?: string;
  updated_at?: string;
}

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
