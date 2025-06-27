import { gql } from '@apollo/client';

export const DASHBOARD_INFO = gql`
  query Dashboard {
    dashboard {
      message
      result {
        totalSessionCount
      }
      success
    }
  }
`;
