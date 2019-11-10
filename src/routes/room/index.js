import React from 'react';
import Layout from 'components/Layout';
import Room from 'components/Room';

function action({ params: { roomId } }) {
  return {
    chunks: ['room'],
    title: `Room #${roomId}`,
    component: (
      <Layout>
        <Room id={roomId} />
      </Layout>
    ),
  };
}

export default action;
