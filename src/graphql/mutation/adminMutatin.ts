import { gql } from '@apollo/client';

export const CREATE_COUPON = gql`
  mutation CreateCoupon($name: String!, $percentOff: Float!, $limit: Int) {
    createCoupon(name: $name, percentOff: $percentOff, limit: $limit) {
      message
      success
    }
  }
`;

export const DLETE_COUPON = gql`
  mutation DeleteCoupon($deleteCouponId: ID!) {
    deleteCoupon(id: $deleteCouponId) {
      message
      success
    }
  }
`;
