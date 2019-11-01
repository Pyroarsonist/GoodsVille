import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './Register.css';

function Register({ title }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDuplicate, setPasswordDuplicate] = useState('');
  const handleSubmit = async () => {
    await fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });
  };
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>Log in with your e-mail</p>
        <form onSubmit={handleSubmit}>
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
            <button className={s.button} type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Register.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Register);
