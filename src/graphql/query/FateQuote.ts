import { gql } from '@apollo/client';

export const GET_FATE_QUOTE = gql`
  query GetFateQuote($date: Date!, $gender: String) {
    getFateQuote(date: $date, gender: $gender) {
      success
      message
      result {
        id
        year_count
        date
        gender
        quote_parameters {
          id
          shine
          straight_left
          straight_right
          straight_bottom
          top_number
          right_side_number
          bottom_right_number
          bottom_left_number
          left_side_number
          right_side_arrow
          left_side_arrow
          bottom_arrow
        }
      }
    }
  }
`;
