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

export const MARK_CREDIT_USED = gql`
  mutation MarkCreditUsed($history_id: String!, $used_date: Date!) {
    markCreditUsed(history_id: $history_id, used_date: $used_date) {
      success
      message
    }
  }
`;
