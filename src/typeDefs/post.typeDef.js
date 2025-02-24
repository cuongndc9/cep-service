const typeDef = `
extend type Query {
  posts(categoryId: String, offset: Int, limit: Int): PostsOutput
}
extend type Mutation {
  createPost(title: String!, categoryId: String!, shortDescription: String, longDescription: String, thumbnail: String): Post
}

type Post {
  id: String
  categoryId: String
  title: String
  shortDescription: String
  longDescription: String
  thumbnail: String
  keyword: String
  createdBy: String
  updatedBy: String
  createdAt: DateTime
  updatedAt: DateTime
}
type PostsOutput {
  count: Int
  rows: [Post]
}
`;

export default typeDef;
