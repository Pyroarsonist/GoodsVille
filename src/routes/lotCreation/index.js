import React from 'react';
import Layout from 'components/Layout';
import LotCreation from 'components/LotCreation';

function action() {
  return {
    chunks: ['lotCreation'],
    title: 'Lot creation',
    component: (
      <Layout>
        <LotCreation />
      </Layout>
    ),
  };
}

export default action;
