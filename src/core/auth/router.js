import { Router } from 'express';
import debugHandler from 'debug';
import config from 'config';
import registerMiddleware from './middleware';

const debug = debugHandler('goodsville:auth');

export default () => {
  const router = Router();

  router.use(registerMiddleware);

  router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie(config.auth.tokenName);
    if (req.session) req.session.destroy();
    res.redirect('/');
  });

  router.use((err, req, res, next) => {
    debug('Error occured when using auth route\n%O', err);
    if (err) return res.redirectBack();
    return next();
  });

  return router;
};
