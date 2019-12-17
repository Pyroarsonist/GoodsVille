import React from 'react';
import Layout from 'components/Layout';
import Login from 'components/Login';

function action() {
  return {
    chunks: ['login'],
    title: 'Login page',
    component: (
      <Layout>
        <Login />
      </Layout>
    ),
  };
}

export default action;
