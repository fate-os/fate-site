const typeDefs = `#graphql

type SubscriptionDetails {
    success: Boolean!
    message: String
    # clientSecret: String
    subscription:Subscription
}
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
    currency:String
}

type ApplyCouponResponse {
    success: Boolean!
    message: String
    coupon:CouponObject
}


type Query {
    subscriptionById(id:ID,currency:String):SubscriptionDetails
    createSession(subscriptionId:ID,currency:String,annually:Boolean,freeTrial:Boolean,couponId:String):SessionDetails
    verifyPayment(sessionId:String):VerifyDetails
}

type Mutation {
    applyCoupon(code:String!,subscriptionId:ID!):ApplyCouponResponse
}

`;

export default typeDefs;
