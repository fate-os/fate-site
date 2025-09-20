const typeDefs = `#graphql

enum Direction {
  up
  down
  left
  right
  both_left_and_right
  both_up_and_down
}

type QuoteParameter {
  id: ID!
  shine: Direction
  straight_left: Direction
  straight_right: Direction
  straight_bottom: Direction
  top_number: Int
  right_side_number: Int
  bottom_right_number: Int
  bottom_left_number: Int
  left_side_number: Int
  right_side_arrow: Direction
  left_side_arrow: Direction
  bottom_arrow: Direction
  perpendicular: Direction
  has_circle: Boolean
  created_at: String
  updated_at: String
}

type FateQuote {
  id: ID!
  year_count: Int!
  date: String!
  gender: String
  quote_parameters: QuoteParameter!
  created_at: String
  updated_at: String
}

type FateQuoteDetails {
  success: Boolean!
  message: String
  result: FateQuote
}

type Query {
  getFateQuote(date: Date, gender: String, shine: Boolean, history_id: String, year_count: Int): FateQuoteDetails
}

type Mutation {
  createFateQuote(
    year_count: Int!
    date: String!
    gender: String
    quote_parameter_id: String!
  ): FateQuoteDetails
  
  createQuoteParameter(
    shine: Direction
    straight_left: Direction
    straight_right: Direction
    straight_bottom: Direction
    top_number: Int
    right_side_number: Int
    bottom_right_number: Int
    bottom_left_number: Int
    left_side_number: Int
    right_side_arrow: Direction
    left_side_arrow: Direction
    bottom_arrow: Direction
    perpendicular: Direction
    has_circle: Boolean
  ): QuoteParameter
}

`;

export default typeDefs;
