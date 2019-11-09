import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import history from 'core/history';
import loginMutation from './login.graphql';
import s from './Login.css';

function Login({ title }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(loginMutation, {
    variables: {
      email,
      password,
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await login();
      history.push('/rooms');
    } catch (e) {
      console.error(e);
      // todo: add visible error
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <h1>{title}</h1>
          <p className={s.lead}>Log in with your e-mail</p>
          <div className={s.formGroup}>
            <div className={s.label}>
              Username or email address:
              <input
                className={s.input}
                type="text"
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
            <button className={s.button} type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Login);
