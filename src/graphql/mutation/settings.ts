import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE = gql`
  mutation Update($input: UpdateInput) {
    updateProfile(input: $input) {
      message
      success
      logout
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation Mutation($newPassword: String, $currentPassword: String) {
    updatePassword(newPassword: $newPassword, currentPassword: $currentPassword) {
      message
      success
    }
  }
`;
