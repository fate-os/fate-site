import { gql } from '@apollo/client';

export const CANCEL_CURRENT_SUBSCRIPTION = gql`
  mutation CancelCurrentSubscription($currentSubscriptionId: String!) {
    cancelSubscription(currentSubscriptionId: $currentSubscriptionId) {
      message
      success
    }
  }
`;
