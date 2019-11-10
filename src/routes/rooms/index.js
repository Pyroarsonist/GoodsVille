import React from 'react';
import Layout from 'components/Layout';
import RoomList from 'components/RoomList';

function action() {
  return {
    chunks: ['rooms'],
    title: 'Rooms',
    component: (
      <Layout>
        <RoomList />
      </Layout>
    ),
  };
}

export default action;
