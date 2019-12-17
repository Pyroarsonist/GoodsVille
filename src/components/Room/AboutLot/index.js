import React from 'react';
import PropTypes from 'prop-types';

function AboutLot({ lot, owner }) {
  return (
    <div className="card mb-4 mt-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="card-title">{lot.name}</span>
        <span className="mr-2">{owner.nickName}</span>
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
  lot: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    nickName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AboutLot;
