/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import history from 'core/history';
import DatePicker from 'react-datepicker';
import lotCreationMutation from './createLot.graphql';

function LotCreation() {
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [startedAt, setStartedAt] = useState(new Date());

  const [create] = useMutation(lotCreationMutation, {
    variables: {
      input: {
        description,
        shortDescription,
        name,
        price: +price,
        tag,
        startedAt,
      },
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await create();
      history.push('/rooms');
      window.location.href = '/rooms';
    } catch (e) {
      console.error(e);
      // todo: add visible error
    }
  };

  return (
    <div className="container-fluid p-5">
      <form onSubmit={handleSubmit} className="p-5">
        <h3 className="mt-3 mb-3 row">Lot creation</h3>
        <div className="form-group row">
          Description
          <textarea
            className="form-control"
            autoFocus
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group row">
          Short description
          <input
            className="form-control"
            type="text"
            placeholder="Short description"
            onChange={e => setShortDescription(e.target.value)}
          />
        </div>

        <div className="form-group row">
          Name
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group row">
          Price:
          <input
            className="form-control"
            type="number"
            step="0.01"
            placeholder="Price"
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group row">
          Tag
          <input
            className="form-control"
            type="text"
            placeholder="Tag"
            onChange={e => setTag(e.target.value)}
          />
        </div>
        <div className="form-group row">
          Started at
          <div className="w-100">
            <DatePicker
              className="form-control"
              selected={startedAt}
              onChange={date => setStartedAt(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:mm"
            />
          </div>
        </div>

        <div className="form-group row">
          <button className="btn btn-block btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default LotCreation;
