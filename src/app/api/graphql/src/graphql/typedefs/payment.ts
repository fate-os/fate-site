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
    currency:String
}




type Query {
   
    createSession(years:Int):SessionDetails
    verifyPayment(sessionId:String):VerifyDetails
}



`;

export default typeDefs;
