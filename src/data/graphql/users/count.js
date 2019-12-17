import { User } from 'data/models';

export const queries = [
  `
    userCount: Int!
`,
];

export const resolvers = {
  RootQuery: {
    async userCount() {
      return User.count();
    },
  },
};
