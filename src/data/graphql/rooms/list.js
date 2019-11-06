import { Lot, Room } from 'data/models';
import { pageInputResolver } from 'data/util';

export const queries = [
  `
  rooms(input: PagingInput): [Room!]!
`,
];

export const resolvers = {
  RootQuery: {
    async rooms(root, { input }) {
      const { limit, offset } = pageInputResolver(input);
      return Room.findAll({
        limit,
        offset,
        include: {
          model: Lot,
          as: 'lot',
        },
        order: [['startedAt', 'DESC']],
      });
    },
  },
};
