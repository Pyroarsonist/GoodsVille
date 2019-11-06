import GraphQLDate from 'graphql-date';

export const schema = [
  `
  # GraphQL Date
  scalar Date
  
  input PagingInput {
    limit: Int
    offset: String
  }
`,
];

export const resolvers = {
  Date: GraphQLDate,
};
