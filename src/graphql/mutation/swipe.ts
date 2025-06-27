import { gql } from '@apollo/client';

export const ADD_CLIENT_SESSION = gql`
  mutation AddClientSession($input: ClientSessionInput) {
    addClientSession(input: $input) {
      message
      success
    }
  }
`;

export const EDIT_CLIENT_SESSION = gql`
  mutation EditClientSession($editClientSessionId: ID!, $input: ClientSessionInput) {
    editClientSession(id: $editClientSessionId, input: $input) {
      message
      success
    }
  }
`;

export const DELETE_CLIENT_SESSION = gql`
  mutation DeleteClientSession($deleteClientSessionId: ID!) {
    deleteClientSession(id: $deleteClientSessionId) {
      message
      success
    }
  }
`;
