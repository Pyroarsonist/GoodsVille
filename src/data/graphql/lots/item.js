import { Lot, Room, Bet } from 'data/models';

export const schema = [
  `
  type Lot {
    id: ID!
    description: String
    shortDescription: String
    name: String
    startPrice: Float!
    currentPrice: Float!
    tag: String
    owner: User!
    purchaser: User
    room: Room!
    bets: [Bet!]!
  }
`,
];

export const queries = [
  `
  lot(id: ID!): Lot!
`,
];

export const resolvers = {
  RootQuery: {
    async lot(root, { id }) {
      return Lot.findByPk(id, {
        include: [
          {
            model: Room,
            as: 'room',
          },
          {
            model: Bet,
            as: 'bets',
            required: false,
          },
        ],
      });
    },
  },
};
