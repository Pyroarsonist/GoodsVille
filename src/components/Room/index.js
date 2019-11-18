import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useSubscription } from 'react-apollo';
import Bids from './Bids';
import AboutLot from './AboutLot';
import roomQuery from './queries/room.graphql';
import roomSubscription from './subscriptions/room.graphql';

function Room({ id }) {
  let room;
  const { loading, data, error } = useQuery(roomQuery, {
    variables: { id },
  });
  // todo: add error view
  if (error) return <p>Error view</p>;
  if (loading) return <p>Loading ...</p>;

  room = data.room;

  useSubscription(roomSubscription, {
    variables: { id },
    onError: e => {
      console.error(e);
    },
    onSubscriptionData: ({ subscriptionData }) => {
      room = subscriptionData.data.room;
    },
    shouldResubscribe: true,
  });

  return (
    <>
      <h1>Room #{room.id}</h1>
      <Bids lot={room.lot} supposedEndsAt={room.supposedEndsAt} />
      <AboutLot lot={room.lot} owner={room.lot.owner} />
    </>
  );
}

Room.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Room;
