import React from 'react';
import RoomItem from './RoomItem';
import SearchBar from './SearchBar';
import PaginationBlock from './PaginationBlock';

function RoomList() {
  // todo: add room query
  const rooms = [
    {
      name: 'Lorem',
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere ligula in lectus fermentum, sit amet mollis ipsum nullam.',
      startPrice: '14.88',
      currentPrice: '120.00',
      startedAt: '12:00',
      roomId: 1,
    },
    {
      name: 'Lorem',
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere ligula in lectus fermentum, sit amet mollis ipsum nullam.',
      startPrice: '14.88',
      currentPrice: '120.00',
      startedAt: '12:00',
      roomId: 2,
    },
    {
      name: 'Lorem',
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere ligula in lectus fermentum, sit amet mollis ipsum nullam.',
      startPrice: '14.88',
      currentPrice: '120.00',
      startedAt: '12:00',
      roomId: 3,
    },
    {
      name: 'Lorem',
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere ligula in lectus fermentum, sit amet mollis ipsum nullam.',
      startPrice: '14.88',
      currentPrice: '120.00',
      startedAt: '12:00',
      roomId: 4,
    },
    {
      name: 'Lorem',
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere ligula in lectus fermentum, sit amet mollis ipsum nullam.',
      startPrice: '14.88',
      currentPrice: '120.00',
      startedAt: '12:00',
      roomId: 5,
    },
  ];
  return (
    <>
      <SearchBar />
      <div className="container">
        <div className="d-flex flex-wrap align-content-around mt-3">
          {rooms.map(item => (
            <RoomItem room={item} key={item.roomId} />
          ))}
        </div>
        <PaginationBlock />
      </div>
    </>
  );
}

export default RoomList;
