export const mutation = [
  `
  login(email: String!, password: String!): String!
`,
];

export const resolvers = {
  Mutation: {
    async login(root, { email, password }, context) {
      const { user } = await context?.authenticate('graphql-local', {
        email,
        password,
      });
      await context?.login(user);
      return 'ok';
    },
  },
};
