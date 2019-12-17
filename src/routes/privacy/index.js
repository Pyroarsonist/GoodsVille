import React from 'react';
import Layout from '../../components/Layout';
import privacy from './privacy.md';
import Privacy from '../../components/Privacy';

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
