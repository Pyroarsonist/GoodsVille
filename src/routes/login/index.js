import React from 'react';
import Layout from 'components/Layout';
import Login from './Login';

const title = 'Login page';

function action() {
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Login title={title} />
      </Layout>
    ),
  };
}

export default action;
