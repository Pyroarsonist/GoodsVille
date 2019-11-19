export const queries = [
  `
  me: User
`,
];

export const resolvers = {
  RootQuery: {
    async me(root, args, context) {
      return context?.getUser();
    },
  },
};
