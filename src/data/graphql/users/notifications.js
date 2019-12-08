import { User, NotificationToUser } from 'data/models';

export const schema = [
  `
  enum NotificationLevel {
    info
    warning
    error
    success
  }

  type Notification {
    id: ID!
    message: String
    level: NotificationLevel!
    createdAt: Date!
  }
`,
];

export const mutation = [
  `
  shutNotification(id: ID!): [Notification!]!
`,
];

export const queries = [
  `
  notifications: [Notification!]!
`,
];

export const resolvers = {
  RootQuery: {
    async notifications(root, args, context) {
      const userId = context.getUser()?.id;
      if (!userId) return [];
      const user = await User.findByPk(userId);
      return user.getNotifications({ through: { where: { checked: false } } });
    },
  },
  Mutation: {
    async shutNotification(root, { id }, context) {
      const userId = context.getUser()?.id;
      if (!userId) throw new Error('User not logged in');
      const user = await User.findByPk(userId);
      if (!user) throw new Error('No such user');

      await NotificationToUser.update(
        {
          checked: true,
        },
        {
          where: { userId, notificationId: id },
        },
      );
      return user.getNotifications({ through: { where: { checked: false } } });
    },
  },
};
