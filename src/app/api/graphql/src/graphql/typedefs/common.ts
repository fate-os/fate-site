const typeDefs = `#graphql
  scalar Date

  type DefaultResponse {
    success: Boolean!
    message: String
  }





  type Media {
    id: ID!
    url: String
    file_name: String
    size: Float
    meme_type: String
    created_at: Date
  }




`;

export default typeDefs;
