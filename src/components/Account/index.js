import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import history from '../../core/history';
import editUserMutation from './editUser.graphql';

function Account(props, { user }) {
  const [fullName, setFullName] = useState(user.fullName);
  const [nickName, setNickName] = useState(user.nickName);
  const [isEdit, setIsEdit] = useState(false);

  const [change] = useMutation(editUserMutation, {
    variables: {
      nickName,
      fullName,
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await change();
      setIsEdit(false);
      history.push('/account');
    } catch (e) {
      console.error(e);
      // todo: add visible error
    }
  };

  return isEdit ? (
    <div className="container">
      <h1>Edit Account</h1>

      <form onSubmit={handleSubmit} className="p-5">
        <div className="d-flex my-3">
          <h3 className="mr-2">Full Name</h3>
          <input
            className="form-control"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>

        <div className="d-flex my-3">
          <h3 className="mr-2">Nick Name</h3>
          <input
            className="form-control"
            type="text"
            placeholder="Nick Name"
            value={nickName}
            onChange={e => setNickName(e.target.value)}
          />
        </div>

        <div className="d-flex my-3">
          <h3 className="mr-2">Email</h3>
          <h3>{user.email}</h3>
        </div>
      </form>

      <div className="d-flex my-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1>Account</h1>
      <div className="d-flex my-3">
        <h3 className="mr-2">Full Name</h3>
        <h3>{user.fullName}</h3>
      </div>
      <div className="d-flex my-3">
        <h3 className="mr-2">Nick Name</h3>
        <h3>{user.nickName}</h3>
      </div>
      <div className="d-flex my-3">
        <h3 className="mr-2">Email</h3>
        <h3>{user.email}</h3>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsEdit(true)}
      >
        Edit
      </button>
    </div>
  );
}
Account.contextTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    nickName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

export default Account;
