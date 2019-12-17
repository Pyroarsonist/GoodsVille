import { User } from 'data/models';

export const queries = [
  `
  me: User
`,
];

export const resolvers = {
  RootQuery: {
    async me(root, args, context) {
      const userId = context?.getUser?.()?.id;
      if (!userId) throw new Error('User not logged in');
      const user = await User.findByPk(userId);
      if (!user) throw new Error('Such user not exists');
      return user;
    },
  },
};
