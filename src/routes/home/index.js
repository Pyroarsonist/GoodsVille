import React from 'react';
import Layout from 'components/Layout';
import Home from './Home';

async function action() {
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
