const typeDefs = `#graphql

enum Direction {
  up
  down
  left
  right
}

type QuoteParameter {
  id: ID!
  straight_left: Direction
  straight_right: Direction
  top_number: Int
  right_side_number: Int
  bottom_right_number: Int
  bottom_left_number: Int
  left_side_number: Int
  right_side_arrow: Direction
  left_side_arrow: Direction
  bottom_arrow: Direction
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
  getFateQuote(date: Date, gender: String): FateQuoteDetails
}

type Mutation {
  createFateQuote(
    year_count: Int!
    date: String!
    gender: String
    quote_parameter_id: String!
  ): FateQuoteDetails
  
  createQuoteParameter(
    straight_left: Direction
    straight_right: Direction
    top_number: Int
    right_side_number: Int
    bottom_right_number: Int
    bottom_left_number: Int
    left_side_number: Int
    right_side_arrow: Direction
    left_side_arrow: Direction
    bottom_arrow: Direction
  ): QuoteParameter
}

`;

export default typeDefs;
