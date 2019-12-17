import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const styleStatusResolver = status => {
  const dict = {
    open: 'bg-white',
    pending: 'bg-warning',
    closed: 'bg-info',
  };
  return dict[status];
};

function AboutLot({ room }) {
  const { lot } = room;
  const { owner } = lot;
  return (
    <div className="card mb-4 mt-4 shadow-sm">
      <div
        className={cx(
          'card-header d-flex justify-content-between align-items-center',
          styleStatusResolver(room.status),
        )}
      >
        <span className="card-title">{lot.name}</span>
        <span className="mr-2">{owner.nickName}</span>
      </div>
      <div className="card-body">
        <span className="card-text">{lot.description}</span>
        <h5 className="mt-3">Performed bets</h5>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody>
            {lot.bets.map(bet => (
              <tr key={bet.id}>
                <td>¤{bet.price}</td>
                <td>{bet.owner?.nickName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <span className="card-text">{lot.tag}</span>
      </div>
    </div>
  );
}

AboutLot.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lot: PropTypes.shape({
      bets: PropTypes.any,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AboutLot;
