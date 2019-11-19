import { RoomToUser } from 'data/models';

export const mutation = [
  `
  roomSubsciption(roomId: ID!, involved: Boolean = true): String!
`,
];

export const resolvers = {
  Mutation: {
    async roomSubsciption(root, { roomId, involved }, context) {
      const userId = context?.getUser()?.id;
      if (!userId) throw new Error('User not logged in');
      const [rtu] = await RoomToUser.findOrCreate({
        where: { roomId, userId },
        defaults: { roomId, userId, involved },
      });

      rtu.involved = involved;
      await rtu.save();
      return 'ok';
    },
  },
};
