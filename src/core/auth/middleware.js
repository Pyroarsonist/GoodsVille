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

export default function(req, res, next) {
  redirectBackMiddleware(req, res);
  return next();
}
