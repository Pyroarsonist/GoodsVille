import { withFilter } from 'graphql-subscriptions';
import pubsub from 'core/subscriptions/graphqlPubSub';

export const subscription = [
  `
  lot(id: ID!): Lot!
`,
];

export const resolvers = {
  Subscription: {
    lot: {
      resolve: item => item,
      subscribe: withFilter(
        () => pubsub.asyncIterator('lot'),
        (payload, { id }) => +payload?.id === +id,
      ),
    },
  },
};
