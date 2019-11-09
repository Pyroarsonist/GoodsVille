import createBetInstance from 'core/auction/bets/createBet';

export const schema = [
  `
  input BetCreation {
    price: Float!
    lotId: ID!
  }
`,
];

export const mutation = [
  `
    bet(input: BetCreation!): String!
`,
];

export const resolvers = {
  Mutation: {
    async bet(
      root,
      {
        input: { price, lotId },
      },
      context,
    ) {
      const userId = context.getUser()?.id;

      if (!userId) throw new Error('User not logged in');

      await createBetInstance({ price, lotId, userId });

      return 'ok';
    },
  },
};
