import { gql } from '@apollo/client';

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(code: $code) {
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
