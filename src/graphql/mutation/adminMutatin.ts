import { gql } from '@apollo/client';

export const DELETE_DECK = gql`
  mutation DeleteAdminImageDeck($id: ID!) {
    deleteAdminImageDeck(id: $id) {
      message
      success
    }
  }
`;

export const CREATE_COUPON = gql`
  mutation CreateCoupon(
    $name: String!
    $percentOff: Float!
    $limit: Int
    $subscriptionFor: [SubscriptionForType]
  ) {
    createCoupon(
      name: $name
      percentOff: $percentOff
      limit: $limit
      subscriptionFor: $subscriptionFor
    ) {
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
export const DLETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
      success
    }
  }
`;
