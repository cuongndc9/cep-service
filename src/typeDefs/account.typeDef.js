const typeDef = `
  type Query {
    login(phone: String!, password: String!): LoginOutput
  }

  type Mutation {
    register(phone: String!, password: String!, firstName: String, lastName: String, imageId: String, gender: String, dob: DateTime, email: String, contactAddress: JSON, permanentAddress: JSON, nationalId: String): RegisterOutput
  }

  type LoginOutput {
    id: String
    token: String
    phone: String
    firstName: String
    lastName: String
    imageId: String
    gender: String
    dob: DateTime
    email: String
    contactAddress: JSON
    permanentAddress: JSON
    nationalId: String
  }

  type RegisterOutput {
    id: String
    phone: String
    firstName: String
    lastName: String
    imageId: String
    gender: String
    dob: DateTime
    email: String
    contactAddress: JSON
    permanentAddress: JSON
    nationalId: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
