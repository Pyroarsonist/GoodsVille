export const mutation = [
  `
  logout: String!
`,
];

export const resolvers = {
  Mutation: {
    async logout(root, args, context) {
      await context?.logout();
      return 'ok';
    },
  },
};
