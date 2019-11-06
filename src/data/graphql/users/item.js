import { User } from 'data/models';

export const schema = [
  `
  type User {
    id: ID!
    email: String!
  }
`,
];

export const queries = [
  `
  user(email: String!): User
`,
];

export const resolvers = {
  RootQuery: {
    async user(root, { email }) {
      return User.findOne({ where: { email } });
    },
  },
};
