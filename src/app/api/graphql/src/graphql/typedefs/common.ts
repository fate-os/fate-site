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

  type CouponObject {
    id: String
    object: String
    amount_off: Float
    created: Int
    currency: String
    duration: String
    duration_in_months: Int
    livemode: Boolean
    max_redemptions: String
    name: String
    percent_off: Float
    redeem_by: String
    times_redeemed: Int
    valid: Boolean
  }



`;

export default typeDefs;
