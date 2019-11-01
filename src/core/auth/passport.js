import passport from 'passport';
import debugHandler from 'debug';
import { User } from 'data/models';
import routerInit from './router';
import strategyInit from './strategy';

const debug = debugHandler('goodsville:auth:deserialisation');

passport.serializeUser((user, done) => {
  done(null, { id: user.id });
});

strategyInit(passport);

const router = routerInit();

export async function deserializeUser(req, res, next) {
  const data = req.user;
  if (!data?.id) return next();
  try {
    const user = await User.findByPk(data.id);
    if (!user) {
      debug('No user found by id %o', data.id);
      return next();
    }
    req.user = user;
    return next();
  } catch (e) {
    console.error('Failed to deserialize user\n', e);
    return next(new Error('Failed to deserialize user'));
  }
}

export { router };
export default passport;
