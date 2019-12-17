import { Lot } from 'data/models';

export const queries = [
  `
    lotCount: Int!
`,
];

export const resolvers = {
  RootQuery: {
    async lotCount() {
      return Lot.count();
    },
  },
};
