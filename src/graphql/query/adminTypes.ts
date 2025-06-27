import { gql } from '@apollo/client';

export const ADMIN_IMAGE_DECK = gql`
  query AdminImageDeck($size: String, $cursor: String, $sortBy: String) {
    adminImageDeck(size: $size, cursor: $cursor, sortBy: $sortBy) {
      message
      success
      result {
        id
        media_id
        versionize
        media {
          id
          url
          file_name
          size
          meme_type
          created_at
        }
        created_at
        updated_at
      }
      total
      hasNextPage
      cursor
    }
  }
`;
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

export const ADMIN_USER_LIST = gql`
  query AdminUserList(
    $cursor: String
    $sortBy: String
    $size: String
    $firstName: String
    $lastName: String
  ) {
    adminUserList(
      cursor: $cursor
      sortBy: $sortBy
      size: $size
      firstName: $firstName
      lastName: $lastName
    ) {
      message
      success
      result {
        id
        first_name
        email
        last_name
        phone_number
        created_at
        last_login_at
        photo_url
        purchased_subscription {
          subscription {
            subscription_name
          }
        }
      }
      total
      hasNextPage
      cursor
    }
  }
`;
