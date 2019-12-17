import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import { useSnackbar } from 'notistack';
import betMutation from '../mutations/bet.graphql';

function Bids({ room }) {
  const { supposedEndsAt, lot, status, endedAt, startsAt } = room;
  const isClosed = moment().isAfter(supposedEndsAt) || status === 'closed';
  const [timeLeft, setTimeLeft] = useState(-moment().diff(supposedEndsAt));

  const { enqueueSnackbar } = useSnackbar();

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
      setPrice('0');
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Not enough money', {
        variant: 'error',
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#dedcfb' }}>
      <div className="row justify-content-around pt-5">
        <div className="d-flex flex-column">
          <div>Start price:</div>
          <div>¤{lot.startPrice}</div>
        </div>

        <div className="d-flex flex-column">
          <div>Current price:</div>
          <div>¤{lot.currentPrice}</div>
        </div>
      </div>

      {isClosed ? (
        <div className="row justify-content-center mt-5 mb-5 pb-2">
          <div className="d-flex flex-column">
            <div>Ended at: {moment(endedAt).fromNow()}</div>
          </div>
        </div>
      ) : (
        <div className="pb-2">
          <div className="row justify-content-center mt-5 mb-5">
            <div className="d-flex flex-column">
              {status === 'pending' ? (
                <>
                  <div>Timer:</div>
                  <div>{humanizeDuration(timeLeft, { round: true })}</div>
                </>
              ) : (
                <>
                  <div>Starting in:</div>
                  <div>
                    {humanizeDuration(-moment().diff(startsAt), {
                      round: true,
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          {status === 'pending' && (
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
                  <button
                    className="btn btn-outline-success mt-2"
                    type="submit"
                  >
                    Bid
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Bids.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    supposedEndsAt: PropTypes.string.isRequired,
    endedAt: PropTypes.string,
    startsAt: PropTypes.string.isRequired,
    lot: PropTypes.shape({
      id: PropTypes.string.isRequired,
      startPrice: PropTypes.number.isRequired,
      currentPrice: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Bids;
