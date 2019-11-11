import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Bids({ lot }) {
  const [value, setValue] = useState('');
  const handleSubmit = async () => {};
  return (
    <div style={{ backgroundColor: '#333' }}>
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
          <div>2:54</div>
        </div>
      </div>

      <div className="row justify-content-center mt-5 mb-5">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <input
              className="form-control"
              type="number"
              placeholder="0"
              aria-label="bid"
              value={value}
              onChange={e => setValue(e.target.value)}
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
    startPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default Bids;
