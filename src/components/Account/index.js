import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useSnackbar } from 'notistack';
import editUserMutation from './editUser.graphql';
import meQuery from './me.graphql';

function Account() {
  const { data, refetch } = useQuery(meQuery);
  const user = data?.me;
  const [fullName, setFullName] = useState(user?.fullName);
  const [nickName, setNickName] = useState(user?.nickName);
  const [balance, setBalance] = useState(user?.balance);

  useEffect(() => {
    setFullName(user?.fullName);
    setNickName(user?.nickName);
    setBalance(user?.balance);
  }, [data]);

  const [isEdit, setIsEdit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [change] = useMutation(editUserMutation, {
    variables: {
      nickName,
      fullName,
      balance: parseFloat(balance),
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await change();
      setIsEdit(false);
      await refetch();
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Error', {
        variant: 'error',
      });
    }
  };

  return isEdit ? (
    <div className="container m-5">
      <h1>Edit Account</h1>

      <hr className="my-5" />

      <form onSubmit={handleSubmit}>
        <div className="d-flex my-3 form-group">
          <h3 className="mr-2">Full Name</h3>
          <input
            className="form-control"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>

        <hr className="my-2" />

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

        <hr className="my-2" />

        <div className="d-flex my-3">
          <h3 className="mr-2">Email</h3>
          <h3>{user?.email}</h3>
        </div>

        <hr className="my-2" />

        <div className="d-flex my-3 form-group">
          <h3 className="mr-2">Balance</h3>
          <input
            className="form-control"
            type="number"
            placeholder="Balance"
            value={balance}
            onChange={e => setBalance(e.target.value)}
          />
        </div>

        <hr className="my-2" />

        <div className="d-flex my-3">
          <button type="submit" className="btn btn-lg btn-success mr-2">
            Accept
          </button>
          <button
            type="button"
            className="btn btn-lg btn-secondary"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="container m-5">
      <h1>Account</h1>

      <hr className="my-5" />

      <div className="d-flex my-3">
        <h3 className="mr-2">Full Name: </h3>
        <h3>{user?.fullName}</h3>
      </div>

      <hr className="my-2" />

      <div className="d-flex my-3">
        <h3 className="mr-2">Nick Name: </h3>
        <h3>{user?.nickName}</h3>
      </div>

      <hr className="my-2" />

      <div className="d-flex my-3">
        <h3 className="mr-2">Email: </h3>
        <h3>{user?.email}</h3>
      </div>

      <hr className="my-2" />

      <div className="d-flex my-3">
        <h3 className="mr-2">Balance: </h3>
        <h3>{user?.balance}</h3>
      </div>

      <hr className="my-2" />
      <button
        type="button"
        className="btn btn-lg btn-primary mt-3"
        onClick={() => setIsEdit(true)}
      >
        Edit
      </button>
    </div>
  );
}

export default Account;
