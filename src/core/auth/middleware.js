import config from 'config';
import jwt from 'jsonwebtoken';

/**
 * Redirect user back to redirectUrl(if found in cookies). Middleware
 * @param req Request
 * @param res Response
 */
const redirectBackMiddleware = (req, res) => {
  res.redirectBack = function redirectBack(fallbackUrl) {
    // redirect to root if _lu_ is from login page
    const redirectUrl =
      req.cookies?.__lu_ === '/login' ? '/' : req.cookies?.__lu_ || '/';
    return res.redirect(redirectUrl || fallbackUrl || '/');
  };
};

const encodeUserRegister = (req, res) => {
  res.encodeUser = function encodeUser() {
    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const token = jwt.sign({ id: req.user.id }, config.auth.jwt.secret, {
      expiresIn,
    });
    return res
      .cookie(config.auth.tokenName, token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true,
      })
      .redirectBack();
  };
};

export const encodeUserMiddleware = (req, res) => res.encodeUser();

export default function(req, res, next) {
  redirectBackMiddleware(req, res);
  encodeUserRegister(req, res);
  next();
}
