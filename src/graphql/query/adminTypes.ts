import { gql } from '@apollo/client';

export const ADMIN_COUPON_LIST = gql`
  query AdminCouponList {
    adminCouponList {
      message
      success
      result {
        id
        name
        percent_off
        created
      }
      total
    }
  }
`;
