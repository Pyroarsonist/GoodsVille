import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import bootstrap from 'bootstrap-css-only/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome-free/css/all.min.css';
import s from './Layout.scss';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Feedback />
      <Footer />
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(bootstrap, fontawesome, s)(Layout);
