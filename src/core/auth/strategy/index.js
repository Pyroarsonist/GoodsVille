import LocalStrategy from 'passport-local';
import { User } from 'data/models';
import debugHandler from 'debug';

const debug = debugHandler('goodsville:auth:strategy');

export default passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return done(null, false);
          }

          if (user.verifyPassport(password)) {
            return done(null, user);
          }

          return done(null, false);
        } catch (e) {
          debug('Failed pass local auth strategy\n%O', e);
          return done(e);
        }
      },
    ),
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (user) return done(null, false);
          const createdUser = await User.createInstance(email, password);
          return done(null, createdUser);
        } catch (e) {
          debug('Failed create user\n%O', e);
          return done(e);
        }
      },
    ),
  );

  return passport;
};
