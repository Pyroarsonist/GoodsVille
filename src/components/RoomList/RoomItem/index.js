import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/Link';

function RoomItem({ room }) {
  const handleClick = async () => {};

  return (
    <div className="col-md-4 col-sm-6 col-xs-12">
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <Link to="/" className="card-title text-center">
            {room.name}
          </Link>
        </div>
        <div className="card-body">
          <p className="card-text">{room.shortDescription}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <small className="text-muted">
                Start price: {room.startPrice}
              </small>
              <small className="text-muted">
                Current price: {room.currentPrice}
              </small>
              <small className="text-muted">Started at: {room.startedAt}</small>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClick}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

RoomItem.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    startPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
    startedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomItem;
