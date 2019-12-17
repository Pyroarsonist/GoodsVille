import { Lot, Room, RoomToUser } from 'data/models';
import { pageInputResolver } from 'data/util';

export const queries = [
  `
  rooms(input: PagingInput): PagingData<Room>
`,
];

export const resolvers = {
  RootQuery: {
    async rooms(root, { input }, context) {
      const { limit, offset } = pageInputResolver(input);
      const userId = context?.getUser()?.id;

      const include = [
        {
          model: Lot,
          as: 'lot',
        },
      ];

      if (userId)
        include.push({
          model: RoomToUser,
          as: 'rtu',
          where: {
            userId,
          },
          required: false,
        });

      const { rows: rooms, count } = await Room.findAndCountAll({
        limit,
        offset,
        include,
        order: [['startedAt', 'DESC']],
      });
      return {
        items: rooms,
        count,
        limit,
        offset,
      };
    },
  },
};
