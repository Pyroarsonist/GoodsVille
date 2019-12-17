import React from 'react';
import Layout from 'components/Layout';
import Home from './Home';

async function action() {
  return {
    title: 'GoodsVille',
    chunks: ['home'],
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
