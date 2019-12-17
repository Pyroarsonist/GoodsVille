import { Room, RoomToUser } from 'data/models';

export const mutation = [
  `
  roomSubscription(roomId: ID!, involved: Boolean = true): String!
`,
];

export const resolvers = {
  Mutation: {
    async roomSubscription(root, { roomId, involved }, context) {
      const userId = context?.getUser()?.id;
      if (!userId) throw new Error('User not logged in');
      const room = await Room.findByPk(roomId);
      if (!room) throw new Error('Such room not exists');
      if (room.status !== 'open')
        throw new Error('You cannot subscribe to not open room');

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
