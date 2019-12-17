import config from 'config';

export const mutation = [
  `
  logout: String!
`,
];

export const resolvers = {
  Mutation: {
    async logout(root, args, context) {
      await context?.logout();
      context.req.logout();
      context.res.clearCookie(config.auth.tokenName);
      if (context.req.session) context.req.session.destroy();
      return 'ok';
    },
  },
};
