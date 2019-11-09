import React from 'react';
import Layout from 'components/Layout';
import Signup from 'components/Signup';

const title = 'Registration';

function action() {
  return {
    chunks: ['signup'],
    title,
    component: (
      <Layout>
        <Signup title={title} />
      </Layout>
    ),
  };
}

export default action;
