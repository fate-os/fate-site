import { gql } from '@apollo/client';

export const GET_SUBSCRIPTION_PLANS = gql`
  query SubscriptionPlans {
    subscriptions {
      message
      success
      subscriptions {
        id
        usd_amount
        gbp_amount
        subscription_plan
        subscription_name
        # usage_limit {
        #   id
        #   total_user_track
        #   image_deck
        #   custom_deck
        #   advanced_analytics
        #   export_feature
        #   note
        # }
        # created_at
      }
    }
  }
`;
