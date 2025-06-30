import { gql } from '@apollo/client';

export const GET_STRIPE_SESSION = gql`
  query CreateSession($years: Int) {
    createSession(years: $years) {
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
        currency
      }
    }
  }
`;
