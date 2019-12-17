import { User } from 'data/models';
import _ from 'lodash';

export const mutation = [
  `
    user(nickName: String, fullName: String, balance: Float): String!
`,
];

export const resolvers = {
  Mutation: {
    async user(root, args, context) {
      const userId = context?.getUser?.()?.id;
      if (!userId) throw new Error('User not logged in');
      const user = await User.findByPk(userId);
      if (!user) throw new Error('Such user not exists');

      _.forEach(args, (val, key) => {
        user[key] = val;
      });
      await user.save();
      return 'ok';
    },
  },
};
