import { User } from 'data/models';

export const mutation = [
  `
    signup(email: String!, password: String!): User!
`,
];

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const resolvers = {
  Mutation: {
    async signup(root, { email: _email, password }, context) {
      const email = _email.toLowerCase();
      if (!validateEmail(email)) throw new Error('Invalid email');
      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('User exists');
      const createdUser = await User.createInstance(email, password);

      await context.login(createdUser);
      return createdUser;
    },
  },
};
