import React from 'react';
import Layout from 'components/Layout';
import Signup from 'components/Signup';

function action() {
  return {
    chunks: ['signup'],
    title: 'Registration',
    component: (
      <Layout>
        <Signup />
      </Layout>
    ),
  };
}

export default action;
