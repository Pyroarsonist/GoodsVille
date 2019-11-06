import { Lot, Room } from 'data/models';

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
        include: {
          model: Room,
          as: 'room',
        },
      });
    },
  },
};
