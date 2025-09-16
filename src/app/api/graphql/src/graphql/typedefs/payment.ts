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
}
type ApplyCouponResponse {
    success: Boolean!
    message: String
    coupon:CouponObject
}


type Query {
   
    createSession(years:Int,shine:Boolean,couponId:String):SessionDetails
    verifyPayment(sessionId:String):VerifyDetails
    checkUserPurchase(years:Int,shine:Boolean):CheckUserPurchaseDetails
}

type Mutation {
    applyCoupon(code:String!):ApplyCouponResponse
}

`;

export default typeDefs;
