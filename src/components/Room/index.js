import React from 'react';
import PropTypes from 'prop-types';
import Bids from './Bids';
import AboutLot from './AboutLot';

function Room({ id }) {
  const lot = {
    startPrice: 12,
    currentPrice: 13,
    tag: 'tag',
    name: 'name',
    description: 'description',
    owner: {
      nickName: 'Owner',
    },
  };
  return (
    <>
      <h1>{id}</h1>
      <Bids lot={lot} />
      <AboutLot lot={lot} owner={lot.owner} />
    </>
  );
}

Room.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Room;
