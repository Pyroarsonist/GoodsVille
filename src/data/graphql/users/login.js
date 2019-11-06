export const mutation = [
  `
  login(email: String!, password: String!): User!
`,
];

export const resolvers = {
  Mutation: {
    async login(root, { email, password }, context) {
      const { user } = await context.authenticate('graphql-local', {
        email,
        password,
      });
      await context.login(user);
      return user;
    },
  },
};
