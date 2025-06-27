const typeDefs = `#graphql

    type GetCurrentUser {
        message: String
        success: Boolean!
        account: Account
    }

    input UpdateInput {
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
    }

    type UpdateProfileResponse {
        message: String
        success: Boolean!
        logout:Boolean
    }

    type Query {
        currentUser:GetCurrentUser
    }



    type Mutation {
        updatePassword(
        newPassword: String
        currentPassword: String
        ): DefaultResponse
        updateProfile(input: UpdateInput): UpdateProfileResponse
    }
`;

export default typeDefs;
