import { gql } from '@apollo/client';

export const GET_STRIPE_SESSION = gql`
  query CreateSession($years: Int, $shine: Boolean, $couponId: String) {
    createSession(years: $years, shine: $shine, couponId: $couponId) {
      success
      result
      message
    }
  }
`;
export const VERIFY_PAYMENT = gql`
  query VerifyPayment($sessionId: String) {
    verifyPayment(sessionId: $sessionId) {
      success
      message
      result {
        status
        amount
        history_id
      }
    }
  }
`;

export const CHECK_USER_PURCHASE = gql`
  query CheckUserPurchase($years: Int, $shine: Boolean) {
    checkUserPurchase(years: $years, shine: $shine) {
      success
      message
      result {
        has_purchased
        history_id
        paid_amount
        year_count
        is_credit_used
        used_date
      }
    }
  }
`;

export const GET_PAYMENT_HISTORY = gql`
  query GetPaymentHistory {
    paymentHistory {
      success
      message
      result {
        id
        stripe_payment_id
        stripe_session_id
        metadata
        paid_amount
        year_count
        user_id
        created_at
        updated_at
        fate_quote_id
        user {
          id
          first_name
          last_name
          email
        }
        fate_quote {
          id
          year_count
          date
          gender
        }
      }
    }
  }
`;

export const HAS_PURCHASE_HISTORY = gql`
  query HasPurchaseHistory {
    hasPurchaseHistory {
      success
      message
      result {
        has_purchase_history
        total_purchases
        total_amount
      }
    }
  }
`;
