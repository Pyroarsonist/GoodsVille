import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import RoomItem from './RoomItem';
import SearchBar from './SearchBar';
import PaginationBlock from './PaginationBlock';
import roomListQuery from './roomList.graphql';

const loadingView = <p>Loading ...</p>;

function RoomList() {
  // no ssr
  if (!process.env.BROWSER) return loadingView;
  // todo: add pagination
  const [limit /* setLimit */] = useState(10);
  const [offset /* setOffset */] = useState(0);
  const { loading, data, error, refetch } = useQuery(roomListQuery, {
    variables: {
      input: {
        limit,
        offset,
      },
    },
  });
  // todo: add error view
  if (error) return <p>Error view</p>;
  if (loading) return loadingView;
  const { rooms } = data;
  return (
    <>
      <SearchBar />
      <div className="container">
        <div className="d-flex flex-wrap align-content-around mt-3">
          {rooms.map(room => (
            <RoomItem room={room} key={room.id} refetch={refetch} />
          ))}
        </div>
        <PaginationBlock />
      </div>
    </>
  );
}

export default RoomList;
