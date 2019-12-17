/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import history from 'core/history';
import { useSnackbar } from 'notistack';
import s from './Signup.css';
import signupMutation from './signup.graphql';

function Signup() {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDuplicate, setPasswordDuplicate] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const [signup] = useMutation(signupMutation, {
    variables: {
      email,
      nickName,
      fullName,
      password,
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await signup();
      history.push('/rooms');
      window.location.href = '/rooms';
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Error', {
        variant: 'error',
      });
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <h1 className="mt-3 mb-3">Registration</h1>
          <div className={s.formGroup}>
            <div className={s.label}>
              Email address:
              <input
                className={s.input}
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="Email address"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={s.formGroup}>
            <div className={s.label}>
              Nick name
              <input
                className={s.input}
                type="text"
                autoComplete="username"
                placeholder="Nick name"
                onChange={e => setNickName(e.target.value)}
              />
            </div>
          </div>

          <div className={s.formGroup}>
            <div className={s.label}>
              Full name
              <input
                className={s.input}
                type="text"
                autoComplete="name"
                placeholder="Full name"
                onChange={e => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className={s.formGroup}>
            <div className={s.label}>
              Password:
              <input
                className={s.input}
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={s.formGroup}>
            <div className={s.label}>
              Confirm password:
              <input
                className={cx(
                  s.input,
                  'border',
                  password && password === passwordDuplicate
                    ? 'border-success'
                    : 'border-danger',
                )}
                autoComplete="new-password"
                type="password"
                placeholder="Confirm password"
                onChange={e => setPasswordDuplicate(e.target.value)}
              />
            </div>
          </div>
          <div className={s.formGroup}>
            <button className={s.button} type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withStyles(s)(Signup);
