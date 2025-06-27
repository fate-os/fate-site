import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      message
      success
      account {
        id
        first_name
        last_name
        email
        country_name
        primary_state
        primary_city
        about_description
        primary_address
        phone_number
        zip_code
        photo_url
        created_at
      }
    }
  }
`;
