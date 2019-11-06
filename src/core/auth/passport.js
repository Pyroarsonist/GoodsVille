import passport from 'passport';
import { User } from 'data/models';
import routerInit from './router';
import strategyInit from './strategy';

passport.serializeUser((user, done) => done(null, { id: user.id }));

passport.deserializeUser(async (data, done) => {
  try {
    if (!data?.id) return done(new Error('User deserialization failed'), null);
    const user = await User.findByPk(data.id);
    return done(null, user);
  } catch (e) {
    console.error('User deserialization failed', e);
    return done(e, null);
  }
});

strategyInit(passport);

const router = routerInit(passport);

export { router };
export default passport;
