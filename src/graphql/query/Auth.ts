import { gql } from '@apollo/client';

export const GET_ACCOUNT = gql`
  query Query {
    account {
      message
      success
      account {
        id
        first_name
        last_name
        email
        photo_url
        phone_number
        verify_status
        account_provider
        created_at
        super_admin
      }
    }
  }
`;

export const LOGOUT_ACCOUNT = gql`
  query Query {
    logout {
      message
      success
    }
  }
`;
