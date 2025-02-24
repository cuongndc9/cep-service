const typeDef = `
extend type Query {
  categories(offset: Int, limit: Int): CategoriesOutput
}
extend type Mutation {
  createCategory(title: String!, description: String): Category
}

type Category {
  id: String
  code: String
  title: String
  description: String
  parentId: String
  count: Int
  orderBy: String
  keyword: String
  createdBy: String
  updatedBy: String
  createdAt: DateTime
  updatedAt: DateTime
}
type CategoriesOutput {
  count: Int
  rows: [Category]
}
`;

export default typeDef;
