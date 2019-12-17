import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/Link';
import { useMutation } from 'react-apollo';
import cx from 'classnames';
import moment from 'moment';
import roomSubscriptionMutation from './roomSubscription.graphql';

const styleStatusResolver = status => {
  const dict = {
    open: 'bg-white',
    pending: 'bg-warning',
    closed: 'bg-info',
  };
  return dict[status];
};

function RoomItem({ room, refetch }, { user }) {
  const [roomSubscription] = useMutation(roomSubscriptionMutation, {
    variables: {
      roomId: room.id,
    },
  });

  const handleClick = async event => {
    event.preventDefault();
    try {
      await roomSubscription();
      await refetch();
    } catch (e) {
      console.error(e);
      // todo: add visible error
    }
  };

  const subVisibility = !!(
    user &&
    !room.userSubscribed &&
    room.status === 'open'
  );
  const roomVisibility = room.status !== 'open';

  return (
    <div className="col-md-4 col-sm-6 col-xs-12">
      <div className="card mb-4 shadow-sm">
        <div className={cx('card-header', styleStatusResolver(room.status))}>
          <Link to={`/rooms/${room.id}`} className="card-title text-center">
            {room.lot.name}
          </Link>
        </div>
        <div className="card-body">
          <p className="card-text">{room.lot.shortDescription}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <small className="text-muted">
                Start price: {room.lot.startPrice}
              </small>
              <small className="text-muted">
                Current price: {room.lot.currentPrice}
              </small>
              {room.status === 'closed' ? (
                <small className="text-muted">
                  Ended at: {moment(room.endedAt).fromNow()}
                </small>
              ) : (
                <small className="text-muted">
                  Started at: {moment(room.startedAt).fromNow()}
                </small>
              )}
            </div>
            {subVisibility && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleClick}
              >
                Subscribe
              </button>
            )}
            {roomVisibility && (
              <Link
                to={`/rooms/${room.id}`}
                className="btn btn-sm btn-outline-secondary"
              >
                Room
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

RoomItem.propTypes = {
  refetch: PropTypes.func.isRequired,
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    startPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
    startedAt: PropTypes.string.isRequired,
    endedAt: PropTypes.string.isRequired,
    lot: PropTypes.shape().isRequired,
    userSubscribed: PropTypes.bool.isRequired,
  }).isRequired,
};

RoomItem.contextTypes = {
  user: PropTypes.shape(),
};

export default RoomItem;
