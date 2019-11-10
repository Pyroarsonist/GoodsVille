import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../Link';

function AboutLot({ lot, owner }) {
  return (
    <div className="card mb-4 mt-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="card-title">{lot.name}</span>
        <Link to="/" className="mr-2">
          {owner.nickName}
        </Link>
      </div>
      <div className="card-body">
        <span className="card-text">{lot.description}</span>
      </div>
      <div className="card-footer">
        <span className="card-text">{lot.tag}</span>
      </div>
    </div>
  );
}

AboutLot.propTypes = {
  lot: PropTypes.shell({
    startPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
  owner: PropTypes.shell({
    nickName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AboutLot;