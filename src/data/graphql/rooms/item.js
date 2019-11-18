import { Room } from 'data/models';

export const schema = [
  `
  enum RoomStatus {
    open 
    pending
    closed
  }
  
  type Room {
    id: ID!
    status: RoomStatus!
    lot: Lot!
    startedAt: Date!
    endedAt: Date
    supposedEndsAt: Date!
  }
`,
];

export const queries = [
  `
  room(id: ID!): Room!
`,
];

export const resolvers = {
  RootQuery: {
    async room(root, { id }) {
      return Room.getAllData(id);
    },
  },
};
