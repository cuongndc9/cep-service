import { RELATIONSHIP } from '../components/constants';

const typeDef = `
extend type Query {
  relationships: [Relationship]
}

extend type Mutation {
  addRelationship(phone1: String!, phone2: String!, relationship: RelationshipType!): Relationship
  removeRelationship(phone1: String!, phone2: String!): Int
}

type Relationship {
  id: String
  familyId: String
  userId1: String
  userId2: String
  user1: User
  user2: User
  relationship: RelationshipType
  roleType1: String
  roleType2: String
  createdAt: DateTime
  updatedAt: DateTime
}
enum RelationshipType {
  ${RELATIONSHIP.parentChild}
  ${RELATIONSHIP.spouse}
  ${RELATIONSHIP.sibling}
  ${RELATIONSHIP.friend}
}
`;

export default typeDef;
