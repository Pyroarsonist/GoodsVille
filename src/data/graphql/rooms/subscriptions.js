import { withFilter } from 'graphql-subscriptions';
import pubsub from 'core/subscriptions/graphqlPubSub';
import { Room } from 'data/models';

export const subscription = [
  `
  room(id: ID!): Room!
`,
];

export const resolvers = {
  Subscription: {
    room: {
      resolve: (root, { id }) => Room.getAllData(id),
      subscribe: withFilter(
        () => pubsub.asyncIterator('room'),
        (pubsubID, { id }) => +pubsubID === +id,
      ),
    },
  },
};
