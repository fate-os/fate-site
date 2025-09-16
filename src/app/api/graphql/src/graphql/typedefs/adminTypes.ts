const typeDefs = `#graphql




  type UserListType {
    message: String
    success: Boolean!
    result:[Account]
    total:Int
    hasNextPage: Boolean
    cursor: String
  }
  type CouponListType {
    message: String
    success: Boolean!
    result:[CouponObject]
    total:Int
  }




  type Query {

    adminCouponList:CouponListType
  }


  
  type Mutation {
 
    deleteCoupon(id:ID!):DefaultResponse
   
    createCoupon(name:String!,percentOff:Float!,limit:Int):DefaultResponse

  }
`;

export default typeDefs;
