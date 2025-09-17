const typeDefs = `#graphql


type SessionDetails {
    success: Boolean!
    message: String
    result:String
}

type VerifyDetails {
    success: Boolean!
    message: String
    result:VerifySession
}
type VerifySession {
    status: String
    amount:Float
    history_id:String
}

type CheckUserPurchaseDetails {
    success: Boolean!
    message: String
    result: CheckUserPurchase
}

type CheckUserPurchase {
    has_purchased: Boolean!
    history_id: String
    paid_amount: Float
    year_count: Int
    is_credit_used: Boolean
    used_date: Date
}

type HasPurchaseHistoryDetails {
    success: Boolean!
    message: String
    result: HasPurchaseHistory
}

type HasPurchaseHistory {
    has_purchase_history: Boolean!
    total_purchases: Int
    total_amount: Float
}
type ApplyCouponResponse {
    success: Boolean!
    message: String
    coupon:CouponObject
}

type PaymentHistoryDetails {
    success: Boolean!
    message: String
    result: [PaymentHistory]
}

type PaymentHistory {
    id: ID!
    stripe_payment_id: String
    stripe_session_id: String
    metadata: String
    paid_amount: Float!
    year_count: Int!
    user_id: String!
    created_at: Date
    updated_at: Date
    fate_quote_id: String
    user: User
    fate_quote: FateQuote
}

type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
}

type FateQuote {
    id: ID!
    year_count: Int!
    date: String!
    gender: String
}


type Query {
   
    createSession(years:Int,shine:Boolean,couponId:String):SessionDetails
    verifyPayment(sessionId:String):VerifyDetails
    checkUserPurchase(years:Int,shine:Boolean):CheckUserPurchaseDetails
    paymentHistory:PaymentHistoryDetails
    hasPurchaseHistory:HasPurchaseHistoryDetails
}

type MarkCreditUsedDetails {
    success: Boolean!
    message: String
}

type Mutation {
    applyCoupon(code:String!):ApplyCouponResponse
    markCreditUsed(history_id: String!, used_date: Date!): MarkCreditUsedDetails
}

`;

export default typeDefs;
