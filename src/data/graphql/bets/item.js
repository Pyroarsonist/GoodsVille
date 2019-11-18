// eslint-disable-next-line import/prefer-default-export
export const schema = [
  `
  enum BetStatus {
    highest
    overbid
    failed
    successful
  }
  
  type Bet {
    id: ID!
    price: Float!
    status: String
    owner: User!
    lot: Lot!
  }
`,
];
