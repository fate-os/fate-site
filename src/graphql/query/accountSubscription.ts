import { gql } from '@apollo/client';

export const GET_CURRENT_SUBSCRIPTION = gql`
  query CurrentSubscription {
    currentSubscription {
      success
      message
      purchased_subscription {
        id
        created_at
        subscription {
          id
          subscription_name
          usd_amount
          gbp_amount
          subscription_plan
          usage_limit {
            id
            total_user_track
            image_deck
            custom_deck
            advanced_analytics
            export_feature
            note
          }
          created_at
        }
      }

      usage_count {
        total_user_track
        image_deck
      }
      free_subscription {
        id
        subscription_name
        usd_amount
        gbp_amount
        subscription_plan
        usage_limit {
          id
          total_user_track
          image_deck
          custom_deck
          advanced_analytics
          export_feature
          note
        }
        created_at
      }
    }
  }
`;

export const SUBSCRIPTION_HISTORY = gql`
  query SubscriptionHistory {
    subscriptionHistory {
      success
      message
      result {
        id
        amount
        billing_month
        created_at
        invoice_number
        summery
        invoice_url
        currency
        status
      }
    }
  }
`;
