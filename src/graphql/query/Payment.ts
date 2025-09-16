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
      }
    }
  }
`;
