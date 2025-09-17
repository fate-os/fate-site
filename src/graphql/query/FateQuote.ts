import { gql } from '@apollo/client';

export const GET_FATE_QUOTE = gql`
  query GetFateQuote($date: Date!, $gender: String, $shine: Boolean, $history_id: String) {
    getFateQuote(date: $date, gender: $gender, shine: $shine, history_id: $history_id) {
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
          perpendicular
          has_circle
        }
      }
    }
  }
`;
