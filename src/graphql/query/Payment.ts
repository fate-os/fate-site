import { gql } from '@apollo/client';

export const GET_SINGLE_SUBSCRIPTION = gql`
  query singleSubscription($id: ID, $currency: String) {
    subscriptionById(id: $id, currency: $currency) {
      message
      success
      subscription {
        id
        usd_amount
        gbp_amount
        subscription_plan
        subscription_name
      }
    }
  }
`;

export const GET_STRIPE_SESSION = gql`
  query CreateSession(
    $subscriptionId: ID
    $currency: String
    $couponId: String
    $annually: Boolean
    $freeTrial: Boolean
  ) {
    createSession(
      subscriptionId: $subscriptionId
      currency: $currency
      annually: $annually
      freeTrial: $freeTrial
      couponId: $couponId
    ) {
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
