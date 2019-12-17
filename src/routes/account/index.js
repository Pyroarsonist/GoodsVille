import React from 'react';
import Layout from 'components/Layout';
import Account from 'components/Account';

function action() {
  return {
    chunks: ['account'],
    title: 'Account page',
    component: (
      <Layout>
        <Account />
      </Layout>
    ),
  };
}

export default action;
