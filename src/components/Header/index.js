import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.css';
import Link from '../Link';
import Navigation from '../Navigation';

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation />
        <Link className={s.brand} to="/">
          <span className={s.brandTxt}>GoodsVille</span>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
