import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import betMutation from '../mutations/bet.graphql';

function Bids({ lot, supposedEndsAt }) {
  const [timeLeft, setTimeLeft] = useState(-moment().diff(supposedEndsAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(-moment().diff(supposedEndsAt));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [supposedEndsAt]);

  const [price, setPrice] = useState('0');

  const [bet] = useMutation(betMutation, {
    variables: {
      input: { price: Number.parseFloat(price), lotId: lot.id },
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await bet();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ backgroundColor: '#dedcfb' }}>
      <div className="row justify-content-around pt-5">
        <div className="d-flex flex-column">
          <div>Start price:</div>
          <div>{lot.startPrice}</div>
        </div>

        <div className="d-flex flex-column">
          <div>Current price:</div>
          <div>{lot.currentPrice}</div>
        </div>
      </div>

      <div className="row justify-content-center mt-5 mb-5">
        <div className="d-flex flex-column">
          <div>Timer:</div>
          <div>{humanizeDuration(timeLeft, { round: true })}</div>
        </div>
      </div>

      <div className="row justify-content-center mt-5 mb-5">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              aria-label="bid"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <button className="btn btn-outline-success mt-2" type="submit">
              Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Bids.propTypes = {
  lot: PropTypes.shape({
    id: PropTypes.string.isRequired,
    startPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
  supposedEndsAt: PropTypes.string.isRequired,
};

export default Bids;
