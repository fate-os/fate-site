import { AccountProvider, PurchasedSubscription } from '.';

export type AccountModel = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  account_provider?: AccountProvider | null;
  birthday?: Date | null;
  country_name?: string | null;
  phone_number?: string | null;
  zip_code?: string | null;
  profession_title?: string | null;
  primary_address?: string | null;
  about_description?: string | null;
  primary_city?: string | null;
  primary_state?: string | null;
  reset_password_expire_date?: Date | null;
  verify_pin?: number | null;
  verify_pin_expire_date?: Date | null;
  verify_status?: boolean | null;
  super_admin?: boolean | null;
  photo_url?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  last_login_at?: Date | null;
  purchased_subscription: PurchasedSubscription;
};
