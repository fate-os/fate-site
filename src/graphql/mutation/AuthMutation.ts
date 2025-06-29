import { gql } from '@apollo/client';

export const LOGIN_ACCOUNT = gql`
  mutation login($input: loginInput) {
    login(input: $input) {
      success
      message
      verify
      email
      token
      account {
        email
        first_name
        id
        last_name
        photo_url
        verify_status
        created_at
        super_admin
      }
    }
  }
`;

export const REGISTER_ACCOUNT = gql`
  mutation register($input: signUpInput) {
    register(input: $input) {
      message
      success
      token
      account {
        email
        first_name
        id
        last_name
        photo_url
        verify_status
        created_at
        super_admin
      }
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($pin: String, $email: String) {
    verify(pin: $pin, email: $email) {
      account {
        email
        first_name
        id
        last_name
        photo_url
        verify_status
        created_at
        super_admin
        account_provider
      }
      message
      success
      token
    }
  }
`;
export const SEND_VERIFICATION = gql`
  mutation SendVerification($email: String!) {
    sendVerification(email: $email) {
      message
      success
    }
  }
`;

export const UPDATE_RESET_PASSWORD = gql`
  mutation UpdateResetPassword($email: String!, $password: String!, $pin: String!) {
    updateResetPassword(email: $email, password: $password, pin: $pin) {
      message
      success
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgetPassword($email: String!) {
    forgotPassword(email: $email) {
      message
      success
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation Update($newPassword: String, $currentPassword: String) {
    updatePassword(newPassword: $newPassword, currentPassword: $currentPassword) {
      message
      success
    }
  }
`;
