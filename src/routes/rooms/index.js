import React from 'react';
import Layout from 'components/Layout';
import RoomList from 'components/RoomList';
import Room from 'components/Room';

export default {
  path: '',
  children: [
    {
      path: '/:roomId',
      action: ({ params: { roomId } }) => ({
        chunks: ['rooms'],
        title: `Room #${roomId}`,
        component: (
          <Layout>
            <Room id={roomId} />
          </Layout>
        ),
      }),
    },
    {
      path: '',
      action: () => ({
        chunks: ['rooms'],
        title: 'Rooms',
        component: (
          <Layout>
            <RoomList />
          </Layout>
        ),
      }),
    },
  ],
};
