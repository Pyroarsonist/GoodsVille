import React from 'react';
import Layout from 'components/Layout';
import Privacy from 'components/Privacy';
import privacy from './privacy.md';

function action() {
  return {
    chunks: ['privacy'],
    title: privacy.title,
    component: (
      <Layout>
        <Privacy />
      </Layout>
    ),
  };
}

export default action;
