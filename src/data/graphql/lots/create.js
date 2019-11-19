import createLotInstance from 'core/auction/lots/createLot';

export const schema = [
  `
  input LotCreation {
    description: String
    shortDescription: String
    name: String
    price: Float!
    tag: String
    startedAt: Date!
  }
`,
];

export const mutation = [
  `
    createLot(input: LotCreation!): String!
`,
];

export const resolvers = {
  Mutation: {
    async createLot(
      root,
      {
        input: { description, shortDescription, name, price, tag, startedAt },
      },
      context,
    ) {
      const userId = context?.getUser()?.id;

      if (!userId) throw new Error('User not logged in');

      await createLotInstance({
        description,
        shortDescription,
        name,
        price,
        tag,
        ownerId: userId,
        startedAt,
      });

      return 'ok';
    },
  },
};
