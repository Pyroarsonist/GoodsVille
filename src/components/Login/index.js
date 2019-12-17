import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/withStyles';
import history from 'core/history';
import cx from 'classnames';
import loginMutation from './login.graphql';
import s from './Login.css';

function Login() {
  const [errorOccured, setErrorOcurred] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(loginMutation, {
    variables: {
      email,
      password,
    },
  });

  useEffect(() => {
    setErrorOcurred(false);
  }, [email, password]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await login();
      history.push('/rooms');
      window.location.href = '/rooms';
    } catch (e) {
      setErrorOcurred(true);
      console.error(e);
      // todo: add visible error
    }
  };

  return (
    <div className={s.root}>
      <div className={cx('my-5 py-5', s.container)}>
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4">Log in</h1>
          <div className={s.formGroup}>
            <div className={s.label}>
              Email address:
              <input
                className={cx(s.input, errorOccured && 'border-danger')}
                type="text"
                autoComplete="email"
                placeholder="Email address"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={cx(s.formGroup, 'mt-1')}>
            <div className={s.label}>
              Password:
              <input
                className={cx(s.input, errorOccured && 'border-danger')}
                type="password"
                autoComplete="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={s.formGroup}>
            <button className={cx(s.button, 'mt-5')} type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withStyles(s)(Login);
