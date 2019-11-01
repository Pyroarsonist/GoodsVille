import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import history from 'core/history';
import s from './Signup.css';
import signupMutation from './signup.graphql';

function Signup({ title }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDuplicate, setPasswordDuplicate] = useState('');

  const [signup] = useMutation(signupMutation, {
    variables: {
      email,
      password,
    },
  });

  const handleSubmit = async () => {
    try {
      await signup();
      // redirect to page
      history.push('/rooms');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>Log in with your e-mail</p>
        <div className={s.formGroup}>
          <div className={s.label}>
            Username or email address:
            <input
              className={s.input}
              type="email"
              // autoFocus
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={s.formGroup}>
          <div className={s.label}>
            Password:
            <input
              className={s.input}
              type="password"
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
              type="password"
              placeholder="Confirm password"
              onChange={e => setPasswordDuplicate(e.target.value)}
            />
          </div>
        </div>
        <div className={s.formGroup}>
          <button className={s.button} type="button" onClick={handleSubmit}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Signup);
