import React from 'react';
import Categories from 'components/Categories/Categories';
import RoomList from 'components/RoomList';

function Home() {
  return (
    <div className="d-flex ">
      <div className="col-3">
        <Categories />
      </div>
      <div className="col-9">
        <RoomList />
      </div>
    </div>
  );
}

export default Home;
