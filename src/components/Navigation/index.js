import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import s from './index.css';
import logoutMutation from './logout.graphql';
import Link from '../Link';

function Navigation(props, { user }) {
  const [logout] = useMutation(logoutMutation);
  return (
    <div className={s.root} role="navigation">
      <Link className={s.link} to="/about">
        About
      </Link>
      <Link className={s.link} to="/contact">
        Contact
      </Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to="/createLot">
        <button className="btn btn-info" type="button">
          Create lot
        </button>
      </Link>
      <span className={s.spacer}> | </span>
      {user ? (
        <>
          <Link className={s.link} to="/account">
            My account
          </Link>
          <span className={s.spacer}>or</span>
          <button
            className="btn ml-2 btn-danger"
            type="button"
            onClick={async () => {
              try {
                await logout();
                window.location.href = '/';
              } catch (e) {
                console.error(e);
                // todo: add error
              }
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className={s.link} to="/login">
            Log in
          </Link>
          <span className={s.spacer}>or</span>
          <Link className={cx(s.link, s.highlight)} to="/signup">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}
Navigation.contextTypes = {
  user: PropTypes.shape(),
};
export default withStyles(s)(Navigation);
