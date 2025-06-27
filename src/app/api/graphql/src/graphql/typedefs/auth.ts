const typeDefs = `#graphql

  type AuthType {
    message: String
    success: Boolean!
    account: Account
    token:String
  }

  type AuthProcessType {
    success: Boolean!
    message: String
    token: String
    account: Account
  }
  type AuthLoginType {
    success: Boolean!
    message: String
    verify: Boolean
    email: String
    token: String
    account: Account
  }

  type Account {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    country_name: String
    primary_state: String
    primary_city: String
    profession_title: String
    about_description: String
    primary_address: String
    phone_number: String
    zip_code: String
    photo_url: String
    created_at: Date
    last_login_at: Date
    verify_status: Boolean
    super_admin: Boolean
    account_provider: String
 
  }

  input signUpInput {
    first_name: String
    last_name: String
    email: String
    password: String
    provider: String!
    credential: String
  }
  input loginInput {
    email: String!
    password: String!
  }

  type Query {
    account: AuthType

  }
  type Mutation {
    register(input: signUpInput): AuthProcessType
    login(input: loginInput): AuthLoginType
    # verify(pin: String, email: String): AuthType
    # sendVerification(email: String!): DefaultResponse
    forgotPassword(email: String!): DefaultResponse
    updateResetPassword(password: String!, email: String!,pin:String!): DefaultResponse
  }
`;

export default typeDefs;
