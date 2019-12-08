import GraphQLDate from 'graphql-date';

export const schema = [
  `
  # GraphQL Date
  scalar Date

  # Paging input
  input PagingInput {
    limit: Int
    offset: Int
  }

  type PagingData<T> {
    items: [T]
    count: Int!
    limit: Int!
    offset: Int!
  }
`,
];

export const resolvers = {
  Date: GraphQLDate,
};
