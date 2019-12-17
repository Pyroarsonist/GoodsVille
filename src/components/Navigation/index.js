import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { useSnackbar } from 'notistack';
import s from './index.css';
import logoutMutation from './logout.graphql';
import Link from '../Link';

// todo: user.balance undefined

function Navigation(props, { user }) {
  const [logout] = useMutation(logoutMutation);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div className={s.root} role="navigation">
      {user && (
        <>
          <Link className={s.link} to="/createLot">
            <button className="btn btn-info" type="button">
              Create lot
            </button>
          </Link>
        </>
      )}
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
                window.location.href = '/rooms';
              } catch (e) {
                console.error(e);
                enqueueSnackbar('Error', {
                  variant: 'error',
                });
              }
            }}
          >
            Logout
          </button>
          <span className={cx(s.balance, 'ml-3')}>{`$${user.balance}`}</span>
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
