import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Navigation.css';
import Link from '../Link';

function Navigation() {
  return (
    <div className={s.root} role="navigation">
      <Link className={s.link} to="/about">
        About
      </Link>
      <Link className={s.link} to="/contact">
        Contact
      </Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to="/login">
        Log in
      </Link>
      <span className={s.spacer}>or</span>
      <Link className={cx(s.link, s.highlight)} to="/signup">
        Sign up
      </Link>
    </div>
  );
}
export default withStyles(s)(Navigation);
