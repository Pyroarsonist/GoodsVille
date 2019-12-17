import { User } from 'data/models';
import debugHandler from 'debug';
import { GraphQLLocalStrategy } from 'graphql-passport';

const debug = debugHandler('goodsville:auth:strategy');

export default passport => {
  passport.use(
    new GraphQLLocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return done(new Error('Bad login'), null);
          }

          if (user.verifyPassport(password)) {
            return done(null, user);
          }

          return done(new Error('Bad credentials'), null);
        } catch (e) {
          debug('Failed pass local auth strategy\n%O', e);
          return done(e);
        }
      },
    ),
  );

  return passport;
};
