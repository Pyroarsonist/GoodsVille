import { Bet } from 'data/models';

export const queries = [
  `
    betCount: Int!
`,
];

export const resolvers = {
  RootQuery: {
    async betCount() {
      return Bet.count();
    },
  },
};
