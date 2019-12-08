import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import RoomItem from './RoomItem';
import SearchBar from './SearchBar';
import PaginationBlock from './PaginationBlock';
import roomListQuery from './roomList.graphql';

function RoomList() {
  // todo: add pagination
  const [limit /* setLimit */] = useState(10);
  const [offset /* setOffset */] = useState(0);
  const { loading, data, error } = useQuery(roomListQuery, {
    variables: {
      input: {
        limit,
        offset,
      },
    },
  });
  // todo: add error view
  if (error) return <p>Error view</p>;
  if (loading) return <p>Loading ...</p>;
  const { rooms: { items: rooms, count } = {} } = data;
  return (
    <>
      <SearchBar />
      <div className="container">
        {/* todo: change */}
        <h4>Rooms count: {count}</h4>
        <div className="d-flex flex-wrap align-content-around mt-3">
          {rooms.map(room => (
            <RoomItem room={room} key={room.id} />
          ))}
        </div>
        <PaginationBlock />
      </div>
    </>
  );
}

export default RoomList;
