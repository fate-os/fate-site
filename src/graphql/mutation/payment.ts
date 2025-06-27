import { gql } from '@apollo/client';

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!, $subscriptionId: ID!) {
    applyCoupon(code: $code, subscriptionId: $subscriptionId) {
      success
      message
      coupon {
        id
        percent_off
        valid
        name
      }
    }
  }
`;
